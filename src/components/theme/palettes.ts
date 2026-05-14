/**
 * Light and dark palettes resolved against the same token namespaces.
 *
 * Shape mirrors the legacy `colors` export — primary / secondary / success /
 * warning / error scales 50…900, plus `baseColors` (white, black). Dark mode
 * inverts the secondary surface ladder and brightens accents so they read on
 * dark backgrounds.
 */

import {
  baseColors as defaultBaseColors,
  colors as defaultColors,
  shadows as defaultShadows,
  type ColorName,
  type ColorShade,
} from "./tokens";

export type ColorScale = Readonly<Record<ColorShade, string>>;
export type ColorPalette = Readonly<Record<ColorName, ColorScale>>;

export interface ThemePalette {
  /** Five-palette × ten-shade matrix (kept compatible with the legacy `colors` export). */
  colors: ColorPalette;
  /** Neutral surfaces outside palette scales (white / black). */
  baseColors: { white: string; black: string };
  /** Elevation shadows — slightly different rgba on dark surfaces. */
  shadows: Readonly<Record<keyof typeof defaultShadows, string>>;
}

const darkColors: ColorPalette = {
  primary: {
    50: "#0b1a36",
    100: "#0f2350",
    200: "#163473",
    300: "#1e4493",
    400: "#3066c5",
    500: "#60a5fa",
    600: "#93c5fd",
    700: "#bfdbfe",
    800: "#dbeafe",
    900: "#eff6ff",
  },
  secondary: {
    50: "#0b1220",
    100: "#0f172a",
    200: "#1e293b",
    300: "#334155",
    400: "#475569",
    500: "#64748b",
    600: "#94a3b8",
    700: "#cbd5e1",
    800: "#e2e8f0",
    900: "#f1f5f9",
  },
  success: {
    50: "#062719",
    100: "#0a3a26",
    200: "#0e5436",
    300: "#137349",
    400: "#1f9b62",
    500: "#34d399",
    600: "#6ee7b7",
    700: "#a7f3d0",
    800: "#d1fae5",
    900: "#ecfdf5",
  },
  warning: {
    50: "#2d1c05",
    100: "#3f2706",
    200: "#5b380a",
    300: "#7e4d10",
    400: "#a76916",
    500: "#fbbf24",
    600: "#fcd34d",
    700: "#fde68a",
    800: "#fef3c7",
    900: "#fffbeb",
  },
  error: {
    50: "#270b0b",
    100: "#3a1010",
    200: "#5a1818",
    300: "#7d1f1f",
    400: "#b13434",
    500: "#f87171",
    600: "#fca5a5",
    700: "#fecaca",
    800: "#fee2e2",
    900: "#fef2f2",
  },
};

const darkShadows: ThemePalette["shadows"] = {
  none: "none",
  xs: "0 1px 1px 0 rgb(0 0 0 / 0.45)",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.55)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.55), 0 2px 4px -2px rgb(0 0 0 / 0.55)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.55)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.6), 0 8px 10px -6px rgb(0 0 0 / 0.55)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.7)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.45)",
  focusRing: "0 0 0 3px rgb(96 165 250 / 0.45)",
};

/** Default light palette — same hex values as the static `colors` export. */
export const lightPalette: ThemePalette = {
  colors: defaultColors,
  baseColors: { white: defaultBaseColors.white, black: defaultBaseColors.black },
  shadows: defaultShadows,
};

/**
 * Default dark palette: inverted neutrals for surface readability, accent
 * shades shifted up so 500 reads on a dark background.
 */
export const darkPalette: ThemePalette = {
  colors: darkColors,
  baseColors: { white: "#0b1220", black: "#f8fafc" },
  shadows: darkShadows,
};
