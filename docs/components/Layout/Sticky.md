# Sticky

Keeps content **fixed in the viewport** while scrolling by switching to `position: fixed` when an internal `IntersectionObserver` decides the placeholder has left the top of the root. Uses a hidden placeholder to reserve height and approximate width.

## Import

```tsx
import { Sticky } from "kovax-react";
```

## Usage

```tsx
<Sticky top={0} zIndex={1000} shadow="0 2px 8px rgba(0,0,0,0.1)">
  <Box backgroundColor="white" p={16}>
    Header
  </Box>
</Sticky>
```

```tsx
<Sticky top={64} enabled={!isMobile}>
  <Box p={12}>Sub-nav</Box>
</Sticky>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `top` | `number \| string` | `0` | Offset when sticky (also used in `rootMargin` for the observer) |
| `bottom` | `number \| string` | — | Applied when sticky |
| `left` | `number \| string` | — | Applied when sticky |
| `right` | `number \| string` | — | Applied when sticky |
| `zIndex` | `number` | `1000` | Stacking when sticky |
| `enabled` | `boolean` | `true` | Disable observer + sticky behavior |
| `shadow` | `string` | — | `box-shadow` when sticky (fallback default in implementation) |

**`Sticky`** renders a **fragment** with two `div`s (placeholder + content). It is **not** a `Box`; pass layout/spacing via `className` / `style` on `Sticky` or wrap children in `Box`.

`top` as a number is passed to `IntersectionObserver`’s `rootMargin`; very large or string values may need verification in your layout.

## Tests

`src/components/Layout/__tests__/Sticky.test.tsx`

## Meta

Package version: root `package.json`.
