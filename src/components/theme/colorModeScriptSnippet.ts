import type { ColorMode } from "./themeContext";
import {
  KOVAX_COLOR_MODE_STORAGE_KEY,
  KOVAX_THEME_ATTRIBUTE,
} from "./themeConstants";

export interface ColorModeScriptOptions {
  /** Must match `ThemeProvider` `storageKey`. */
  storageKey?: string;
  /** Used when storage is empty or invalid. */
  defaultColorMode?: ColorMode;
  /** Attribute on `document.documentElement`. */
  attribute?: string;
}

/**
 * Inline IIFE executed before first paint — sets `data-kovax-theme` from
 * `localStorage` / `system` (mirrors ThemeProvider initial resolution).
 */
export function buildColorModeInitScript(
  options: ColorModeScriptOptions = {},
): string {
  const storageKey = options.storageKey ?? KOVAX_COLOR_MODE_STORAGE_KEY;
  const defaultColorMode = options.defaultColorMode ?? "system";
  const attribute = options.attribute ?? KOVAX_THEME_ATTRIBUTE;

  return `(function(){try{var k=${JSON.stringify(storageKey)};var d=${JSON.stringify(defaultColorMode)};var a=${JSON.stringify(attribute)};var m=localStorage.getItem(k);if(m!=="light"&&m!=="dark"&&m!=="system")m=d;var r=m;if(m==="system"){r=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute(a,r);}catch(e){}})();`;
}

/** Standalone `<script>…</script>` snippet for `_document` / plain HTML. */
export function buildColorModeScriptTag(
  options: ColorModeScriptOptions & { nonce?: string } = {},
): string {
  const { nonce, ...rest } = options;
  const nonceAttr = nonce ? ` nonce="${nonce.replace(/"/g, "")}"` : "";
  return `<script${nonceAttr}>${buildColorModeInitScript(rest)}</script>`;
}
