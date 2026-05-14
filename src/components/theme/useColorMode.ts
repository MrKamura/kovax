import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "./themeContext";

/**
 * Reads the active color mode and exposes setters. Must be called inside
 * `<ThemeProvider>`. Outside of a provider the hook returns a passive shape
 * with `colorMode: "light"` and a no-op setter — components stay usable.
 */
export function useColorMode(): {
  colorMode: ThemeContextValue["colorMode"];
  resolvedColorMode: ThemeContextValue["resolvedColorMode"];
  setColorMode: ThemeContextValue["setColorMode"];
  toggleColorMode: ThemeContextValue["toggleColorMode"];
} {
  const ctx = useContext(ThemeContext);
  if (ctx) {
    const { colorMode, resolvedColorMode, setColorMode, toggleColorMode } = ctx;
    return { colorMode, resolvedColorMode, setColorMode, toggleColorMode };
  }
  return {
    colorMode: "light",
    resolvedColorMode: "light",
    setColorMode: () => undefined,
    toggleColorMode: () => undefined,
  };
}

/** Returns the resolved palette + scope metadata. Optional inside the tree. */
export function useTheme(): ThemeContextValue | null {
  return useContext(ThemeContext);
}
