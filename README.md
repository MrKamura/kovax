# Kovax UI

React component library focused on layout primitives, forms, and typed design tokens.

![npm](https://img.shields.io/npm/v/kovax-react?color=3b82f6&label=version)
![license](https://img.shields.io/npm/l/kovax-react?color=green)
![React](https://img.shields.io/badge/React-16%2B-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178c6)

## Overview

- **Layout:** `Box`, `Flex`, `Grid`, `Stack` / `HStack` / `VStack`, `Center`, `Container`, `AspectRatio`, `Separator`, `Bleed`, `VisuallyHidden`, `Sticky`
- **Forms:** `FormControl`, `FormLabel`, `FormError`, `FormHelperText`, `FormGroup`, `Input`
- **Actions:** `Button`
- **Theming:** exported `colors`, `sizes`, `shadows`, `transitions` and related types from [`docs/components/Tokens.md`](./docs/components/Tokens.md)

Public API is re-exported from the package root (`kovax-react`). See [`docs/README.md`](./docs/README.md) for links to each component.

## Requirements

- `react` and `react-dom` **\>=16 \<20** (peer dependencies)

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
} from "kovax-react";

export function SignInExample() {
  return (
    <Box
      p={32}
      backgroundColor="#f8f9fa"
      borderRadius={16}
      maxW={480}
      m="40px auto"
      boxShadow="0 4px 6px rgba(0,0,0,0.1)"
    >
      <VStack gap={24} align="stretch">
        <Box as="h2" style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
          Sign in
        </Box>

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

`Box` supports `forwardRef` and forwards native attributes while spacing props are turned into CSS. `Button` and `Input` also support `ref` on their underlying DOM nodes.

## Features

- TypeScript-first props, including polymorphic `Box` with the `as` prop
- Spacing scale aligned with `SpacingProps` (`m`, `p`, `w`, flex, grid, and more)
- Jest tests for components under `src/components/**/__tests__`

## Tech stack

- React 18 in development; library targets React 16+ via peers
- TypeScript 5, **tsup** for builds

## Documentation

| Topic | Link |
| ----- | ---- |
| Index | [docs/README.md](./docs/README.md) |
| Getting started | [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) |
| Design tokens | [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) |

## Scripts (contributors)

```bash
npm install
npm run build      # library bundle
npm test           # Jest
npm run type-check # tsc --noEmit
```

## Contributing

Fork the repository, create a branch, open a pull request. Changes are expected to pass `npm test` and `npm run type-check`.

## License

[MIT](./LICENSE)
