## Flex Component

The **Flex** component is a powerful layout primitive built on top of the **Box** component.
It provides full control over **CSS Flexbox**, while maintaining design-system consistency, spacing, and responsiveness.

## 📦 Import
```tsx
import { Flex } from "kovax-react";
```

## 🚀 Quick Start
* Basic Usage
```tsx
// Horizontal flex
<Flex gap={16}>
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</Flex>

// Vertical flex
<Flex direction="column" gap={24}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
</Flex>
```

* Centered Layout
```tsx
<Flex justify="center" align="center" minH="100vh">
  <LoginForm />
</Flex>
```

* Space Between
```tsx
<Flex justify="space-between" align="center">
  <Heading>Dashboard</Heading>
  <UserMenu />
</Flex>
```

## ⚙️ Props Reference
Flex Layout Props

| Prop             | Type                                                                                            | Default        | Description            |
| ---------------- | ----------------------------------------------------------------------------------------------- | -------------- | ---------------------- |
| **direction**    | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`                                        | `'row'`        | Main axis direction    |
| **wrap**         | `'nowrap' \| 'wrap' \| 'wrap-reverse'`                                                          | `'nowrap'`     | Flex wrapping behavior |
| **justify**      | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | `'flex-start'` | Main axis alignment    |
| **align**        | `'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'baseline'`                             | `'stretch'`    | Cross axis alignment   |
| **alignContent** | `'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'space-between' \| 'space-around'`      | `'stretch'`    | Multi-line alignment   |
| **gap**          | `number \| string`                                                                              | `-`            | Space between items    |
| **grow**         | `number`                                                                                        | `-`            | Flex grow factor       |
| **shrink**       | `number`                                                                                        | `-`            | Flex shrink factor     |
| **basis**        | `string \| number`                                                                              | `-`            | Flex basis             |
| **reverse**      | `boolean`                                                                                       | `false`        | Reverse flex direction |

All spacing, sizing, and styling props from the Box component are supported:
m, p, width, height, border, borderRadius, backgroundColor, and more.

## 🎨 Examples
* Direction Examples
```tsx
// Row (default)
<Flex direction="row">
  <Box>A</Box>
  <Box>B</Box>
</Flex>

// Column
<Flex direction="column">
  <Box>Top</Box>
  <Box>Bottom</Box>
</Flex>

// Reverse
<Flex direction="row" reverse>
  <Box>First (appears last)</Box>
  <Box>Last (appears first)</Box>
</Flex>
```

* Alignment Examples
```tsx
// Justify content
<Flex justify="center">Center</Flex>
<Flex justify="space-between">Between</Flex>

// Align items
<Flex align="flex-start">Top</Flex>
<Flex align="center">Center</Flex>
<Flex align="stretch">Stretch</Flex>
```

* Wrapping Examples
```tsx
// No wrap (default)
<Flex wrap="nowrap">
  {items.map(item => <Tag key={item.id}>{item.name}</Tag>)}
</Flex>

// Wrap
<Flex wrap="wrap" gap={16}>
  {items.map(item => (
    <Card key={item.id} width="200px">{item.name}</Card>
  ))}
</Flex>

// Wrap reverse
<Flex wrap="wrap-reverse" gap={8}>
  {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
</Flex>
```

* Flex Sizing
```tsx
// Grow
<Flex>
  <Box flex={1}>Takes remaining space</Box>
  <Box width="100px">Fixed</Box>
</Flex>

// Basis and shrink
<Flex>
  <Box basis="200px" shrink={0}>Min 200px</Box>
  <Box flex={1}>Flexible</Box>
</Flex>
```

## 🏗️ Real-World Examples
* Navigation Bar
```tsx
<Flex 
  justify="space-between" 
  align="center" 
  p={16} 
  backgroundColor="white"
  borderBottom="1px solid #e5e7eb"
>
  <Flex gap={24} align="center">
    <Logo size={32} />
    <Flex gap={16} display={{ mobile: "none", tablet: "flex" }}>
      <NavLink>Home</NavLink>
      <NavLink>Products</NavLink>
      <NavLink>About</NavLink>
    </Flex>
  </Flex>

  <Flex gap={12}>
    <Button variant="outline">Login</Button>
    <Button>Sign Up</Button>
  </Flex>
</Flex>
```

