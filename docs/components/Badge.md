# Badge

Compact **pill label** for statuses, counts, build channels, and secondary metadata. Not interactive — use **`Button`** for removable chips or toggles.

## Import

```tsx
import { Badge } from "kovax-react";
// Optional bundle:
import { Badge } from "kovax-react/badge";
```

## Usage

Defaults: **`variant="subtle"`**, **`color="neutral"`**, **`size="md"`**.

```tsx
<Badge>New</Badge>
<Badge variant="solid" color="primary">Pro</Badge>
<Badge variant="outline" color="success">Shipped</Badge>
```

Semantic colors:

```tsx
import { Badge, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.sm")} wrap="wrap">
  <Badge color="neutral">Neutral</Badge>
  <Badge color="primary">Primary</Badge>
  <Badge color="secondary">Secondary</Badge>
  <Badge color="success">Success</Badge>
  <Badge color="warning">Warning</Badge>
  <Badge color="error">Error</Badge>
</HStack>
```

Leading **dot** (inherits text color):

```tsx
<Badge dot variant="subtle" color="success">Live</Badge>
```

Sizes **`sm`** · **`md`**:

```tsx
<Badge size="sm">12</Badge>
<Badge size="md">12</Badge>
```

Inline with prose (optional **`verticalAlign`**):

```tsx
import { Badge, Text } from "kovax-react";

<Text size="base">
  Inbox <Badge size="sm" color="primary" style={{ verticalAlign: "middle" }}>3</Badge>
</Text>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"solid"` \| `"outline"` \| `"subtle"` | `"subtle"` | Fill vs border vs soft tint |
| `color` | `"neutral"` \| `"primary"` \| `"secondary"` \| `"success"` \| `"warning"` \| `"error"` | `"neutral"` | Palette mapping |
| `size` | `"sm"` \| `"md"` | `"md"` | Typography + padding scale |
| `dot` | `boolean` | `false` | Small circle before children (`aria-hidden`) |
| `children` | `ReactNode` | — | Label text or nodes |
| … | `HTMLAttributes<HTMLSpanElement>` | — | Root element |

## Accessibility

- Rendered as `<span>` — **not** a button; screen readers treat content as static text.
- For **counts**, ensure meaning is clear in surrounding copy or expose **`aria-label`** on a wrapping element if the number alone is ambiguous.

## Notes

- Colors come from **`themeToken`** so **`ThemeProvider`** can theme light/dark consistently.
- **Playground**: **Components → Badge**.
