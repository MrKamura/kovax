import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { darkPalette, lightPalette, type ThemePalette } from "./palettes";
import { buildThemeCss } from "./themeCss";
import {
  KOVAX_COLOR_MODE_STORAGE_KEY,
  KOVAX_THEME_ATTRIBUTE,
} from "./themeConstants";
import {
  ThemeContext,
  type ColorMode,
  type ResolvedColorMode,
  type ThemeContextValue,
} from "./themeContext";

const DATA_ATTR = KOVAX_THEME_ATTRIBUTE;
const STORAGE_KEY = KOVAX_COLOR_MODE_STORAGE_KEY;

export interface ThemeProviderProps {
  /**
   * Controlled color mode. When omitted, the provider starts at
   * `defaultColorMode` and is internally controlled.
   */
  colorMode?: ColorMode;
  /** Initial mode in uncontrolled use. Defaults to `"system"`. */
  defaultColorMode?: ColorMode;
  /** Fires after every effective mode change (including `system` resolution). */
  onColorModeChange?: (mode: ColorMode, resolved: ResolvedColorMode) => void;
  /**
   * Persist the user's choice under this `localStorage` key. Pass `false` /
   * `null` to disable persistence (useful for SSR or storybook scopes).
   * Default: `"kovax-color-mode"`.
   */
  storageKey?: string | false | null;
  /** Custom palettes — fall back to built-ins per side. */
  palettes?: { light?: Partial<ThemePalette>; dark?: Partial<ThemePalette> };
  /**
   * Element that receives `data-kovax-theme`. Defaults to `documentElement`
   * (`<html>`). Pass a ref to scope theming to a subtree (e.g. a portal root).
   */
  target?: React.RefObject<HTMLElement | null> | "documentElement";
  /** Forwarded children. */
  children?: React.ReactNode;
  /** Optional `nonce` for the injected `<style>` element (strict CSP). */
  nonce?: string;
}

function mergePalette(
  base: ThemePalette,
  override: Partial<ThemePalette> | undefined,
): ThemePalette {
  if (!override) return base;
  return {
    colors: { ...base.colors, ...override.colors } as ThemePalette["colors"],
    baseColors: { ...base.baseColors, ...(override.baseColors ?? {}) },
    shadows: { ...base.shadows, ...(override.shadows ?? {}) } as ThemePalette["shadows"],
  };
}

function readStoredMode(storageKey: string | false | null): ColorMode | null {
  if (!storageKey || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    /* ignore quota / private mode */
  }
  return null;
}

function systemPrefersDark(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolveMode(mode: ColorMode): ResolvedColorMode {
  if (mode === "system") return systemPrefersDark() ? "dark" : "light";
  return mode;
}

/**
 * Provides the active theme: injects CSS variables for the light + dark
 * palettes, flips `data-kovax-theme` on the target element, and exposes the
 * current mode via `useColorMode()`.
 *
 * Without this provider the library still renders using the static palette
 * (every `themeToken(...)` call ships an inline hex fallback), so adoption is
 * incremental.
 */
export function ThemeProvider({
  colorMode: controlledMode,
  defaultColorMode = "system",
  onColorModeChange,
  storageKey = STORAGE_KEY,
  palettes,
  target = "documentElement",
  children,
  nonce,
}: ThemeProviderProps) {
  const lightFinal = useMemo(
    () => mergePalette(lightPalette, palettes?.light),
    [palettes?.light],
  );
  const darkFinal = useMemo(
    () => mergePalette(darkPalette, palettes?.dark),
    [palettes?.dark],
  );

  const [internalMode, setInternalMode] = useState<ColorMode>(() => {
    if (controlledMode) return controlledMode;
    return readStoredMode(storageKey) ?? defaultColorMode;
  });
  const mode = controlledMode ?? internalMode;

  const [systemResolved, setSystemResolved] = useState<ResolvedColorMode>(() =>
    typeof window === "undefined" ? "light" : systemPrefersDark() ? "dark" : "light",
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemResolved(mql.matches ? "dark" : "light");
    onChange();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, []);

  const resolved: ResolvedColorMode =
    mode === "system" ? systemResolved : mode;

  const scopeId = useId();
  const scopeAttr = `data-kovax-scope-${scopeId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const isDocumentTarget = target === "documentElement";
  const scopeSelector = isDocumentTarget
    ? ":root"
    : `[${scopeAttr}]`;
  const darkSelector = isDocumentTarget
    ? `:root[${DATA_ATTR}="dark"]`
    : `[${scopeAttr}][${DATA_ATTR}="dark"]`;

  const css = useMemo(() => {
    const baseBlock = buildThemeCss(scopeSelector, lightFinal, { includeStatic: true });
    const darkBlock = buildThemeCss(darkSelector, darkFinal, { includeStatic: false });
    return `${baseBlock}\n${darkBlock}`;
  }, [scopeSelector, darkSelector, lightFinal, darkFinal]);

  const targetElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const el =
      isDocumentTarget
        ? document.documentElement
        : (target as React.RefObject<HTMLElement | null>).current;
    if (!el) return;
    targetElementRef.current = el;
    el.setAttribute(DATA_ATTR, resolved);
    if (!isDocumentTarget) el.setAttribute(scopeAttr, "");
    return () => {
      if (!isDocumentTarget) el.removeAttribute(scopeAttr);
    };
  }, [resolved, isDocumentTarget, scopeAttr, target]);

  useEffect(() => {
    onColorModeChange?.(mode, resolved);
  }, [mode, resolved, onColorModeChange]);

  const setColorMode = useCallback(
    (next: ColorMode) => {
      if (controlledMode === undefined) setInternalMode(next);
      if (storageKey && typeof window !== "undefined") {
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          /* ignore */
        }
      }
    },
    [controlledMode, storageKey],
  );

  const toggleColorMode = useCallback(() => {
    setColorMode(resolved === "dark" ? "light" : "dark");
  }, [resolved, setColorMode]);

  const value: ThemeContextValue = useMemo(
    () => ({
      colorMode: mode,
      resolvedColorMode: resolved,
      setColorMode,
      toggleColorMode,
      palette: resolved === "dark" ? darkFinal : lightFinal,
      palettes: { light: lightFinal, dark: darkFinal },
      scopeSelector,
    }),
    [mode, resolved, setColorMode, toggleColorMode, darkFinal, lightFinal, scopeSelector],
  );

  return (
    <ThemeContext.Provider value={value}>
      <style data-kovax-theme-style="" nonce={nonce}>{css}</style>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.displayName = "ThemeProvider";

export { resolveMode };
