## 🎯 Center Component

The **Center** component is a simple yet powerful layout utility for centering content both horizontally and vertically using Flexbox.
Ideal for loading states, modals, empty states, and feature highlights, it ensures perfect alignment with minimal code.

## 📦 Import
```tsx
import { Center } from "kovax-react";
```

## 🚀 Quick Start
* Basic Centering

```tsx
// Center both horizontally and vertically (default)
<Center>
  <Button>Centered Content</Button>
</Center>

// Full viewport center
<Center minH="100vh">
  <LoginForm />
</Center>
```

* Directional Centering
```tsx
// Horizontal only
<Center horizontal vertical={false}>
  <Text>Horizontally centered</Text>
</Center>

// Vertical only
<Center horizontal={false} vertical>
  <Text>Vertically centered</Text>
</Center>
```

* Inline Centering
```tsx
// Inline flex centering
<Center inline>
  <Icon name="star" />
  <Text>Inline centered</Text>
</Center>
```

## ⚙️ Props Reference

| Prop            | Type               | Default | Description                                    |
| --------------- | ------------------ | ------- | ---------------------------------------------- |
| `horizontal`    | `boolean`          | `true`  | Centers content horizontally                   |
| `vertical`      | `boolean`          | `true`  | Centers content vertically                     |
| `center`        | `boolean`          | `true`  | Centers both axes (overrides individual props) |
| `inline`        | `boolean`          | `false` | Uses `inline-flex` instead of `flex`           |
| `minW`          | `number \| string` | —       | Minimum width                                  |
| `minH`          | `number \| string` | —       | Minimum height                                 |
| `maxW`          | `number \| string` | —       | Maximum width                                  |
| `maxH`          | `number \| string` | —       | Maximum height                                 |
| *All Box Props* | —                  | —       | Supports full Box component API                |

## 🎯 Examples
## 🌀 Loading Screen
```tsx
<Center minH="100vh" backgroundColor="gray.50">
  <VStack gap={16} align="center">
    <Spinner size="lg" />
    <Heading size="lg">Loading Application</Heading>
    <Text color="gray.600">Please wait while we load your content</Text>
  </VStack>
</Center>
```

## ⚠️ Error Boundary
```tsx
<Center minH="100vh" backgroundColor="white">
  <VStack gap={24} align="center" maxW="400px">
    <Icon name="warning" size={64} color="red.500" />
    <VStack gap={8} align="center">
      <Heading size="xl">Something went wrong</Heading>
      <Text color="gray.600" align="center">
        We encountered an unexpected error. Please try refreshing the page.
      </Text>
    </VStack>
    <HStack gap={12}>
      <Button variant="outline" onClick={onGoBack}>Go Back</Button>
      <Button onClick={onRefresh}>Refresh</Button>
    </HStack>
  </VStack>
</Center>
```

## 💬 Modal & Overlay Pattern
```tsx
<Center
  position="fixed"
  top={0}
  left={0}
  right={0}
  bottom={0}
  backgroundColor="rgba(0, 0, 0, 0.5)"
  zIndex={1000}
>
  <Center
    width="90%"
    maxW="500px"
    backgroundColor="white"
    borderRadius={12}
    p={32}
    boxShadow="xl"
  >
    <VStack gap={24} width="100%">
      <VStack gap={8}>
        <Heading size="lg">Delete Confirmation</Heading>
        <Text color="gray.600">
          Are you sure you want to delete this item? This action cannot be undone.
        </Text>
      </VStack>

      <HStack gap={12} justify="flex-end">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button color="red" onClick={onConfirm}>Delete</Button>
      </HStack>
    </VStack>
  </Center>
</Center>
```

## 🧩 Feature Card
```tsx
<Center
  width="280px"
  height="200px"
  backgroundColor="white"
  borderRadius={12}
  border="1px solid"
  borderColor="gray.200"
  p={24}
>
  <VStack gap={12} align="center">
    <Center
      width={48}
      height={48}
      backgroundColor="blue.50"
      borderRadius="full"
    >
      <Icon name="shield" size={24} color="blue.500" />
    </Center>
    <VStack gap={4} align="center">
      <Heading size="md">Security First</Heading>
      <Text color="gray.600" align="center">
        Enterprise-grade encryption for all data
      </Text>
    </VStack>
  </VStack>
</Center>
```

## Empty State
```tsx
<Center
  minH="300px"
  backgroundColor="gray.50"
  borderRadius={8}
  border="2px dashed"
  borderColor="gray.300"
>
  <VStack gap={16} align="center">
    <Icon name="folder-open" size={48} color="gray.400" />
    <VStack gap={8} align="center">
      <Heading size="md">No projects yet</Heading>
      <Text color="gray.600">Get started by creating your first project</Text>
    </VStack>
    <Button>Create Project</Button>
  </VStack>
</Center>
```

## ⭐ Inline Usage
```tsx
<HStack gap={8}>
  <Text>Customer rating:</Text>
  <Center inline gap={4}>
    <Icon name="star" color="gold" />
    <Icon name="star" color="gold" />
    <Icon name="star" color="gold" />
    <Icon name="star" color="gold" />
    <Icon name="star-half" color="gold" />
    <Text ml={4}>4.5/5</Text>
  </Center>
</HStack>
```

## 💡 Best Practices

## ✅ Do

* Use for loading screens and modals

* Combine with minH="100vh" for full-page layouts

* Use inline for icons or badges

* Combine with Box props for consistent spacing

* Set dimensions for predictable behavior

## ❌ Don’t

* Nest multiple centers unnecessarily

* Use for text alignment only

* Forget proper z-index for overlays

* Use without defined dimensions

## 🧪 Testing

✅ Default centering behavior
✅ Inline rendering
✅ Directional centering props
✅ Responsive dimensions
✅ Style merging
✅ Prop forwarding
✅ Child rendering

Test Coverage: 100% (11/11 passing)

🔧 Technical Details
| Property           | Value                      |
| ------------------ | -------------------------- |
| **Built on**       | Box component with Flexbox |
| **Performance**    | Memoized, lightweight      |
| **Bundle Size**    | ~1.1KB gzipped             |
| **Dependencies**   | React 16.8+, Box component |
| **TypeScript**     | Fully typed                |
| **Tree-shakeable** | ✅ Yes                      |

## 🎨 Theme Integration
```tsx
// Using theme colors
<Center backgroundColor="primary.50" color="primary.700">
  <Content />
</Center>

// Using theme spacing
<Center p="spacing.xl" m="spacing.md">
  <Content />
</Center>

// Using theme breakpoints
<Center minH={{ mobile: "50vh", desktop: "100vh" }}>
  <Content />
</Center>
```

## 📊 Status

| Property          | Value                                                  |
| ----------------- | ------------------------------------------------------ |
| **Version**       | 1.0.0                                                  |
| **Features**      | Flexbox centering, inline mode, full Box props support |
| **Test Coverage** | ✅ 100%                                                 |
| **Status**        | ✅ Production Ready                                     |