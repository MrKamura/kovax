# kovax-react 0.6 — полный список изменений после 0.5

> **TL;DR:** на npm вышел **kovax-react 0.6.0** — пять новых компонентов (**`Avatar`**, **`Badge`**, **`Menu`**, **`Skeleton`**, **`Pagination`**), хуки **`useMediaQuery` / `useBreakpointUp`** и хелперы брейкпоинтов из тех же токенов, доработка **`Popover`** под меню с клавиатурой, отдельные entry **`kovax-react/*`**, обновлённые Markdown-доки и playground (EN/RU). MIT, React 18+.

**Ссылки:**

- 📦 npm: [`kovax-react@0.6.0`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Репозиторий: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)

---

## Сводная таблица (всё после v0.5.0)

| Область | Что появилось |
| --- | --- |
| **`Avatar`** | Фото, инициалы из **`name`**, свой **`fallback`**; размеры **`xs`–`xl`**, форма **`circle` / `rounded`**; сбой **`src`** → fallback — **`kovax-react/avatar`** |
| **`Badge`** | Плашка статуса/счётчика; **`solid` / `outline` / `subtle`**, семантические цвета, точка **`dot`** — **`kovax-react/badge`** |
| **`Menu`** / **`DropdownMenu`** | Составное меню на **Popover**; **`role="menu"`**, стрелки / Home / End / Enter / Space; анимация входа — **`kovax-react/menu`** |
| **`Skeleton`** | Плейсхолдеры загрузки; **`pulse` / `shimmer` / `none`**, фигуры, режим **`text`** — **`kovax-react/skeleton`** |
| **`Pagination`** | Пейджер + **`getPaginationItems`** для своей вёрстки — **`kovax-react/pagination`** |
| **Адаптив** | **`useMediaQuery`**, **`useBreakpointUp`**, **`breakpointMinMediaQuery`**, **`breakpointMinWidth`**, **`breakpointMinMediaQueryFromToken`** (и в **`kovax-react/tokens`**) |
| **`Popover`** | **`contentRole="menu"`**, **`ariaHasPopup`**, **`usePopoverRootContext`**, фокус по **`menuitem`** |
| **Зависимости** | **`npm audit fix`** — обновление транзитивных пакетов |
| **Документация** | Новые **`.md`** по компонентам, разделы playground, черновики в **`docs/blog/`**, обложка README |

Новых runtime peer-зависимостей нет (кроме уже существующих **React** и опционального **`react-day-picker`**).

```bash
npm install kovax-react@0.6.0
```

Узкие импорты: **`kovax-react/avatar`**, **`/badge`**, **`/menu`**, **`/skeleton`**, **`/pagination`**, **`/tokens`**.

---

## Зачем такой объём в одном миноре

В **0.5** был **`ThemeProvider`**, тёмная тема и **`var(--kx-…)`**. Для типичной админки/каталога не хватало «витринных» блоков: аватар в шапке, бейджи статусов, выпадающее меню, скелетоны при загрузке, пейджер к таблице и один источник правды для брейкпоинтов в JS. **0.6** закрывает это одним релизом, не раздувая зависимости.

---

## Avatar

```tsx
import { Avatar, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.sm")} align="center">
  <Avatar name="Иван Петров" />
  <Avatar src="/photo.jpg" alt="Иван Петров" name="Иван Петров" size="lg" />
  <Avatar name="Online" colorScheme="success" size="sm" />
</HStack>
```

- **`name`** → инициалы (несколько слов — первая буква первого и последнего; одно слово — две буквы).
- **`size`**: `xs` | `sm` | `md` | `lg` | `xl`.
- **`shape`**: `circle` | `rounded`.
- Битый **`src`** — автоматический **`fallback`** / инициалы.

[Avatar.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Avatar.md) · playground **Components → Avatar**.

---

## Badge

```tsx
import { Badge, HStack } from "kovax-react";

<HStack gap={8}>
  <Badge dot color="success">В сети</Badge>
  <Badge color="primary" variant="outline">Pro</Badge>
  <Badge color="neutral" size="sm">12</Badge>
</HStack>
```

Не интерактивен (для кликабельных чипов — **`Button`**).

- **`variant`**: `solid` | `outline` | `subtle`.
- **`dot`**: индикатор слева.

[Badge.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Badge.md) · **Components → Badge**.

---

## Menu (выпадающее меню)

Составной API поверх **Popover** (портал, позиционирование, клик снаружи, Escape):

```tsx
import { Button, Menu, Text, themeToken } from "kovax-react";

<Menu.Root>
  <Menu.Trigger>
    <Button type="button" variant="outline">Аккаунт</Button>
  </Menu.Trigger>
  <Menu.Content placement="bottom-start">
    <Menu.Item onSelect={() => {}}>
      <Text size="sm">Профиль</Text>
    </Menu.Item>
    <Menu.Separator />
    <Menu.Item onSelect={() => {}}>
      <Text size="sm" style={{ color: themeToken("error.600") }}>
        Выйти
      </Text>
    </Menu.Item>
  </Menu.Content>
</Menu.Root>
```

