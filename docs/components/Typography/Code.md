## 📄 Code

Monospace snippet: **`inline`** mode (default) or **`block`** (`<pre><code>` for multi-line code with horizontal scroll). Background and borders use `secondary.*` tokens. Supports **`SpacingProps`**; for blocks padding applies to the outer **`<pre>`**, for inline to **`<code>`**.

## 📄 Kbd

Styled key combo (**`<kbd>`**): border, light shadow, monospace font, default size **`text.xs`**.

## 📦 Import

```tsx
import { Code, Kbd } from "kovax-react";
```

## ⚙️ Props — Code

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`variant`** | `"inline"` \| `"block"` | `"inline"` | Markup |
| **`size`** | `sizes.text` key | `xs` / `sm` (block) | Font size |
| **`children`** | `ReactNode` | — | Code |

## ⚙️ Props — Kbd

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`size`** | `sizes.text` key | `xs` | Key label size |
| **`children`** | `ReactNode` | — | Label |

## ✨ Example

```tsx
Run <Code>npm install</Code> in the terminal.

<Code variant="block" size="sm">{`function hello() {
  return "world";
}`}</Code>

Save: <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
```
