# 📐 Sticky Component

The **Sticky** component creates elements that remain fixed in the viewport while scrolling, then return to normal flow when reaching their original position.  
It’s ideal for navigation headers, sidebars, table headers, progress bars, and notification banners.

---

## 📦 Import

```tsx
import { Sticky } from 'kovax-react';
```
## 🚀 Quick Start

# Basic Usage
```tsx
// Sticky header
<Sticky top={0}>
  <Header />
</Sticky>

// Sticky sidebar with offset
<Sticky top={100}>
  <TableOfContents />
</Sticky>

// Sticky footer
<Sticky bottom={0}>
  <Footer />
</Sticky>
```
# Advanced Positioning
```tsx
// Sticky with custom positioning
<Sticky top={20} left={0} right={0} zIndex={1500}>
  <NotificationBar />
</Sticky>

// Disable sticky behavior conditionally
<Sticky enabled={!isMobile}>
  <Sidebar />
</Sticky>
```
## ⚙️ Props Reference

| Prop      | Type               | Default | Description                                 |
| --------- | ------------------ | ------- | ------------------------------------------- |
| `top`     | `number \| string` | `0`     | Distance from the top of the viewport       |
| `bottom`  | `number \| string` | `-`     | Distance from the bottom of the viewport    |
| `left`    | `number \| string` | `-`     | Distance from the left edge                 |
| `right`   | `number \| string` | `-`     | Distance from the right edge                |
| `zIndex`  | `number`           | `1000`  | Defines stacking order                      |
| `enabled` | `boolean`          | `true`  | Enables or disables sticky behavior         |
| `shadow`  | `string`           | `-`     | Adds box-shadow when element becomes sticky |


# Inherited Attributes
All standard HTML attributes are supported:

* id, className, style

* aria-* accessibility attributes

* data-* testing attributes

## 🎯 Examples
Navigation & Headers
Sticky Header with Navigation

```tsx
<Sticky top={0} zIndex={1000} shadow="0 2px 8px rgba(0,0,0,0.1)" style={{ backgroundColor: 'white' }}>
  <Flex justify="space-between" align="center" p={4}>
    <Logo />
    <Navigation />
    <HStack gap={3}>
      <Button variant="outline">Sign In</Button>
      <Button>Sign Up</Button>
    </HStack>
  </Flex>
</Sticky>
```

* Sticky Sub-Navigation
```tsx
<Sticky top={64} zIndex={900} style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
  <Flex justify="space-between" align="center" p={3}>
    <HStack gap={6}>
      <Link href="#overview">Overview</Link>
      <Link href="#features">Features</Link>
      <Link href="#pricing">Pricing</Link>
      <Link href="#docs">Docs</Link>
    </HStack>
    <Button size="sm">Get Started</Button>
  </Flex>
</Sticky>
```

*  Data Tables & Lists
Sticky Table Header
```tsx
<Box>
  <Sticky top={0} backgroundColor="white" zIndex={100} style={{ borderBottom: '2px solid #e5e7eb' }}>
    <Grid templateColumns="1fr 1fr 1fr auto" gap={4} p={4} fontWeight="bold">
      <div>Product</div>
      <div>Category</div>
      <div>Price</div>
      <div><VisuallyHidden>Actions</VisuallyHidden></div>
    </Grid>
  </Sticky>

  {products.map(p => (
    <Grid key={p.id} templateColumns="1fr 1fr 1fr auto" gap={4} p={4} borderBottom="1px solid #f3f4f6">
      <Text fontWeight="medium">{p.name}</Text>
      <Text color="gray.600">{p.category}</Text>
      <Text fontWeight="bold">${p.price}</Text>
      <HStack gap={2}>
        <IconButton icon="edit" size="sm" aria-label={`Edit ${p.name}`} />
        <IconButton icon="delete" size="sm" aria-label={`Delete ${p.name}`} />
      </HStack>
    </Grid>
  ))}
</Box>
```

* Sticky List Header
```tsx
<Box>
  <Sticky top={0} backgroundColor="gray.50" zIndex={50} p={3}>
    <Heading size="md">Recent Activity</Heading>
  </Sticky>

  <VStack gap={2} mt={2}>
    {activities.map(a => (
      <Card key={a.id} p={3}>
        <Flex justify="space-between">
          <Text>{a.description}</Text>
          <Text color="gray.500" fontSize="sm">{a.time}</Text>
        </Flex>
      </Card>
    ))}
  </VStack>
</Box>
```

* Sidebars & Navigation
Sticky Table of Contents
```tsx
<Flex gap={8}>
  <Box flex={1}><Article /></Box>

  <Box width="300px">
    <Sticky top={100}>
      <Card p={4}>
        <Heading size="sm" mb={3}>Table of Contents</Heading>
        <VStack gap={2} align="flex-start">
          <Link href="#intro">Introduction</Link>
          <Link href="#setup">Setup</Link>
          <Link href="#usage">Usage</Link>
          <Link href="#api">API Reference</Link>
        </VStack>
      </Card>
    </Sticky>
  </Box>
</Flex>
```

* Notifications & Banners
Sticky Notification Bar
```tsx
<Sticky top={0} zIndex={2000} style={{ backgroundColor: '#fffbeb', borderBottom: '1px solid #fef3c7' }}>
  <Flex justify="center" align="center" p={3} gap={4}>
    <Icon name="warning" color="#d97706" />
    <Text color="#92400e" fontWeight="medium">
      Scheduled maintenance on Saturday, 10:00 PM - 2:00 AM
    </Text>
    <Button size="sm" variant="outline">Learn More</Button>
  </Flex>
</Sticky>
```

