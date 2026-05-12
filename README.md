# Kovax UI

React component library focused on layout primitives, typography, forms, data tables, and typed design tokens.

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
| **Forms** | `FormControl`, `FormLabel`, `FormError`, `FormHelperText`, `FormGroup`, `FormControlContext`, `useFormControlContext`, `Input`, **`Textarea`**, `InputGroup`, `InputGroupContext`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Select`, `useCombobox`, `VirtualizedListbox`, **`DatePicker`**, **`DateRangePicker`** ( **`variant="date"`** · **`"datetime"`** ) |
| **Tables** | **`Table`** (`Table.Root`, caption, `Thead` / `Tbody` / `Tfoot`, `Tr`, `Th`, `Td`), **`DataTable`**, **`cycleSort`**, **`resolveDataCell`** |
| **Overlays** | `Tooltip`, **`Popover`** / **`Dropdown`**, compound `Dialog`, structured `Modal`, `ToastProvider`, `useToast` |
| **Navigation / disclosure** | **`Tabs`** (`Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`), **`Collapsible`** / **`Accordion`** (`Collapsible.Root` … `Accordion.Content`) |
| **Feedback / inline status** | **`Alert`** (`tone`, optional dismiss, live region), **`LinearProgress`** / **`CircularProgress`** (determinate & indeterminate) |
| **Actions** | `Button`, `IconButton`, `ButtonGroup` |
| **Theming** | `colors`, `sizes`, `shadows`, `transitions`, `baseColors`, `themeToken`, `colorToken`, and related TypeScript types — see [Tokens](./docs/components/Tokens.md) |

Everything above is exported from the package root:

```ts
import {
  Box,
  Text,
  Button,
  IconButton,
  Input,
  Textarea,
  FormControl,
  themeToken,
} from "kovax-react";
```

### Optional entry points (deep imports)

Smaller bundles when you only need a slice of the library:

| Import path | Contents |
| ----------- | -------- |
| `kovax-react` | Full public API |
| `kovax-react/layout` | Layout primitives |
| `kovax-react/typography` | Typography primitives |
| `kovax-react/button` | `Button`, `IconButton`, `ButtonGroup` |
| `kovax-react/input` | `Input`, `InputGroup`, **`Textarea`** |
| `kovax-react/form` | Form primitives, `Checkbox` / `Radio` / `RadioGroup` / `Switch`, `Select`, `useCombobox`, `VirtualizedListbox`, + `FormControlContext` / `useFormControlContext` |
| `kovax-react/overlays` | `Tooltip`, **`Popover`** / **`Dropdown`**, compound `Dialog`, structured `Modal`, `ToastProvider`, `useToast` |
| `kovax-react/tabs` | **`Tabs`** compound primitives (`Root`, `List`, `Trigger`, `Content`) |
| `kovax-react/accordion` | **`Collapsible`** + **`Accordion`** compound primitives |
| `kovax-react/alert` | **`Alert`** inline banner / live region |
| `kovax-react/progress` | **`LinearProgress`**, **`CircularProgress`** |
| `kovax-react/date-picker` | **`DatePicker`**, **`DateRangePicker`** (+ types); peer **`react-day-picker`** |
| `kovax-react/table` | **`Table`** compound primitives, **`DataTable`**, helpers (**`cycleSort`**, **`resolveDataCell`**) |
| `kovax-react/tokens` | Tokens + `themeToken` / `colorToken` |

## What’s new (v0.4)

- **Playground** — responsive layout, sticky header with backdrop blur, redesigned **Home** (hero + CTAs + quick cards), documentation topics as a **responsive grid** (no cramped horizontal tab strip), wider column for Markdown docs; **EN/RU** language switcher available on every section; live sections for **Accordion**, **Alert**, **Controls**, **Date picker**, **Overlays**, **Progress**, **Select**, **Tabs**, **Table**, and more. **`react-hook-form`** is still **only** a playground dependency (e.g. **Input** / **Date picker** demos).
- **Table & DataTable** — token-backed **`Table.*`** primitives (`variant`, `size`, striped rows, sticky header) plus **`DataTable`** with columns, **`rowHeader`**, and optional controlled sort — see [Table](./docs/components/Table.md); **`kovax-react/table`**.
- **Textarea** — same chrome as **`Input`** (variants, **`FormControl`** context, **`floatingLabel`**, character counter, **`resize`**) — see [Textarea](./docs/components/Textarea.md); **`kovax-react/input`**.
- **Date picker** — **`variant="datetime"`** (time inputs + **Apply**) for **`DatePicker`** and **`DateRangePicker`**; playground + docs examples — see [DatePicker](./docs/components/DatePicker.md); **`kovax-react/date-picker`**.

Full history: [CHANGELOG.md](./CHANGELOG.md).

### Highlights from v0.3 (still current)

- **Accordion & Collapsible**, **Alert**, **Progress**, **Tabs**, overlays (**Popover**, **Dialog**, **Modal**, **Toast**, …), **Input** (floating label, clear, masks), **Select** & **useCombobox**, **Form** context wiring — see [docs/README.md](./docs/README.md).

### Foundations

- **Typography** — token-backed `sizes.text` and spacing props where applicable.
- **`themeToken`** / **`colorToken`** — palette, `text.*`, `spacing.*`, `borderRadius.*`, `shadow.*`, `transition.*` ([Tokens](./docs/components/Tokens.md)).
- **Live site** — [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/) (EN/RU UI chrome).

## Requirements

- `react` and `react-dom` **≥16 &lt;20** (peer dependencies)
- **`react-day-picker` ^9** (peer dependency) when using **`DatePicker`** / **`DateRangePicker`** — install alongside `kovax-react` and import **`react-day-picker/style.css`** once in your app (see [DatePicker](./docs/components/DatePicker.md)).

## Installation

```bash
npm install kovax-react react-day-picker
```

If you do not use the date pickers, you may omit **`react-day-picker`** (it remains an optional peer).

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

        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" placeholder="you@example.com" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            floatingLabel
            placeholder="Password"
          />
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

`Box` supports `forwardRef` and forwards native attributes while spacing props are turned into CSS. `Button`, `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `IconButton`, and `Text` forward refs to their underlying DOM nodes where applicable.

