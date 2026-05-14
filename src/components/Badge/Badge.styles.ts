import type { CSSProperties } from "react";
import { themeToken } from "../theme/tokens";
import type { BadgeColor, BadgeVariant } from "./Badge.types";

type Scheme = {
  solid: { bg: string; fg: string };
  subtle: { bg: string; fg: string };
  outline: { border: string; fg: string };
};

function scheme(color: BadgeColor): Scheme {
  switch (color) {
    case "primary":
      return {
        solid: {
          bg: themeToken("primary.600"),
          fg: themeToken("white"),
        },
        subtle: {
          bg: themeToken("primary.100"),
          fg: themeToken("primary.900"),
        },
        outline: {
          border: themeToken("primary.500"),
          fg: themeToken("primary.700"),
        },
      };
    case "secondary":
      return {
        solid: {
          bg: themeToken("secondary.600"),
          fg: themeToken("white"),
        },
        subtle: {
          bg: themeToken("secondary.100"),
          fg: themeToken("secondary.900"),
        },
        outline: {
          border: themeToken("secondary.400"),
          fg: themeToken("secondary.800"),
        },
      };
    case "success":
      return {
        solid: {
          bg: themeToken("success.600"),
          fg: themeToken("white"),
        },
        subtle: {
          bg: themeToken("success.100"),
          fg: themeToken("success.900"),
        },
        outline: {
          border: themeToken("success.500"),
          fg: themeToken("success.800"),
        },
      };
    case "warning":
      return {
        solid: {
          bg: themeToken("warning.600"),
          fg: themeToken("secondary.900"),
        },
        subtle: {
          bg: themeToken("warning.100"),
          fg: themeToken("warning.900"),
        },
        outline: {
          border: themeToken("warning.500"),
          fg: themeToken("warning.800"),
        },
      };
    case "error":
      return {
        solid: {
          bg: themeToken("error.600"),
          fg: themeToken("white"),
        },
        subtle: {
          bg: themeToken("error.100"),
          fg: themeToken("error.900"),
        },
        outline: {
          border: themeToken("error.500"),
          fg: themeToken("error.800"),
        },
      };
    default:
      return {
        solid: {
          bg: themeToken("secondary.700"),
          fg: themeToken("white"),
        },
        subtle: {
          bg: themeToken("secondary.100"),
          fg: themeToken("secondary.800"),
        },
        outline: {
          border: themeToken("secondary.300"),
          fg: themeToken("secondary.700"),
        },
      };
  }
}

export function badgeSurfaceStyles(
  variant: BadgeVariant,
  color: BadgeColor,
): Pick<
  CSSProperties,
  "backgroundColor" | "color" | "borderColor" | "borderWidth" | "borderStyle"
> {
  const s = scheme(color);
  switch (variant) {
    case "outline":
      return {
        backgroundColor: "transparent",
        color: s.outline.fg,
        borderColor: s.outline.border,
        borderWidth: 1,
        borderStyle: "solid",
      };
    case "subtle":
      return {
        backgroundColor: s.subtle.bg,
        color: s.subtle.fg,
        borderColor: "transparent",
        borderWidth: 0,
        borderStyle: "none",
      };
    default:
      return {
        backgroundColor: s.solid.bg,
        color: s.solid.fg,
        borderColor: "transparent",
        borderWidth: 0,
        borderStyle: "none",
      };
  }
}
