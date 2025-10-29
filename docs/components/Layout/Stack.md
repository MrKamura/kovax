# 📐 Stack Components

The **Stack components** — `Stack`, `HStack`, and `VStack` — provide a flexible and consistent way to arrange elements horizontally or vertically with automatic spacing, alignment, and responsive layout behavior.
All Stack components are built on top of the **Box** component, inheriting its full range of layout, spacing, and style props.

---

## 📦 Import

```tsx
import { Stack, HStack, VStack } from 'kovax-react';
```

## 🚀 Quick Start
* Basic Stacks

```tsx
// Horizontal stack
<HStack gap={16}>
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</HStack>

// Vertical stack
<VStack gap={24}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</VStack>
```

* Nested Stacks

```tsx
<VStack gap={32}>
  <HStack gap={16} justify="space-between">
    <Heading>Dashboard</Heading>
    <Button>Refresh</Button>
  </HStack>

  <HStack gap={24} wrap="wrap">
    <StatCard title="Users" value="1,234" />
    <StatCard title="Revenue" value="$12,345" />
    <StatCard title="Growth" value="+12%" />
  </HStack>
</VStack>
```

## ⚙️ Stack (Universal Base)

The base Stack component supports all flexbox directions:
row, column, row-reverse, and column-reverse.

```tsx
<Stack direction="row" gap={16}>
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</Stack>

<Stack direction="column" gap={24}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
</Stack>
```


## ➡️ HStack (Horizontal Stack)
Arranges children horizontally in a single row using Flexbox.

* Basic Usage
```tsx
<HStack gap={8}>
  <Icon name="user" />
  <Text>John Doe</Text>
  <Badge>Pro</Badge>
</HStack>
```

* Alignment Options
```tsx
// Left aligned (default)
<HStack justify="flex-start" />

// Center aligned
<HStack justify="center" />

// Right aligned
<HStack justify="flex-end" />

// Space between
<HStack justify="space-between" />
```

* Vertical Alignment
```tsx
<HStack align="flex-start">Top</HStack>
<HStack align="center">Center</HStack>
<HStack align="flex-end">Bottom</HStack>
<HStack align="stretch">Stretch</HStack>
```

* Wrapping
```tsx
<HStack wrap="wrap" gap={16}>
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>CSS</Tag>
  <Tag>Node.js</Tag>
</HStack>
```

* Reverse Order
```tsx
<HStack reverse>
  <div>First (appears last)</div>
  <div>Last (appears first)</div>
</HStack>
```

* With Spacing Props
```tsx
<HStack
  gap={16}
  m={24}
  p={16}
  w="100%"
  maxW="800px"
  backgroundColor="white"
  borderRadius={8}
>
  <div>Styled container</div>
  <div>With full spacing support</div>
</HStack>
```

## ⬇️ VStack (Vertical Stack)
Arranges children vertically in a column with flexible alignment and spacing.

* Basic Usage
```tsx
<VStack gap={16}>
  <FormLabel>Username</FormLabel>
  <Input placeholder="Enter username" />
  <FormHelperText>Choose a unique username</FormHelperText>
</VStack>
```

* Alignment Options
```tsx
<VStack align="flex-start">Left</VStack>
<VStack align="center">Center</VStack>
<VStack align="flex-end">Right</VStack>
<VStack align="stretch">Stretch</VStack>
```

* Vertical Distribution
```tsx
<VStack justify="flex-start">Top</VStack>
<VStack justify="center">Center</VStack>
<VStack justify="flex-end">Bottom</VStack>
<VStack justify="space-between" h="200px">
  <div>Top</div>
  <div>Bottom</div>
</VStack>
``` 

* Reverse Order
```tsx
<VStack reverse>
  <div>First (appears last)</div>
  <div>Last (appears first)</div>
</VStack>
``` 

* With Spacing Props
```tsx
<VStack
  gap={20}
  m={16}
  p={24}
  backgroundColor="#f8f9fa"
  borderRadius={12}
  border="1px solid #e9ecef"
>
  <Heading>Settings</Heading>
  <FormControl>
    <FormLabel>Theme</FormLabel>
    <Select>
      <option>Light</option>
      <option>Dark</option>
      <option>System</option>
    </Select>
  </FormControl>
</VStack>
``` 

## 🎛️ Props Reference
Common Stack Props

