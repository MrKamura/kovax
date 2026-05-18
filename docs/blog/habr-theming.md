# Светлая и тёмная тема на CSS-переменных без вспышки гидрации, без перехода на Next.js

Когда у проекта SPA на Vite, GitHub Pages и React 18, а заказчик внезапно хочет тёмную тему «как у людей» — с системным режимом, мгновенным переключением и без белого мигания при загрузке, — первое желание разработчика обычно одно: «перевести всё на Next.js». В моём случае от этого хотелось воздержаться: стек устаканен, продакшен на статике, и платить полноценным фреймворком за `prefers-color-scheme` казалось слишком дорого.

В статье разбираю, как удалось сделать тему на чистом React + CSS-переменных, оставив рендерер прежним. Получился слой, который работает в трёх режимах сразу:

1. На клиенте — как обычный контекстный провайдер.
2. На сервере / в статическом пререндере — без вспышки и без «прыжка» цвета при гидрации.
3. Без провайдера — компоненты всё равно рисуются корректно, потому что значения возвращаются через `var(--name, fallback)`.

Все примеры взяты из реальной библиотеки компонентов и проверены в браузерах. Код открыт, ссылка будет в конце.

## Постановка задачи

Дано:

- Набор React-компонентов с типизированными design-токенами. Раньше функция `themeToken("primary.500")` возвращала просто строку `"#3b82f6"`, которая инлайнилась в `style={{ background: ... }}`.
- Пара палитр: светлая и тёмная.
- Хочется: переключение `light` / `dark` / `system`, сохранение выбора в `localStorage`, скоупинг темы на поддерево, поддержка SSR/SSG, никакой «вспышки белой страницы».

Самое неудобное ограничение — компоненты уже опубликованы и активно используются. Подмена API на новый «жёсткий» (только через провайдер) сломает потребителей. Значит, переход должен быть **постепенным**: новые приложения подключают провайдер и получают тему, старые продолжают работать без изменений.

## Идея: токен превращается в `var(--…, fallback)`

Главная развилка — где брать значение цвета. Возможны три варианта:

1. **Инлайнить hex** прямо в `style`. Простой путь, но переключение темы потребует пересоздавать стили на каждый рендер.
2. **Класс на корне + готовый CSS**. Работает, но нужно поставлять CSS-файл и просить пользователя его подключать.
3. **CSS-переменные**, которые объявляются один раз — а компоненты подставляют их через `var(...)`.

Я выбрал третий путь, но с твистом: каждый токен возвращает не голую переменную, а `var(--kx-color-primary-500, #3b82f6)` — с фолбэком на тот же hex, который был раньше.

```ts
function wrapVar(name: string, fallback: string): string {
  return `var(${name}, ${fallback})`;
}

export function colorToken(path: string): string {
  if (path === "white") return wrapVar("--kx-color-base-white", "#ffffff");

  const dot = path.indexOf(".");
  if (dot <= 0) return path; // произвольный CSS (`#fafafa`, `rgba(...)`) — пропускаем

  const palette = path.slice(0, dot);
  const shade = path.slice(dot + 1);
  const hex = colors[palette]?.[shade];
  if (!hex) return path;

  return wrapVar(`--kx-color-${palette}-${shade}`, hex);
}
```

Логика простая: если переменная не объявлена (никто не подключил провайдер), браузер использует фолбэк и компонент выглядит как раньше. Если переменная есть — она побеждает фолбэк. Поведение инкрементальное: ничего не сломается у текущих потребителей, новые получат тему «бесплатно».

То же самое сделано для остальных пространств имён — `themeToken("spacing.md")` отдаёт `var(--kx-spacing-md, 1rem)`, `themeToken("shadow.md")` — `var(--kx-shadow-md, ...)`, и так далее. Исключение — `breakpoint.*`. Они используются в `@media`-запросах, а `@media (min-width: var(--…))` спецификация не поддерживает, поэтому брейкпоинты возвращаются «голым» значением.

## Провайдер: один `<style>` на тему вместо `style` на каждом узле

Провайдер делает три вещи:

1. Решает, какой режим активен сейчас (`light` / `dark` / резолв `system`).
2. Генерирует CSS-блок с объявлениями переменных и вставляет его в `<style>`.
3. Ставит атрибут `data-kovax-theme="dark"` на корень, чтобы переключать палитру одним правилом.

Сгенерированный CSS выглядит примерно так (фрагмент):

```css
:root {
  --kx-color-primary-50: #eff6ff;
  --kx-color-primary-500: #3b82f6;
  --kx-color-primary-900: #1e3a8a;
  --kx-spacing-md: 1rem;
  --kx-radius-md: 0.5rem;
  --kx-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  /* ... */
}

