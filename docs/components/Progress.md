# Progress

Determinate and **indeterminate** progress indicators — **linear** bar and **circular** ring. Both use `role="progressbar"` with `aria-valuenow` / `aria-valuemin` / `aria-valuemax` when the value is known, and omit `aria-valuenow` when **`indeterminate`** (unknown duration).

Distinct from **`Button`** loading spinners (small inline glyph) and **`Toast`** (completion messages).

## Import

```tsx
import { LinearProgress, CircularProgress } from "kovax-react";
// Optional bundle:
import { LinearProgress, CircularProgress } from "kovax-react/progress";
```

## Usage

Linear:

```tsx
<LinearProgress value={downloadPct} max={100} aria-label="Download progress" />
```

Indeterminate linear:

```tsx
<LinearProgress indeterminate aria-label="Connecting" />
```

Circular:

```tsx
<CircularProgress value={67} colorScheme="success" size="lg" aria-label="Disk usage" />
```

Custom scale:

```tsx
<LinearProgress value={3} min={0} max={12} aria-label="Step 3 of 12" />
```

## Props (shared)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `0` | Current value; clipped to `[min, max]`; ignored when `indeterminate` |
| `min` | `number` | `0` | Minimum bound (`aria-valuemin`) |
| `max` | `number` | `100` | Maximum bound (`aria-valuemax`) |
| `indeterminate` | `boolean` | `false` | Motion hint; **no** `aria-valuenow` |
| `colorScheme` | palette key | `"primary"` | Fill / stroke palette (`primary`, `secondary`, `success`, `warning`, `error`) |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Bar height or ring diameter preset |
| … | `HTMLAttributes<HTMLDivElement>` | — | Root wrapper (`data-progress-variant`, `data-progress-scheme`) |

Pass **`aria-label`** or **`aria-labelledby`** so the progressbar has an accessible name.

## Linear-only

| Prop | Type | Description |
| --- | --- | --- |
| `thickness` | `number` | Bar height in px (overrides `size`) |

## Circular-only

| Prop | Type | Description |
| --- | --- | --- |
| `thickness` | `number` | Ring stroke width in px (overrides `size`) |

## Notes

- Indeterminate animations inject a one-off `@keyframes` rule into `document.head` (same idea as the **`Button`** loader) so Kovax stays stylesheet-free.
- **Playground**: **Components → Progress**.
