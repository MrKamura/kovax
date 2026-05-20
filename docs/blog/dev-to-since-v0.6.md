---
title: "kovax-react 0.6 through 0.8: Avatar to Storybook — release roundup"
published: false
description: "Single roundup of kovax-react minor releases 0.6 (Avatar, Menu, Pagination), 0.7 (Next.js RSC, jest-axe), and 0.8 (Tailwind v4, FormField, ColorModeScript, Storybook)."
tags: react, typescript, opensource, design-system, tailwindcss, storybook
canonical_url: https://github.com/MrKamura/kovax
cover_image:
---

If you skipped the last three minors of **kovax-react**, here is one timeline from **0.6** (product UI) through **0.7** (Next.js / a11y) to **0.8** (Tailwind, forms, Storybook).

- 📦 Latest: [`kovax-react@0.8.0`](https://www.npmjs.com/package/kovax-react)
- 🧪 Playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)
- 📖 Storybook: [mrkamura.github.io/kovax/storybook](https://mrkamura.github.io/kovax/storybook/)

Per-version deep dives: [dev-to-v0.6.md](./dev-to-v0.6.md) · [dev-to-v0.7.md](./dev-to-v0.7.md) · [dev-to-v0.8.md](./dev-to-v0.8.md).

---

## Timeline

| Version | Focus |
| --- | --- |
| **0.6.0** | **Avatar**, **Badge**, **Menu**, **Skeleton**, **Pagination**, breakpoint hooks |
| **0.7.0** | **`kovax-react/server`**, **`"use client"`**, **jest-axe**, **size-limit**, Next.js guide |
| **0.8.0** | **Tailwind v4** preset, **FormField** adapters, **ColorModeScript**, **Storybook** |

---

## 0.6 — product UI layer

Five components + JS breakpoints aligned with design tokens:

```bash
npm install kovax-react@0.6.0
```

- Deep imports: **`/avatar`**, **`/badge`**, **`/menu`**, **`/skeleton`**, **`/pagination`**
- **`useBreakpointUp("md")`**, **`useMediaQuery`**
- **Popover** menu role and keyboard model for **Menu**

---

## 0.7 — production & App Router

```bash
npm install kovax-react@0.7.0
```

- **`kovax-react/server`** for Server Components
- **`"use client"`** on client bundles
- **`jest-axe`** in every component test
- **size-limit** + README bundle badges
- **`docs/NEXTJS_APP_ROUTER.md`**

---

## 0.8 — ecosystem integration

```bash
npm install kovax-react@0.8.0
```

```css
@import "tailwindcss";
@import "kovax-react/tailwind";
```

- **`FormField`** for **react-hook-form** and **TanStack Form**
- **`ColorModeScript`** — no theme FOUC
- **Storybook** at **`/storybook`** with autoDocs and a11y

---

## Entry map (0.8)

| Import | Role |
| --- | --- |
| **`kovax-react`** | Full client API |
| **`kovax-react/server`** | RSC layout + ColorModeScript |
| **`kovax-react/tailwind`** | Tailwind v4 CSS preset |
| **`kovax-react/react-hook-form`** | FormField adapter |
| **`kovax-react/tanstack-form`** | FormField adapter |
| **`kovax-react/avatar`** … **`/pagination`** | Tree-shaken slices |

---

## Docs & changelog

- [CHANGELOG.md](https://github.com/MrKamura/kovax/blob/master/CHANGELOG.md)
- [TAILWIND.md](https://github.com/MrKamura/kovax/blob/master/docs/TAILWIND.md)
- [NEXTJS_APP_ROUTER.md](https://github.com/MrKamura/kovax/blob/master/docs/NEXTJS_APP_ROUTER.md)

Issues welcome on **[GitHub](https://github.com/MrKamura/kovax)**.
