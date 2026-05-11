## 📄 Blockquote

Quote with a vertical accent bar (`primary.400`), larger body, and optional attribution in **`footer`** / **`cite`**. The **`cite`** attribute is the source URL (HTML). Supports **`SpacingProps`**.

## 📦 Import

```tsx
import { Blockquote } from "kovax-react";
```

## ⚙️ Props

| Prop | Type | Description |
| ---- | ---- | ----------- |
| **`citation`** | `string` | Visible source label (`<footer><cite>`) |
| **`cite`** | `string` | URL for the `cite` attribute on `<blockquote>` |
| **`children`** | `ReactNode` | Quote body |

## ✨ Example

```tsx
<Blockquote citation="Kovax, 2026">
  Typography should be predictable and accessible.
</Blockquote>

<Blockquote cite="https://example.com/article">
  Short excerpt from the article.
</Blockquote>
```
