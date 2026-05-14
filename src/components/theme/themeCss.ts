/**
 * Builds the CSS variable declarations for a `ThemePalette`. Used by
 * `ThemeProvider` to inject a `<style>` element that powers `themeToken("…")`
 * lookups at runtime.
 */

import {
  baseColorVarName,
  colorVarName,
  tokenVarName,
} from "./cssVars";
import type { ColorName, ColorShade } from "./tokens";
import {
  fontWeights,
  letterSpacings,
  lineHeights,
  motion,
  sizes,
  transitions,
  zIndices,
} from "./tokens";
import type { ColorPalette, ThemePalette } from "./palettes";

const COLOR_NAMES: readonly ColorName[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
];

const COLOR_SHADES: readonly ColorShade[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
];

function pushDecl(out: string[], name: string, value: string | number): void {
  out.push(`  ${name}: ${value};`);
}

function appendColorDecls(out: string[], colors: ColorPalette): void {
  for (const palette of COLOR_NAMES) {
    const scale = colors[palette];
    if (!scale) continue;
    for (const shade of COLOR_SHADES) {
      const value = (scale as Record<string, string>)[String(shade)];
      if (value) pushDecl(out, colorVarName(palette, shade), value);
    }
  }
}

function appendStaticTokenDecls(out: string[]): void {
  for (const [key, value] of Object.entries(sizes.text)) {
    pushDecl(out, tokenVarName("text", key), value);
  }
  for (const [key, value] of Object.entries(sizes.spacing)) {
    pushDecl(out, tokenVarName("spacing", key), value);
  }
  for (const [key, value] of Object.entries(sizes.borderRadius)) {
    pushDecl(out, tokenVarName("radius", key), value);
  }
  for (const [key, value] of Object.entries(fontWeights)) {
    pushDecl(out, tokenVarName("font-weight", key), value);
  }
  for (const [key, value] of Object.entries(lineHeights)) {
    pushDecl(out, tokenVarName("line-height", key), value);
  }
  for (const [key, value] of Object.entries(letterSpacings)) {
    pushDecl(out, tokenVarName("letter-spacing", key), value);
  }
  for (const [key, value] of Object.entries(motion.duration)) {
    pushDecl(out, tokenVarName("duration", key), value);
  }
  for (const [key, value] of Object.entries(motion.easing)) {
    pushDecl(out, tokenVarName("easing", key), value);
  }
  for (const [key, value] of Object.entries(transitions)) {
    pushDecl(out, tokenVarName("transition", key), value);
  }
  for (const [key, value] of Object.entries(zIndices)) {
    pushDecl(out, tokenVarName("zindex", key), value);
  }
}

/**
 * Produce a single `<selector> { … }` block of CSS variable declarations for a
 * palette. Static tokens (spacing / typography / motion) only need to be
 * emitted once — pass `includeStatic: true` for the light/default block, and
 * `false` for dark mode (which only overrides color and shadow variables).
 */
export function buildThemeCss(
  selector: string,
  palette: ThemePalette,
  options: { includeStatic?: boolean } = {},
): string {
  const { includeStatic = true } = options;
  const out: string[] = [];

  appendColorDecls(out, palette.colors);
  pushDecl(out, baseColorVarName("white"), palette.baseColors.white);
  pushDecl(out, baseColorVarName("black"), palette.baseColors.black);

  for (const [key, value] of Object.entries(palette.shadows)) {
    pushDecl(out, tokenVarName("shadow", key), value);
  }

  if (includeStatic) {
    appendStaticTokenDecls(out);
  }

  return `${selector} {\n${out.join("\n")}\n}`;
}
