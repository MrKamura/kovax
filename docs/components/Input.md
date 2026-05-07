## Input

Text field with optional mask, validation-related props, shared spacing props, and `forwardRef` to the native `<input>`.

## Import
```tsx
import { Input } from "kovax-react";
```

## Basic usage
```tsx
<Input placeholder="Enter your name" />
<Input value={value} onChange={handleChange} placeholder="Controlled" />

<Input 
  mask="+7 (999) 999-99-99"
  placeholder="+7 (___) ___-__-__"
/>

<Input 
  type="email" 
  placeholder="email@example.com"
  isRequired
/>
```

## Props reference

Behaviour and layout types extend `InputHTMLAttributes<HTMLInputElement>` (except `size`, `style`, and `color`, which are used by the styling API) and **`SpacingProps`**.

**Visual and state**

- `size` — `"sm"` \| `"md"` \| `"lg"` (default `"md"`)
- `colorScheme` — keyof exported `colors` (e.g. `"primary"`, `"secondary"`, `"error"`)
- `isInvalid`, `errorMessage`, `isDisabled`, `isReadOnly`, `isRequired`
- `mask` — string pattern: `9` digit, `a`/`A` letter, `*` any; other chars are fixed separators
- `maskChar` — placeholder for empty slots (default `"_"`)

**Spacing**

Any `SpacingProps` field applies to the input (`w`, `h`, `m`, `p`, `display`, …). See [`Box`](./Layout/Box.md) / `src/types/spacing.ts`.

**Ref**

`Input` is a `forwardRef` component; the ref attaches to the native `<input>`.

## Composition example

```tsx
import { Box, Input, shadows, sizes } from "kovax-react";

<Box w={400} p={16} boxShadow={shadows.sm} borderRadius={sizes.borderRadius.md}>
  <Input placeholder="Inside Box" w="100%" />
</Box>
```

## Implementation notes

- Masking is implemented in the component; there is no `react-input-mask` dependency.
- Border, shadow, and transitions use `src/components/theme/tokens.ts`.

## Meta

- Package version: root `package.json`
- Tests: `src/components/Input/__tests__/`