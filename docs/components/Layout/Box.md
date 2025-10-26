# 📦 Box Component

The **Box** component is the foundational layout primitive in **Kovax UI**.  
It provides a flexible, semantic wrapper for layout, spacing, and positioning — similar to a `<div>` with superpowers.

---

## 🚀 Import

```tsx
import { Box } from 'kovax-react';
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
```
## 📏 Spacing & Sizing

* Width & Height
```tsx
<Box w="100%" h="200px">Full width</Box>
<Box w={300} h="auto">Fixed width</Box>
<Box minW="200px" maxW="800px">Responsive width</Box>
```

* Margin & Padding
```tsx
<Box m={16}>All margins</Box>
<Box mt={8} mr={12} mb={16} ml={4}>Individual margins</Box>
<Box mx="auto">Center horizontally</Box>

<Box p={16}>All padding</Box>
<Box px={20} py={12}>Horizontal + vertical padding</Box>
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
```

## 🎨 Real-World Examples
## 🧾 Card
```tsx
function Card({ title, children, ...props }) {
  return (
    <Box
      p={24}
      m={16}
      style={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
      {...props}
    >
      <Box as="h3" mb={16} style={{ fontSize: 20, fontWeight: 600 }}>
        {title}
      </Box>
      {children}
    </Box>
  );
}
```

## 🧭 NavBar
```tsx
function NavBar() {
  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={16}
      style={{
        backgroundColor: '#1a1a1a',
        color: 'white'
      }}
    >
      <Box as="h1" style={{ fontSize: 20, fontWeight: 'bold' }}>MyApp</Box>
      <Box display="flex" gap={24}>
        <Box as="a" href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</Box>
        <Box as="a" href="#" style={{ color: 'white', textDecoration: 'none' }}>About</Box>
      </Box>
    </Box>
  );
}
```
## Modal

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
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <Box
        w="90%"
        maxW="500px"
        p={24}
        style={{
          backgroundColor: 'white',
          borderRadius: '12px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Box>
    </Box>
  );
}
}
```

## 📱 Responsive Example
```tsx
function ResponsiveLayout() {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={{ xs: 16, md: 24 }}
      p={{ xs: 16, md: 24 }}
    >
      <Box flex={{ md: 1 }} p={16} style={{ backgroundColor: '#f5f5f5' }}>
        Sidebar
      </Box>
      <Box flex={{ md: 2 }} p={16} style={{ backgroundColor: '#eeeeee' }}>
        Main Content
      </Box>
    </Box>
  );
}
```

## 🔧 Props Reference
| Prop           | Type                        | Default | Description            |
| -------------- | --------------------------- | ------- | ---------------------- |
| `as`           | keyof JSX.IntrinsicElements | `'div'` | HTML element to render |
| `children`     | `React.ReactNode`           | —       | Box content            |
| `className`    | `string`                    | —       | Additional CSS classes |
| `style`        | `React.CSSProperties`       | —       | Inline styles          |
| `onClick`      | `() => void`                | —       | Click handler          |
| `onMouseEnter` | `() => void`                | —       | Mouse enter handler    |
| `onMouseLeave` | `() => void`                | —       | Mouse leave handler    |


## 🧭 Layout & Spacing Props
| Prop                                          | Type     | Description    |                  |
| --------------------------------------------- | -------- | -------------- | ---------------- |
| `w`, `h`                                      | `string  | number`        | Width and height |
| `minW`, `maxW`                                | `string  | number`        | Min/max width    |
| `minH`, `maxH`                                | `string  | number`        | Min/max height   |
| `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`       | `string  | number`        | Margin           |
| `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`       | `string  | number`        | Padding          |
| `flex`, `flexGrow`, `flexShrink`, `flexBasis` | `string  | number`        | Flex properties  |
| `display`                                     | `string` | Display type   |                  |
| `position`                                    | `string` | Position type  |                  |
| `top`, `right`, `bottom`, `left`              | `string  | number`        | Position offsets |
| `textAlign`                                   | `string` | Text alignment |                  |


* 💡 Best Practices
* ✅ Use semantic elements with as for accessibility
* 🎯 Prefer spacing props over inline styles for consistency
* 🧩 Use Box as a base component for custom layouts
* Combine with style prop for fine-grained control
* 📦 Ideal for wrappers, layout grids, modals, and containers

##🧾 Meta
Version: 1.0.0
Features: Spacing, Flexbox, Grid, Positioning, Semantic HTML, TypeScript support
Status: ✅ Stable