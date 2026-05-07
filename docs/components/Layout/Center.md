# Center

Centers children with flexbox (`justify-content` / `align-items`). Built on `Box`; accepts the same spacing and style props, plus centering flags.

## Import

```tsx
import { Center } from "kovax-react";
```

## Usage

```tsx
// Both axes (default)
<Center minH="100vh">
  <span>Loading…</span>
</Center>

// Horizontal only
<Center horizontal vertical={false}>
  <span>Centered in a row</span>
</Center>

// Vertical only
<Center horizontal={false} vertical>
  <span>Centered in a column</span>
</Center>

// Inline flex (e.g. next to text)
<Center inline gap={8}>
  <span aria-hidden>★</span>
  <span>4.5</span>
</Center>
```

`center={true}` forces both axes even when `horizontal` / `vertical` are false (see tests).

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `horizontal` | `boolean` | `true` | Horizontal centering |
| `vertical` | `boolean` | `true` | Vertical centering |
| `center` | `boolean` | `true` | When `true`, both axes |
| `inline` | `boolean` | `false` | `inline-flex` instead of `flex` |
| `width` / `height` | `number \| string` | — | Optional aliases; prefer `w` / `h` where possible |

Also accepts **`LayoutBoxProps`** / **`SpacingProps`**: `w`, `h`, `minW`, `maxW`, `p`, `gap`, `backgroundColor`, native attributes forwarded by `Box`, and `ref`.

## Examples

**Modal overlay** (outer layer is often a `Box`; inner card uses `Center` or fixed width):

```tsx
<Box
  position="fixed"
  top={0}
  left={0}
  right={0}
  bottom={0}
  display="flex"
  alignItems="center"
  justifyContent="center"
  backgroundColor="rgba(0,0,0,0.5)"
  zIndex={1000}
>
  <Box w="90%" maxW={500} backgroundColor="white" borderRadius={12} p={32}>
    …
  </Box>
</Box>
```

**Feature tile** with fixed size:

```tsx
<Center w={280} h={200} border="1px solid #e5e7eb" borderRadius={12} p={24}>
  <VStack gap={12} align="center">
    <span>Icon</span>
    <Box as="span" style={{ fontWeight: 600 }}>Title</Box>
  </VStack>
</Center>
```

Responsive breakpoints are not applied automatically to props (no `{ mobile, tablet }` objects). Use CSS, container queries, or your app logic.

## Tests

`src/components/Layout/__tests__/Center.test.tsx` — run `npm test` in the repo.

## Meta

Package version: root `package.json`.
