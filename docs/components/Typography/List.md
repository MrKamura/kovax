## 📄 List / ListItem

**`List`** renders **`<ul>`** or **`<ol>`** (`ordered`). Children should be **`ListItem`** — vertical gaps use **`spacing`** (`sizes.spacing` key, default **`sm`**); the last item has no bottom margin. Raw nodes inside the list do not get automatic gaps.

**`ListItem`** is **`<li>`** with base typography (`text.base`, color `secondary.800`) and **`SpacingProps`**.

## 📦 Import

```tsx
import { List, ListItem } from "kovax-react";
```

## ⚙️ Props — List

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`ordered`** | `boolean` | `false` | Ordered list |
| **`spacing`** | `sizes.spacing` key | `sm` | Gap between `ListItem`s |

## ⚙️ Props — ListItem

| Prop | Type | Description |
| ---- | ---- | ----------- |
| **`children`** | `ReactNode` | Item content |

Also **`SpacingProps`** on both components.

## ✨ Example

```tsx
<List spacing="xs">
  <ListItem>First</ListItem>
  <ListItem>Second</ListItem>
</List>

<List ordered spacing="md">
  <ListItem>Step one</ListItem>
  <ListItem>Step two</ListItem>
</List>
```
