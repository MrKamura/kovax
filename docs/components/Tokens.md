## 🎨 Design Tokens

Kovax React provides a flexible set of design tokens — color palettes, shadows, sizes, and transitions — to ensure consistent UI across all components.
These tokens can be used directly in your custom styles or when extending the Kovax theme.

## 📦 Exported Tokens

All tokens are exported from the main library entry point:

```tsx
import { colors, shadows, sizes, transitions, ColorName, ColorShade } from 'kovax-react';
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
  sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  lg: '0px 4px 8px rgba(0, 0, 0, 0.15)',
};
```


Usage example:

```tsx
<div style={{ boxShadow: shadows.md }}>Card with shadow</div>
```

## 📏 Sizes

The sizes token defines standard spacing and sizing units for consistent layout.

```tsx
sizes = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};
```


Usage example:

```tsx
<Button style={{ padding: `${sizes.sm} ${sizes.md}` }}>Click</Button>
```

## ⚡ Transitions

The transitions token defines timing and easing for animations.

```tsx
transitions = {
  fast: 'all 0.15s ease-in-out',
  normal: 'all 0.25s ease-in-out',
  slow: 'all 0.4s ease-in-out',
};
```

Usage example:

```tsx
<div style={{ transition: transitions.normal }}>Animated element</div>
```

## 🧭 Example Usage
```tsx
import { colors, sizes, shadows, transitions } from 'kovax-react';

export const Card = () => (
  <div
    style={{
      backgroundColor: colors.primary[50],
      border: `1px solid ${colors.primary[200]}`,
      borderRadius: sizes.sm,
      boxShadow: shadows.md,
      transition: transitions.fast,
      padding: sizes.md,
    }}
  >
    Hello Kovax
  </div>
);
```

## 🧱 Token Principles

* Consistency: Shared visual language across all components

* Scalability: Easily extended with custom color palettes

* Type Safety: Built-in ColorName and ColorShade typings

* Reusability: Tokens can be reused across multiple projects