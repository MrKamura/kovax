/**
 * Generates a Tailwind CSS v4 `@theme inline` preset that maps Kovax `--kx-*`
 * CSS variables to Tailwind utility namespaces (`bg-kx-primary-500`, `p-kx-md`, …).
 *
 * Uses `@theme inline` so utilities resolve `var(--kx-…)` at use-site — required
 * for ThemeProvider-driven light/dark palette swaps.
 */

import {
  baseColorVarName,
  colorVarName,
  tokenVarName,
} from "../components/theme/cssVars";
import { lightPalette } from "../components/theme/palettes";
import {
  breakpoints,
  colors,
  fontWeights,
  letterSpacings,
  lineHeights,
  motion,
  sizes,
  transitions,
  zIndices,
  type ColorName,
  type ColorShade,
} from "../components/theme/tokens";

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

/** Comma-containing fallbacks break `var(name, fallback)` — omit them. */
function kxRef(name: string, fallback: string | number): string {
  const fb = String(fallback);
  if (fb.includes(",")) return `var(${name})`;
  return `var(${name}, ${fb})`;
}

function pushMapping(
  out: string[],
  tailwindVar: string,
  kxVar: string,
  fallback: string | number,
): void {
  out.push(`  ${tailwindVar}: ${kxRef(kxVar, fallback)};`);
}

/**
 * Produce the contents of `dist/tailwind.css` (without a leading `@import`).
 */
export function generateTailwindThemeCss(): string {
  const lines: string[] = [];
  const palette = lightPalette;

  for (const paletteName of COLOR_NAMES) {
    const scale = colors[paletteName];
    for (const shade of COLOR_SHADES) {
      pushMapping(
        lines,
        `--color-kx-${paletteName}-${shade}`,
        colorVarName(paletteName, shade),
        scale[shade],
      );
    }
  }

  pushMapping(
    lines,
    "--color-kx-base-white",
    baseColorVarName("white"),
    palette.baseColors.white,
  );
  pushMapping(
    lines,
    "--color-kx-base-black",
    baseColorVarName("black"),
    palette.baseColors.black,
  );

  for (const [key, value] of Object.entries(sizes.text)) {
    pushMapping(lines, `--text-kx-${key}`, tokenVarName("text", key), value);
  }

  for (const [key, value] of Object.entries(sizes.spacing)) {
    pushMapping(
      lines,
      `--spacing-kx-${key}`,
      tokenVarName("spacing", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(sizes.borderRadius)) {
    pushMapping(
      lines,
      `--radius-kx-${key}`,
      tokenVarName("radius", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(palette.shadows)) {
    pushMapping(
      lines,
      `--shadow-kx-${key}`,
      tokenVarName("shadow", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(fontWeights)) {
    pushMapping(
      lines,
      `--font-weight-kx-${key}`,
      tokenVarName("font-weight", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(lineHeights)) {
    pushMapping(
      lines,
      `--leading-kx-${key}`,
      tokenVarName("line-height", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(letterSpacings)) {
    pushMapping(
      lines,
      `--tracking-kx-${key}`,
      tokenVarName("letter-spacing", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(motion.duration)) {
    pushMapping(
      lines,
      `--transition-duration-kx-${key}`,
      tokenVarName("duration", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(motion.easing)) {
    pushMapping(
      lines,
      `--ease-kx-${key}`,
      tokenVarName("easing", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(transitions)) {
    pushMapping(
      lines,
      `--transition-kx-${key}`,
      tokenVarName("transition", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(zIndices)) {
    pushMapping(
      lines,
      `--z-index-kx-${key}`,
      tokenVarName("zindex", key),
      value,
    );
  }

  for (const [key, value] of Object.entries(breakpoints)) {
    lines.push(`  --breakpoint-kx-${key}: ${value};`);
  }

  const header = `/**
 * Kovax React — Tailwind CSS v4 theme preset
 *
 * Import after tailwindcss in your global CSS:
 *
 *   @import "tailwindcss";
 *   @import "kovax-react/tailwind";
 *
 * Mount ThemeProvider so \`--kx-*\` variables update at runtime (light/dark).
 * Utilities like \`bg-kx-primary-500\` and \`text-kx-secondary-700\` stay in sync.
 *
 * @see https://github.com/MrKamura/kovax/blob/master/docs/TAILWIND.md
 */`;

  return `${header}\n@theme inline {\n${lines.join("\n")}\n}\n`;
}
