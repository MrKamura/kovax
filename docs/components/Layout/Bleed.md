## Perfect ✅
Here’s your Bleed component documentation, fully cleaned up and formatted to match the unified style used across your other Kovax UI docs (Box, Stack, Flex, Grid, etc.).

## 🎯 Bleed Component

The Bleed component lets content extend (“bleed”) beyond its parent container’s boundaries — perfect for creating full-width or edge-to-edge sections within a constrained layout. It helps achieve visually impactful designs while maintaining responsive alignment and spacing control.

## 📦 Import
import { Bleed } from 'kovax-react';

## 🚀 Quick Start
# Basic Usage
```tsx
// Bleed on all sides
<Bleed all={16}>
  <Box backgroundColor="blue.500" color="white" p={4}>
    Full-bleed section
  </Box>
</Bleed>

// Horizontal bleed only
<Bleed horizontal={24}>
  <Box backgroundColor="gray.100" p={4}>
    Full-width horizontally
  </Box>
</Bleed>

// Individual side control
<Bleed left={32} right={32}>
  <Box backgroundColor="green.500" color="white" p={4}>
    Custom side bleeding
  </Box>
</Bleed>
```

# Inside a Container
```tsx
<Container>
  <Box p={6}>
    <Heading>Regular Content</Heading>
    <Text>This content stays within the container bounds.</Text>

    <Bleed horizontal={24}>
      <Box backgroundColor="red.500" color="white" p={4} mt={4}>
        This section bleeds outside the container horizontally
      </Box>
    </Bleed>

    <Text mt={4}>Back to normal container flow.</Text>
  </Box>
</Container>
```

## ⚙️ Props Reference

| Prop         | Type            | Default | Description        |
| ------------ | --------------- | ------- | ------------------ |
| `all`        | number | string | —       | Bleed on all sides |
| `horizontal` | number | string | —       | Left + right bleed |
| `vertical`   | number | string | —       | Top + bottom bleed |
| `top`        | number | string | —       | Top bleed only     |
| `right`      | number | string | —       | Right bleed only   |
| `bottom`     | number | string | —       | Bottom bleed only  |
| `left`       | number | string | —       | Left bleed only    |


# Priority Order:

* Individual sides (top, right, bottom, left)

* Axes (horizontal, vertical)

* Global (all)

* All Box props are inherited — including spacing, sizing, color, and style.

## 🎯 Real-World Examples
# Full-Width Hero Section

```tsx
<Bleed all={0}>
  <Box backgroundColor="blue.600" color="white" py={20}>
    <Container>
      <VStack gap={6} textAlign="center">
        <Heading size="3xl">Build Amazing Products</Heading>
        <Text fontSize="xl">The complete platform for modern web development</Text>
        <HStack gap={4} justify="center">
          <Button size="lg" backgroundColor="white" color="blue.600">Get Started</Button>
          <Button size="lg" variant="outline" borderColor="white" color="white">View Demo</Button>
        </HStack>
      </VStack>
    </Container>
  </Box>
</Bleed>
```

# Feature Section with Bleeding Backgrounds
```tsx
<Container>
  <VStack gap={16} py={16}>
    <Bleed horizontal={32}>
      <Box backgroundColor="blue.50" borderRadius={16} p={8}>
        <Grid templateColumns={{ mobile: "1fr", desktop: "1fr 1fr" }} gap={8}>
          <VStack gap={4}>
            <Heading size="xl">Lightning Fast</Heading>
            <Text>Optimized for sub-second load times and smooth animations.</Text>
          </VStack>
          <Image src="/performance-chart.svg" alt="Performance" width="100%" />
        </Grid>
      </Box>
    </Bleed>
  </VStack>
</Container>
```

# Responsive Bleed with Breakpoints
```tsx
<Bleed horizontal={{ mobile: 16, tablet: 32, desktop: 48 }}>
  <Box 
    backgroundColor="purple.100"
    borderRadius={{ mobile: 8, desktop: 16 }}
    p={{ mobile: 4, desktop: 8 }}
    textAlign="center"
  >
    <Heading size={{ mobile: "lg", desktop: "xl" }}>Adaptive Bleed Section</Heading>
    <Text>This section bleeds more on larger screens.</Text>
  </Box>
</Bleed>
```

# Pricing Cards (Highlight with Bleed)
```tsx
<Box position="relative">
  <Bleed all={4}>
    <Card p={8} border="2px solid" borderColor="blue.500">
      <Badge backgroundColor="blue.500" color="white">Most Popular</Badge>
      <Heading>Pro Plan</Heading>
      <Text>$49/mo</Text>
      <Button width="100%" size="lg">Get Started</Button>
    </Card>
  </Bleed>
</Box>
```

## 💡 Best Practices

# ✅ Do

* Use for emphasis and full-width visuals.

* Combine with Container for structured layouts.

* Use responsive values for different breakpoints.

# ❌ Don’t

* Overuse — only use when necessary.

* Forget mobile overflow behavior.

* Apply excessive bleed amounts that break layout.

## 🧪 Testing

# ✅ Verified behaviors include:

* All-sided, axis-based, and side-specific bleed

* Priority rules

* Box prop inheritance

* Responsive values

* Negative margin handling

* Test Coverage: 100% (12/12 passing)

## 🔧 Technical Details

| Property           | Value                               |
| ------------------ | ----------------------------------- |
| **Built on**       | Box component with negative margins |
| **Performance**    | Memoized, lightweight               |
| **Bundle Size**    | ~1.1 KB gzipped                     |
| **Dependencies**   | React 16.8+, Box                    |
| **TypeScript**     | Fully typed                         |
| **Tree-shakeable** | ✅                                   |
| **Status**         | ✅ Production Ready                  |

## 🎨 Theme Integration
```tsx
// Using theme spacing
<Bleed all="spacing.xl">
  <Content />
</Bleed>

// Using responsive theme breakpoints
<Bleed horizontal={{ mobile: "spacing.md", desktop: "spacing.xl" }}>
  <Content />
</Bleed>

// Using theme colors
<Bleed all={32}>
  <Box backgroundColor="primary.50">
    <Content />
  </Box>
</Bleed>
```