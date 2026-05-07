# Stack, HStack, VStack

Flex stacks built on **`Box`**: `display: flex` with shorthand `direction` / `align` / `justify` / `wrap` (and **`gap`** from spacing). **`HStack`** and **`VStack`** fix direction and support **`reverse`**.

## Import

```tsx
import { Stack, HStack, VStack } from "kovax-react";
```

## Usage

```tsx
<HStack gap={16} justify="flex-end">
  <Button variant="outline">Cancel</Button>
  <Button variant="solid" color="primary">
    Save
  </Button>
</HStack>

<VStack gap={24} align="stretch">
  <FormLabel htmlFor="user">Username</FormLabel>
  <Input id="user" />
  <FormHelperText>Choose a unique name.</FormHelperText>
</VStack>

<Stack direction="row-reverse" gap={8} wrap="wrap">
  <span>One</span>
  <span>Two</span>
</Stack>

<HStack reverse gap={8}>
  <span>Appears second in DOM, first visually (row-reverse)</span>
  <span>First in DOM</span>
</HStack>
```

## Props

**`Stack`**

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `direction` | `row` \| `column` \| `row-reverse` \| `column-reverse` | `row` | `flex-direction` |
| `align` | flex `align-items` | `center` (`VStack` default is `stretch` via component) | |
| `justify` | flex `justify-content` | `flex-start` | |
| `wrap` | `nowrap` \| `wrap` \| `wrap-reverse` | `nowrap` | |

**`HStack` / `VStack`:** same as `Stack` except `direction` is fixed (`row` or `column`) and optional **`reverse`** flips to `*-reverse`. By default **`VStack`** uses `align="stretch"`; **`HStack`** uses `Stack`’s default `align="center"`.

All **`BaseBoxProps`** / **`SpacingProps`**: `gap`, `m`, `p`, `w`, `flexGrow`, event handlers, `ref`, etc.

There is **no** responsive object API on these props (`gap={{ mobile: 8 }}` is not supported). Use CSS or conditional props in your app.

## Layout patterns

**Toolbar:**

```tsx
<HStack justify="space-between" align="center" p={16} w="100%">
  <span style={{ fontWeight: 600 }}>App</span>
  <HStack gap={12}>
    <a href="/docs">Docs</a>
    <Button variant="outline" size="sm">
      Log in
    </Button>
  </HStack>
</HStack>
```

**Form column:**

```tsx
<VStack gap={16} align="stretch" maxW={480}>
  <FormControl>
    <FormLabel htmlFor="e">Email</FormLabel>
    <Input id="e" type="email" />
  </FormControl>
  <Button type="submit">Submit</Button>
</VStack>
```

## Tests

- `src/components/Layout/__tests__/Stack.test.tsx`
- `src/components/Layout/__tests__/HStack.test.tsx`
- `src/components/Layout/__tests__/VStack.test.tsx`
- `src/components/Layout/__tests__/StackIntegration.test.tsx`

Run `npm test` in the repository.

## Meta

Package version: root `package.json`.
