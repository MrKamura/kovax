---
title: "kovax-react 0.8: Tailwind v4 preset, FormField adapters, ColorModeScript, and Storybook"
published: false
description: "kovax-react 0.8 on npm — kovax-react/tailwind @theme inline utilities, react-hook-form and TanStack Form FormField adapters, Chakra-style ColorModeScript, Storybook with autoDocs and a11y at /storybook."
tags: react, typescript, tailwindcss, forms, storybook, opensource, design-system
canonical_url: https://github.com/MrKamura/kovax
cover_image:
---

**kovax-react 0.8.0** is on npm. This release connects Kovax to the wider ecosystem: **Tailwind CSS v4** utilities backed by **`--kx-*` tokens**, **thin form adapters** for popular libraries, a **FOUC guard** for theme mode, and a **Storybook** catalog beside the existing playground.

- 📦 npm: [`kovax-react@0.8.0`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Repo: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)
- 📖 Storybook: [mrkamura.github.io/kovax/storybook](https://mrkamura.github.io/kovax/storybook/)

---

## TL;DR — everything since 0.7.0

| Area | What shipped |
| --- | --- |
| **Tailwind v4** | **`kovax-react/tailwind`** — generated **`@theme inline`** preset; `bg-kx-primary-500`, `p-kx-md`, `rounded-kx-md`, … |
| **Forms** | **`kovax-react/react-hook-form`**, **`kovax-react/tanstack-form`** — **`FormField`**, **`FormFieldError`**, ref/value injection |
| **Theme / FOUC** | **`ColorModeScript`** (Chakra-style), **`buildColorModeInitScript`**, shared **`KOVAX_*`** constants |
| **Storybook** | autoDocs, **`@storybook/addon-a11y`**, Visual Tests; deployed to **`/storybook`** on GitHub Pages |
| **Docs** | **`TAILWIND.md`**, updated **`Form.md`**, **`QUICK_START.md`**, **`RELEASES.md`** |

```bash
npm install kovax-react@0.8.0
```

Optional peers: **`react-hook-form`**, **`@tanstack/react-form`**, **Tailwind v4**.

---

## Tailwind v4 — theme-reactive utilities

Kovax components already use **`ThemeProvider`** and **`var(--kx-…)`**. **0.8** exports a Tailwind v4 preset so utility classes read the same variables:

```css
@import "tailwindcss";
@import "kovax-react/tailwind";
```

```tsx
<div className="bg-kx-primary-500 text-kx-base-white p-kx-md rounded-kx-md shadow-kx-sm">
  Kovax tokens in Tailwind
</div>
```

**Why `@theme inline`:** utilities resolve **`var(--kx-…)`** at use-site — light/dark palette swaps from **ThemeProvider** stay reactive.

| Kovax token | Example utility |
| --- | --- |
| `--kx-color-primary-500` | `bg-kx-primary-500` |
| `--kx-spacing-md` | `p-kx-md`, `gap-kx-lg` |
| `--kx-radius-md` | `rounded-kx-md` |
| `--kx-text-lg` | `text-kx-lg` |

Mix with Kovax components:

```tsx
import { Button, Box } from "kovax-react";

<Box className="border border-kx-secondary-200 bg-kx-secondary-50 p-kx-lg">
  <Button variant="solid" color="primary">Submit</Button>
</Box>
```

Guide: [TAILWIND.md](https://github.com/MrKamura/kovax/blob/master/docs/TAILWIND.md).

---

## FormField adapters

**`FormControl`** context ( **`isInvalid`**, **`isRequired`**, **`isDisabled`** ) now wires automatically from form libraries.

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
        <Button type="submit">Sign in</Button>
      </VStack>
    </form>
  );
}
```

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
          <FormLabel>Name</FormLabel>
          <Input />
          <FormFieldError />
        </FormControl>
      </FormField>
    </VStack>
  );
}
```

Peers are optional — install only the adapter you need.

Docs: [Form.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Form.md).

---

## ColorModeScript — no theme flash

Blocking inline script in **`<head>`** sets **`data-kovax-theme`** before first paint (localStorage + `prefers-color-scheme`).

```tsx
// app/layout.tsx — Next.js App Router
import { ColorModeScript } from "kovax-react/server";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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

Use the same **`storageKey`** / **`defaultColorMode`** on script and provider.

Plain HTML: **`buildColorModeScriptTag()`** from **`kovax-react/server`**.

---

## Storybook alongside the playground

| Site | URL |
| --- | --- |
| Playground (docs + live demos, EN/RU) | [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/) |
| Storybook (autoDocs, a11y, visual tests) | [mrkamura.github.io/kovax/storybook](https://mrkamura.github.io/kovax/storybook/) |

```bash
npm run dev:storybook
npm run build:storybook
```

- **autoDocs** — props tables from TypeScript (`tags: ['autodocs']`).
- **`@storybook/addon-a11y`** — axe in the Accessibility panel.
- **`@chromatic-com/storybook`** — Visual Tests (connect a Chromatic project for baselines).

Stories resolve library **source** via Vite aliases — no root **`npm run build`** required for local dev.

---

## Recap: 0.6 and 0.7

| Version | Highlights |
| --- | --- |
| **0.6** | **Avatar**, **Badge**, **Menu**, **Skeleton**, **Pagination**, **useBreakpointUp** |
| **0.7** | **`kovax-react/server`**, **`"use client"`**, **jest-axe**, **size-limit**, **NEXTJS_APP_ROUTER.md** |

Drafts: [dev-to-v0.6.md](./dev-to-v0.6.md), [dev-to-v0.7.md](./dev-to-v0.7.md).

---

## Changelog

[CHANGELOG.md](https://github.com/MrKamura/kovax/blob/master/CHANGELOG.md) · playground **Releases** tab.

Issues and PRs on **[GitHub](https://github.com/MrKamura/kovax)** — thanks for reading.
