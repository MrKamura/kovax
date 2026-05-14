# Design system

Visual language is driven by **TypeScript tokens** that resolve to CSS custom properties (`var(--kx-…)`) with a static hex / rem fallback. Mount **`ThemeProvider`** once at the app root to enable runtime theming and **dark mode**; without it every `themeToken("…")` call falls back to the default palette, so existing apps keep working unchanged.

## Theme provider & color mode

```tsx
import { ThemeProvider, useColorMode } from "kovax-react";

export function App() {
  return (
    <ThemeProvider defaultColorMode="system">
      <Page />
    </ThemeProvider>
  );
}

function ColorModeToggle() {
  const { resolvedColorMode, toggleColorMode } = useColorMode();
  return (
    <button onClick={toggleColorMode}>
      {resolvedColorMode === "dark" ? "Light" : "Dark"}
    </button>
  );
}
```

- **`colorMode`** / **`defaultColorMode`** — `"light"`, `"dark"`, `"system"` (follows `prefers-color-scheme`).
- **`palettes={{ light, dark }}`** — pass partial overrides for brand colors.
- **`target`** — a `RefObject<HTMLElement>` scopes the theme to a subtree instead of `:root`.
- **`storageKey`** — persists the user's choice in `localStorage`; pass `false` to disable.
- **`useColorMode()`** — `{ colorMode, resolvedColorMode, setColorMode, toggleColorMode }`.
- **`useTheme()`** — full context (current palette, scope selector, both palettes).

The provider emits a `<style>` block with CSS variables on `:root` and on `:root[data-kovax-theme="dark"]`, so consumers can also style their own surfaces with the same tokens (`background: var(--kx-color-secondary-50)`).

## Tokens

All base scales live in [`components/Tokens.md`](./components/Tokens.md). For a live, paginated reference open **Components → Design tokens** in the [playground](https://mrkamura.github.io/kovax/).

- **colors** — palettes `primary`, `secondary`, `success`, `warning`, `error` (50 → 900 ladder)
- **baseColors** — neutral `white` / `black`
- **sizes** — spacing (`sizes.spacing`), typography (`sizes.text`), radii (`sizes.borderRadius`)
- **fontWeights** / **lineHeights** / **letterSpacings** — typography refinement scales
- **shadows** — elevation ladder plus `inner` and `focusRing` utilities
- **motion** — `motion.duration.*` and `motion.easing.*` (legacy `transitions.*` retained)
- **zIndices** — predictable stacking order for overlays
- **breakpoints** — em-based viewport breakpoints
- **themeToken** — string access to every namespace (`themeToken("secondary.200")`, `themeToken("spacing.md")`, `themeToken("zIndex.modal")`, …). Returns `var(--kx-…, <fallback>)` so values stay correct without `ThemeProvider` and theme-aware with it.

Import from the package entry:

```tsx
import {
  colors,
  baseColors,
  sizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  shadows,
  motion,
  transitions,
  zIndices,
  breakpoints,
  themeToken,
  ThemeProvider,
  useColorMode,
  useTheme,
  lightPalette,
  darkPalette,
} from "kovax-react";
```

## Typography

The **`Text`**, **`Heading`**, **`Link`**, **`Code`**, **`Kbd`**, **`Blockquote`**, **`List`**, and **`ListItem`** components — see [Text](./components/Typography/Text.md) and sibling files under `docs/components/Typography/`.

## Spacing props

Layout primitives (`Box`, stacks, grid, etc.) share **`SpacingProps`**: margin and padding shorthands (`m`, `p`, `mx`, …), dimensions (`w`, `h`, `minW`, …), flex and grid fields, and common visual props such as `backgroundColor` and `borderRadius`. See the [Box documentation](./components/Layout/Box.md) for the full picture.

## Forms and validation

Form field wrappers propagate `isInvalid`, `isRequired`, and `isDisabled` to **custom** child components only (native elements like `<label>` are not cloned with those props). See [Form components](./components/Form.md).
