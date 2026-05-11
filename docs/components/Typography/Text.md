## 📄 Text

General-purpose text primitive: size from `sizes.text` tokens, optional line truncation, line balancing (`text-wrap: balance`), and the same **spacing / visual props** as `Box` (`margin`, `padding`, `color`, `textAlign`, …).

`Text` forwards `ref` to the native host element (`as`).

See also: [Heading](./Heading.md), [Link](./Link.md), [Code](./Code.md), [Blockquote](./Blockquote.md), [List](./List.md).

---

## 📦 Import

```tsx
import { Text } from "kovax-react";
```

---

## ✨ Basic usage

```tsx
<Text>Regular paragraph (default tag `p`; no browser outer margins thanks to `margin: 0`).</Text>

<Text as="span" size="sm" color="#64748b">
  Secondary caption inline
</Text>

<Text size="lg" fontWeight={600} mb={8}>
  Section title without a separate Heading component
</Text>
```

---

## ⚙️ Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`as`** | `"p"` \| `"span"` \| `"div"` \| `"label"` \| `"strong"` \| `"em"` \| `"small"` | `"p"` | HTML element |
| **`size`** | `"xs"` \| `"sm"` \| `"base"` \| `"lg"` \| `"xl"` | `"base"` | `sizes.text` scale (`themeToken("text.*")`) |
| **`fontWeight`** | `CSS fontWeight` | — | Font weight |
| **`lineHeight`** | `number` \| `string` | — | Line height |
| **`truncate`** | `boolean` | `false` | Single line + ellipsis |
| **`balance`** | `boolean` | `false` | `text-wrap: balance` |
| **`children`** | `ReactNode` | — | Content |
| **`htmlFor`** | `string` | — | For `as="label"` |
| **`className`** | `string` | — | CSS classes |
| **`style`** | `CSSProperties` | — | Inline styles (on top of the system) |

All **`SpacingProps`** from [`Box`](../Layout/Box.md) are supported too: spacing, width/height, flex, `color`, `textAlign`, `backgroundColor`, native DOM attributes (`data-*`, `aria-*`, `id`, …).

---

## 📝 Sizes (`size`)

Values match keys on `sizes.text` in [Tokens](../Tokens.md): `xs`, `sm`, `base`, `lg`, `xl`.

---

## ♿ Accessibility

- Pick a semantic **`as`**: e.g. `label` with **`htmlFor`** for form labels.
- With **`truncate`**, long copy is visually clipped; expose full text via a tooltip, expandable region, or another UX pattern.

---

## 💡 Notes

- Default `<p>` margins are reset (`margin: 0`); set rhythm with **`m`** / **`mb`**, etc.
- For router links you can use **`as="span"`** inside your router `Link`, or extend with **[Typography `Link`](./Link.md)** later.
