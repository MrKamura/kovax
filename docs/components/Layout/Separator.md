## 📏 Separator Component

The **Separator** component is a visual divider used to separate sections, list items, or content groups.
It helps establish clear visual hierarchy and improve content readability through clean, consistent horizontal or vertical dividers.

```tsx
## 📦 Import
import { Separator } from "kovax-react";
```

## 🚀 Quick Start
```tsx
* Basic Usage
// Horizontal separator (default)
<Separator />

// Vertical separator
<Separator orientation="vertical" />

// Custom thickness
<Separator size={2} />

// Custom color
<Separator color="blue.200" />
```

* With Spacing
```tsx
// Uniform margin
<Separator margin={16} />

// Individual spacing
<Separator my={8} />

// Inline within content
<VStack gap={4}>
  <Heading>Section 1</Heading>
  <Text>Content for section 1</Text>
  <Separator my={8} />
  <Heading>Section 2</Heading>
  <Text>Content for section 2</Text>
</VStack>
```

## ⚙️ Props Reference

| Prop            | Type                          | Default        | Description                             |
| --------------- | ----------------------------- | -------------- | --------------------------------------- |
| `orientation`   | `"horizontal"` | `"vertical"` | `"horizontal"` | Divider direction                       |
| `size`          | `number \| string`            | `1`            | Thickness (height or width)             |
| `color`         | `string`                      | `"gray.200"`   | Color of the separator line             |
| `margin`        | `number \| string`            | —              | Uniform margin around separator         |
| *All Box Props* | —                             | —              | Supports spacing, borders, sizing, etc. |

## 🎯 Examples
## 📚 Section Dividers
```tsx
<VStack gap={6}>
  <Heading>Account Settings</Heading>
  <Text>Manage your personal information and preferences</Text>

  <Separator />

  <Heading size="md">Profile Information</Heading>
  <Grid columns={2} gap={4}>
    <FormControl>
      <FormLabel>First Name</FormLabel>
      <Input value="John" />
    </FormControl>
    <FormControl>
      <FormLabel>Last Name</FormLabel>
      <Input value="Doe" />
    </FormControl>
  </Grid>

  <Separator my={6} />

  <Heading size="md">Security Settings</Heading>
  <VStack gap={4}>
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type="email" value="john@example.com" />
    </FormControl>
    <Button alignSelf="flex-start">Change Password</Button>
  </VStack>
</VStack>
```

## ⚙️ Settings List

```tsx
<Card maxW="400px">
  <VStack gap={0}>
    <Box p={4}>
      <Heading size="md">App Settings</Heading>
    </Box>

    <Separator />

    <Flex justify="space-between" align="center" p={4}>
      <Text fontWeight="medium">Dark Mode</Text>
      <Switch />
    </Flex>

    <Separator />

    <Flex justify="space-between" align="center" p={4}>
      <Text fontWeight="medium">Language</Text>
      <Text color="gray.600">English</Text>
    </Flex>
  </VStack>
</Card>
```

## 🧭 Breadcrumb Navigation
```tsx
<HStack gap={3} align="center">
  <Link href="/" color="blue.600" fontSize="sm">Home</Link>
  <Separator orientation="vertical" size={1} height={12} />
  <Link href="/products" color="blue.600" fontSize="sm">Products</Link>
  <Separator orientation="vertical" size={1} height={12} />
  <Text color="gray.600" fontSize="sm" fontWeight="medium">Smartphones</Text>
</HStack>
```

## 💬 Comment Thread
```tsx
<VStack gap={4}>
  <Box p={4} backgroundColor="gray.50" borderRadius={8}>
    <Text fontWeight="medium">John Doe</Text>
    <Text color="gray.600" mt={1}>This is a great idea! Let's move forward.</Text>
  </Box>

  <Separator />

  <Box p={4} backgroundColor="gray.50" borderRadius={8}>
    <Text fontWeight="medium">Jane Smith</Text>
    <Text color="gray.600" mt={1}>I agree with John.</Text>
  </Box>

  <Separator />

  <Box p={4} backgroundColor="blue.50" borderRadius={8}>
    <Text fontWeight="medium">You</Text>
    <Text color="gray.600" mt={1}>Thanks for the feedback!</Text>
  </Box>
</VStack>
```

## 🎨 Custom Styled Separators
```tsx
// Gradient
<Separator
  size={4}
  style={{
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "2px",
  }}
/>

// Dotted
<Separator
  size={2}
  style={{
    background: "repeating-linear-gradient(90deg, #000, #000 2px, transparent 2px, transparent 4px)",
  }}
/>

// Dashed
<Separator
  size={1}
  style={{
    borderBottom: "1px dashed #e2e8f0",
  }}
/>
```

## 🧱 Responsive Separators
```tsx
<Flex
  direction={{ mobile: "column", tablet: "row" }}
  gap={{ mobile: 4, tablet: 8 }}
>
  <Box flex={1}>
    <Heading>Content A</Heading>
  </Box>

  <Separator
    orientation={{ mobile: "horizontal", tablet: "vertical" }}
    margin={{ mobile: 16, tablet: 8 }}
    size={{ mobile: 1, tablet: 2 }}
  />

  <Box flex={1}>
    <Heading>Content B</Heading>
  </Box>
</Flex>
```

## 💡 Best Practices

# ✅ Do

* Use separators to group related sections

* Maintain consistent spacing and color

* Use vertical separators in navigation and data layouts

* Ensure sufficient contrast for accessibility

# ❌ Don’t

* Overuse separators (use whitespace where possible)

* Use overly thick or bright dividers

* Ignore dark mode contrast

* Replace borders with separators unnecessarily

# ♿ Accessibility
```tsx
// Semantic separator with ARIA role
<Box role="separator" aria-orientation="horizontal">
  <Separator />
</Box>

// Ensure contrast
<Separator color="gray.300" />
```

# 🧪 Testing

✅ Horizontal & vertical rendering
✅ Custom size and color props
✅ Margin and spacing behavior
✅ Style merging
✅ Box prop inheritance
✅ Responsive orientation

Test Coverage: 100% (11/11 passing)

# 🔧 Technical Details

| Property          | Value                                                     |
| ----------------- | --------------------------------------------------------- |
| **Version**       | 1.0.0                                                     |
| **Features**      | Horizontal/vertical orientation, size/color customization |
| **Test Coverage** | ✅ 100%                                                    |
| **Status**        | ✅ Production Ready                                        |

# 🎨 Theme Integration
```tsx
// Thematic color
<Separator color="border.primary" />

// Thematic spacing
<Separator margin="spacing.md" />

// Responsive behavior
<Separator
  orientation={{ mobile: "horizontal", desktop: "vertical" }}
  size={{ mobile: 1, desktop: 2 }}
/>
```

# 📊 Status

| Property          | Value                                                     |
| ----------------- | --------------------------------------------------------- |
| **Version**       | 1.0.0                                                     |
| **Features**      | Horizontal/vertical orientation, size/color customization |
| **Test Coverage** | ✅ 100%                                                    |
| **Status**        | ✅ Production Ready                                        |
