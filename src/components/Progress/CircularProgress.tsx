import React from "react";
import { transitions } from "../theme/tokens";
import type { CircularProgressProps } from "./Progress.types";
import {
  CIRCULAR_INDETERMINATE_ANIMATION,
  ensureCircularIndeterminateKeyframes,
} from "./progressKeyframes";
import {
  circularMetrics,
  clampProgress,
  progressColors,
  progressPercent,
} from "./progressShared";

export const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(function CircularProgress(
  {
    value = 0,
    max = 100,
    min = 0,
    indeterminate = false,
    colorScheme = "primary",
    size = "md",
    thickness,
    style,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...rest
  },
  ref,
) {
  ensureCircularIndeterminateKeyframes();

  const hasNamedBy = Boolean(ariaLabelledby);
  const { dimension, strokeWidth } = circularMetrics(size, thickness);
  const { fill, track } = progressColors(colorScheme);
  const pct = progressPercent(value, min, max);

  const cx = dimension / 2;
  const cy = dimension / 2;
  const r = Math.max(1, dimension / 2 - strokeWidth / 2 - 0.5);
  const circumference = 2 * Math.PI * r;

  const ariaValueNow =
    indeterminate || Number.isNaN(value)
      ? undefined
      : Math.round(clampProgress(value, min, max));

  const dashArray = indeterminate
    ? `${circumference * 0.22} ${circumference * 0.78}`
    : `${circumference}`;

  const dashOffset = indeterminate
    ? circumference * 0.08
    : circumference * (1 - pct / 100);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={ariaValueNow}
      aria-label={hasNamedBy ? undefined : (ariaLabel ?? "Progress")}
      aria-labelledby={ariaLabelledby}
      data-progress-variant="circular"
      data-progress-indeterminate={indeterminate ? "true" : undefined}
      data-progress-scheme={colorScheme}
      className={className}
      style={{
        display: "inline-flex",
        lineHeight: 0,
        verticalAlign: "middle",
        ...style,
      }}
      {...rest}
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        aria-hidden
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "center",
          animation: indeterminate
            ? CIRCULAR_INDETERMINATE_ANIMATION
            : undefined,
        }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={track}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={fill}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          style={{
            transition: indeterminate
              ? undefined
              : `stroke-dashoffset ${transitions.fast}`,
          }}
        />
      </svg>
    </div>
  );
});