## Features

- TypeScript-first props, including polymorphic `Box` with the `as` prop
- Spacing scale via `SpacingProps` (`m`, `p`, `w`, flex, grid, and more) on layout and several other primitives
- Accessible patterns where components expose roles, labels, and focus-visible styling (e.g. `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `FormError`, `useCombobox`, `Tabs`, `Alert`, `DataTable` sort controls)
- Jest tests under `src/components/**/__tests__`

## Tech stack

- React 18 in development; library targets React 16+ via peers
- TypeScript 5, **tsup** for library builds
- **Vite** + **react-markdown** for the optional playground app (`apps/playground`); **react-hook-form** is used only in playground demos, not shipped with the library.

## Documentation

| Topic | Link |
| ----- | ---- |
| **Live docs & demos** | **[https://mrkamura.github.io/kovax/](https://mrkamura.github.io/kovax/)** |
| Component index | [docs/README.md](./docs/README.md) |
| Getting started | [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md) |
| Design system / tokens | [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) |
| Tokens reference | [docs/components/Tokens.md](./docs/components/Tokens.md) |
| Button | [docs/components/Button.md](./docs/components/Button.md) |
| Input | [docs/components/Input.md](./docs/components/Input.md) |
| Textarea | [docs/components/Textarea.md](./docs/components/Textarea.md) |
| Controls (Checkbox / Radio / Switch) | [docs/components/Controls.md](./docs/components/Controls.md) |
| Select & Combobox | [docs/components/Select.md](./docs/components/Select.md) |
| Tabs | [docs/components/Tabs.md](./docs/components/Tabs.md) |
| Accordion & Collapsible | [docs/components/Accordion.md](./docs/components/Accordion.md) |
| Alert | [docs/components/Alert.md](./docs/components/Alert.md) |
| Progress | [docs/components/Progress.md](./docs/components/Progress.md) |
| Date picker | [docs/components/DatePicker.md](./docs/components/DatePicker.md) |
| Table & DataTable | [docs/components/Table.md](./docs/components/Table.md) |
| Overlays (Tooltip, Popover, Dialog, …) | [docs/components/Overlays.md](./docs/components/Overlays.md) |
| Form | [docs/components/Form.md](./docs/components/Form.md) |

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
