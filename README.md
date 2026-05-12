# Kovax UI

React component library focused on layout primitives, typography, forms, and typed design tokens.

![npm](https://img.shields.io/npm/v/kovax-react?color=3b82f6&label=version)
![license](https://img.shields.io/npm/l/kovax-react?color=green)
![React](https://img.shields.io/badge/React-16%2B-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178c6)

## Live documentation & demos

Browse **interactive examples** and the same **Markdown documentation** as in this repo (props tables, guides):

**[https://mrkamura.github.io/kovax/](https://mrkamura.github.io/kovax/)**

The playground loads components from source via the `kovax-react` workspace alias; GitHub Pages builds are produced by the repo workflow on push to `master` / `main`.

## Overview

| Area | Components / APIs |
| ---- | ----------------- |
| **Layout** | `Box`, `Flex`, `Grid`, `Stack` / `HStack` / `VStack`, `Center`, `Container`, `AspectRatio`, `Separator`, `Bleed`, `VisuallyHidden`, `Sticky` |
| **Typography** | `Text`, `Heading`, `Link`, `Code`, `Kbd`, `Blockquote`, `List`, `ListItem` |
| **Forms** | `FormControl`, `FormLabel`, `FormError`, `FormHelperText`, `FormGroup`, `Input` |
| **Actions** | `Button` |
| **Theming** | `colors`, `sizes`, `shadows`, `transitions`, `baseColors`, `themeToken`, `colorToken`, and related TypeScript types — see [Tokens](./docs/components/Tokens.md) |

Everything above is exported from the package root:

```ts
import { Box, Text, Button, themeToken } from "kovax-react";
```

### Optional entry points (deep imports)

Smaller bundles when you only need a slice of the library:

| Import path | Contents |
| ----------- | -------- |
| `kovax-react` | Full public API |
| `kovax-react/layout` | Layout primitives |
| `kovax-react/typography` | Typography primitives |
| `kovax-react/button` | `Button` |
| `kovax-react/input` | `Input` |
| `kovax-react/form` | Form helpers |
| `kovax-react/tokens` | Tokens + `themeToken` / `colorToken` |

## What’s new (v0.2+)

- **Typography** — semantic text primitives with token-backed sizing (`sizes.text`) and shared spacing props where applicable.
- **`themeToken`** — single string helper for palette colors, `text.*`, `spacing.*`, `borderRadius.*`, `shadow.*`, `transition.*` (see [Tokens](./docs/components/Tokens.md)).
- **Live site** — playground + docs at [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/) (EN/RU UI chrome for examples; demo copy stays English).
- **Docs** — Markdown under [`docs/`](./docs/README.md), including [Typography](./docs/components/Typography/Text.md) and updated guides.

## Requirements

- `react` and `react-dom` **≥16 &lt;20** (peer dependencies)

## Installation

```bash
npm install kovax-react
```

```bash
yarn add kovax-react
```

## Usage

```tsx
import {
  Box,
  VStack,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  themeToken,
} from "kovax-react";

export function SignInExample() {
  return (
    <Box
      p={32}
      backgroundColor={themeToken("secondary.50")}
      borderRadius={themeToken("borderRadius.md")}
      maxW={480}
      m="40px auto"
      boxShadow={themeToken("shadow.md")}
    >
      <VStack gap={24} align="stretch">
        <Text size="lg" fontWeight={600}>
          Sign in
        </Text>

        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" placeholder="you@example.com" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" placeholder="Password" />
        </FormControl>

        <HStack justify="flex-end" gap={12}>
          <Button variant="outline">Cancel</Button>
          <Button variant="solid" color="primary">
            Log in
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
```

`Box` supports `forwardRef` and forwards native attributes while spacing props are turned into CSS. `Button`, `Input`, and `Text` support `ref` on their underlying DOM nodes.

## Features

- TypeScript-first props, including polymorphic `Box` with the `as` prop
- Spacing scale via `SpacingProps` (`m`, `p`, `w`, flex, grid, and more) on layout and several other primitives
- Jest tests under `src/components/**/__tests__`

## Tech stack

- React 18 in development; library targets React 16+ via peers
- TypeScript 5, **tsup** for library builds
- **Vite** + **react-markdown** for the optional playground app (`apps/playground`)

## Documentation

| Topic | Link |
| ----- | ---- |
| **Live docs & demos** | **[https://mrkamura.github.io/kovax/](https://mrkamura.github.io/kovax/)** |
| Component index | [docs/README.md](./docs/README.md) |
| Getting started | [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) |
| Design system / tokens | [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) |
| Tokens reference | [docs/components/Tokens.md](./docs/components/Tokens.md) |

On **npm**, relative links in this file resolve against the [GitHub repository](https://github.com/MrKamura/kovax) when viewing the package readme.

## Scripts (contributors)

```bash
npm install
npm run build              # library bundle → dist/
npm test                   # Jest
npm run type-check         # tsc --noEmit
npm run dev:playground     # Vite dev server for apps/playground
npm run build:playground   # production build of the playground
```

Automation (maintainers): pushing a version tag `v*` publishes to npm if `NPM_TOKEN` is configured; pushes to `master`/`main` can deploy the playground to GitHub Pages (see `.github/workflows/`).

## Contributing

Fork the repository, create a branch, open a pull request. Changes are expected to pass `npm test` and `npm run type-check`.

## License

[MIT](./LICENSE)
