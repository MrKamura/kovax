# AspectRatio

Preserves **width / height ratio** for a single child using the padding-bottom trick. Wraps content in `Box`; child gets absolute positioning and `object-fit` when it’s a DOM node.

## Import

```tsx
import { AspectRatio } from "kovax-react";
```

## Usage

```tsx
<AspectRatio ratio={16 / 9}>
  <img src="/hero.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</AspectRatio>

<AspectRatio ratio={1} maxW={320} objectFit="contain">
  <img src="/avatar.png" alt="Avatar" />
</AspectRatio>

<AspectRatio ratio={4 / 3} borderRadius={8}>
  <Box backgroundColor="#f1f5f9">Any child</Box>
</AspectRatio>
```

`ratio` is a **single number** (`width / height`). There is no `{ mobile: 1, desktop: 16/9 }` prop—use separate instances or CSS if you need that.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `ratio` | `number` | `16/9` | Aspect ratio (w÷h) |
| `maxW`, `maxH` | `number \| string` | — | Passed through `Box` |
| `objectFit` | CSS `object-fit` | `"cover"` | Applied when cloning a single element child |

Inherited: full **`SpacingProps`** / **`Box`** (padding, border, background, etc.).

## Common ratios

| Ratio | Typical use |
| ----- | ----------- |
| `16/9` | Video, wide banners |
| `4/3` | Photos |
| `1` | Square / avatars |
| `3/2` | Photography |

The internal padding percentage is derived from `1 / ratio` (see component source).

## Embedded media

```tsx
<AspectRatio ratio={16 / 9}>
  <iframe
    title="Video"
    src="https://www.youtube.com/embed/VIDEO_ID"
    style={{ border: 0, width: "100%", height: "100%" }}
  />
</AspectRatio>
```

## Comparison note

Modern browsers support CSS `aspect-ratio`. This component keeps a well-supported technique and consistent `Box` composition for the rest of the design system.

## Tests

`src/components/Layout/__tests__/AspectRatio.test.tsx`

## Meta

Package version: root `package.json`.
