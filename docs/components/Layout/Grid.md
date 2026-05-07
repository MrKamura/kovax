# Grid

CSS Grid helper on top of `Box`. Sets `display: grid`, template columns/rows/areas, gaps, and alignment; spacing props (`m`, `p`, `w`, …) behave like `Box`.

## Import

```tsx
import { Grid } from "kovax-react";
```

## Usage

```tsx
<Grid columns={3} gap={16}>
  <Box>One</Box>
  <Box>Two</Box>
  <Box>Three</Box>
</Grid>

<Grid columns="1fr 2fr 1fr" gap={24}>
  <Box>Sidebar</Box>
  <Box>Main</Box>
  <Box>Aside</Box>
</Grid>

<Grid
  columns="250px 1fr"
  rows="auto 1fr auto"
  minH="100vh"
  areas={["sidebar header", "sidebar main", "sidebar footer"]}
>
  <Box gridArea="header">…</Box>
  <Box gridArea="sidebar">…</Box>
  <Box gridArea="main">…</Box>
  <Box gridArea="footer">…</Box>
</Grid>
```

**`template` object** (optional): `{ columns?, rows?, areas? }` maps to `grid-template-*`. If `template` is set, it takes precedence over separate `columns` / `rows` / `areas` for those fields.

## Layout props (summary)

| Prop | Description |
| ---- | ----------- |
| `columns` | `number` → `repeat(n, 1fr)`; or CSS string |
| `rows` | Same pattern |
| `gap`, `rowGap`, `columnGap` | Grid gaps (numbers get `px` like other layout components) |
| `areas` | String array → `grid-template-areas` |
| `justifyItems`, `alignItems` | Per-cell alignment (`start` / `end` / `center` / `stretch`) |
| `justifyContent`, `alignContent` | Grid inside container |
| `autoFlow`, `autoColumns`, `autoRows` | Auto-placement |

Dimension aliases **`width`**, **`height`**, **`minWidth`**, etc. map to **`w`**, **`h`**, **`minW`**, … on `Box`.

## Responsive columns

There is **no** built-in `{ mobile: 1, tablet: 2 }` API. Use a CSS string such as `repeat(auto-fill, minmax(280px, 1fr))`, media queries, or conditional JSX.

```tsx
<Grid columns="repeat(auto-fill, minmax(280px, 1fr))" gap={24}>
  {items.map((item) => (
    <Box key={item.id}>{item.title}</Box>
  ))}
</Grid>
```

## Form row spanning

Put `gridColumn` on a child `Box` (or on wrappers that forward spacing). **`FormControl`** accepts spacing props including `gridColumn` when you need a full-width field:

```tsx
<Grid columns="1fr 1fr" gap={16}>
  <FormControl>…</FormControl>
  <FormControl>…</FormControl>
  <FormControl gridColumn="1 / -1">
    <FormLabel>Email</FormLabel>
    <Input type="email" />
  </FormControl>
</Grid>
```

## Tests

`src/components/Layout/__tests__/Grid.test.tsx`

## Meta

Package version: root `package.json`.
