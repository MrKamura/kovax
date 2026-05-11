## 📄 Link

Text **`<a>`** link using palette color (`primary.600`), optional underline, and **`external`** mode (`target="_blank"` + safe **`rel`**). Inherits **`SpacingProps`** and standard anchor attributes (`href`, `title`, `download`, `aria-*`, …).

## 📦 Import

```tsx
import { Link } from "kovax-react";
```

## ⚙️ Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`href`** | `string` | — | URL or fragment |
| **`external`** | `boolean` | `false` | New tab + `noopener` / `noreferrer` |
| **`underline`** | `boolean` | `true` | `text-decoration: underline` |
| **`children`** | `ReactNode` | — | Link label |

Everything else — **`SpacingProps`** and **`AnchorHTMLAttributes`** (except fields that conflict with the style system).

## ✨ Example

```tsx
<Link href="/guide">Internal page</Link>

<Link href="https://example.com" external>
  External resource
</Link>

<Link href="/quiet" underline={false}>
  No underline
</Link>
```
