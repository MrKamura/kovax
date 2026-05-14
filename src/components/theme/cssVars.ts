/**
 * CSS variable bridge for design tokens.
 *
 * `themeToken("primary.500")` now returns a `var(--kx-color-primary-500, #3b82f6)`
 * string. The hex/raw fallback keeps every consumer working **without**
 * `<ThemeProvider>`; with the provider the variable resolves to whichever
 * palette is active (light / dark / custom).
 */

const VAR_PREFIX = "--kx";

function escapeCssIdent(key: string): string {
  return String(key).replace(/[^a-zA-Z0-9_-]/g, "-");
}

function joinVarName(parts: ReadonlyArray<string>): string {
  return [VAR_PREFIX, ...parts.map(escapeCssIdent)].join("-");
}

/** CSS variable name for a palette / shade pair (no leading `var(`). */
export function colorVarName(palette: string, shade: string | number): string {
  return joinVarName(["color", palette, String(shade)]);
}

/** CSS variable name for the neutral surfaces (`white`, `black`). */
export function baseColorVarName(name: string): string {
  return joinVarName(["color", "base", name]);
}

/**
 * CSS variable name for any `themeToken` namespace + key (e.g.
 * `spacing.md` → `--kx-spacing-md`).
 */
export function tokenVarName(namespace: string, key: string): string {
  return joinVarName([namespace, key]);
}

/** `var(--name, fallback)` helper — keeps the raw value reachable when no theme is mounted. */
export function wrapVar(name: string, fallback: string): string {
  return `var(${name}, ${fallback})`;
}
