## 📦 Container Component

The **Container** component is a foundational layout wrapper in Kovax UI.
It constrains content width, centers layouts, and maintains consistent horizontal padding across screen sizes — ensuring optimal readability and a clean, responsive structure.

## 📦 Import
```tsx
import { Container } from "kovax-react";
```

## 🚀 Quick Start
* Basic Usage
```tsx
// Default container (1024px max width, centered)
<Container>
  <Header />
  <MainContent />
  <Footer />
</Container>

// Small container for forms
<Container maxW="sm">
  <LoginForm />
</Container>

// Full-width container for hero sections
<Container maxW="full" center={false}>
  <HeroSection />
</Container>
```

* Responsive Example
```tsx
<Container
  maxW={{ mobile: "full", tablet: "md", desktop: "lg" }}
  padding={{ mobile: 4, tablet: 6, desktop: 8 }}
>
  <Content />
</Container>
```

## ⚙️ Props Reference

| Prop            | Type                                                                  | Default | Description                                   |
| --------------- | --------------------------------------------------------------------- | ------- | --------------------------------------------- |
| `maxW`          | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full' \| number \| string` | `'lg'`  | Maximum width constraint                      |
| `center`        | `boolean`                                                             | `true`  | Centers the container horizontally            |
| `padding`       | `number \| string`                                                    | `—`     | Inner padding                                 |
| *All Box Props* | —                                                                     | —       | Supports all Box component props except width |

## 📏 Size Presets

| Preset | Width  | Use Case                      |
| ------ | ------ | ----------------------------- |
| `sm`   | 640px  | Forms, modals, narrow content |
| `md`   | 768px  | Blog posts, documentation     |
| `lg`   | 1024px | Default for most layouts      |
| `xl`   | 1280px | Wide dashboards               |
| `2xl`  | 1536px | Extra wide layouts            |
| `full` | 100%   | Full-width sections           |

## 🎯 Real-World Examples
## 🧭 Standard Website Layout
```tsx
<Box minH="100vh" backgroundColor="gray.50">
  <Box as="header" backgroundColor="white" borderBottom="1px solid" borderColor="gray.200">
    <Container>
      <Flex justify="space-between" align="center" py={4}>
        <Logo />
        <Navigation />
        <UserMenu />
      </Flex>
    </Container>
  </Box>

  <Box as="main" flex={1} py={8}>
    <Container>
      <VStack gap={8}>
        <Heading size="2xl">Welcome to Kovax UI</Heading>
        <Text fontSize="lg">Build modern products with simplicity and speed.</Text>
        <Button size="lg">Get Started</Button>
      </VStack>
    </Container>
  </Box>

  <Box as="footer" backgroundColor="gray.900" color="white" py={8}>
    <Container>
      <Text>© 2025 Kovax UI — All rights reserved.</Text>
    </Container>
  </Box>
</Box>
```

## 🔐 Authentication Form
```tsx
<Center minH="100vh" backgroundColor="gray.100" p={4}>
  <Container maxW="sm" backgroundColor="white" borderRadius={12} p={8} boxShadow="lg">
    <VStack gap={6}>
      <Heading size="lg">Sign In</Heading>
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button w="100%">Continue</Button>
    </VStack>
  </Container>
</Center>
```

## ⚙️ Settings Panel
```tsx
<Container maxW="2xl">
  <VStack gap={8} align="stretch">
    <Heading size="xl">Account Settings</Heading>

    <Grid columns={{ mobile: 1, tablet: 2 }} gap={6}>
      <Input placeholder="First Name" />
      <Input placeholder="Last Name" />
      <Input gridColumn="1 / -1" placeholder="Email Address" />
    </Grid>

    <Flex justify="flex-end" gap={4}>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </Flex>
  </VStack>
</Container>
```

## 📰 Blog Post
```tsx
<Container maxW="md">
  <VStack gap={8}>
    <Heading>The Future of Web Development</Heading>
    <Text color="gray.600">By Aleksey Alekseev — March 2025</Text>
    <Text>
      Kovax UI provides developers with composable, fast, and typed components to
      accelerate modern web development.
    </Text>
  </VStack>
</Container>
```

## 💡 Best Practices

# ✅ Do

* Use appropriate maxW sizes for content type

* Use responsive values for maxW and padding

* Combine with Center for full centering

* Use consistent vertical spacing with py

* Nest containers for mixed-width sections

# ❌ Don’t

* Override container width manually

* Use multiple containers in small sections

* Mix inconsistent size presets

#  🧪 Testing

✅ Default container behavior
✅ All size presets (sm, md, lg, xl, 2xl, full)
✅ Responsive widths
✅ Padding and centering logic
✅ Style merging
✅ Prop forwarding

Test Coverage: 100% (11/11 tests passing)

# 🔧 Technical Details
| Property           | Value                 |
| ------------------ | --------------------- |
| **Built on**       | Box component         |
| **Performance**    | Memoized, lightweight |
| **Bundle Size**    | ~1.0KB gzipped        |
| **Dependencies**   | React 16.8+, Box      |
| **TypeScript**     | Fully typed           |
| **Tree-shakeable** | ✅ Yes                 |

# 🎨 Theme Integration
```tsx
// Using theme breakpoints
<Container maxW="container.lg">
  <Content />
</Container>

// Using theme spacing
<Container padding="spacing.xl">
  <Content />
</Container>
```

# 📊 Status

| Property          | Value                                                   |
| ----------------- | ------------------------------------------------------- |
| **Version**       | 1.0.0                                                   |
| **Features**      | Responsive width constraints, centering, full Box props |
| **Test Coverage** | ✅ 100%                                                  |
| **Status**        | ✅ Production Ready                                      |
