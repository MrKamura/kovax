# Quick start

Minimal setup for **kovax-react** in a React app and in **Next.js App Router**. For full guides see [Getting started](./GETTING_STARTED.md) and [Next.js App Router](./NEXTJS_APP_ROUTER.md).

## Install

```bash
npm install kovax-react
```

Peers (install if missing):

```bash
npm install react react-dom
```

Supported: **React and React DOM ^18 || ^19**.

Optional for date pickers:

```bash
npm install react-day-picker
```

---

## React (Vite, CRA, Remix, etc.)

### 1. Import components

```tsx
import { Box, Button, Input, VStack } from "kovax-react";
```

Design tokens:

```tsx
import { colors, themeToken } from "kovax-react";
// or tree-shaken entry:
import { themeToken } from "kovax-react/tokens";
```

### 2. First screen

```tsx
import { Box, Button, Heading, VStack } from "kovax-react";

export function App() {
  return (
    <Box as="main" p={24}>
      <VStack gap={16} align="stretch" maxW="sm">
        <Heading level={1}>Hello Kovax</Heading>
        <Button variant="solid" color="primary">
          Get started
        </Button>
      </VStack>
    </Box>
  );
}
```

### 3. Theme (optional)

Mount **`ThemeProvider`** once near the root for CSS variables (`--kx-*`), light/dark mode, and **`useColorMode()`**:

```tsx
import { ThemeProvider } from "kovax-react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultColorMode="system">
      {children}
    </ThemeProvider>
  );
}
```

Without a provider, components still render using hex fallbacks from **`themeToken()`**.

### 4. Tree-shaken imports

| Entry | Use for |
| ----- | ------- |
| `kovax-react/button` | `Button` only |
| `kovax-react/layout` | `Box`, `Stack`, `Container`, … |
| `kovax-react/form` | Form primitives + context |
| `kovax-react/overlays` | Tooltip, Popover, Modal, … |

See the [component index](./README.md) and [README on GitHub](https://github.com/MrKamura/kovax#entry-points) for all entry points and bundle sizes.

---

## Next.js App Router

### 1. Install

Same as above — **`npm install kovax-react`** plus React peers.

### 2. Server vs client imports

| Import | `"use client"` in bundle | Use in |
| ------ | ------------------------ | ------ |
| `kovax-react` | yes | Client Components |
| `kovax-react/server` | no | Server Components — `Box`, `Stack`, `Container`, `Text`, `Heading` |
| `kovax-react/typography`, `/badge`, `/progress` | no | Server Components |
| `kovax-react/tokens`, `/layout`, `/form`, … | yes | Client Components only |

**Server page** — static shell:

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

**Client island** — forms, hooks, overlays:

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

### 3. Root layout + ThemeProvider

`ThemeProvider` must live in a Client Component:

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

```tsx
// app/layout.tsx
import { ColorModeScript } from "kovax-react/server";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorModeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 4. Avoid dark-mode flash (FOUC)

Use **`ColorModeScript`** in `<head>` (RSC-safe — import from **`kovax-react/server`**). It sets **`data-kovax-theme`** before first paint using the same **`localStorage`** key as **`ThemeProvider`** (default `"kovax-color-mode"`):

```tsx
import { ColorModeScript } from "kovax-react/server";

<ColorModeScript />
// must match ThemeProvider when customized:
<ColorModeScript storageKey="my-app-theme" defaultColorMode="system" nonce={cspNonce} />
```

Non-React: **`buildColorModeScriptTag()`** from **`kovax-react/server`** returns a full `<script>…</script>` string.

Full checklist, CSP notes, and date-picker CSS: [Next.js App Router](./NEXTJS_APP_ROUTER.md).

---

## Next steps

- [Tailwind CSS v4](./TAILWIND.md) — `bg-kx-primary-500`, theme-reactive utilities
- [Design system / tokens](./DESIGN_SYSTEM.md)
- [Component index](./README.md)
- [Release history](./RELEASES.md) — version changelog on this site
