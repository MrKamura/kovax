# Skeleton

**Loading placeholder** — neutral blocks that reserve layout while async content resolves. Uses **`secondary`** surface tokens and theme **motion** timing (`duration.slow`, `easing.standard`) for **`pulse`** (opacity) and **`shimmer`** (gradient sweep).

## Import

```tsx
import { Skeleton } from "kovax-react";
// Optional bundle:
import { Skeleton, ensureSkeletonKeyframes } from "kovax-react/skeleton";
```

`ensureSkeletonKeyframes()` is called automatically when **`variant`** is **`pulse`** or **`shimmer`**; export is useful if you wrap or fork the component.

## Usage

Defaults: **`variant="pulse"`**, **`shape="rectangle"`**.

### Animation variants

```tsx
<Skeleton variant="pulse" width={200} height={16} />
<Skeleton variant="shimmer" width={200} height={16} />
<Skeleton variant="none" width={200} height={16} />
```

### Shapes

```tsx
<Skeleton shape="rectangle" width={160} height={14} />
<Skeleton shape="rounded" width={160} height={36} />
<Skeleton shape="circle" width={40} height={40} />
```

### Text lines

With **`text`**, height follows **`text.sm`** and width defaults to **`100%`** (override with **`width`** or **`style`**).

```tsx
import { Skeleton, VStack, themeToken } from "kovax-react";

<VStack gap={themeToken("spacing.sm")} align="stretch" style={{ maxWidth: 280 }}>
  <Skeleton text />
  <Skeleton text variant="shimmer" />
  <Skeleton text style={{ width: "70%" }} />
</VStack>
```

### Composition

Stack **`Skeleton`** next to **`Avatar`**, table rows, or cards — match **`shape`** and approximate **`width` / `height`** to the real content to avoid layout shift when data arrives.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **`variant`** | **`"pulse"`** \| **`"shimmer"`** \| **`"none"`** | **`"pulse"`** | Pulse fades opacity; shimmer animates a gradient; **`none`** is static (e.g. **`prefers-reduced-motion`** fallback). |
| **`shape`** | **`"rectangle"`** \| **`"rounded"`** \| **`"circle"`** | **`"rectangle"`** | Corner treatment (`borderRadius` tokens). |
| **`width`** | **`string`** \| **`number`** | context | CSS width; numbers become **`px`**. With **`text`**, defaults to **`100%`**. |
| **`height`** | **`string`** \| **`number`** | context | CSS height; numbers become **`px`**. With **`text`**, uses **`text.sm`**. |
| **`text`** | **`boolean`** | **`false`** | Single-line copy placeholder (full width unless **`width`** set). |
| **`className`** | **`string`** | — | Passed to the root element. |
| **`style`** | **`CSSProperties`** | — | Merged after layout styles (use for **`width`** overrides with **`text`**). |

Plus standard **`div`** attributes except **`children`** (omitted — Skeleton has no inner content).

Root element: **`<div>`** with **`role="presentation"`** and **`aria-hidden={true}`** by default.

## Accessibility & motion

Skeleton is **decorative**: keep **`aria-hidden`** unless you intentionally expose loading state — then prefer **`aria-busy`** on a named ancestor (e.g. the card or list region).

For users who prefer reduced motion, switch to **`variant="none"`** when **`prefers-reduced-motion: reduce`** matches in your app logic.

## See also

- **Components → Progress** — determinate loading bars.
- **`themeToken("duration.*")`**, **`themeToken("easing.*")`** — motion tokens used by animations.