- **`DropdownMenu`** — алиас **`Menu`**.
- Клавиатура: **↑** / **↓**, **Home** / **End**, **Enter** / **Space**; **Escape** закрывает.
- **`motion`**: анимация **`kv-menu-enter`** (можно **`false`**).
- **`sameWidth`**, контролируемый **`open`**, **`disabled`** у пунктов.
- Низкоуровнево: **`Popover.Content contentRole="menu"`** + **`ariaHasPopup="menu"`**; **`usePopoverRootContext`** для кастомных примитивов.

[Menu.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Menu.md) · [Overlays.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Overlays.md) · **Components → Menu**.

---

## Skeleton

```tsx
import { Skeleton, VStack, themeToken } from "kovax-react";

<VStack gap={themeToken("spacing.sm")} align="stretch" style={{ maxWidth: 280 }}>
  <Skeleton variant="pulse" width={200} height={16} />
  <Skeleton variant="shimmer" shape="rounded" width="100%" height={36} />
  <Skeleton shape="circle" width={40} height={40} />
  <Skeleton text />
  <Skeleton text style={{ width: "70%" }} />
</VStack>
```

- **`variant`**: `pulse` | `shimmer` | `none`.
- **`shape`**: `rectangle` | `rounded` | `circle`.
- **`text`**: высота по токену **`text.sm`**.
- Тайминги из **`duration.*` / `easing.*`** темы.

[Skeleton.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Skeleton.md) · **Components → Skeleton**.

---

## Pagination

Состояние страницы у родителя (**`page`**, **`pageCount`**, **`onPageChange`**):

```tsx
import { Pagination } from "kovax-react";
import { useState } from "react";

export function ResultsPager() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      pageCount={48}
      onPageChange={setPage}
      variant="outline"
      siblingCount={2}
      aria-label="Страницы результатов"
    />
  );
}
```

- **`nav`**, **`aria-current="page"`**, многоточие **`aria-hidden`**.
- **`variant`**, **`size`**, **`disabled`**, локализация **`previousAriaLabel`** / **`getPageAriaLabel`** и т.д.
- Анимации по токенам; **`prefers-reduced-motion`** отключает масштаб.
- **`getPaginationItems`** — та же логика окон для своих кнопок.

[Pagination.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Pagination.md) · **Components → Pagination**.

---

## useMediaQuery и брейкпоинты

Шкала в **`em`** (масштаб с корневым шрифтом): `sm` 30em, `md` 48em, `lg` 62em, `xl` 80em, `2xl` 96em.

| API | Назначение |
| --- | --- |
| **`useBreakpointUp("md")`** | viewport ≥ токена |
| **`useMediaQuery(query, options?)`** | произвольный media query |
| **`breakpointMinMediaQuery("md")`** | `"(min-width: 48em)"` |
| **`breakpointMinWidth("md")`** | `48em` |
| **`breakpointMinMediaQueryFromToken("breakpoint.md")`** | через путь токена |

```tsx
import { Grid, useBreakpointUp } from "kovax-react";

const threeCols = useBreakpointUp("lg", { defaultMatches: true });

return <Grid columns={threeCols ? 3 : 1} gap={16}>{children}</Grid>;
```

**`useMediaQuery`** на **`useSyncExternalStore`**; **`defaultMatches`** задаёт значение на SSR и до гидратации.

[Tokens.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Tokens.md) · **Components → Design tokens**.

---

## Изменения Popover

База для **Menu** и кастомных панелей:

- **`contentRole`**: `"dialog"` (по умолчанию) или `"menu"`.
- **`ariaHasPopup`** на триггере: `"dialog"` | `"menu"`.
- Экспорт **`usePopoverRootContext`**.
- При **`contentRole="menu"`**: фокус на первый **`menuitem`** при открытии; стрелки / Home / End между включёнными пунктами.

---

## Документация, playground, репозиторий

- **Markdown:** `Avatar`, `Badge`, `Menu`, `Skeleton`, `Pagination`; обновлены **Tokens**, **Overlays**, **GETTING_STARTED**.
- **Playground:** живые секции с **Preview / Code**; темы в Documentation; маршруты и SEO; строки **EN/RU** в `locales`.
- **`docs/blog/`** — черновики для Habr / DEV.to; локальные наброски в **`/blog/`** (в `.gitignore`, не в git).
- **README:** обложка **`docs/cover.webp`**, блок **What's new (v0.6.0)**.

Без установки: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/).

---

## Changelog и что дальше

Полный список в [CHANGELOG.md](https://github.com/MrKamura/kovax/blob/master/CHANGELOG.md).

В планах: **`Breadcrumb`**, развитие **Toast**, доработки оверлеев. Баги и идеи — **[issues](https://github.com/MrKamura/kovax/issues)** и PR.

---

## Поддержать

Библиотека **MIT**. Звезда на **[GitHub](https://github.com/MrKamura/kovax)** или [Boosty](https://boosty.to/mrkamura) / [CloudTips](https://pay.cloudtips.ru/p/d79814b0) — спасибо.
