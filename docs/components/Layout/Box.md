## 📦 Box Component

The Box component is the foundational layout primitive in Kovax UI.
It provides a flexible, semantic wrapper for layout, spacing, and positioning — similar to a <div> with superpowers.

## 🚀 Import
```tsx
import { Box } from "kovax-react";
```

## ✨ Basic Usage
```tsx
// Simple container
<Box p={16} m={8}>
  Content inside box
</Box>

// Custom HTML element
<Box as="section" p={24}>
  <h2>Section Title</h2>
  <p>Section content...</p>
</Box>
```

## 🧩 Core Features
## 🏷️ Semantic Elements

Render different HTML elements using the as prop:

```tsx
<Box as="header">Header</Box>
<Box as="main">Main Content</Box>
<Box as="footer">Footer</Box>
<Box as="a" href="/link">Link</Box>
<Box as="button" onClick={handleClick}>Clickable Box</Box>
<Box as="input" placeholder="Enter text" />
<Box as="textarea" rows={4} placeholder="Multi-line text" />
<Box as="select">
  <option>Option 1</option>
  <option>Option 2</option>
</Box>
```

## 📏 Spacing & Sizing
* Width & Height
```tsx
<Box w="100%" h="200px">Full width</Box>
<Box w={300} h="auto">Fixed width (300px)</Box>
<Box minW="200px" maxW="800px">Responsive width</Box>
<Box w="50vw" h="50vh">Viewport units</Box>
```

* Margin & Padding
```tsx
<Box m={16}>All margins (16px)</Box>
<Box mt={8} mr={12} mb={16} ml={4}>Individual margins</Box>
<Box mx="auto">Center horizontally</Box>
<Box my={24}>Vertical margins</Box>

<Box p={16}>All padding (16px)</Box>
<Box px={20} py={12}>Horizontal + vertical padding</Box>
<Box pt={8}>Top padding only</Box>
```

## 🧱 Flexbox Layout
```tsx
<Box display="flex" gap={16}>
  <Box flex={1}>Item 1</Box>
  <Box flex={2}>Item 2</Box>
</Box>

<Box display="flex" alignItems="center" justifyContent="space-between">
  <Box>Left</Box>
  <Box>Right</Box>
</Box>

<Box 
  display="flex"
  flexDirection="column"
  flexWrap="wrap"
  alignContent="center"
>
  Flexible container
</Box>
```

## 🧮 CSS Grid
```tsx
<Box display="grid" gridTemplateColumns="1fr 1fr" gap={16}>
  <Box>Grid item 1</Box>
  <Box>Grid item 2</Box>
</Box>

<Box 
  display="grid"
  gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
  gap={24}
>
  <Box>Responsive item</Box>
  <Box>Responsive item</Box>
</Box>

<Box 
  display="grid"
  gridTemplateAreas="'header header' 'sidebar content'"
  gridTemplateRows="auto 1fr"
  gridTemplateColumns="200px 1fr"
>
  <Box gridArea="header">Header</Box>
  <Box gridArea="sidebar">Sidebar</Box>
  <Box gridArea="content">Content</Box>
</Box>
```

## 📍 Positioning
```tsx
<Box position="relative" h="200px">
  <Box position="absolute" top={16} right={16}>
    Absolute box
  </Box>
</Box>

<Box position="fixed" top={0} left={0} right={0}>
  Fixed header
</Box>

<Box position="sticky" top={0}>
  Sticky element
</Box>

<Box position="absolute" top={0} bottom={0} left={0} right={0}>
  Full overlay
</Box>
```

## 🎨 Styling & Appearance
```tsx
<Box backgroundColor="#f0f0f0" color="#333" borderRadius={8}>
  Styled box
</Box>

<Box border="1px solid #e0e0e0" boxShadow="0 2px 8px rgba(0,0,0,0.1)">
  Card-like appearance
</Box>

<Box opacity={0.8} cursor="pointer" zIndex={1000}>
  Interactive element
</Box>
```

## 🎯 Real-World Examples
## 🧾 Card Component
```tsx
function Card({ title, children, ...props }) {
  return (
    <Box
      p={24}
      m={16}
      backgroundColor="white"
      border="1px solid #e0e0e0"
      borderRadius={12}
      boxShadow="0 2px 8px rgba(0,0,0,0.1)"
      {...props}
    >
      <Box as="h3" mb={16} fontSize={20} fontWeight={600}>
        {title}
      </Box>
      {children}
    </Box>
  );
}
```

## 🧭 Navigation Bar
```tsx
function NavBar() {
  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={16}
      backgroundColor="#1a1a1a"
      color="white"
    >
      <Box as="h1" fontSize={20} fontWeight="bold">
        MyApp
      </Box>
      <Box display="flex" gap={24}>
        <Box as="a" href="#" color="white" textDecoration="none">Home</Box>
        <Box as="a" href="#" color="white" textDecoration="none">About</Box>
        <Box as="a" href="#" color="white" textDecoration="none">Contact</Box>
      </Box>
    </Box>
  );
}
```

## Modal Component
```tsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex={1000}
      onClick={onClose}
    >
      <Box
        w="90%"
        maxW="500px"
        p={24}
        backgroundColor="white"
        borderRadius={12}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Box>
    </Box>
  );
}
```

