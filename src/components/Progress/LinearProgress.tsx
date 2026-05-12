import React from "react";
import { sizes, transitions } from "../theme/tokens";
import type { LinearProgressProps } from "./Progress.types";
import {
  ensureLinearIndeterminateKeyframes,
  LINEAR_INDETERMINATE_ANIMATION,
} from "./progressKeyframes";
import {
  clampProgress,
  linearThickness,
  progressColors,
  progressPercent,
} from "./progressShared";

export const LinearProgress = React.forwardRef<
  HTMLDivElement,
  LinearProgressProps
>(function LinearProgress(
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
  ensureLinearIndeterminateKeyframes();

  const hasNamedBy = Boolean(ariaLabelledby);

  const { fill, track } = progressColors(colorScheme);
  const height = linearThickness(size, thickness);
  const pct = progressPercent(value, min, max);

  const ariaValueNow =
    indeterminate || Number.isNaN(value)
      ? undefined
      : Math.round(clampProgress(value, min, max));

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={ariaValueNow}
      aria-label={hasNamedBy ? undefined : (ariaLabel ?? "Progress")}
      aria-labelledby={ariaLabelledby}
      data-progress-variant="linear"
      data-progress-indeterminate={indeterminate ? "true" : undefined}
      data-progress-scheme={colorScheme}
      className={className}
      style={{
        width: "100%",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          height,
          borderRadius: sizes.borderRadius.full,
          background: track,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: indeterminate ? "42%" : `${pct}%`,
            borderRadius: sizes.borderRadius.full,
            background: fill,
            transformOrigin: "left center",
            transition: indeterminate
              ? undefined
              : `width ${transitions.fast}`,
            animation: indeterminate
              ? LINEAR_INDETERMINATE_ANIMATION
              : undefined,
          }}
        />
      </div>
    </div>
  );
});
