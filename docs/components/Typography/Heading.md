## 📄 Heading

Semantic **`h1`–`h6`** headings: level comes from **`level`** (default **`2`**). Size and weight use presets over `sizes.text`; override with **`size`** and **`fontWeight`**. Default color is dark secondary (`secondary.900`). Supports **`SpacingProps`** like [`Box`](../Layout/Box.md).

## 📦 Import

```tsx
import { Heading } from "kovax-react";
```

## ⚙️ Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`level`** | `1` \| … \| `6` | `2` | Tag `h1`…`h6` |
| **`size`** | `sizes.text` key | from level preset | Override `font-size` |
| **`fontWeight`** | CSS | from preset | Override weight |
| **`lineHeight`** | CSS | — | Line height |
| **`children`** | `ReactNode` | — | Heading text |

Also **`SpacingProps`** and standard heading DOM attributes (`id`, `aria-*`, …).

## ✨ Example

```tsx
<Heading level={1}>Page</Heading>
<Heading level={3} mb={12}>
  Subsection
</Heading>
```

## Level presets

| Level | Size (`text.*`) | `fontWeight` |
| ----- | --------------- | ------------ |
| 1 | `xl` | 700 |
| 2 | `lg` | 700 |
| 3 | `lg` | 600 |
| 4 | `base` | 600 |
| 5 | `sm` | 600 |
| 6 | `xs` | 600 |