## 📱 Responsive Layout
```tsx
function ResponsiveLayout() {
  return (
    <Box display="flex" flexDirection="column" gap={16} p={16}>
      <Box 
        display="flex" 
        flexDirection={{ mobile: 'column', tablet: 'row' }}
        gap={{ mobile: 16, tablet: 24 }}
      >
        <Box flex={{ tablet: 1 }} p={16} backgroundColor="#f5f5f5">
          Sidebar
        </Box>
        <Box flex={{ tablet: 2 }} p={16} backgroundColor="#eeeeee">
          Main Content
        </Box>
      </Box>
    </Box>
  );
}
```

## 🔧 Props Reference
* Core Props

| Prop           | Type                      | Default | Description            |
| -------------- | ------------------------- | ------- | ---------------------- |
| `as`           | `BoxAsProp`               | `'div'` | HTML element to render |
| `children`     | `React.ReactNode`         | —       | Box content            |
| `className`    | `string`                  | —       | Additional CSS classes |
| `style`        | `React.CSSProperties`     | —       | Inline styles          |
| `onClick`      | `React.MouseEventHandler` | —       | Click handler          |
| `onMouseEnter` | `React.MouseEventHandler` | —       | Mouse enter handler    |
| `onMouseLeave` | `React.MouseEventHandler` | —       | Mouse leave handler    |
| `id`           | `string`                  | —       | Element ID             |
| `title`        | `string`                  | —       | Tooltip text           |
| `role`         | `string`                  | —       | ARIA role              |
| `tabIndex`     | `number`                  | —       | Tab index              |

* Layout & Spacing Props

| Prop                                    | Type    | Description |                  |
| --------------------------------------- | ------- | ----------- | ---------------- |
| `w`, `h`                                | `string | number`     | Width and height |
| `minW`, `maxW`, `minH`, `maxH`          | `string | number`     | Min/max sizes    |
| `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my` | `string | number`     | Margin control   |
| `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py` | `string | number`     | Padding control  |



* Flexbox Props

| Prop                                          | Type          | Description    |                 |                   |                 |             |
| --------------------------------------------- | ------------- | -------------- | --------------- | ----------------- | --------------- | ----------- |
| `display`                                     | `'flex'       | 'inline-flex'` | Flex display    |                   |                 |             |
| `flex`, `flexGrow`, `flexShrink`, `flexBasis` | `string       | number`        | Flex properties |                   |                 |             |
| `flexDirection`                               | `'row'        | 'column'       | 'row-reverse'   | 'column-reverse'` | Direction       |             |
| `alignItems`                                  | `'flex-start' | 'flex-end'     | 'center'        | 'baseline'        | 'stretch'`      | Align items |
| `justifyContent`                              | `'flex-start' | 'center'       | 'space-between' | ...`              | Justify content |             |

* Grid Props

| Prop                                | Type     | Description    |              |
| ----------------------------------- | -------- | -------------- | ------------ |
| `display`                           | `'grid'  | 'inline-grid'` | Grid display |
| `gap`                               | `string  | number`        | Grid gap     |
| `gridTemplateColumns`               | `string` | Columns        |              |
| `gridTemplateRows`                  | `string` | Rows           |              |
| `gridTemplateAreas`                 | `string` | Areas          |              |
| `gridArea`, `gridColumn`, `gridRow` | `string` | Placement      |              |

* Positioning Props

| Prop                             | Type      | Description |            |         |           |               |
| -------------------------------- | --------- | ----------- | ---------- | ------- | --------- | ------------- |
| `position`                       | `'static' | 'relative'  | 'absolute' | 'fixed' | 'sticky'` | Position type |
| `top`, `right`, `bottom`, `left` | `string   | number`     | Offsets    |         |           |               |


* Styling Props

| Prop                                  | Type     | Description |                    |            |                |
| ------------------------------------- | -------- | ----------- | ------------------ | ---------- | -------------- |
| `backgroundColor`, `color`            | `string` | Colors      |                    |            |                |
| `border`, `borderRadius`, `boxShadow` | `string  | number`     | Borders & shadows  |            |                |
| `cursor`, `opacity`, `zIndex`         | `string  | number`     | Interaction styles |            |                |
| `textAlign`                           | `'left'  | 'center'    | 'right'            | 'justify'` | Text alignment |


## 💡 Best Practices

## ✅ Do

* Use semantic elements with as for accessibility

* Prefer spacing props over inline styles

* Use numeric spacing (e.g. m={16}) for consistency

* Combine with style for fine-grained control

* Use Flexbox for 1D and Grid for 2D layouts

## ❌ Don't

* Overuse inline styles

* Nest Boxes unnecessarily

* Forget ARIA attributes for semantic content

## 🧪 TypeScript Support

The Box component is fully typed, with:

✅ Autocomplete for all props

✅ Type-safe element attributes

✅ Conditional types for as

✅ IntelliSense for CSS

## 🧾 Meta

Version: 1.0.0
Features: Spacing • Flexbox • Grid • Positioning • Semantic HTML • TypeScript Support
Status: ✅ Stable
Test Coverage: ✅ 100% (59/59 tests passing)