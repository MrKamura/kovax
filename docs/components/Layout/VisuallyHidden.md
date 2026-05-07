# VisuallyHidden

Hides content visually but keeps it available to assistive technologies (clip + absolute positioning). Optional **`showOnFocus`** renders the subtree as `span` so skip links can become visible on keyboard focus.

## Import

```tsx
import { VisuallyHidden } from "kovax-react";
```

## Usage

```tsx
<button type="button">
  <span aria-hidden>☰</span>
  <VisuallyHidden>Open menu</VisuallyHidden>
</button>
```

**Skip link:**

```tsx
<VisuallyHidden showOnFocus>
  <a href="#main-content">Skip to main content</a>
</VisuallyHidden>
```

With `showOnFocus`, you typically add focus styles on the link (see your global CSS).

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `showOnFocus` | `boolean` | `false` | Renders `span` instead of `div`; still clipped until you style `:focus` |

Other **`HTMLAttributes`** (e.g. `id`, `className`, `style`, `data-*`, `aria-*`) are passed to the host element.

## Practices

- Prefer real visible labels when possible; use VisuallyHidden for icon-only controls and redundant-but-helpful context.
- Keep hidden strings short and meaningful for screen readers.

## Tests

`src/components/Layout/__tests__/VisuallyHidden.test.tsx`

## Meta

Package version: root `package.json`.
