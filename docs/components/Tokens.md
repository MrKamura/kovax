## 🎨 Design Tokens

Kovax React ships a typed token system — palettes, spacing, radii, typography, motion, layering, and breakpoints — so every component speaks the same visual language. Tokens are plain objects on top of `themeToken("…")`, so they work with inline styles, CSS-in-JS, and emit calc-friendly strings (e.g. `"1.25rem"`, `"cubic-bezier(...)"`).

Looking for a visual gallery? Open **Components → Design tokens** in the [live documentation](https://mrkamura.github.io/kovax/).

## 📦 Exports

```tsx
import {
  // Palettes
  colors,
  baseColors,

  // Scales
  sizes,            // { text, spacing, borderRadius }
  fontWeights,
  lineHeights,
  letterSpacings,
  shadows,
  motion,           // { duration, easing }
  transitions,      // legacy composite strings
  zIndices,
  breakpoints,

  // Helpers
  colorToken,
  themeToken,

  // Types
  ColorName,
  ColorShade,
  ColorToken,
  ShadowKey,
  TransitionKey,
  TextSizeKey,
  SizeKey,
  BorderRadiusKey,
  FontWeightKey,
  LineHeightKey,
  LetterSpacingKey,
  DurationKey,
  EasingKey,
  ZIndexKey,
  BreakpointKey,
  ThemeToken,
} from "kovax-react";
```

## 🎨 Colors

Five semantic palettes with a 50 → 900 ladder. Use 50–200 for surfaces, 300–500 for accents, and 600–900 for text and active states.

```tsx
colors.primary[500];   // "#3b82f6"
colors.success[600];   // "#059669"
themeToken("error.50") // "#fef2f2"
```

Palettes: `primary`, `secondary`, `success`, `warning`, `error`.

### Base colors

Neutral values outside the palette ladder — useful for contrasting text on accent fills.

```tsx
import { baseColors } from "kovax-react";

baseColors.white; // "#ffffff"
baseColors.black; // "#000000"
```

## 🔤 Typography

`sizes.text` is the size ramp; `fontWeights`, `lineHeights`, `letterSpacings` are dedicated scales (numbers / em-based strings).

| Token namespace | Example | Resolves to |
| --------------- | ------- | ----------- |
| `text.*` | `text.base` → `text.5xl` | rem (`1rem`, `3rem`, …) |
| `fontWeight.*` | `fontWeight.medium` | numeric (`"500"`) |
| `lineHeight.*` | `lineHeight.normal` | numeric (`"1.5"`) |
| `letterSpacing.*` | `letterSpacing.tight` | em (`-0.02em`) |

```tsx
const titleStyle = {
  fontSize: themeToken("text.3xl"),
  fontWeight: themeToken("fontWeight.semibold"),
  lineHeight: themeToken("lineHeight.tight"),
  letterSpacing: themeToken("letterSpacing.tighter"),
};
```

## 📏 Spacing

Backwards-compatible rem ladder with `none / 2xs / 2xl / 3xl / 4xl / 5xl` additions for marketing layouts.

```tsx
sizes.spacing.xs;   // "0.5rem"
sizes.spacing["2xl"]; // "2.5rem"
themeToken("spacing.none"); // "0rem"
```

## 🟦 Border radius

```tsx
sizes.borderRadius.md;     // "0.5rem"
sizes.borderRadius["2xl"]; // "1.25rem"
sizes.borderRadius.full;   // "9999px"
```

New: `none / xs / xl / 2xl / 3xl`. Existing `sm / md / lg / full` keep their values.

## 🌫️ Shadows

Elevation ladder with two utility shadows for inset surfaces and focus rings.

```tsx
shadows.md;         // soft card
shadows["2xl"];     // marketing hero
shadows.inner;      // sunken surfaces
shadows.focusRing;  // 3px blue ring for a11y
```

## ⚡ Motion

`motion.duration` and `motion.easing` compose into transitions. The legacy `transitions` object is preserved.

```tsx
const t = `background-color ${themeToken(
  "duration.fast",
)} ${themeToken("easing.standard")}`;

// Legacy composite (still exported):
themeToken("transition.default");
```

Durations: `instant / fast / normal / slow / slower`. Easings: `linear / standard / decelerate / accelerate / bounce`.

## 🗂️ Z-index

Predictable stacking order for overlays. Higher value renders above lower one.

```tsx
zIndices.dropdown; // 1000
zIndices.modal;    // 1400
zIndices.tooltip;  // 1800
themeToken("zIndex.modal"); // "1400"
```

Ladder: `hide < base < docked < dropdown < sticky < banner < overlay < modal < popover < skipLink < toast < tooltip`.

## 🧭 Breakpoints

Em-based viewport breakpoints — they scale with the user's root font size, which is more accessible than rigid px values.

```tsx
breakpoints.md; // "48em" ≈ 768px

const css = `@media (min-width: ${themeToken("breakpoint.lg")}) { … }`;
```

## 🧪 String tokens (`themeToken`)

One helper for every namespace.

| Prefix | Example | Equivalent |
| ------ | ------- | ---------- |
| palette | `secondary.200` | `colors.secondary[200]` |
| *(no second segment)* | `white`, `black`, `#fafafa` | same as `colorToken` |
| `text` | `text.lg` | `sizes.text.lg` |
| `spacing` | `spacing.md` | `sizes.spacing.md` |
| `borderRadius` | `borderRadius.xl` | `sizes.borderRadius.xl` |
| `shadow` | `shadow.focusRing` | `shadows.focusRing` |
| `fontWeight` | `fontWeight.semibold` | `fontWeights.semibold` |
| `lineHeight` | `lineHeight.normal` | `lineHeights.normal` |
| `letterSpacing` | `letterSpacing.tight` | `letterSpacings.tight` |
| `duration` | `duration.fast` | `motion.duration.fast` |
| `easing` | `easing.standard` | `motion.easing.standard` |
| `transition` | `transition.default` | `transitions.default` |
| `zIndex` | `zIndex.modal` | `zIndices.modal` |
| `breakpoint` | `breakpoint.lg` | `breakpoints.lg` |

Unknown namespaced keys are returned as-is, so it's safe to feed runtime values through `themeToken` for fall-through behaviour.

## 🧩 Types

```tsx
type ColorName = "primary" | "secondary" | "success" | "warning" | "error";
type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

const getColor = (name: ColorName, shade: ColorShade) => colors[name][shade];
```

`ThemeToken` unions every accepted dotted string (palette + scale namespaces) so IDEs auto-complete tokens.

## 🧭 Example: composite card

```tsx
import { themeToken } from "kovax-react";

export const Card = () => (
  <div
    style={{
      backgroundColor: themeToken("primary.50"),
      border: `1px solid ${themeToken("primary.200")}`,
      borderRadius: themeToken("borderRadius.xl"),
      boxShadow: themeToken("shadow.lg"),
      padding: themeToken("spacing.lg"),
      fontSize: themeToken("text.base"),
      fontWeight: themeToken("fontWeight.medium"),
      lineHeight: themeToken("lineHeight.snug"),
      transition: `box-shadow ${themeToken(
        "duration.normal",
      )} ${themeToken("easing.standard")}`,
    }}
  >
    Hello Kovax
  </div>
);
```

## 🧱 Token principles

- **Consistency** — shared visual language across every component.
- **Composability** — primitives over presets; `themeToken("…")` works in inline styles, `style` objects, or CSS-in-JS.
- **Type safety** — `ThemeToken`, `ColorToken`, `ColorName`, `ColorShade`, and the per-scale keys keep autocomplete honest.
- **Backwards compatibility** — every key added in v0.5+ is additive; previous code keeps working.
- **Accessibility-aware** — em-based breakpoints and `prefers-reduced-motion` friendly `motion.duration.instant`.
