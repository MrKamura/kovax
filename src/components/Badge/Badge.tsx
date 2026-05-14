import React from "react";
import { themeToken } from "../theme/tokens";
import { badgeSurfaceStyles } from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

const SIZE_STYLES = {
  sm: {
    fontSize: themeToken("text.xs"),
    padding: `${themeToken("spacing.2xs")} ${themeToken("spacing.sm")}`,
    dot: 6,
    gap: themeToken("spacing.2xs"),
  },
  md: {
    fontSize: themeToken("text.sm"),
    padding: `${themeToken("spacing.xs")} ${themeToken("spacing.md")}`,
    dot: 8,
    gap: themeToken("spacing.xs"),
  },
} as const;

/**
 * Small label / status chip: solid, outline, or subtle surface per semantic color.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "subtle",
    color = "neutral",
    size = "md",
    dot = false,
    children,
    className,
    style,
    ...rest
  },
  ref,
) {
  const surf = badgeSurfaceStyles(variant, color);
  const sz = SIZE_STYLES[size];

  const rootStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    maxWidth: "100%",
    borderRadius: themeToken("borderRadius.full"),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: themeToken("letterSpacing.tight"),
    whiteSpace: "nowrap",
    ...surf,
    fontSize: sz.fontSize,
    padding: sz.padding,
    gap: dot ? sz.gap : undefined,
    ...style,
  };

  return (
    <span ref={ref} className={className} style={rootStyle} {...rest}>
      {dot ? (
        <span
          aria-hidden
          style={{
            width: sz.dot,
            height: sz.dot,
            borderRadius: themeToken("borderRadius.full"),
            backgroundColor: "currentColor",
            opacity: 0.95,
            flexShrink: 0,
          }}
        />
      ) : null}
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
