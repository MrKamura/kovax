import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "solid" | "outline" | "subtle";

export type BadgeColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  /** Leading status dot (inherits label color). */
  dot?: boolean;
  children?: ReactNode;
}