:root[data-kovax-theme="dark"] {
  --kx-color-primary-50: #1e293b;
  --kx-color-primary-500: #60a5fa;
  --kx-color-primary-900: #f8fafc;
  --kx-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.6), 0 2px 4px -2px rgb(0 0 0 / 0.6);
}
```

«Статические» токены (отступы, радиусы, типографика, motion) объявляются только в светлом блоке — они не меняются между темами, и дублировать их в тёмном бесполезно. В дарк-блоке остаются только цвета и тени:

```ts
const css = useMemo(() => {
  const base = buildThemeCss(":root", lightPalette, { includeStatic: true });
  const dark = buildThemeCss(':root[data-kovax-theme="dark"]', darkPalette, {
    includeStatic: false,
  });
  return `${base}\n${dark}`;
}, [lightPalette, darkPalette]);

return (
  <ThemeContext.Provider value={ctx}>
    <style data-kovax-theme-style="" nonce={nonce}>{css}</style>
    {children}
  </ThemeContext.Provider>
);
```

Атрибут на корне — `data-kovax-theme`, не класс. Это удобно по двум причинам: значение читаемое (`"dark"` / `"light"`), и в селекторе `:root[data-kovax-theme="dark"]` нет «гонки» с другими классами на `<html>`, которые могут добавлять сторонние библиотеки.

`nonce` пробрасывается в `<style>` для тех, кто живёт под строгим Content-Security-Policy. Это потребовалось ровно один раз, в проекте под банковским CSP — и было приятно, что не пришлось патчить библиотеку.

## Без вспышки гидрации

Главная боль тёмной темы — **flash of unstyled content**. Если режим выбирается на клиенте (JavaScript посмотрел `prefers-color-scheme`, поставил класс), то до первого кадра разметка рисуется со светлыми цветами, а через несколько миллисекунд — переключается в тёмные. На медленных устройствах это видно глазом.

Решение, которое работает у меня без SSR-фреймворка:

1. **Статический пререндер на `vite-node`.** После `vite build` запускается скрипт, который рендерит каждый маршрут через `renderToString`, оборачивая его в тот же `ThemeProvider`. В HTML сразу попадает блок с `:root { --kx-color-… }`. Браузер до загрузки JavaScript уже знает все переменные.
2. **`defaultColorMode` на сервере соответствует тому, что ожидается у клиента.** В простейшем случае — `"light"`. Если хочется «правильно» — читаем cookie с прошлым выбором пользователя и передаём в SSR. Гидрация совпадает с серверным деревом, React не выкидывает варнинг.
3. **`var(...)` с фолбэком** делает остальное. Даже если JS отвалится — компонент не превратится в чёрно-белый прямоугольник, а нарисуется со «светлой» палитрой по умолчанию.

Сценарий «system» решается через `useState`-инициализатор плюс `matchMedia`:

```ts
function systemPrefersDark(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const [systemResolved, setSystemResolved] = useState<"light" | "dark">(() =>
  typeof window === "undefined" ? "light" : systemPrefersDark() ? "dark" : "light",
);

useEffect(() => {
  if (typeof window === "undefined" || !window.matchMedia) return;
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => setSystemResolved(mql.matches ? "dark" : "light");
  onChange();
  mql.addEventListener?.("change", onChange);
  return () => mql.removeEventListener?.("change", onChange);
}, []);
```

При `defaultColorMode="system"` первый кадр всегда «светлый» (потому что сервер не знает про OS пользователя), а после гидрации, если система требует тёмную, переключение происходит за пару тиков. Это допустимо для большинства приложений; для тех, где важен идеальный first paint, есть путь с cookie + `defaultColorMode={cookieValue}`.

## Контролируемый, неуправляемый и сохранённый режимы

`ThemeProvider` поддерживает три способа управления:

```ts
// uncontrolled, с автоматическим запоминанием в localStorage
<ThemeProvider defaultColorMode="system">…</ThemeProvider>

// uncontrolled, без сохранения (для модальных preview, песочниц)
<ThemeProvider defaultColorMode="light" storageKey={false}>…</ThemeProvider>

// controlled — внешний store берёт управление
<ThemeProvider colorMode={modeFromRedux} onColorModeChange={dispatchToRedux}>…</ThemeProvider>
```

Логика внутри проста, но в неё стоит ткнуть носом, потому что многие реализации тут спотыкаются:

```ts
const [internalMode, setInternalMode] = useState<ColorMode>(() => {
  if (controlledMode) return controlledMode;
  return readStoredMode(storageKey) ?? defaultColorMode;
});
const mode = controlledMode ?? internalMode;
```

- Если задан `colorMode`, провайдер работает как «глупый» — отображает то, что прислали снаружи.
- Если не задан — пытается прочитать `localStorage`, и только потом скатывается к `defaultColorMode`.
- При попытке `setColorMode("dark")` пишем в `localStorage`, но **не** дёргаем внутренний стейт, если режим контролируемый (иначе будет двойное обновление).

`onColorModeChange(mode, resolved)` срабатывает на каждое реальное изменение — включая переключение `system` в `dark` без действия пользователя. Это удобно, чтобы синхронизировать аналитику и cookie на бекенде, не дёргая дополнительный store.

## Скоупинг темы на поддерево

Иногда нужен «дарк-остров» внутри светлой страницы. Например, hero-блок маркетингового лендинга или встраиваемый виджет, который должен быть тёмным независимо от глобальной темы. Раньше для этого пришлось бы форкать компоненты или городить альтернативные классы. С CSS-переменными — нет.

Провайдер умеет принимать `target={ref}`. В этом случае селекторы становятся локальными:

```ts
const isDocumentTarget = target === "documentElement";
const scopeAttr = `data-kovax-scope-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

const scopeSelector = isDocumentTarget ? ":root" : `[${scopeAttr}]`;
const darkSelector  = isDocumentTarget
  ? `:root[data-kovax-theme="dark"]`
  : `[${scopeAttr}][data-kovax-theme="dark"]`;
```

В эффекте этот же атрибут ставится на DOM-узел из ref. Получается изолированный блок CSS-переменных:

```tsx
function DarkIsland() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider colorMode="dark" target={ref} storageKey={false}>
      <div ref={ref}>
        {/* всё внутри читает тёмную палитру, остальное приложение — нет */}
      </div>
    </ThemeProvider>
  );
}
```

Идентификатор скоупа стабильный (`useId`) — у React 18 он одинаковый между сервером и клиентом, так что гидрация не возмущается.

## Бренд-палитра «частичными» оверрайдами

`palettes` принимает `Partial<ThemePalette>` для каждой стороны и сливает с встроенными:

```ts
function mergePalette(base, override) {
  if (!override) return base;
  return {
    colors:    { ...base.colors,    ...override.colors    },
    baseColors:{ ...base.baseColors,...(override.baseColors ?? {}) },
    shadows:   { ...base.shadows,   ...(override.shadows   ?? {}) },
  };
}
```

В реальной жизни заказчику обычно нужно переопределить один-два цвета («бренд-фиолетовый» вместо синего primary). Передаём только их:

```tsx
import { ThemeProvider, lightPalette } from "kovax-react";

<ThemeProvider
  palettes={{
    light: {
      colors: {
        ...lightPalette.colors,
        primary: {
          50: "#f5f3ff",  100: "#ede9fe", 200: "#ddd6fe",
          300: "#c4b5fd", 400: "#a78bfa", 500: "#7c3aed",
          600: "#6d28d9", 700: "#5b21b6", 800: "#4c1d95", 900: "#3b0a76",
        },
      },
    },
  }}
/>
```

Остальные палитры (secondary, success, warning, error), тени и базовые цвета остаются дефолтными — переопределять то, что не задано, не нужно.

## Что получилось по итогам

- **Один зависимостный «компонент»** — `ThemeProvider`. Нет рантаймовой стили-в-JS-библиотеки, нет требований к SSR-фреймворку, бандл изменился на единицы килобайт.
- **Обратная совместимость**. Старый код без провайдера продолжает работать благодаря `var(--…, fallback)`.
- **SSR без вспышки** через пререндер на `vite-node`. Те же `renderToString` + один `<style>` в HTML — никаких next-themes, без слоёв `useLayoutEffect`.
- **Скоупинг через `target={ref}`** даёт «острова» с тёмной темой внутри светлой страницы, без форка компонентов.
- **Контролируемый и сохраняемый режимы** на одном API. `localStorage`-ключ настраиваемый, при желании выключается, контролируемый режим отдаёт управление внешнему store.

## Где взять и потрогать

Реализация лежит в открытой библиотеке компонентов, которую я веду:

- Репозиторий: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- npm: [`kovax-react`](https://www.npmjs.com/package/kovax-react)
- Живая документация со страницей про `ThemeProvider`: [mrkamura.github.io/kovax/components/theme/](https://mrkamura.github.io/kovax/components/theme/)

Если интересно посмотреть, как это ведёт себя в реальном UI — на странице есть переключатель режима (Light / Dark / System) и пример с «дарк-островом» внутри светлой страницы.

Буду рад замечаниям по реализации в комментариях. Особенно интересно про edge-кейсы с CSP и про сценарии cookie-based SSR — там есть, что улучшать.
