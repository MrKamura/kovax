import { colors } from "../theme/tokens";
import type { ProgressColorScheme, ProgressSize } from "./Progress.types";

export function progressColors(scheme: ProgressColorScheme): {
  fill: string;
  track: string;
} {
  return {
    fill: colors[scheme][500],
    track: colors.secondary[200],
  };
}

export function clampProgress(
  value: number,
  min: number,
  max: number,
): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function progressPercent(
  value: number,
  min: number,
  max: number,
): number {
  if (max <= min) return 0;
  return ((clampProgress(value, min, max) - min) / (max - min)) * 100;
}

const LINEAR_HEIGHT: Record<ProgressSize, number> = {
  sm: 4,
  md: 8,
  lg: 12,
};

const CIRCULAR_DIM: Record<ProgressSize, number> = {
  sm: 28,
  md: 40,
  lg: 52,
};

const CIRCULAR_STROKE: Record<ProgressSize, number> = {
  sm: 3,
  md: 4,
  lg: 5,
};

export function linearThickness(size: ProgressSize, override?: number): number {
  return override ?? LINEAR_HEIGHT[size];
}

export function circularMetrics(
  size: ProgressSize,
  thicknessOverride?: number,
): { dimension: number; strokeWidth: number } {
  return {
    dimension: CIRCULAR_DIM[size],
    strokeWidth: thicknessOverride ?? CIRCULAR_STROKE[size],
  };
}
