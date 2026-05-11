import { colors, themeToken } from "../theme/tokens";
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
    xs: {
      fontSize: themeToken("text.xs"),
      padding: `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`,
      height: "28px",
    },
    sm: {
      fontSize: themeToken("text.sm"),
      padding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
      height: "32px",
    },
    md: {
      fontSize: themeToken("text.base"),
      padding: `${themeToken("spacing.sm")} ${themeToken("spacing.lg")}`,
      height: "38px",
    },
    lg: {
      fontSize: themeToken("text.lg"),
      padding: `${themeToken("spacing.md")} ${themeToken("spacing.lg")}`,
      height: "44px",
    },
    xl: {
      fontSize: themeToken("text.xl"),
      padding: `${themeToken("spacing.lg")} ${themeToken("spacing.xl")}`,
      height: "50px",
    },
  };

  // Type guard for safe access to size presets
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
    borderRadius: borderRadius ?? themeToken("borderRadius.md"),
    boxShadow: themeToken(`shadow.${shadow}`),
    padding: s.padding,
    fontSize: s.fontSize,
    fontWeight: 500,
    transition: themeToken("transition.default"),
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