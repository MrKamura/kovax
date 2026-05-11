# Separator

Horizontal or vertical line divider. Renders a `Box` with background color and thickness. For `orientation="vertical"`, thickness maps to **width**; the line stretches along the cross axis in flex layouts (`align-self: stretch`) with `min-height: 1em` so it stays visible next to text (e.g. in `HStack` with `align="center"`).

## Import

```tsx
import { Separator } from "kovax-react";
```

## Usage

```tsx
<Separator />

<Separator orientation="vertical" size={1} />

<Separator size={2} color="#cbd5e1" />

<Separator margin={16} />
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `orientation` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Line direction |
| `size` | `number` \| `string` | `1` | Thickness (px if number) |
| `color` | `string` | `"gray.200"` | **Line** color (CSS `background-color`; not the text `color` spacing prop) |
| `margin` | `number` \| `string` | — | Extra margin around the line |

**`color` vs `Box`:** the type omits spacing `color` so `color` here always means the divider fill. All other **`SpacingProps`** and DOM props go through **`Box`**.

## Example between sections

```tsx
<VStack gap={16} align="stretch">
  <Box as="h2" style={{ fontSize: "1.25rem", margin: 0 }}>Account</Box>
  <p style={{ margin: 0 }}>Manage settings.</p>
  <Separator />
  <Box as="h2" style={{ fontSize: "1.25rem", margin: 0 }}>Security</Box>
  <Input type="email" placeholder="Email" />
</VStack>
```

`orientation` and `size` must be **scalar** values—not breakpoint objects.

## Accessibility

If the divider carries semantic meaning, add a name, e.g. wrap with an element that has `role="separator"` and `aria-orientation`, or use a heading structure instead of relying on the line alone.

## Tests

`src/components/Layout/__tests__/Separator.test.tsx`

## Meta

Package version: root `package.json`.
