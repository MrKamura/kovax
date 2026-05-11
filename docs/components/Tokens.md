## 🎨 Design Tokens

Kovax React provides a flexible set of design tokens — color palettes, shadows, sizes, and transitions — to ensure consistent UI across all components.
These tokens can be used directly in your custom styles or when extending the Kovax theme.

## 📦 Exported Tokens

All tokens are exported from the main library entry point:

```tsx
import {
  colors,
  shadows,
  sizes,
  transitions,
  baseColors,
  themeToken,
  ThemeToken,
  colorToken,
  ColorToken,
  ColorName,
  ColorShade,
  ShadowKey,
  TransitionKey,
  TextSizeKey,
  BorderRadiusKey,
} from 'kovax-react';
```

## 🎨 Colors

The colors object defines the full color palette used across the UI.
Each color has multiple shades (from 50 to 900) for light and dark variations.

```tsx
console.log(colors.primary[500]); // #1E88E5
```

* Example structure
```tsx
colors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  success: { ... },
  danger: { ... },
  neutral: { ... }
};
```

## ⚪ Base colors

Plain neutral values outside `colors.*` scales (e.g. contrasting text on accent fills):

```tsx
import { baseColors } from "kovax-react";

baseColors.white; // '#ffffff'
baseColors.black; // '#000000'
```

## String tokens (`themeToken`)

One helper for colors, typography (`sizes.text`), spacing (`sizes.spacing`), radii (`sizes.borderRadius`), shadows, and transitions. A dotted string sets **category** and **key** (palette colors still use `palette.shade`).

| Prefix | Example | Equivalent |
|--------|---------|------------|
| palette | `secondary.200` | `colors.secondary[200]` |
| *(no second segment)* | `white`, `black`, `#fafafa` | same as `colorToken` |
| `text` | `text.sm` | `sizes.text.sm` |
| `spacing` | `spacing.md` | `sizes.spacing.md` |
| `borderRadius` | `borderRadius.md` | `sizes.borderRadius.md` |
| `shadow` | `shadow.sm` | `shadows.sm` |
| `transition` | `transition.default` | `transitions.default` |

```tsx
import { themeToken } from "kovax-react";

themeToken("secondary.200");
themeToken("white");
themeToken("text.lg");
themeToken("spacing.md");
themeToken("borderRadius.sm");
themeToken("shadow.sm");
themeToken("transition.fast");
```

The `ThemeToken` type unions the allowed strings for these branches (including `ColorToken`). Unknown keys under `shadow.*`, `spacing.*`, etc. are returned as-is; arbitrary CSS without a dot is handled via the color branch (`colorToken`).

### Colors only (`colorToken`)

`colorToken` is still exported separately: same rules for `palette.shade`, `white`, `black`, and arbitrary CSS. `themeToken` delegates to that path for color-like inputs.

## 🧩 Types
```tsx
type ColorName = 'primary' | 'success' | 'danger' | 'warning' | 'neutral';
type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
```

This helps ensure type-safe access to your colors in TypeScript:

```tsx
const getColor = (name: ColorName, shade: ColorShade) => colors[name][shade];
```

## 🌫️ Shadows

Shadows provide consistent depth and elevation across UI elements.

```tsx
shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), …',
  lg: '…',
  xl: '…',
};
```

Example:

```tsx
<div style={{ boxShadow: themeToken("shadow.md") }}>Card with shadow</div>
```

## 📏 Sizes

The `sizes` object groups **text**, **spacing**, and **radii**:

```tsx
sizes.text.xs       // '0.75rem'
sizes.spacing.md    // '1rem'
sizes.borderRadius.md // '0.5rem'
```

Via string tokens:

```tsx
themeToken("text.sm");
themeToken("spacing.md");
themeToken("borderRadius.lg");
```

## ⚡ Transitions

```tsx
transitions = {
  default: 'all 0.2s ease-in-out',
  fast: 'all 0.1s ease-in-out',
  slow: 'all 0.3s ease-in-out',
};
```

Example:

```tsx
<div style={{ transition: themeToken("transition.default") }}>Animated element</div>
```

## 🧭 Example Usage
```tsx
import { themeToken } from 'kovax-react';

export const Card = () => (
  <div
    style={{
      backgroundColor: themeToken("primary.50"),
      border: `1px solid ${themeToken("primary.200")}`,
      borderRadius: themeToken("borderRadius.md"),
      boxShadow: themeToken("shadow.md"),
      transition: themeToken("transition.fast"),
      padding: themeToken("spacing.md"),
    }}
  >
    Hello Kovax
  </div>
);
```

## 🧱 Token Principles

* Consistency: Shared visual language across all components

* Scalability: Easily extended with custom color palettes

* Type safety: `ThemeToken`, `ColorToken`, `ColorName`, `ColorShade`, and related types

* Reusability: Tokens can be reused across multiple projects