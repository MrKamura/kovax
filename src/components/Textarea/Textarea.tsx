import React, { useCallback, useEffect, useRef, useState } from "react";
import { colors, themeToken } from "../theme/tokens";
import type { TextareaProps } from "./Textarea.types";
import { getSpacingStyles } from "../../utils/styleUtils";
import { useFormControlContext } from "../Form/FormControlContext";

/**
 * Kovax Textarea — same chrome rhythm as **`Input`** (variants, sizes, palettes); **`ref`** attaches to the native **`<textarea>`**.
 * Keyboard users see a `:focus-visible` ring via `boxShadow`; pointer focus keeps the accent border only.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
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
      errorMessage,
      isDisabled: isDisabledProp,
      isReadOnly,
      isRequired: isRequiredProp,
      showCharacterCount,
      floatingLabel,
      resize = "vertical",

      value,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      maxLength,
      defaultValue,
      rows = 4,

      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy,

      id: htmlId,

      ...restProps
    } = props;

    const formCtrlCtx = useFormControlContext();
    const isInvalid = isInvalidProp ?? formCtrlCtx?.isInvalid ?? false;
    const isDisabled = isDisabledProp ?? formCtrlCtx?.isDisabled ?? false;
    const isRequired = isRequiredProp ?? formCtrlCtx?.isRequired ?? false;

    const [isFocused, setIsFocused] = useState(false);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const taRef = useRef<HTMLTextAreaElement | null>(null);
    const uncontrolledSeeded = useRef(false);

    const assignRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        taRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref && typeof ref === "object")
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref],
    );

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

    const errorId = React.useId();
    const counterId = React.useId();
    const autoTextareaId = React.useId();

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isDisabled) return;
        const next = e.target.value;
        setDisplayValue(next);
        onChange?.(e);
      },
      [isDisabled, onChange],
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (isDisabled) return;

        setIsFocused(true);
        const el = e.currentTarget;
        queueMicrotask(() => {
          if (document.activeElement === el && el.matches(":focus-visible")) setIsFocusVisible(true);
          else setIsFocusVisible(false);
        });
        onFocus?.(e);
      },
      [onFocus, isDisabled],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        setIsFocusVisible(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    useEffect(() => {
      if (value !== undefined && value !== null) {
        uncontrolledSeeded.current = true;
        setDisplayValue(String(value));
        return;
      }

      if (!uncontrolledSeeded.current) {
        uncontrolledSeeded.current = true;
        if (defaultValue !== undefined && defaultValue !== null) {
          setDisplayValue(String(defaultValue));
        } else {
          setDisplayValue("");
        }
      }
    }, [value, defaultValue]);

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
    const floatingExtraTop =
      sz === "lg" ? themeToken("spacing.sm") : sz === "sm" ? themeToken("spacing.xs") : themeToken("spacing.sm");

    const baseColor = colors[colorScheme][500];
    const idleBorder: string =
      variant === "filled" ? colors.secondary[200] : colors.secondary[300];
    let borderCol = idleBorder;
    if (isInvalid) borderCol = colors.error[500];
    else if (isFocused && !isDisabled) borderCol = baseColor;

    const background =
      isDisabled ? colors.secondary[100]
      : variant === "filled" ? colors.secondary[50]
      : variant === "outline" ? "transparent"
      : themeToken("white");

    const floatingNotchFill =
      background === "transparent" ? themeToken("white") : background;

    const boxShadow = variant !== "default" ? "none" : themeToken("shadow.sm");

    const ringOuter = isInvalid ? colors.error[500] : baseColor;
    const focusVisibleRing =
      isFocusVisible && !isDisabled
        ? `0 0 0 2px ${themeToken("white")}, 0 0 0 4px ${ringOuter}`
        : undefined;

    const shadowLayers = [focusVisibleRing, boxShadow !== "none" ? boxShadow : null].filter(Boolean) as string[];

    const mergedBoxShadow = shadowLayers.length ? shadowLayers.join(", ") : "none";

    const opacity = isDisabled ? 0.6 : 1;

    const maxLenNum =
      maxLength === undefined || maxLength === null ? NaN : Number(maxLength);

    const showCounter =
      Boolean(showCharacterCount) && Number.isFinite(maxLenNum) && maxLenNum > 0;

    const useFloatingUi = Boolean(floatingLabel && placeholder);
    const labelFloated = isFocused || displayValue.length > 0;
    const floatingDomId = htmlId ?? autoTextareaId;

    const describedBy =
      [ariaDescribedBy, isInvalid && errorMessage ? errorId : undefined, showCounter ? counterId : undefined]
        .filter(Boolean)
        .join(" ") || undefined;

    const accessibilityProps = {
      "aria-invalid": isInvalid === true || ariaInvalid === true ? true : undefined,
      "aria-describedby": describedBy,
      "aria-required": isRequired ? true : undefined,
    };

    const floatingCaptionTransition =
      "transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease, background-color 0.2s ease, box-shadow 0.22s cubic-bezier(0.4, 0, 0.2, 1)";

    const floatingCaptionColor =
      isDisabled ? colors.secondary[400]
      : isInvalid ? colors.error[500]
      : labelFloated && isFocused ? baseColor
      : labelFloated ? colors.secondary[600]
      : colors.secondary[400];

    const floatingCaptionStyle: React.CSSProperties | undefined = useFloatingUi ?
        {
          position: "absolute",
          left: sp.x,
          ...(!labelFloated ?
            {
              right: sp.x,
            }
          : {
              width: "max-content",
              maxWidth: `calc(100% - ${sp.x} - ${sp.x})`,
            }),
          top: labelFloated ? 0 : "50%",
          transform: labelFloated ? "translateY(-50%) scale(0.82)" : "translateY(-50%)",
          transformOrigin: "left center",
          fontSize: sp.fontSize,
          fontFamily: "inherit",
          fontWeight: labelFloated ? 500 : 400,
          lineHeight: 1.25,
          color: floatingCaptionColor,
          opacity: isDisabled ? 0.85 : 1,
          pointerEvents: "none",
          zIndex: labelFloated ? 5 : 2,
          transition: floatingCaptionTransition,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...(labelFloated ?
            {
              background: floatingNotchFill,
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 3,
              paddingRight: 3,
              marginLeft: -3,
              borderRadius: themeToken("borderRadius.sm"),
              boxShadow: `0 0 0 2px ${floatingNotchFill}`,
            }
          : {}),
        }
      : undefined;

    const textareaStyle: React.CSSProperties = {
      ...(useFloatingUi ? { position: "relative" as const, zIndex: 0 } : {}),
      paddingTop: useFloatingUi ? `calc(${sp.y} + ${floatingExtraTop})` : sp.y,
      paddingBottom: sp.y,
      paddingLeft: sp.x,
      paddingRight: sp.x,
      fontSize: sp.fontSize,
      lineHeight: 1.5,
      borderRadius: themeToken("borderRadius.md"),
      border: `1px solid ${borderCol}`,
      background,
      boxShadow: mergedBoxShadow,
      opacity,
      transition: themeToken("transition.default"),
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
      resize,
      fontFamily: "inherit",
      ...spacingStyles,
    };

    const shellStyle: React.CSSProperties = {
      position: "relative",
      width: "100%",
      ...(useFloatingUi ? { isolation: "isolate" } : {}),
    };

    return (
      <div style={shellStyle}>
        <textarea
          ref={assignRef}
          {...restProps}
          {...accessibilityProps}
          className={className}
          style={textareaStyle}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          maxLength={maxLength}
          rows={rows}
          id={useFloatingUi ? floatingDomId : htmlId}
          placeholder={useFloatingUi ? undefined : placeholder}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {useFloatingUi && floatingCaptionStyle ?
          <label
            htmlFor={floatingDomId}
            style={floatingCaptionStyle}
            data-testid="kv-textarea-floating-label"
            data-floated={labelFloated ? "true" : "false"}
          >
            {placeholder}
          </label>
        : null}

        {isInvalid && errorMessage ?
          <div
            id={errorId}
            style={{
              color: colors.error[500],
              fontSize: themeToken("text.sm"),
              marginTop: themeToken("spacing.xs"),
            }}
          >
            {errorMessage}
          </div>
        : null}

        {showCounter ?
          <div
            id={counterId}
            style={{
              marginTop: themeToken("spacing.xs"),
              fontSize: themeToken("text.sm"),
              color: colors.secondary[600],
              textAlign: "right",
            }}
          >
            {`${displayValue.length} / ${maxLenNum}`}
          </div>
        : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
