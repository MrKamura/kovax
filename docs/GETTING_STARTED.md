# Getting started

See also: [Quick start](./QUICK_START.md) — condensed React & Next.js setup on the playground.

## Install

```bash
npm install kovax-react
```

Install peers if they are not already in your app:

```bash
npm install react react-dom
```

Supported range: **React and React DOM ^18 || ^19** (see `peerDependencies` in `package.json`).

## Import

ESM and CJS builds are published from the package `exports` field. Typical import:

```tsx
import { Box, Button, Input, VStack } from "kovax-react";
```

Design tokens (objects and the string helper `themeToken`):

```tsx
import { colors, sizes, themeToken } from "kovax-react";
```

## Compose with `Box`

Spacing and layout props are documented on [`Box`](./components/Layout/Box.md). Unknown props are passed to the underlying DOM element (for example `data-*`, `aria-*`, `id`, `onClick`).

Use `ref` when you need the native element (focus, measurements):

```tsx
import { useRef } from "react";
import { Box } from "kovax-react";

const ref = useRef<HTMLDivElement>(null);
return (
  <Box ref={ref} as="div" p={16}>
    Content
  </Box>
);
```

## Next steps

- [Design system / tokens](./DESIGN_SYSTEM.md)
- [Next.js App Router](./NEXTJS_APP_ROUTER.md)
- [Component index](./README.md)
