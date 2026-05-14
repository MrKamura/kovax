---
title: "Meet kovax-react: a typed React UI library with CSS-variable theming"
published: false
description: "A small but complete React component library with typed design tokens, ThemeProvider + dark mode, and deep imports per component. v0.5 ships ThemeProvider, Avatar, and Badge."
tags: react, typescript, opensource, ui
canonical_url: https://github.com/MrKamura/kovax
cover_image:
---

I just shipped **kovax-react 0.5** — a small, typed React UI library aimed at apps that want **layout primitives + forms + overlays + tables + design tokens** without dragging in a framework. This post is a quick tour: what's inside, what's new, and how to try it in 60 seconds.

- 📦 npm: [`kovax-react`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Repo: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Live docs & playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)

---

## TL;DR

- **Typed design tokens** (`themeToken`, `colorToken`) for colors, spacing, radii, typography, shadows, motion, z-index, breakpoints.
- **`ThemeProvider`** injects CSS variables (`--kx-*`), supports **light / dark / system** color modes, scoped subtrees, **palette overrides**, and **CSP `nonce`** — SSR-safe with hex fallbacks.
- **30+ components**: `Box`, `Flex`, `Grid`, `Stack`, `Heading`, `Text`, `Button`, `Input`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Select` / `useCombobox`, `FormControl`, `Tabs`, `Accordion`, `Alert`, `Progress`, `Tooltip`, `Popover`, `Dialog`, `Modal`, `Toast`, `DatePicker`, `Table` / `DataTable`, and now **`Avatar`** + **`Badge`**.
- **Deep imports** for smaller bundles: `kovax-react/layout`, `/form`, `/overlays`, `/table`, `/badge`, `/avatar`, …
- **React 16+** peer; `react-day-picker` only when you use date pickers.
- **MIT-licensed**, written in TypeScript, tested with Jest.

## Install

```bash
npm install kovax-react
# only if you use the date pickers
npm install react-day-picker
```

## Theming in 6 lines

Wrap your app once, and everything reads from CSS variables:

```tsx
import { ThemeProvider, Button, themeToken } from "kovax-react";

export function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      <Button color="primary" style={{ marginTop: themeToken("spacing.md") }}>
        Hello, kovax
      </Button>
    </ThemeProvider>
  );
}
```

Switching modes is instant — components consume **`var(--kx-…, fallback)`** under the hood, so SSR has no flash and "no provider" still renders with the original palette.

Need a brand palette? Override per side, the rest is inherited:

```tsx
import { ThemeProvider, lightPalette } from "kovax-react";

const brandPrimary = {
  50: "#f5f3ff",  100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd",
  400: "#a78bfa", 500: "#7c3aed", 600: "#6d28d9", 700: "#5b21b6",
  800: "#4c1d95", 900: "#3b0a76",
};

<ThemeProvider
  palettes={{ light: { colors: { ...lightPalette.colors, primary: brandPrimary } } }}
/>
```

You can also scope a `ThemeProvider` to a ref — render a dark widget inside an otherwise light page (or vice-versa) without forking components.

## New in 0.5

### `ThemeProvider` + dark mode
- `colorMode`: `light | dark | system`
- `useColorMode()` and `useTheme()` hooks
- `target`: `documentElement` or a `RefObject` for scoped theming
- `palettes` per side, `storageKey` persistence, `onColorModeChange` callback
- `nonce` for strict CSP

### `Avatar`
Photo, **initials from `name`**, or a custom **`fallback`** (icon, emoji, anything). Sizes `xs–xl`, `circle` / `rounded`, semantic fallback `colorScheme`. Robust to broken image URLs (auto fallback on `onError`).

```tsx
import { Avatar, HStack } from "kovax-react";

<HStack gap={12}>
  <Avatar name="Jane Doe" />               {/* → "JD" */}
  <Avatar src="/jane.jpg" alt="Jane Doe" name="Jane Doe" size="lg" />
  <Avatar name="Live" colorScheme="success" />
</HStack>
```

### `Badge`
Compact status / count pill. Variants `solid / outline / subtle`, semantic colors, optional **leading dot**, sizes `sm / md`.

```tsx
import { Badge, HStack } from "kovax-react";

<HStack gap={8}>
  <Badge dot color="success">Live</Badge>
  <Badge color="primary" variant="outline">Pro</Badge>
  <Badge color="neutral" size="sm">12</Badge>
</HStack>
```

## What I actually use it for

- **Layout primitives** (`Box`, `HStack`, `VStack`, `Grid`, `Container`, `Sticky`) keep markup boring and consistent.
- **Forms** (`FormControl`, `Input`, `Textarea`, `Select`, `useCombobox`, `Switch`, `Checkbox`, `Radio`) play nice with `react-hook-form` (used in the playground demos, but **not** a library dep).
- **Overlays** (`Tooltip`, `Popover`, `Dialog`, `Modal`, `Toast`) cover most app needs without a separate floating-ui setup.
- **Tables** — `Table.*` primitives plus a `DataTable` with controlled sort and row headers.

## Try it without installing

The [live playground](https://mrkamura.github.io/kovax/) is statically prerendered (so SEO works) and includes **Preview / Code** tabs per example, EN/RU UI, and the same Markdown docs from the repo. Sections to peek at:

- **Components → ThemeProvider** — color modes, scoped themes, brand palette overrides
- **Components → Avatar / Badge** — the new bits
- **Components → Table** — `DataTable` + sortable columns
- **Components → Design tokens** — every palette / spacing / radius / shadow / motion / z-index / breakpoint, live

## What's next

Likely candidates for 0.6: a richer `Skeleton`, `Breadcrumb`, `Pagination`, a `Menu` built on the same Popover primitives, and a small `useMediaQuery` exposing the design tokens' breakpoints.

If you find something missing, file an issue or PR on **[GitHub](https://github.com/MrKamura/kovax)** — or just leave a comment here, I read them all.

Thanks for reading 🙏 — happy to answer questions in the comments.
