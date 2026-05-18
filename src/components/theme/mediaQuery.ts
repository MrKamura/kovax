import { breakpoints, themeToken, type BreakpointKey } from "./tokens";

/** `themeToken`-style path for breakpoint widths only. */
export type BreakpointTokenPath = `breakpoint.${BreakpointKey}`;

export function breakpointMinWidth(key: BreakpointKey): string {
  return breakpoints[key];
}

/** `(min-width: <token>)` — for `useMediaQuery`, CSS-in-JS, or `matchMedia`. */
export function breakpointMinMediaQuery(key: BreakpointKey): string {
  return `(min-width: ${breakpoints[key]})`;
}

/** Same string as `breakpointMinMediaQuery` but resolves via `themeToken`. */
export function breakpointMinMediaQueryFromToken(path: BreakpointTokenPath): string {
  return `(min-width: ${themeToken(path)})`;
}
