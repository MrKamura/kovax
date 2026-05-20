# Tailwind CSS v4

Use **kovax-react** design tokens as Tailwind utilities (`bg-kx-primary-500`, `p-kx-md`, …) while keeping **ThemeProvider** light/dark reactivity.

Related: [Design system](./DESIGN_SYSTEM.md) · [Tokens](./components/Tokens.md) · [Getting started](./GETTING_STARTED.md)

## Install

```bash
npm install kovax-react tailwindcss @tailwindcss/vite
```

Peers: **React ^18 || ^19**. Tailwind **v4** (CSS-first `@import "tailwindcss"`).

## Setup

### 1. Import the preset

In your global CSS (e.g. `app/globals.css`):

```css
@import "tailwindcss";
@import "kovax-react/tailwind";
```

The preset is a generated `@theme inline` block that maps every Kovax `--kx-*` variable to Tailwind theme namespaces. **`inline`** is required so utilities resolve `var(--kx-…)` at the element — palette swaps from **ThemeProvider** work correctly.

### 2. Mount ThemeProvider

```tsx
"use client";

import { ThemeProvider } from "kovax-react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultColorMode="system">{children}</ThemeProvider>;
}
```

**ThemeProvider** injects `--kx-color-*`, `--kx-shadow-*`, and static `--kx-spacing-*` / typography vars. Tailwind classes read those same variables.

### 3. Use utilities

```tsx
<div className="bg-kx-primary-500 text-kx-base-white p-kx-md rounded-kx-md shadow-kx-sm">
  Themed with Kovax tokens
</div>

<p className="text-kx-secondary-600 text-kx-lg leading-kx-normal">
  Typography scale
</p>

<button className="transition duration-kx-fast ease-kx-standard hover:bg-kx-primary-600">
  Motion tokens
</button>
```

Mix with Kovax components:

```tsx
import { Button, Box } from "kovax-react";

<Box className="border border-kx-secondary-200 bg-kx-secondary-50 p-kx-lg">
  <Button variant="solid" color="primary">Submit</Button>
</Box>
```

## Utility namespaces

| Kovax CSS variable | Tailwind theme var | Example utilities |
| ------------------ | ------------------ | ----------------- |
| `--kx-color-{palette}-{shade}` | `--color-kx-{palette}-{shade}` | `bg-kx-primary-500`, `text-kx-error-600`, `border-kx-secondary-200` |
| `--kx-color-base-white` / `black` | `--color-kx-base-white` | `bg-kx-base-white`, `text-kx-base-black` |
| `--kx-text-{size}` | `--text-kx-{size}` | `text-kx-sm`, `text-kx-2xl` |
| `--kx-spacing-{size}` | `--spacing-kx-{size}` | `p-kx-md`, `gap-kx-lg`, `m-kx-sm` |
| `--kx-radius-{size}` | `--radius-kx-{size}` | `rounded-kx-md`, `rounded-kx-full` |
| `--kx-shadow-{key}` | `--shadow-kx-{key}` | `shadow-kx-md`, `shadow-kx-focusRing` |
| `--kx-font-weight-{key}` | `--font-weight-kx-{key}` | `font-kx-medium`, `font-kx-bold` |
| `--kx-line-height-{key}` | `--leading-kx-{key}` | `leading-kx-tight`, `leading-kx-normal` |
| `--kx-letter-spacing-{key}` | `--tracking-kx-{key}` | `tracking-kx-wide` |
| `--kx-duration-{key}` | `--transition-duration-kx-{key}` | `duration-kx-fast`, `duration-kx-normal` |
| `--kx-easing-{key}` | `--ease-kx-{key}` | `ease-kx-standard`, `ease-kx-decelerate` |
| (static) | `--breakpoint-kx-{key}` | `kx-md:flex`, `kx-lg:grid-cols-3` |

Palettes: **primary**, **secondary**, **success**, **warning**, **error** (shades **50–900**).

## Next.js App Router

Same **ThemeProvider** + FOUC script as [Next.js App Router](./NEXTJS_APP_ROUTER.md). Import the Tailwind preset in `app/globals.css`:

```css
@import "tailwindcss";
@import "kovax-react/tailwind";
```

Client layout wraps **ThemeProvider**; server components can use Tailwind classes on static markup — classes still resolve `--kx-*` after hydration when the provider mounts.

## Without ThemeProvider

Simple color/spacing utilities include hex/rem **fallbacks** in `var()` (same as `themeToken()`). **Shadow** and **easing** utilities reference `var(--kx-…)` only (no comma-safe fallback) — mount **ThemeProvider** or define those variables yourself.

## Regenerating the preset

The CSS file is built from token sources when you run `npm run build`:

```
dist/tailwind.css  ←  src/tailwind/generateTailwindTheme.ts
```

Do not edit `dist/tailwind.css` by hand.
