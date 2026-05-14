# Avatar

Compact **profile image** or **initials / custom fallback** inside a fixed frame (`circle` or softly rounded square). Pairs with layout primitives (`HStack`, lists, menus).

## Import

```tsx
import { Avatar } from "kovax-react";
// Optional bundle:
import { Avatar } from "kovax-react/avatar";
```

## Usage

Initials from `name` (multi-word → first letter of first + last word; single word → first two letters, uppercased):

```tsx
<Avatar name="Jane Doe" />
```

Sizes (`xs` · `sm` · `md` · `lg` · `xl`):

```tsx
import { Avatar, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.sm")} align="center">
  <Avatar name="Alex Chen" size="xs" />
  <Avatar name="Alex Chen" size="xl" />
</HStack>
```

Photo with fallback on load error:

```tsx
<Avatar
  src={photoUrl}
  alt="Portrait of Alex Chen"
  name="Alex Chen"
  size="lg"
/>
```

If `src` fails (`onError`), initials / `fallback` are shown again.

Custom fallback content (icon, emoji component):

```tsx
import { MdPerson } from "react-icons/md";

<Avatar name="Team" fallback={<MdPerson aria-hidden size={22} />} colorScheme="neutral" />
```

Shape and palette for fallback surfaces:

```tsx
<Avatar name="Round" shape="circle" colorScheme="primary" />
<Avatar name="Soft" shape="rounded" colorScheme="secondary" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | — | Image URL; when unset or after load error, fallback UI is shown |
| `alt` | `string` | — | Passed to `<img>` when `src` is set; use `""` only for decorative images |
| `name` | `string` | — | Accessible label when showing fallback; also drives default initials |
| `fallback` | `ReactNode` | — | Replaces initials when no image is shown |
| `size` | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` | `"md"` | Fixed width / height in px (`24` … `64`) |
| `shape` | `"circle"` \| `"rounded"` | `"circle"` | `rounded` uses token `borderRadius.md` |
| `colorScheme` | `"neutral"` \| `"primary"` \| `"secondary"` \| `"success"` \| `"warning"` \| `"error"` | `"neutral"` | Background / text tint for fallback surface |
| … | `HTMLAttributes<HTMLSpanElement>` (minus `children`) | — | Root is a `<span>`; `children` are not used |

## Accessibility

- **Fallback** (no photo): root has `role="img"` and `aria-label` from `name`, or from non-empty `alt` if `name` is absent. Provide **`name`** or **`aria-label`** so assistive tech has a name.
- **Photo**: the native `<img>` uses **`alt`**. Use a meaningful `alt` unless the avatar is purely decorative (then `alt=""`).

## Notes

- Styling uses **`themeToken`** (border, fallback colors) so **`ThemeProvider`** can swap palettes / dark mode.
- **Playground**: **Components → Avatar**.
