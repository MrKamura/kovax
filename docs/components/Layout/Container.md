# Container

Constrained-width wrapper: default `maxW` preset `lg` (1024px), optional horizontal centering (`margin: auto`), optional `padding`, plus all `Box` props. Implemented on top of `Box`.

## Import

```tsx
import { Container } from "kovax-react";
```

## Usage

```tsx
<Container>
  <main>Page content</main>
</Container>

<Container maxW="sm">
  <form>…</form>
</Container>

<Container maxW="full" center={false}>
  <section>Full-bleed hero</section>
</Container>

<Container padding={24} maxW="md">
  Article body
</Container>
```

## `maxW` presets

| Token | Max width |
| ----- | --------- |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px (default) |
| `xl` | 1280px |
| `2xl` | 1536px |
| `full` | 100% |

Numeric values become pixel lengths; arbitrary strings (e.g. `"90%"`) are passed through.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `maxW` | preset \| `number` \| `string` | `'lg'` | Max width |
| `center` | `boolean` | `true` | `margin-left/right: auto` |
| `padding` | `number` \| `string` | — | Shorthand padding on the container |
| `height` | `number` \| `string` | — | Optional; `h` from spacing also works |

Other spacing, layout, and DOM props follow **`Box`**.

## Note on “responsive props”

The component does **not** accept objects like `maxW={{ mobile: 'full', tablet: 'lg' }}`. Use media queries, CSS variables, or separate wrappers per breakpoint.

## Example: simple page shell

```tsx
<Box as="body" minH="100vh" display="flex" flexDirection="column">
  <Box as="header" borderBottom="1px solid #e5e7eb">
    <Container>
      <HStack justify="space-between" py={16}>
        <span>Logo</span>
        <nav>Links</nav>
      </HStack>
    </Container>
  </Box>
  <Box as="main" flex={1}>
    <Container py={32}>
      <h1>Page title</h1>
      <p>Content</p>
    </Container>
  </Box>
</Box>
```

## Tests

`src/components/Layout/__tests__/Container.test.tsx`

## Meta

Package version: root `package.json`.
