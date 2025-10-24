import { colors, sizes, shadows, transitions } from "../../tokens";
import type { ButtonProps } from "./Button.types";

/**
 * Kovax Button — dynamic inline style generator
 */
export const createButtonStyles = (props: ButtonProps): React.CSSProperties => {
  const {
    variant = "solid",
    color = "primary",
    shadow = "none",
    size = "md",
    w,
    h,
    bg,
    textColor,
    borderColor,
    borderRadius,
    disabled,
    style,
  } = props;

  // base color palette
  const colorSet = colors[color] ?? colors.primary;
  const baseColor = colorSet[500];
  const hoverColor = colorSet[600] ?? baseColor;
  const activeColor = colorSet[700] ?? baseColor;

  // size mapping
  const sizeMap: Record<string, { fontSize: string; padding: string; height: string }> = {
    xs: { fontSize: "0.75rem", padding: "4px 10px", height: "28px" },
    sm: { fontSize: "0.875rem", padding: "6px 12px", height: "32px" },
    md: { fontSize: "1rem", padding: "8px 16px", height: "38px" },
    lg: { fontSize: "1.125rem", padding: "10px 20px", height: "44px" },
    xl: { fontSize: "1.25rem", padding: "12px 24px", height: "50px" },
  };

  const s = typeof size === "string" ? sizeMap[size] ?? sizeMap.md : sizeMap.md;

  const txtColor = textColor ?? (variant === "solid" ? "#fff" : baseColor);

  const backgroundColor =
    variant === "solid"
      ? bg ?? baseColor
      : variant === "ghost"
        ? "transparent"
        : bg ?? "transparent";

  return {
    width: w,
    height: h ?? s.height,
    backgroundColor,
    color: txtColor,
    borderColor: borderColor ?? (variant === "outline" ? baseColor : "transparent"),
    borderWidth: variant === "outline" ? "1px" : 0,
    borderStyle: variant === "outline" ? "solid" : "none",
    borderRadius: borderRadius ?? sizes.borderRadius.md,
    boxShadow: shadows[shadow],
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 500,
    transition: transitions.default,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    lineHeight: 1.2,
    position: "relative",
    ...style,
    // hover и active
    ["--hover-bg" as any]: hoverColor,
    ["--active-bg" as any]: activeColor,
  };
};