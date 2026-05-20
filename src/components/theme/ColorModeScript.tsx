import React from "react";
import {
  buildColorModeInitScript,
  type ColorModeScriptOptions,
} from "./colorModeScriptSnippet";
import type { ColorMode } from "./themeContext";

export interface ColorModeScriptProps extends ColorModeScriptOptions {
  /** CSP `nonce` for the inline script. */
  nonce?: string;
}

/**
 * Blocking inline script for `<head>` — sets `data-kovax-theme` before first
 * paint (Chakra-style `ColorModeScript`). Pair with `ThemeProvider` using the
 * same `storageKey` / `defaultColorMode`.
 *
 * RSC-safe: no hooks — import from `kovax-react/server` in Next.js App Router.
 */
export function ColorModeScript({
  storageKey,
  defaultColorMode = "system",
  attribute,
  nonce,
}: ColorModeScriptProps) {
  const script = buildColorModeInitScript({
    storageKey,
    defaultColorMode: defaultColorMode as ColorMode,
    attribute,
  });

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
      nonce={nonce}
    />
  );
}

ColorModeScript.displayName = "ColorModeScript";