* Form Layout
```tsx
<Flex direction="column" gap={24}>
  <Flex gap={16} wrap="wrap">
    <FormControl flex="1 1 200px">
      <FormLabel>First Name</FormLabel>
      <Input placeholder="John" />
    </FormControl>

    <FormControl flex="1 1 200px">
      <FormLabel>Last Name</FormLabel>
      <Input placeholder="Doe" />
    </FormControl>
  </Flex>

  <FormControl>
    <FormLabel>Email</FormLabel>
    <Input type="email" placeholder="john@example.com" />
  </FormControl>

  <Flex justify="flex-end" gap={12}>
    <Button variant="outline">Cancel</Button>
    <Button>Save Changes</Button>
  </Flex>
</Flex>
```

* Card Grid
```tsx
<Flex direction="column" gap={32}>
  <Flex justify="space-between" align="center">
    <Heading>Products</Heading>
    <Button>Add Product</Button>
  </Flex>

  <Flex wrap="wrap" gap={24} justify="center">
    {products.map(product => (
      <Card key={product.id} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
        <Flex direction="column" gap={16}>
          <Heading size="md">{product.name}</Heading>
          <Text>{product.description}</Text>
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">${product.price}</Text>
            <Button size="sm">Add to Cart</Button>
          </Flex>
        </Flex>
      </Card>
    ))}
  </Flex>
</Flex>
```

* Responsive Layout
```tsx
<Flex 
  direction={{ mobile: "column", tablet: "row" }}
  gap={{ mobile: 16, tablet: 24 }}
  align={{ mobile: "stretch", tablet: "center" }}
>
  <Box flex={1}>
    <Heading>Main Content</Heading>
    <Text>This layout adapts to screen size</Text>
  </Box>

  <Box width={{ mobile: "100%", tablet: "300px" }}>
    <Sidebar />
  </Box>
</Flex>
```

## 🔄 Comparison: Flex vs Stack

| Use Case                   | Flex | Stack / HStack / VStack |
| -------------------------- | ---- | ----------------------- |
| Simple horizontal layout   | ✅    | ✅ (HStack)              |
| Simple vertical layout     | ✅    | ✅ (VStack)              |
| Complex flexbox needs      | ✅    | ❌                       |
| Full flex control          | ✅    | ❌                       |
| Quick consistent layouts   | ❌    | ✅                       |
| Nested directional layouts | ✅    | ✅                       |
| Reverse ordering           | ✅    | ✅                       |

## 💡 Best Practices

## ✅ Do:

* Use Flex for complex, responsive, or nested layouts.

* Combine with responsive props for mobile-first design.

* Keep consistent gap values across components.

* Use wrap for adaptive grids.

* Explicitly set flex values for predictable sizing.

## ❌ Don't:

* Overuse Flex when Stack is simpler.

* Mix arbitrary gap values.

* Ignore responsive testing.

* Use fixed widths unnecessarily.

* Override layout props without reason.

## ⚡ Performance Tips
```tsx
// ✅ Memoized
const MemoizedFlex = React.memo(Flex);

// ✅ Conditional gap
<Flex gap={hasMultipleItems ? 16 : 0}>
  <PrimaryAction />
  {hasMultipleItems && <SecondaryAction />}
</Flex>

// 🚫 Avoid excessive nesting
<Flex direction={isMobile ? "column" : "row"} justify="space-between">
  {/* content */}
</Flex>
```

## 🧪 Testing

The Flex component has 100% test coverage, including:

✅ Default styles
✅ Direction & reverse
✅ Alignment & justify
✅ Wrapping & gaps
✅ Sizing & basis
✅ Style merging
✅ Prop inheritance
✅ Children rendering
✅ Memoization

```bash
Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
```

## 🔧 Technical Details

| Property            | Value                 |
| ------------------- | --------------------- |
| **Built on**        | Box component         |
| **Performance**     | Memoized, lightweight |
| **Bundle size**     | ~1.2KB gzipped        |
| **Dependencies**    | React 16.8+, Box      |
| **Browser support** | All modern browsers   |
| **TypeScript**      | Fully typed           |
| **Tree-shakeable**  | ✅ Yes                 |

## 🎨 Theme Integration
```tsx
// Theme spacing
<Flex gap="spacing.md">
  <Button>Cancel</Button>
  <Button>Save</Button>
</Flex>

// Theme breakpoints
<Flex direction={{ mobile: "column", tablet: "row" }}>
  <ContentA />
  <ContentB />
</Flex>
```

## 🏷️ Tags

#React #KovaxUI #Flex #Layout #Box #Responsive #DesignSystem #UI #Component #Performance #Documentation #BestPractices #TypeScript #Frontend