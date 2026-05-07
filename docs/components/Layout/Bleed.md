# Bleed

Applies **negative margins** so content can extend past the parent’s padding (full-bleed sections inside a padded column). Implemented with `Box` and `getBleedMarginStyles`.

## Import

```tsx
import { Bleed } from "kovax-react";
```

## Usage

```tsx
<Bleed all={16}>
  <Box backgroundColor="#3b82f6" color="white" p={16}>
    Bleeds 16px on every side
  </Box>
</Bleed>

<Bleed horizontal={24}>
  <Box backgroundColor="#f1f5f9" p={16}>
    Horizontal bleed only
  </Box>
</Bleed>

<Bleed top={8} bottom={8}>
  <Box>Top and bottom</Box>
</Bleed>
```

**Precedence:** per-side (`top`, `right`, …) overrides axis (`horizontal` / `vertical`) and `all` where margins overlap.

## Props

| Prop | Type | Description |
| ---- | ---- | ----------- |
| `all` | `number \| string` | Negative margin on all sides |
| `horizontal` | `number \| string` | Left + right |
| `vertical` | `number \| string` | Top + bottom |
| `top`, `right`, `bottom`, `left` | `number \| string` | Single side |

Also accepts **`w` / `h`** (or legacy **`width` / `height`** aliases) and the rest of **`Box`** props.

Bleed amounts are **not** responsive objects; use one value or swap components by breakpoint in your app.

## Example inside padded content

```tsx
<Container>
  <Box p={24}>
    <p>Normal width.</p>
    <Bleed horizontal={24}>
      <Box backgroundColor="#e2e8f0" p={16}>
        Wider than the text column
      </Box>
    </Bleed>
  </Box>
</Container>
```

## Tests

`src/components/Layout/__tests__/Bleed.test.tsx`

## Meta

Package version: root `package.json`.
