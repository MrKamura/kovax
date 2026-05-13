export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
} as const;

/** Neutral surfaces outside palette scales */
export const baseColors = {
  white: "#ffffff",
  black: "#000000",
} as const;

export const sizes = {
  /**
   * Typography scale: `text.xs` … `text.5xl`.
   * Backward-compatible: existing `xs/sm/base/lg/xl` keys are unchanged.
   */
  text: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  /**
   * Spacing scale (rem-based) — additive: `xs/sm/md/lg/xl` keep prior values,
   * `none/2xs/2xl/3xl/4xl/5xl` are new.
   */
  spacing: {
    none: '0rem',
    '2xs': '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
    '5xl': '6rem',
  },
  /**
   * Border radius scale. `sm/md/lg/full` are unchanged; `none/xs/xl/2xl/3xl` are new.
   */
  borderRadius: {
    none: '0',
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
} as const;

export const shadows = {
  none: 'none',
  xs: '0 1px 1px 0 rgb(0 0 0 / 0.04)',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
  focusRing: '0 0 0 3px rgb(59 130 246 / 0.35)',
} as const;

/**
 * Backwards-compatible composite transitions. Prefer `motion.duration.*` and
 * `motion.easing.*` for new code (composes cleaner with per-property values).
 */
export const transitions = {
  default: 'all 0.2s ease-in-out',
  fast: 'all 0.1s ease-in-out',
  slow: 'all 0.3s ease-in-out',
} as const;

/** Typographic weights mirroring the CSS `font-weight` ladder. */
export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/** Line-height ratios suitable for `lineHeight: number` CSS. */
export const lineHeights = {
  none: 1,
  tight: 1.15,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.65,
  loose: 1.85,
} as const;

/** Letter-spacing values for headlines, caps, and dense text. */
export const letterSpacings = {
  tighter: '-0.04em',
  tight: '-0.02em',
  normal: '0em',
  wide: '0.02em',
  wider: '0.04em',
  widest: '0.08em',
} as const;

/**
 * Motion tokens: pair `duration.*` with `easing.*` for fine-grained transitions.
 * Keep `transitions.*` for the legacy composite strings.
 */
export const motion = {
  duration: {
    instant: '0ms',
    fast: '120ms',
    normal: '200ms',
    slow: '320ms',
    slower: '500ms',
  },
  easing: {
    linear: 'linear',
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

/** Stacking context ladder. Higher value sits above lower one. */
export const zIndices = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

/** Viewport breakpoints (em-based — adapt with `--font-size` for accessibility). */
export const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
} as const;

// TypeScript
export type ColorName = keyof typeof colors;
export type ColorShade = keyof typeof colors.primary;
export type ShadowKey = keyof typeof shadows;
export type TransitionKey = keyof typeof transitions;
export type TextSizeKey = keyof typeof sizes.text;
export type BorderRadiusKey = keyof typeof sizes.borderRadius;
/** Keys on the spacing scale (`sizes.spacing`) */
export type SizeKey = keyof typeof sizes.spacing;
export type FontWeightKey = keyof typeof fontWeights;
export type LineHeightKey = keyof typeof lineHeights;
export type LetterSpacingKey = keyof typeof letterSpacings;
export type DurationKey = keyof typeof motion.duration;
export type EasingKey = keyof typeof motion.easing;
export type ZIndexKey = keyof typeof zIndices;
export type BreakpointKey = keyof typeof breakpoints;

/**
 * Palette string: `palette.shade` (`secondary.200`) or base `white` / `black`.
 * Unknown strings are returned unchanged (e.g. `#fff`, `rgba(...)`).
 */
export type ColorToken =
  | `${ColorName}.${ColorShade}`
  | "white"
  | "black";

export function colorToken(path: ColorToken | string): string {
  if (path === "white") return baseColors.white;
  if (path === "black") return baseColors.black;

  const dot = path.indexOf(".");
  if (dot <= 0) return path;

  const paletteName = path.slice(0, dot) as ColorName;
  const shadeKey = path.slice(dot + 1);
  const palette = colors[paletteName];
  if (palette != null && shadeKey in palette) {
    return (palette as Record<string, string>)[shadeKey];
  }

  return path;
}

/**
 * Single string reference into theme tokens.
 *
 * - Colors: same as `colorToken` — `secondary.200`, `white`, arbitrary CSS.
 * - Sizes: `text.sm`, `spacing.md`, `borderRadius.md`.
 * - Typography: `fontWeight.medium`, `lineHeight.normal`, `letterSpacing.tight`.
 * - Motion: `duration.fast`, `easing.standard` (plus legacy `transition.default`).
 * - Layering: `zIndex.modal`.
 * - Viewport: `breakpoint.md`.
 * - Misc: `shadow.sm`.
 */
export type ThemeToken =
  | ColorToken
  | `shadow.${ShadowKey}`
  | `transition.${TransitionKey}`
  | `text.${TextSizeKey}`
  | `spacing.${SizeKey}`
  | `borderRadius.${BorderRadiusKey}`
  | `fontWeight.${FontWeightKey}`
  | `lineHeight.${LineHeightKey}`
  | `letterSpacing.${LetterSpacingKey}`
  | `duration.${DurationKey}`
  | `easing.${EasingKey}`
  | `zIndex.${ZIndexKey}`
  | `breakpoint.${BreakpointKey}`;

export function themeToken(path: ThemeToken | string): string {
  const dot = path.indexOf(".");
  if (dot <= 0) {
    return colorToken(path);
  }

  const ns = path.slice(0, dot);
  const key = path.slice(dot + 1);

  switch (ns) {
    case "shadow":
      if (key in shadows) return (shadows as Record<string, string>)[key];
      return path;
    case "transition":
      if (key in transitions) return (transitions as Record<string, string>)[key];
      return path;
    case "text":
      if (key in sizes.text) return (sizes.text as Record<string, string>)[key];
      return path;
    case "spacing":
      if (key in sizes.spacing) return (sizes.spacing as Record<string, string>)[key];
      return path;
    case "borderRadius":
      if (key in sizes.borderRadius)
        return (sizes.borderRadius as Record<string, string>)[key];
      return path;
    case "fontWeight":
      if (key in fontWeights)
        return String((fontWeights as Record<string, number>)[key]);
      return path;
    case "lineHeight":
      if (key in lineHeights)
        return String((lineHeights as Record<string, number>)[key]);
      return path;
    case "letterSpacing":
      if (key in letterSpacings)
        return (letterSpacings as Record<string, string>)[key];
      return path;
    case "duration":
      if (key in motion.duration)
        return (motion.duration as Record<string, string>)[key];
      return path;
    case "easing":
      if (key in motion.easing)
        return (motion.easing as Record<string, string>)[key];
      return path;
    case "zIndex":
      if (key in zIndices)
        return String((zIndices as Record<string, number>)[key]);
      return path;
    case "breakpoint":
      if (key in breakpoints)
        return (breakpoints as Record<string, string>)[key];
      return path;
    default:
      return colorToken(path);
  }
}