* Sticky Progress Indicator
```tsx
<Sticky top={0} zIndex={1000} style={{ backgroundColor: 'white' }}>
  <Box p={4} borderBottom="1px solid #e5e7eb">
    <Flex justify="space-between" align="center" mb={2}>
      <Text fontWeight="medium">Complete Your Profile</Text>
      <Text color="gray.600">60%</Text>
    </Flex>
    <Progress value={60} />
  </Box>
</Sticky>
```

* E-Commerce Patterns
Sticky Add to Cart Bar
```tsx
<Sticky bottom={0} zIndex={1000} style={{ backgroundColor: 'white', borderTop: '1px solid #e5e7eb' }}>
  <Flex justify="space-between" align="center" p={4}>
    <Box>
      <Text fontWeight="bold" fontSize="xl">$299.99</Text>
      <Text color="gray.600" fontSize="sm">In stock • Free shipping</Text>
    </Box>
    <HStack gap={3}>
      <Button variant="outline" size="lg"><Icon name="heart" /> Save</Button>
      <Button size="lg" width="200px"><Icon name="shopping-cart" /> Add to Cart</Button>
    </HStack>
  </Flex>
</Sticky>
```

* Advanced Patterns
Multiple Sticky Headers
```tsx
<Box>
  <Sticky top={0}><MainHeader /></Sticky>
  <Sticky top={64}><SubNav /></Sticky>
  <Sticky top={128}><TableHeader /></Sticky>
  <Box mt={128}><DataTable /></Box>
</Box>
```

*  Conditional Sticky Behavior
```tsx
const [isScrolled, setIsScrolled] = useState(false);

<Sticky 
  top={0}
  enabled={isScrolled}
  style={{
    backgroundColor: isScrolled ? 'white' : 'transparent',
    transition: 'background-color 0.3s ease'
  }}
  shadow={isScrolled ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'}
>
  <Header />
</Sticky>
```

* Responsive Sticky
```tsx
<Sticky 
  top={{ mobile: 0, desktop: 100 }}
  enabled={{ mobile: true, desktop: false }}
  style={{ backgroundColor: 'white', width: { mobile: '100%', desktop: '300px' } }}
>
  <Sidebar />
</Sticky>
```

## 💡 Best Practices
# ✅ Do

* Use appropriate zIndex values

* Add shadow for visual separation

* Adjust top offsets to avoid overlap

* Optimize for mobile responsiveness

* Test on long pages and varying screen sizes

# ❌ Don’t

* Stack too many sticky layers

* Use on every small element

* Ignore layout shifts or performance

* Overlap content without offset

## ⚙️ Performance Tips
```tsx
// ✅ Disable on mobile for performance
<Sticky enabled={!isMobile}><Sidebar /></Sticky>

// ✅ Use lightweight styles
<Sticky top={0} style={{ willChange: 'transform' }}><Header /></Sticky>

// ❌ Avoid unnecessary nesting
<Box>
  <Sticky top={0}><Header1 /></Sticky>
  <Sticky top={50}><Header2 /></Sticky>
  <Sticky top={100}><Header3 /></Sticky>
</Box>
```

## ♿ Accessibility
```tsx
// Provide context
<Sticky top={0}>
  <header role="banner">
    <Navigation />
  </header>
</Sticky>

// Use ARIA labels
<Sticky top={0} aria-label="Main navigation">
  <Nav />
</Sticky>
```

## 🔧 Technical Details

| Property        | Value                                             |
| --------------- | ------------------------------------------------- |
| Technique       | IntersectionObserver + CSS `position: sticky`     |
| Placeholder     | Preserves layout while sticky                     |
| Performance     | Debounced scroll updates                          |
| Browser Support | Modern browsers                                   |
| Fallback        | Graceful degradation without IntersectionObserver |


# CSS Implementation
```css
.sticky-element {
  position: relative;
}

.sticky-element.sticky {
  position: fixed;
  top: 0;
  z-index: 1000;
}
```

# 🧪 Testing
✅ Default positioning
✅ Top/bottom/side offsets
✅ Z-index priority
✅ Conditional enablement
✅ Shadow rendering
✅ Placeholder logic
✅ IntersectionObserver setup
✅ Style and props merging
✅ Children rendering

```bash
Test Suites: 1 passed, 1 total
Tests:       14 passed, 14 total
```

# 📊 Status

| Property        | Value                                            |
| --------------- | ------------------------------------------------ |
| Version         | 1.0.0                                            |
| Features        | Multi-directional sticky, responsive, performant |
| Test Coverage   | ✅ 100% (14/14 tests)                             |
| Browser Support | ✅ Modern browsers                                |
| Status          | ✅ Production Ready                               |


# 🎯 Use Cases Summary

| Use Case             | Example                  | Complexity |
| -------------------- | ------------------------ | ---------- |
| Headers              | Site or app header       | Simple     |
| Table Headers        | Data grid headers        | Medium     |
| Sidebars             | Filters, TOC             | Simple     |
| Banners              | Notifications, alerts    | Simple     |
| Progress Bars        | Reading or form progress | Medium     |
| Cart Bars            | “Add to Cart” section    | Simple     |
| Multi-Header Layouts | Nested sticky layers     | Complex    |


The Sticky component provides a robust, performant, and flexible solution for keeping critical UI elements visible during scroll.
It enhances usability and navigation flow while maintaining optimal layout performance.