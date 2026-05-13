# Design system

Kovax UI does not ship a separate CSS theme file for consumers. Visual language is driven by **TypeScript tokens** and inline styles computed in components.

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
- **themeToken** — string access to every namespace (`themeToken("secondary.200")`, `themeToken("spacing.md")`, `themeToken("zIndex.modal")`, …)

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
} from "kovax-react";
```

## Typography

The **`Text`**, **`Heading`**, **`Link`**, **`Code`**, **`Kbd`**, **`Blockquote`**, **`List`**, and **`ListItem`** components — see [Text](./components/Typography/Text.md) and sibling files under `docs/components/Typography/`.

## Spacing props

Layout primitives (`Box`, stacks, grid, etc.) share **`SpacingProps`**: margin and padding shorthands (`m`, `p`, `mx`, …), dimensions (`w`, `h`, `minW`, …), flex and grid fields, and common visual props such as `backgroundColor` and `borderRadius`. See the [Box documentation](./components/Layout/Box.md) for the full picture.

## Forms and validation

Form field wrappers propagate `isInvalid`, `isRequired`, and `isDisabled` to **custom** child components only (native elements like `<label>` are not cloned with those props). See [Form components](./components/Form.md).
