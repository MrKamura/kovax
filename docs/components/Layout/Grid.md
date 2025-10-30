## 🧮 Grid (Grid Layout Component)

The **Grid** component is a powerful layout primitive for building responsive, semantic, and flexible grid-based UIs.
It provides full control over **CSS Grid** while keeping a concise API and integrates with Kovax design tokens. Built on top of Box and inherits all Box props.

## 📦 Import
```tsx
import { Grid } from 'kovax-react';
```

## 🚀 Quick Start
* Simple grid
```tsx
// 3 columns with equal width
<Grid columns={3} gap={16}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Custom column template
<Grid columns="1fr 2fr 1fr" gap={24}>
  <Card>Left Sidebar</Card>
  <Card>Main Content</Card>
  <Card>Right Sidebar</Card>
</Grid>
```

* Responsive grid
```tsx
<Grid
  columns={{ mobile: 1, tablet: 2, desktop: 4 }}
  gap={{ mobile: 8, tablet: 16, desktop: 24 }}
>
  {items.map(item => (
    <ProductCard key={item.id} {...item} />
  ))}
</Grid>
```

## ⚙️ Props reference
# Grid layout props

| Prop                  |                                                                                               Type |   Default   | Description                                                                           |
| --------------------- | -------------------------------------------------------------------------------------------------: | :---------: | ------------------------------------------------------------------------------------- |
| `columns`             |                                                              `number \| string \| ResponsiveValue` |     `-`     | Number of columns or CSS template (e.g. `"1fr 2fr 1fr"`). Supports responsive values. |
| `rows`                |                                                              `number \| string \| ResponsiveValue` |     `-`     | Number of rows or CSS template.                                                       |
| `gap`                 |                                                              `number \| string \| ResponsiveValue` |     `-`     | Gap between grid cells (shorthand for row + column gap).                              |
| `rowGap`              |                                                                                 `number \| string` |     `-`     | Row gap.                                                                              |
| `columnGap`           |                                                                                 `number \| string` |     `-`     | Column gap.                                                                           |
| `areas`               |                                                                                         `string[]` |     `-`     | Grid template areas (array of strings).                                               |
| `gridTemplateColumns` |                                                                                           `string` |     `-`     | Direct CSS `grid-template-columns` value.                                             |
| `gridTemplateRows`    |                                                                                           `string` |     `-`     | Direct CSS `grid-template-rows` value.                                                |
| `justifyItems`        |                                                        `'start' \| 'end' \| 'center' \| 'stretch'` | `'stretch'` | Align items along the inline axis inside each cell.                                   |
| `alignItems`          |                                                        `'start' \| 'end' \| 'center' \| 'stretch'` | `'stretch'` | Align items along the block axis inside each cell.                                    |
| `justifyContent`      |              `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` |  `'start'`  | Align the grid within the container horizontally.                                     |
| `alignContent`        | `'start' \| 'end' \| 'center' \| 'stretch' \| 'space-around' \| 'space-between' \| 'space-evenly'` |  `'start'`  | Align the grid within the container vertically.                                       |
| `autoFlow`            |                                               `'row' \| 'column' \| 'row dense' \| 'column dense'` |   `'row'`   | Auto-placement algorithm.                                                             |
| `autoColumns`         |                                                                                           `string` |     `-`     | `grid-auto-columns` value.                                                            |
| `autoRows`            |                                                                                           `string` |     `-`     | `grid-auto-rows` value.                                                               |
| `template`            |                                                                                           `object` |     `-`     | Custom template object (for advanced patterns).                                       |


Inherited props: Grid accepts all Box props (spacing, sizing, style props, event handlers, etc.).

## 🎯 Real-world examples
* Dashboard layout
```tsx
<Grid
  columns="250px 1fr"
  rows="auto 1fr auto"
  gap={0}
  areas={[
    "sidebar header",
    "sidebar main",
    "sidebar footer",
  ]}
  minH="100vh"
>
  <Box gridArea="header" p={16} borderBottom="1px solid #e5e7eb">
    <Header />
  </Box>

  <Box gridArea="sidebar" borderRight="1px solid #e5e7eb">
    <Sidebar />
  </Box>

  <Box gridArea="main" p={24}>
    <MainContent />
  </Box>

  <Box gridArea="footer" p={16} borderTop="1px solid #e5e7eb">
    <Footer />
  </Box>
</Grid>
```

* Card gallery (responsive)
```tsx
<Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap={24}>
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</Grid>
```

* Form layout with gridColumn
```tsx
<Grid columns="1fr 1fr" gap={16}>
  <FormControl>
    <FormLabel>First Name</FormLabel>
    <Input placeholder="John" />
  </FormControl>

  <FormControl>
    <FormLabel>Last Name</FormLabel>
    <Input placeholder="Doe" />
  </FormControl>

  <FormControl gridColumn="1 / -1">
    <FormLabel>Email</FormLabel>
    <Input type="email" placeholder="john@example.com" />
  </FormControl>

  <FormControl gridColumn="1 / -1">
    <FormLabel>Message</FormLabel>
    <Textarea placeholder="Your message..." rows={4} />
  </FormControl>
</Grid>
```

## 📐 Theme integration

Use design tokens (spacing, breakpoints, etc.) with Grid:

```tsx
<Grid
  columns={{ mobile: 1, tablet: 2, desktop: 4 }}
  gap="spacing.md"
>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
  <Card>4</Card>
</Grid>
```

## 💡 Best practices

Do

* Use repeat(auto-fill, minmax(...)) for responsive card layouts.

* Prefer gap instead of margins between grid children.

* Use areas for semantic high-level templates (headers, sidebars, content).

* Combine Grid with Box for named area children via gridArea.

Don't

* Avoid mixing too many fixed widths in responsive grids.

* Don’t use negative margins to fix spacing — use gap instead.

* Don’t duplicate layout logic in JS and CSS.

## 📊 Status

| Property        |                                      Value |
| --------------- | -----------------------------------------: |
| **Version**     |                                    `1.0.0` |
| **Features**    | Full grid control, responsive, theme-aware |
| **TypeScript**  |                              ✅ Fully typed |
| **Bundle size** |                             ~1.3KB gzipped |
| **Status**      |                         ✅ Production Ready |
