import React from "react";
import { colors, themeToken } from "../theme/tokens";
import type { SelectProps } from "./Select.types";
import { getSpacingStyles } from "../../utils/styleUtils";
import { useFormControlContext } from "../Form/FormControlContext";
import { useFocusVisible } from "../../core/hooks/useFocusVisible";

const CHEVRON_SVG = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
);

/**
 * Styled native `<select>` aligned with `Input` tokens (`variant`, `size`, `colorScheme`).
 * `ref` attaches to the `<select>`.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  props,
  ref,
) {
  const {
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
    m,
    mt,
    mr,
    mb,
    ml,
    p,
    pt,
    pr,
    pb,
    pl,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    display,
    position,
    top,
    right,
    bottom,
    left,
    textAlign,
    className,
    style,

    variant = "default",
    size = "md",
    colorScheme = "primary",
    isInvalid: isInvalidProp,
    isDisabled: isDisabledProp,
    isRequired: isRequiredProp,

    disabled,
    required,
    id,
    children,
    onFocus,
    onBlur,

    "aria-invalid": ariaInvalidProp,
    "aria-describedby": ariaDescribedBy,

    ...domRest
  } = props;

  const formCtrlCtx = useFormControlContext();
  const isInvalid = isInvalidProp ?? formCtrlCtx?.isInvalid ?? false;
  const isDisabled = Boolean(disabled ?? isDisabledProp ?? formCtrlCtx?.isDisabled ?? false);
  const isRequired = Boolean(required ?? isRequiredProp ?? formCtrlCtx?.isRequired ?? false);

  const sizePadding = {
    sm: {
      y: themeToken("spacing.xs"),
      x: themeToken("spacing.sm"),
      fontSize: themeToken("text.sm"),
    },
    md: {
      y: themeToken("spacing.sm"),
      x: themeToken("spacing.md"),
      fontSize: themeToken("text.base"),
    },
    lg: {
      y: themeToken("spacing.md"),
      x: themeToken("spacing.lg"),
      fontSize: themeToken("text.lg"),
    },
  } as const;
  const sz = typeof size === "string" && size in sizePadding ? size : "md";
  const sp = sizePadding[sz as keyof typeof sizePadding];

  const baseColor = colors[colorScheme][500];
  const idleBorder: string =
    variant === "filled" ? colors.secondary[200] : colors.secondary[300];

  const [isFocused, setIsFocused] = React.useState(false);
  const { focusVisible, onFocus: fvFocus, onBlur: fvBlur } = useFocusVisible<HTMLSelectElement>(
    isDisabled,
  );

  let borderCol = idleBorder;
  if (isInvalid) borderCol = colors.error[500];
  else if (isFocused && !isDisabled) borderCol = baseColor;

  const background =
    isDisabled ? colors.secondary[100]
    : variant === "filled" ? colors.secondary[50]
    : variant === "outline" ? "transparent"
    : themeToken("white");

  const boxShadowDefault = variant !== "default" ? "none" : themeToken("shadow.sm");
  const ringOuter = isInvalid ? colors.error[500] : baseColor;
  const focusVisibleRing =
    focusVisible && !isDisabled
      ? `0 0 0 2px ${themeToken("white")}, 0 0 0 4px ${ringOuter}`
      : undefined;
  const mergedBoxShadow = [focusVisibleRing, boxShadowDefault !== "none" ? boxShadowDefault : null]
    .filter(Boolean)
    .join(", ") || "none";

  const chevronPad = "1.75rem";
  const spacingStyles = getSpacingStyles({
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
    m,
    mt,
    mr,
    mb,
    ml,
    p,
    pt,
    pr,
    pb,
    pl,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    display,
    position,
    top,
    right,
    bottom,
    left,
    textAlign,
    style,
  });

  const shellStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    ...spacingStyles,
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    margin: 0,
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    paddingTop: sp.y,
    paddingBottom: sp.y,
    paddingLeft: sp.x,
    paddingRight: `calc(${sp.x} + ${chevronPad})`,
    fontSize: sp.fontSize,
    fontFamily: "inherit",
    lineHeight: 1.25,
    color: colors.secondary[900],
    borderRadius: themeToken("borderRadius.md"),
    border: `1px solid ${borderCol}`,
    backgroundColor: background,
    backgroundImage: `url("data:image/svg+xml,${CHEVRON_SVG}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${sp.x} center`,
    backgroundSize: "1rem 1rem",
    boxShadow: mergedBoxShadow === "none" ? "none" : mergedBoxShadow,
    opacity: isDisabled ? 0.6 : 1,
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: themeToken("transition.default"),
    outline: "none",
  };

  const assignRef = React.useCallback(
    (node: HTMLSelectElement | null) => {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<HTMLSelectElement | null>).current = node;
      }
    },
    [ref],
  );

  const mergedFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    fvFocus(e);
    onFocus?.(e);
  };

  const mergedBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    fvBlur();
    onBlur?.(e);
  };

  return (
    <div style={shellStyle} className={className}>
      <select
        ref={assignRef}
        {...domRest}
        id={id}
        disabled={isDisabled}
        required={isRequired}
        aria-invalid={ariaInvalidProp === true || isInvalid === true ? true : undefined}
        aria-required={isRequired ? true : undefined}
        aria-describedby={ariaDescribedBy}
        style={selectStyle}
        onFocus={mergedFocus}
        onBlur={mergedBlur}
      >
        {children}
      </select>
    </div>
  );
});

Select.displayName = "Select";
