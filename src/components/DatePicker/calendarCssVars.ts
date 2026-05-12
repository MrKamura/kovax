import type { CSSProperties } from "react";
import { colors } from "../theme/tokens";
import type { ColorName } from "../theme/tokens";

/** Maps Kovax palette into react-day-picker CSS variables on `.rdp-root`. */
export function dayPickerCssVariables(colorScheme: ColorName): CSSProperties {
  const c = colors[colorScheme];
  return {
    ["--rdp-accent-color" as string]: c[600],
    ["--rdp-accent-background-color" as string]: c[100],
    ["--rdp-today-color" as string]: c[700],
    ["--rdp-day-height" as string]: "2.25rem",
    ["--rdp-day-width" as string]: "2.25rem",
    ["--rdp-day_button-height" as string]: "2.125rem",
    ["--rdp-day_button-width" as string]: "2.125rem",
    ["--rdp-nav_button-height" as string]: "2rem",
    ["--rdp-nav_button-width" as string]: "2rem",
  };
}