| Prop          | Type                                                        | Default                               | Description                            |
| ------------- | ----------------------------------------------------------- | ------------------------------------- | -------------------------------------- |
| `gap`         | `number` | `string`                                         | `0`                                   | Space between child elements           |
| `align`       | `string`                                                    | `center` (HStack), `stretch` (VStack) | Cross-axis alignment                   |
| `justify`     | `string`                                                    | `flex-start`                          | Main-axis alignment                    |
| `wrap`        | `string`                                                    | `nowrap`                              | Flex wrapping behavior                 |
| `reverse`     | `boolean`                                                   | `false`                               | Reverse item order                     |
| `direction`   | `'row'` | `'column'` | `'row-reverse'` | `'column-reverse'` | `'row'` (Stack only)                  | Layout direction                       |
| All Box Props | —                                                           | —                                     | Full support for margin, padding, etc. |



## 🎯 Real-World Examples
* Navigation Bar

```tsx
<HStack justify="space-between" align="center" p={16} backgroundColor="white" borderBottom="1px solid #e5e7eb">
  <HStack gap={24}>
    <Logo size={32} />
    <HStack gap={16}>
      <NavLink>Home</NavLink>
      <NavLink>About</NavLink>
      <NavLink>Contact</NavLink>
    </HStack>
  </HStack>

  <HStack gap={12}>
    <Button variant="outline">Login</Button>
    <Button>Sign Up</Button>
  </HStack>
</HStack>
``` 

* Settings Panel
```tsx
<VStack gap={32} maxW="600px" m="0 auto" p={24}>
  <HStack justify="space-between" align="center">
    <VStack gap={4}>
      <Heading size="lg">Profile Settings</Heading>
      <Text color="gray.600">Manage your account preferences</Text>
    </VStack>
    <Avatar size="lg" name="John Doe" />
  </HStack>

  <VStack gap={24}>
    <HStack gap={16}>
      <FormControl flex={1}>
        <FormLabel>First Name</FormLabel>
        <Input placeholder="John" />
      </FormControl>

      <FormControl flex={1}>
        <FormLabel>Last Name</FormLabel>
        <Input placeholder="Doe" />
      </FormControl>
    </HStack>

    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type="email" placeholder="john@example.com" />
    </FormControl>

    <HStack gap={12} justify="flex-end">
      <Button variant="outline">Cancel</Button>
      <Button>Save Changes</Button>
    </HStack>
  </VStack>
</VStack>
``` 

* Card Grid
```tsx
<VStack gap={32}>
  <HStack justify="space-between" align="center">
    <Heading>Projects</Heading>
    <Button>New Project</Button>
  </HStack>

  <HStack gap={24} wrap="wrap">
    <Card w="300px">
      <VStack gap={16}>
        <HStack justify="space-between" align="center">
          <Heading size="md">E-commerce Site</Heading>
          <Badge color="green">Active</Badge>
        </HStack>
        <Text>Online store with React and Node.js</Text>
        <HStack gap={8} wrap="wrap">
          <Tag>React</Tag>
          <Tag>TypeScript</Tag>
          <Tag>Node.js</Tag>
        </HStack>
      </VStack>
    </Card>

    <Card w="300px">
      <VStack gap={16}>
        <HStack justify="space-between" align="center">
          <Heading size="md">Mobile App</Heading>
          <Badge color="blue">In Progress</Badge>
        </HStack>
        <Text>Cross-platform React Native application</Text>
        <HStack gap={8} wrap="wrap">
          <Tag>React Native</Tag>
          <Tag>TypeScript</Tag>
          <Tag>Firebase</Tag>
        </HStack>
      </VStack>
    </Card>
  </HStack>
</VStack>
``` 

## 💡 Best Practices
# ✅ Do

* Use HStack for horizontal layouts (e.g., navbars, button groups)

* Use VStack for vertical layouts (e.g., forms, cards)

* Maintain consistent gap values (8, 16, 24, 32)

* Use wrap="wrap" for responsive layouts

* Combine with spacing props for consistent outer padding

* Set justify and align for precise control

# ❌ Don’t

* Deeply nest multiple stacks unnecessarily

* Use fixed widths where flex works better

* Overuse reverse (can confuse layout)

* Mix inconsistent spacing values

# 🔧 Technical Details
* Built on: Box component

* Supports: All spacing, style, and event props

* Performance: Lightweight, memoized, tree-shakeable

* Dependencies: React 16+, Box component

* Browser Support: All modern browsers

# 🧪 Testing
✅ Layout and alignment validation
✅ Gap and spacing tests
✅ Reverse order behavior
✅ Props propagation
✅ Integration with Box

Test Coverage: 100% (23/23 passing)


# 📊 Status

| Property          | Value                                                           |
| ----------------- | --------------------------------------------------------------- |
| **Version**       | 1.0.0                                                           |
| **Features**      | Flexbox layout, TypeScript, Box integration, Full spacing props |
| **Test Coverage** | ✅ 100%                                                          |
| **Status**        | ✅ Production Ready                                              |
