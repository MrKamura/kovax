import type { HTMLAttributes } from "react";
import type { ColorName } from "../theme/tokens";

/** Palettes available for the filled portion (track stays neutral). */
export type ProgressColorScheme = ColorName;

export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressValueProps {
  /** Current value; clipped to `[min, max]`. Ignored when `indeterminate` is true. */
  value?: number;
  /** Maximum bound (default `100`). */
  max?: number;
  /** Minimum bound (default `0`). */
  min?: number;
  /** Omits `aria-valuenow` and shows motion hint — use for unknown duration. */
  indeterminate?: boolean;
  /** Stroke / bar palette (default `primary`). */
  colorScheme?: ProgressColorScheme;
  /** Density preset (default `md`). */
  size?: ProgressSize;
}

export interface LinearProgressProps
  extends ProgressValueProps,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Bar height in px (overrides `size`). */
  thickness?: number;
}

export interface CircularProgressProps
  extends ProgressValueProps,
    Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Ring stroke width in px (overrides size-based default). */
  thickness?: number;
}
