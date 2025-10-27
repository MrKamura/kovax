import { colors, shadows, sizes, transitions } from "../theme/tokens";
import { ButtonStyleProps } from "./Button.types";

export const createButtonStyles = (props: ButtonStyleProps & { disabled?: boolean }): React.CSSProperties => {
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
  } = props;

  const colorSet = colors[color] ?? colors.primary;
  const baseColor = colorSet[500];
  const hoverColor = colorSet[600] ?? baseColor;
  const activeColor = colorSet[700] ?? baseColor;

  const sizeMap: Record<string, { fontSize: string; padding: string; height: string }> = {
    xs: { fontSize: sizes.text.xs, padding: `${sizes.spacing.xs} ${sizes.spacing.sm}`, height: "28px" },
    sm: { fontSize: sizes.text.sm, padding: `${sizes.spacing.sm} ${sizes.spacing.md}`, height: "32px" },
    md: { fontSize: sizes.text.base, padding: `${sizes.spacing.sm} ${sizes.spacing.lg}`, height: "38px" },
    lg: { fontSize: sizes.text.lg, padding: `${sizes.spacing.md} ${sizes.spacing.lg}`, height: "44px" },
    xl: { fontSize: sizes.text.xl, padding: `${sizes.spacing.lg} ${sizes.spacing.xl}`, height: "50px" },
  };

  // Используем type guard для безопасного доступа
  const s = typeof size === "string" && size in sizeMap 
    ? sizeMap[size as keyof typeof sizeMap] 
    : sizeMap.md;

  const txtColor = textColor ?? (variant === "solid" ? "#fff" : baseColor);
  const backgroundColor = variant === "solid" ? bg ?? baseColor : "transparent";
  const computedBorderColor = borderColor ?? (variant === "outline" ? baseColor : "transparent");

  return {
    width: w,
    height: h ?? s.height,
    backgroundColor,
    color: txtColor,
    borderColor: computedBorderColor,
    borderWidth: variant === "outline" ? "1px" : 0,
    borderStyle: variant === "outline" ? "solid" : "none",
    borderRadius: borderRadius ?? sizes.borderRadius.md,
    boxShadow: shadows[shadow as keyof typeof shadows] ?? 'none',
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
    textDecoration: variant === "link" ? "underline" : "none",
    userSelect: "none",

    // CSS variables for interactive states
    ["--hover-bg" as any]: variant === "solid" ? hoverColor : variant === "outline" ? colorSet[50] : "transparent",
    ["--active-bg" as any]: variant === "solid" ? activeColor : variant === "outline" ? colorSet[100] : "transparent",
  };
};