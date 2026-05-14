import React, { useEffect, useMemo, useState } from "react";
import { themeToken } from "../theme/tokens";
import type {
  AvatarColorScheme,
  AvatarProps,
  AvatarShape,
  AvatarSize,
} from "./Avatar.types";

const SIZE_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const FALLBACK_TEXT_SIZE: Record<AvatarSize, string> = {
  xs: themeToken("text.xs"),
  sm: themeToken("text.xs"),
  md: themeToken("text.sm"),
  lg: themeToken("text.base"),
  xl: themeToken("text.lg"),
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return `${first}${last}`.toUpperCase();
}

function schemeSurface(scheme: AvatarColorScheme): {
  backgroundColor: string;
  color: string;
} {
  switch (scheme) {
    case "primary":
      return {
        backgroundColor: themeToken("primary.600"),
        color: themeToken("secondary.50"),
      };
    case "secondary":
      return {
        backgroundColor: themeToken("secondary.600"),
        color: themeToken("secondary.50"),
      };
    case "success":
      return {
        backgroundColor: themeToken("success.600"),
        color: themeToken("secondary.50"),
      };
    case "warning":
      return {
        backgroundColor: themeToken("warning.600"),
        color: themeToken("secondary.900"),
      };
    case "error":
      return {
        backgroundColor: themeToken("error.600"),
        color: themeToken("secondary.50"),
      };
    default:
      return {
        backgroundColor: themeToken("secondary.200"),
        color: themeToken("secondary.800"),
      };
  }
}

function shapeRadius(shape: AvatarShape): string {
  return shape === "circle"
    ? themeToken("borderRadius.full")
    : themeToken("borderRadius.md");
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar(
    {
      src,
      alt,
      name,
      fallback,
      size = "md",
      shape = "circle",
      colorScheme = "neutral",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const dim = SIZE_PX[size];
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
      setImageFailed(false);
    }, [src]);

    const showImage = Boolean(src) && !imageFailed;

    const ariaLabel = useMemo(() => {
      if (showImage) return undefined;
      if (name && String(name).trim()) return name.trim();
      if (typeof alt === "string" && alt.trim()) return alt.trim();
      return undefined;
    }, [showImage, name, alt]);

    const surface = schemeSurface(colorScheme);
    const radius = shapeRadius(shape);

    const shell: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: dim,
      height: dim,
      borderRadius: radius,
      overflow: "hidden",
      boxSizing: "border-box",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: themeToken("secondary.200"),
      fontFamily: "inherit",
      fontWeight: 600,
      lineHeight: 1,
      fontSize: FALLBACK_TEXT_SIZE[size],
      userSelect: "none",
      ...surface,
      ...style,
    };

    const fallbackContent =
      fallback !== undefined && fallback !== null ? (
        fallback
      ) : name ? (
        initialsFromName(name)
      ) : (
        "?"
      );

    return (
      <span
        ref={ref}
        className={className}
        style={shell}
        role={showImage ? undefined : "img"}
        aria-label={showImage ? undefined : ariaLabel}
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? ""}
            width={dim}
            height={dim}
            draggable={false}
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {fallbackContent}
          </span>
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";
