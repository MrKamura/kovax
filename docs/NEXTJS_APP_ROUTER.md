# Next.js App Router

How to use **kovax-react** with the [Next.js App Router](https://nextjs.org/docs/app) (React Server Components, `"use client"` boundaries, and theme without a flash of the wrong color mode).

Related: [Design system](./DESIGN_SYSTEM.md) · [Getting started](./GETTING_STARTED.md) · [Tokens](./components/Tokens.md)

## Install

```bash
npm install kovax-react
```

Peers: **React ^18 || ^19**. Optional **`react-day-picker`** when using date pickers.

## Entry points and Server Components

| Import | `"use client"` in bundle | Use in |
| ------ | ------------------------ | ------ |
| `kovax-react` | yes (root + most deep imports) | Client Components |
| `kovax-react/server` | no | Server Components — `Box`, `Stack`, `Container`, `Text`, `Heading` |
| `kovax-react/typography`, `/badge`, `/progress` | no | Server Components (full typography bundle or small widgets) |
| `kovax-react/tokens`, `/layout`, `/form`, … | yes | Client Components only |

Example — static shell on the server, interactive UI on the client:

```tsx
// app/page.tsx — Server Component
import { Container, Heading, Text } from "kovax-react/server";
import { SignInForm } from "./sign-in-form";

export default function Page() {
  return (
    <Container maxW="lg">
      <Heading level={1}>Welcome</Heading>
      <Text size="lg">Sign in to continue.</Text>
      <SignInForm />
    </Container>
  );
}
```

```tsx
// app/sign-in-form.tsx
"use client";

import { Button, FormControl, FormLabel, Input, VStack } from "kovax-react";

export function SignInForm() {
  return (
    <VStack gap={16} align="stretch">
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" type="email" />
      </FormControl>
      <Button type="submit" variant="solid" color="primary">
        Sign in
      </Button>
    </VStack>
  );
}
```

## Where to mount `ThemeProvider`

`ThemeProvider` uses React state, effects, and an injected `<style>` block — it **must** live in a Client Component.

Recommended layout:

```
app/
  layout.tsx          ← root layout (Server Component)
  providers.tsx       ← "use client" — ThemeProvider wrapper
  page.tsx
```

### 1. Client providers module

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "kovax-react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultColorMode="system">
      {children}
    </ThemeProvider>
  );
}
```

Use the same **`storageKey`** here as in the inline FOUC script below (default: `"kovax-color-mode"`). Pass **`nonce`** when your CSP requires it on injected styles:

```tsx
<ThemeProvider defaultColorMode="system" nonce={process.env.NEXT_PUBLIC_CSP_NONCE}>
```

### 2. Root layout

Wrap `{children}` once at the app root (or a route group layout if you scope theming to part of the app):

```tsx
// app/layout.tsx
import { Providers } from "./providers";
import { KovaxColorModeScript } from "./kovax-color-mode-script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <KovaxColorModeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

`suppressHydrationWarning` on `<html>` avoids React hydration warnings when the inline script sets `data-kovax-theme` before hydration (see below).

Mount **`ThemeProvider` only once** per themed tree. Nested providers are possible (e.g. Storybook or a modal subtree with `target`), but a single root provider matches most Next.js apps.

## Avoid FOUC in dark mode

Without an early script, the first paint may use light fallbacks until `ThemeProvider` hydrates and sets `data-kovax-theme` on `<html>`.

Kovax resolves the active palette with:

- **`data-kovax-theme="light"`** or **`"dark"`** on the theme target (default: `document.documentElement`)
- CSS injected by `ThemeProvider`: `:root { --kx-* … }` and `:root[data-kovax-theme="dark"] { … }`

The inline script mirrors `ThemeProvider` storage and **`system`** resolution so the correct `data-kovax-theme` is applied **before** the first paint.

### Inline script (blocking)

```tsx
// app/kovax-color-mode-script.tsx
const STORAGE_KEY = "kovax-color-mode";

const script = `(function(){try{var k=${JSON.stringify(STORAGE_KEY)};var m=localStorage.getItem(k);if(m!=="light"&&m!=="dark"&&m!=="system")m="system";var r=m;if(m==="system"){r=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-kovax-theme",r);}catch(e){}})();`;

export function KovaxColorModeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
```

Place it in `<head>` of the root layout (as above). The script:

1. Reads `localStorage` under **`kovax-color-mode`** (same default as `ThemeProvider` **`storageKey`**)
2. Accepts `"light"`, `"dark"`, or `"system"`
3. Resolves `"system"` with `prefers-color-scheme`
4. Sets **`document.documentElement.setAttribute("data-kovax-theme", resolved)`**

If you customize storage:

```tsx
<ThemeProvider storageKey="my-app-theme" … />
```

update **`STORAGE_KEY`** in the script to the same string.

### What the script does and does not do

| | Inline `data-kovax-theme` script | `ThemeProvider` |
| --- | --- | --- |
| Sets `data-kovax-theme` before paint | yes | after hydration |
| Injects `--kx-*` CSS variables | no | yes (`<style data-kovax-theme-style>`) |
| Persists user toggle | no (read-only) | yes (`localStorage`) |
| `useColorMode()` / `toggleColorMode` | no | yes |

The script removes the **wrong color-mode flash** on `<html>`. Full token values still come from `ThemeProvider` on mount; until then, components use **`themeToken()`** hex fallbacks (`var(--kx-…, #hex)`), so UI remains readable.

For **`defaultColorMode="system"`**, the first paint follows stored preference or OS dark mode once the script runs. SSR HTML still renders without knowing the user OS; the script runs in the browser before paint, which is the usual App Router pattern (same idea as `next-themes`).

### Strict CSP

If inline scripts are blocked, allow a hash for this snippet or serve an equivalent external file with `beforeInteractive` strategy. Keep **`ThemeProvider` `nonce`** in sync with your CSP for the injected theme stylesheet.

## Optional: date pickers

```bash
npm install react-day-picker
```

In a Client layout or provider file:

```tsx
import "react-day-picker/style.css";
```

See [Date picker](./components/DatePicker.md).

## Checklist

1. **`app/providers.tsx`** — `"use client"` + `<ThemeProvider>` at the root.
2. **`app/layout.tsx`** — wrap `{children}` with `<Providers>`.
3. **FOUC script** in `<head>` — sets `data-kovax-theme` from `localStorage` / `system`.
4. **`suppressHydrationWarning`** on `<html>`.
5. **Server pages** — import layout/typography from **`kovax-react/server`** (or other RSC-safe entries); keep hooks, overlays, and forms in Client Components from **`kovax-react`**.

## See also

- [Design system — ThemeProvider & color mode](./DESIGN_SYSTEM.md#theme-provider--color-mode)
- [Tokens — `themeToken` / CSS variables](./components/Tokens.md)
