import type { HTMLAttributes } from "react";

export type SkeletonVariant = "pulse" | "shimmer" | "none";

export type SkeletonShape = "rectangle" | "rounded" | "circle";

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Pulse fades opacity; shimmer sweeps a gradient; none is static (e.g. reduced-motion fallback). */
  variant?: SkeletonVariant;
  /** Visual contour — circle for avatars, rounded for cards/chips. */
  shape?: SkeletonShape;
  /** CSS width (number → px). */
  width?: string | number;
  /** CSS height (number → px). */
  height?: string | number;
  /**
   * One-line text placeholder: sets height from `text.sm` and full width unless `width` is set.
   */
  text?: boolean;
}
