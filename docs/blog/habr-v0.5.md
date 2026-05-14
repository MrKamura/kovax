# kovax-react 0.5 — типизированная React-библиотека UI с CSS-переменными и тёмной темой

> TL;DR: выпустил **kovax-react 0.5** — компактную UI-библиотеку на React с типизированными design-токенами, **ThemeProvider** на CSS-переменных и поддержкой light/dark/system. Внутри 30+ компонентов (layout, формы, оверлеи, таблицы, date pickers, **Avatar**, **Badge**), MIT, React 16+. Под капотом — TypeScript, tsup, Jest, пререндер playground для SEO.

**Ссылки:**

- 📦 npm: [`kovax-react`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Репозиторий: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Живая документация и playground (EN/RU): [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)

---

## Что это и зачем ещё одна библиотека

Большие фреймворки решают почти всё, но тащат за собой сотни КБ, свои runtime-системы стилей и завязки на конкретные SSR-фреймворки. Я хотел набор примитивов, который:

- ставится одной командой и работает без провайдеров и стилевых рантаймов;
- даёт **строго типизированные токены** дизайн-системы (а не «магические» CSS-классы);
- умеет **тему** на CSS-переменных и **dark mode** без вспышки гидрации;
- собирается в маленькие сабэнтри-бандлы, чтобы не тащить весь индекс на одну кнопку.

Так появился **kovax-react**. Это не «убийца» MUI / Chakra / shadcn — это альтернатива, когда нужен SSR-дружелюбный минимум с честной типизацией и предсказуемыми токенами.

## Что внутри

| Группа | Компоненты / API |
| --- | --- |
| **Layout** | `Box`, `Flex`, `Grid`, `Stack` / `HStack` / `VStack`, `Center`, `Container`, `AspectRatio`, `Separator`, `Bleed`, `VisuallyHidden`, `Sticky` |
| **Typography** | `Text`, `Heading`, `Link`, `Code`, `Kbd`, `Blockquote`, `List`, `ListItem` |
| **Формы** | `FormControl`, `FormLabel`, `FormError`, `FormHelperText`, `Input`, `Textarea`, `Checkbox`, `Radio` / `RadioGroup`, `Switch`, `Select`, `useCombobox`, `VirtualizedListbox` |
| **Дата/время** | `DatePicker`, `DateRangePicker` (`variant="date"` / `"datetime"`, обёртки над `react-day-picker`) |
| **Таблицы** | `Table.*` примитивы, `DataTable` с колонками, `rowHeader`, опциональный controlled-sort |
| **Оверлеи** | `Tooltip`, `Popover` / `Dropdown`, `Dialog`, `Modal`, `ToastProvider` / `useToast` |
| **Навигация** | `Tabs`, `Collapsible`, `Accordion` |
| **Статусы** | `Alert` (`tone`, dismiss, live-region), `LinearProgress`, `CircularProgress` |
| **Действия** | `Button`, `IconButton`, `ButtonGroup` |
| **Метки / люди** | **`Badge`** (solid / outline / subtle, точка-индикатор), **`Avatar`** (фото, инициалы, fallback) |
| **Тема** | `ThemeProvider`, `useColorMode`, `useTheme`, `lightPalette`, `darkPalette`, `themeToken`, `colorToken` |

Всё это импортируется как из корня **`kovax-react`**, так и из узких сабэнтри: **`kovax-react/layout`**, **`/form`**, **`/overlays`**, **`/table`**, **`/avatar`**, **`/badge`** и т. д. — чтобы в финальный бандл попадало только то, что вы реально используете.

## Что нового в 0.5

### `ThemeProvider` + CSS-переменные + dark mode

Раньше `themeToken("primary.500")` отдавал hex напрямую. Теперь — `var(--kx-color-primary-500, #3b82f6)`: компоненты читают значения из CSS-переменных и реагируют на смену темы мгновенно, а fallback в `var()` спасает SSR и сценарий «без провайдера».

Минимальный сетап:

```tsx
import { ThemeProvider, Button } from "kovax-react";

export default function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      <Button color="primary">Привет, тема</Button>
    </ThemeProvider>
  );
}
```

Хук `useColorMode()` для переключателя в шапке:

```tsx
import { useColorMode } from "kovax-react";

function ColorModeToggle() {
  const { colorMode, resolvedColorMode, setColorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <button onClick={() => setColorMode("light")}>Light</button>
      <button onClick={() => setColorMode("dark")}>Dark</button>
      <button onClick={() => setColorMode("system")}>System</button>
      <button onClick={toggleColorMode}>toggle()</button>
      <small> · mode: {colorMode} · resolved: {resolvedColorMode}</small>
    </div>
  );
}
```

**Бренд-палитра одной строкой** — оверрайды частичные, всё ненастроенное наследуется из встроенных light/dark:

```tsx
import { ThemeProvider, lightPalette } from "kovax-react";

const brandPrimary = {
  50: "#f5f3ff",  100: "#ede9fe",  200: "#ddd6fe",  300: "#c4b5fd",
  400: "#a78bfa", 500: "#7c3aed",  600: "#6d28d9",  700: "#5b21b6",
  800: "#4c1d95", 900: "#3b0a76",
};

<ThemeProvider
  palettes={{ light: { colors: { ...lightPalette.colors, primary: brandPrimary } } }}
>
  {/* теперь color="primary" — фиолетовый */}
</ThemeProvider>
```

**Скоупинг через `target={ref}`** — внутри одной страницы можно держать тёмный «остров» в светлой теме (или наоборот), не форкая компоненты. Полезно для маркетинговых блоков, hero-секций или встраиваемых виджетов.

**Что ещё умеет `ThemeProvider`:**

- `colorMode` (controlled) и `defaultColorMode` (uncontrolled, по умолчанию `system`);
- `storageKey` — ключ `localStorage` для запоминания выбора пользователя (или `false`, если не хотите хранить);
- `onColorModeChange(mode, resolved)` — синхронизация с аналитикой, cookie, серверными prefs;
- `nonce` для строгого Content-Security-Policy;
- SSR: рендерится с известной темой (например, из cookie), переменные сразу есть в HTML — **никакой вспышки** при гидрации.

### `Avatar`

Фото + автоматические инициалы + произвольный fallback. Размеры **`xs–xl`**, формы **`circle` / `rounded`**, семантические цвета fallback. Если `src` сломан — переключается на инициалы автоматически по `onError`.

```tsx
import { Avatar, HStack } from "kovax-react";
import { MdPerson } from "react-icons/md";

<HStack gap={12}>
  <Avatar name="Иван Петров" />                       {/* → ИП */}
  <Avatar src="/u/1.jpg" alt="Иван Петров" name="Иван Петров" size="lg" />
  <Avatar name="Team" fallback={<MdPerson size={22} aria-hidden />} />
  <Avatar src="https://broken.url/photo.jpg" alt="" name="Fallback" />
</HStack>
```

Доступность: без `src` корень получает `role="img"` и `aria-label` из `name` (или `alt`); с `src` ответственность за осмысленный `alt` — на потребителе.

### `Badge`

Компактная «таблетка» для статусов, счётчиков и меток. Три варианта поверхности, шесть семантических цветов, два размера, опциональная точка-индикатор.

```tsx
import { Badge, HStack } from "kovax-react";

<HStack gap={8}>
  <Badge dot color="success">Live</Badge>
  <Badge variant="outline" color="primary">Pro</Badge>
  <Badge variant="subtle" color="warning">Beta</Badge>
  <Badge size="sm" color="neutral">12</Badge>
</HStack>
```

### Playground как лендинг

Раньше playground был обычным CSR-SPA — для GitHub Pages нормально, для SEO почти бесполезно. В 0.5 production-сборка прогоняет **vite-node-prерендер** и пишет статический HTML на каждый маршрут:

- `index.html`, `/docs/`, `/components/<slug>/` в EN и RU;
- корректные `<title>`, `<meta name="description">`, OG / Twitter теги, `canonical`;
- `sitemap.xml`, `robots.txt`, `404.html`.

В итоге **38–40 страниц** с готовой разметкой — Google и социальные превью видят содержимое сразу, без необходимости в Next.js / Astro.

## Дизайн-токены, к которым хочется обращаться

В `themeToken("…")` и `colorToken("…")` работают пространства имён:

- **палитры 50→900**: `primary.500`, `secondary.200`, `success.600`, `warning.500`, `error.700`, `white`, `black`;
- **типографика**: `text.xs … text.5xl`;
- **отступы**: `spacing.none … spacing.5xl`;
- **радиусы**: `borderRadius.none … borderRadius.full`;
- **тени**: `shadow.xs … shadow.2xl`, `shadow.inner`, `shadow.focusRing`;
- **motion**: `duration.fast/normal/slow`, `easing.standard/in/out`, плюс легаси `transition.*`;
- **слои**: `zIndex.docked … zIndex.tooltip`;
- **брейкпоинты**: `breakpoint.sm … breakpoint.2xl` (em-based).

Всё это типизировано — IDE подсказывает доступные ключи, опечатки ловятся компиляцией.

## Установка и запуск за минуту

```bash
npm install kovax-react
# Только если нужен DatePicker / DateRangePicker
npm install react-day-picker
```

Базовое использование:

```tsx
import {
  Box, VStack, HStack, Button, Input,
  FormControl, FormLabel, Text,
  ThemeProvider, themeToken,
} from "kovax-react";

export function SignIn() {
  return (
    <ThemeProvider defaultColorMode="system">
      <Box p={32} maxW={480} m="40px auto"
        backgroundColor={themeToken("secondary.50")}
        borderRadius={themeToken("borderRadius.md")}
        boxShadow={themeToken("shadow.md")}
      >
        <VStack gap={24} align="stretch">
          <Text size="lg" fontWeight={600}>Вход</Text>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" placeholder="you@example.com" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Пароль</FormLabel>
            <Input id="password" type="password" floatingLabel placeholder="Пароль" />
          </FormControl>
          <HStack justify="flex-end" gap={12}>
            <Button variant="outline">Отмена</Button>
            <Button variant="solid" color="primary">Войти</Button>
          </HStack>
        </VStack>
      </Box>
    </ThemeProvider>
  );
}
```

`react-hook-form` использую только в playground (демо `Input` / `DatePicker`), сама библиотека от неё не зависит.

## Технические решения, которые сэкономили мне нервы

- **`var(--kx-…, fallback)` вместо «голого» hex** — компоненты SSR-безопасны и совместимы с «без провайдера» из коробки.
- **Сабэнтри-точки в `tsup`** (`avatar`, `badge`, `tokens`, …) — деревья импортов не цепляют friends-of-friends, бандлы остаются маленькими.
- **`forwardRef` везде**, где есть DOM-узел — `ref` пробрасывается в фокус-менеджеры, измерители, `react-hook-form` и т. д.
- **`role="img"` + `aria-label`** на Avatar без `src` — fallback не «теряет» имя для скринридеров.
- **Пререндер на `vite-node`** вместо переезда на Next.js — стек не меняется, а контент уже статический.

## Что дальше

В 0.6 хочу добавить:

- **Skeleton** с теми же токенами и анимацией через `motion.*`;
- **Menu** поверх существующих `Popover`-примитивов;
- **Breadcrumb** и **Pagination** для админок;
- **`useMediaQuery`**, отдающий брейкпоинты из токенов;
- разделение `Toast` на провайдер + render-агностичный менеджер.

Если у вас есть свои хотелки — велкам в **[issues](https://github.com/MrKamura/kovax/issues)** или комментарии под этим постом.

## Поддержать

Библиотека MIT и развивается в свободное время. Если она вам помогла, спасибо за звезду на **[GitHub](https://github.com/MrKamura/kovax)** — это правда мотивирует. Альтернативно есть [Boosty](https://boosty.to/mrkamura) и [CloudTips](https://pay.cloudtips.ru/p/d79814b0).

Спасибо за чтение. Вопросы / критика / репорты — в комментарии.
