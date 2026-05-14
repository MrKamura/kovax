import { createContext } from "react";
import type { ThemePalette } from "./palettes";

/**
 * What a user passes via the `colorMode` prop / hook setter. `system` follows
 * `prefers-color-scheme`.
 */
export type ColorMode = "light" | "dark" | "system";

/** The mode actually applied to the DOM after `system` is resolved. */
export type ResolvedColorMode = "light" | "dark";

export interface ThemeContextValue {
  /** Requested color mode (`"light" | "dark" | "system"`). */
  colorMode: ColorMode;
  /** Resolved mode currently applied (`"light"` or `"dark"`). */
  resolvedColorMode: ResolvedColorMode;
  /** Replace the active color mode. */
  setColorMode: (next: ColorMode) => void;
  /** Toggle between light and dark (collapses `system` → resolved → opposite). */
  toggleColorMode: () => void;
  /** Active palette (after light/dark resolution). */
  palette: ThemePalette;
  /** Both palettes for callers that need to render previews etc. */
  palettes: { light: ThemePalette; dark: ThemePalette };
  /**
   * Selector the provider writes CSS variables for. Defaults to
   * `:root` / `:where([data-kovax-theme="…"])` — exposed for advanced cases.
   */
  scopeSelector: string;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
