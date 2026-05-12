import React from "react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button.types";

export interface IconButtonProps extends Omit<ButtonProps, "children" | "leftIcon" | "rightIcon"> {
  /** Accessible name — required because there is no visible text label. */
  "aria-label": string;
  icon: React.ReactNode;
}

const sizeHitPx: Record<string, number> = {
  xs: 28,
  sm: 32,
  md: 38,
  lg: 44,
  xl: 50,
};

export const IconButton = React.forwardRef<HTMLElement, IconButtonProps>(
  ({ icon, size = "md", h: hProp, w: wProp, style, ...rest }, ref) => {
    const base =
      typeof size === "string" && size in sizeHitPx ? sizeHitPx[size] : sizeHitPx.md;
    const touch = Math.max(base, 44);

    return (
      <Button
        ref={ref}
        {...rest}
        size={size}
        leftIcon={icon}
        w={wProp ?? touch}
        h={hProp ?? touch}
        style={{ padding: 0, gap: 0, ...style }}
      >
        &#8203;
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";
