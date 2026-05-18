import React, { useEffect } from "react";
import { themeToken } from "../theme/tokens";
import { ensureSkeletonKeyframes } from "./skeletonKeyframes";
import type { SkeletonProps, SkeletonShape, SkeletonVariant } from "./Skeleton.types";

function dim(value: string | number | undefined, fallback: string): string {
  if (value === undefined) return fallback;
  if (typeof value === "number") return `${value}px`;
  return value;
}

function borderRadiusForShape(shape: SkeletonShape): string {
  switch (shape) {
    case "circle":
      return themeToken("borderRadius.full");
    case "rounded":
      return themeToken("borderRadius.md");
    default:
      return themeToken("borderRadius.sm");
  }
}

function animationForVariant(variant: SkeletonVariant): string | undefined {
  if (variant === "none") return undefined;
  const dur = themeToken("duration.slow");
  const ease = themeToken("easing.standard");
  if (variant === "pulse") {
    return `kv-skeleton-pulse ${dur} ${ease} infinite`;
  }
  return `kv-skeleton-shimmer ${dur} ${ease} infinite`;
}

/**
 * Loading placeholder block. Injects shared `@keyframes` once (pulse / shimmer).
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    {
      variant = "pulse",
      shape = "rectangle",
      width: widthProp,
      height: heightProp,
      text = false,
      className,
      style,
      role = "presentation",
      "aria-hidden": ariaHidden = true,
      ...rest
    },
    ref,
  ) {
    useEffect(() => {
      if (variant !== "none") ensureSkeletonKeyframes();
    }, [variant]);

    const radius = borderRadiusForShape(shape);

    const widthDefault = text ? "100%" : shape === "circle" ? "40px" : "100%";
    const heightDefault = text
      ? themeToken("text.sm")
      : shape === "circle"
        ? "40px"
        : "16px";

    const width = dim(widthProp, widthDefault);
    const height = dim(heightProp, heightDefault);

    const baseBg = themeToken("secondary.200");
    const highlight = themeToken("secondary.100");

    const pulseStyles: React.CSSProperties =
      variant === "pulse"
        ? {
            backgroundColor: baseBg,
            animation: animationForVariant("pulse"),
          }
        : {};

    const shimmerStyles: React.CSSProperties =
      variant === "shimmer"
        ? {
            backgroundImage: `linear-gradient(90deg, ${baseBg} 0%, ${highlight} 42%, ${baseBg} 85%)`,
            backgroundSize: "200% 100%",
            backgroundRepeat: "no-repeat",
            animation: animationForVariant("shimmer"),
          }
        : {};

    const noneStyles: React.CSSProperties =
      variant === "none"
        ? {
            backgroundColor: baseBg,
          }
        : {};

    const rootStyle: React.CSSProperties = {
      display: "block",
      boxSizing: "border-box",
      width,
      height,
      maxWidth: "100%",
      borderRadius: radius,
      overflow: "hidden",
      flexShrink: 0,
      ...pulseStyles,
      ...shimmerStyles,
      ...noneStyles,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={rootStyle}
        role={role}
        aria-hidden={ariaHidden}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
