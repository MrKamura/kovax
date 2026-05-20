# kovax-react 0.8 — Tailwind v4, FormField, ColorModeScript и Storybook

> **TL;DR:** на npm вышел **kovax-react 0.8.0** — пресет **Tailwind CSS v4** (`kovax-react/tailwind`), адаптеры **`FormField`** для **react-hook-form** и **TanStack Form**, **`ColorModeScript`** против FOUC, **Storybook** с autoDocs и a11y на [mrkamura.github.io/kovax/storybook](https://mrkamura.github.io/kovax/storybook/). MIT, React 18+.

**Ссылки:**

- 📦 npm: [`kovax-react@0.8.0`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Репозиторий: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)
- 📖 Storybook: [mrkamura.github.io/kovax/storybook](https://mrkamura.github.io/kovax/storybook/)

---

## Сводная таблица

| Область | Что появилось |
| --- | --- |
| **Tailwind v4** | **`kovax-react/tailwind`** — `@theme inline`, утилиты `bg-kx-primary-500`, `p-kx-md`, … |
| **Формы** | **`kovax-react/react-hook-form`**, **`kovax-react/tanstack-form`** — **`FormField`**, **`FormFieldError`** |
| **Тема / FOUC** | **`ColorModeScript`**, **`buildColorModeInitScript`**, константы **`KOVAX_*`** |
| **Storybook** | autoDocs, **`@storybook/addon-a11y`**, Visual Tests; деплой **`/storybook`** |
| **Документация** | **`TAILWIND.md`**, **`Form.md`**, **`QUICK_START.md`**, **`RELEASES.md`** |

```bash
npm install kovax-react@0.8.0
# опционально:
npm install react-hook-form          # для kovax-react/react-hook-form
npm install @tanstack/react-form     # для kovax-react/tanstack-form
npm install tailwindcss @tailwindcss/vite  # для Tailwind v4
```

---

## Tailwind CSS v4 и kovax-react/tailwind

Kovax уже живёт на **`--kx-*`** CSS-переменных через **`ThemeProvider`**. В **0.8** появился сгенерированный пресет для **Tailwind v4**:

```css
/* app/globals.css */
@import "tailwindcss";
@import "kovax-react/tailwind";
```

```tsx
<div className="bg-kx-primary-500 text-kx-base-white p-kx-md rounded-kx-md shadow-kx-sm">
  Токены Kovax в Tailwind
</div>
```

**Почему `@theme inline`:** утилиты резолвят **`var(--kx-…)`** на элементе — смена light/dark в **`ThemeProvider`** остаётся реактивной (в отличие от «запечённых» hex в `@theme`).

| CSS-переменная Kovax | Пример utility |
| --- | --- |
| `--kx-color-primary-500` | `bg-kx-primary-500`, `text-kx-primary-600` |
| `--kx-spacing-md` | `p-kx-md`, `gap-kx-lg` |
| `--kx-radius-md` | `rounded-kx-md` |
| `--kx-shadow-sm` | `shadow-kx-sm` |

Генератор: **`src/tailwind/generateTailwindTheme.ts`** → **`dist/tailwind.css`** при **`npm run build`**.

Подробно: [TAILWIND.md](https://github.com/MrKamura/kovax/blob/master/docs/TAILWIND.md).

---

## FormField — react-hook-form и TanStack Form

Раньше **`FormControl`** + **`Input`** + **`useController`** нужно было склеивать вручную. **0.8** даёт тонкие адаптеры с тем же контекстом **`FormControlContext`**.

### react-hook-form

```tsx
import { useForm } from "react-hook-form";
import { FormField, FormFieldError } from "kovax-react/react-hook-form";
import { FormControl, FormLabel, Input, Button, VStack } from "kovax-react";

type Values = { email: string };

export function SignIn() {
  const { control, handleSubmit } = useForm<Values>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <VStack gap={16} align="stretch">
        <FormField control={control} name="email" rules={{ required: true }}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" />
            <FormFieldError />
          </FormControl>
        </FormField>
        <Button type="submit">Войти</Button>
      </VStack>
    </form>
  );
}
```

**`FormField`** прокидывает **`ref`**, **`value`**, **`onChange`**, **`onBlur`**, **`name`**, **`isInvalid`** в **`FormControl`**.

### TanStack Form

```tsx
import { useForm } from "@tanstack/react-form";
import { FormField, FormFieldError } from "kovax-react/tanstack-form";
import { FormControl, FormLabel, Input, VStack } from "kovax-react";

export function ProfileForm() {
  const form = useForm({ defaultValues: { name: "" } });

  return (
    <VStack gap={16} align="stretch">
      <FormField form={form} name="name">
        <FormControl>
          <FormLabel>Имя</FormLabel>
          <Input />
          <FormFieldError />
        </FormControl>
      </FormField>
    </VStack>
  );
}
```

Peers опциональны — ставите только нужный адаптер.

Док: [Form.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Form.md).

---

## ColorModeScript — без FOUC тёмной темы

Как **`ColorModeScript`** у Chakra: blocking inline script в **`<head>`** выставляет **`data-kovax-theme`** до первой отрисовки.

```tsx
// app/layout.tsx — Next.js App Router
import { ColorModeScript } from "kovax-react/server";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ColorModeScript storageKey="kovax-color-mode" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/providers.tsx
"use client";
import { ThemeProvider } from "kovax-react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider storageKey="kovax-color-mode" defaultColorMode="system">
      {children}
    </ThemeProvider>
  );
}
```

**`storageKey`** и **`defaultColorMode`** должны совпадать с **`ThemeProvider`**.

Без React — **`buildColorModeScriptTag()`** / **`buildColorModeInitScript()`** из **`kovax-react/server`**.

---

## Storybook рядом с playground

Параллельно Vite-playground запущен **Storybook 10**:

| Сайт | URL |
| --- | --- |
| Playground (доки + демо, EN/RU) | [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/) |
| Storybook (autoDocs, a11y) | [mrkamura.github.io/kovax/storybook](https://mrkamura.github.io/kovax/storybook/) |

```bash
npm run dev:storybook    # localhost:6006
npm run build:storybook
```

- **autoDocs** — props-таблицы из TypeScript (`tags: ['autodocs']`).
- **`@storybook/addon-a11y`** — axe в панели Accessibility.
- **`@chromatic-com/storybook`** — Visual Tests (Chromatic).

Stories импортируют исходники библиотеки через Vite alias — **`npm run build`** корня для локальной разработки не обязателен.

---

## Что было в 0.6 и 0.7 (кратко)

Если вы пропустили предыдущие миноры:

| Версия | Главное |
| --- | --- |
| **0.6** | **`Avatar`**, **`Badge`**, **`Menu`**, **`Skeleton`**, **`Pagination`**, **`useBreakpointUp`** |
| **0.7** | **`kovax-react/server`**, **`"use client"`**, **jest-axe**, **size-limit**, **NEXTJS_APP_ROUTER.md** |

Черновики: [habr-v0.6.md](./habr-v0.6.md), [habr-v0.7.md](./habr-v0.7.md).

---

## Changelog

[CHANGELOG.md](https://github.com/MrKamura/kovax/blob/master/CHANGELOG.md) · playground **Releases** · **`docs/RELEASES.md`**.

Баги и идеи — **[issues](https://github.com/MrKamura/kovax/issues)**.

---

## Поддержать

**MIT**. Звезда на **[GitHub](https://github.com/MrKamura/kovax)** или [Boosty](https://boosty.to/mrkamura) / [CloudTips](https://pay.cloudtips.ru/p/d79814b0).
