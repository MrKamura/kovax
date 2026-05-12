import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { colors, themeToken } from "../theme/tokens";
import { InputProps } from "./Input.types";
import { getSpacingStyles } from "../../utils/styleUtils";
import { InputGroupContext } from "./InputGroupContext";
import { useFormControlContext } from "../Form/FormControlContext";

/**
 * Kovax Input — mask, variants, floating caption (`floatingLabel`), accessibility;
 * `ref` attaches to the native `<input>`.
 * Keyboard users see a `:focus-visible` ring via `boxShadow`; pointer focus keeps the accent border only.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const {
    // Spacing props
    w, h, minW, maxW, minH, maxH,
    m, mt, mr, mb, ml,
    p, pt, pr, pb, pl,
    flex, flexGrow, flexShrink, flexBasis,
    display, position, top, right, bottom, left,
    textAlign,
    className,
    style,

    // Input props
    variant = "default",
    size = "md",
    colorScheme = "primary",
    isInvalid: isInvalidProp,
    errorMessage,
    isDisabled: isDisabledProp,
    isReadOnly,
    isRequired: isRequiredProp,
    mask,
    maskChar = "_",
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    maxLength,
    defaultValue,
    clearable,
    clearAriaLabel = "Clear",
    onClear,
    showCharacterCount,
    floatingLabel,

    // HTML attributes
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedBy,
    
    // Rest props (native input attributes)
    id: htmlId,

    ...restProps
  } = props;

  const formCtrlCtx = useFormControlContext();
  const isInvalid = isInvalidProp ?? formCtrlCtx?.isInvalid ?? false;
  const isDisabled = isDisabledProp ?? formCtrlCtx?.isDisabled ?? false;
  const isRequired = isRequiredProp ?? formCtrlCtx?.isRequired ?? false;

  const inGroup = useContext(InputGroupContext);

  const [isFocused, setIsFocused] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const uncontrolledSeeded = useRef(false);

  const assignRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object")
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    },
    [ref],
  );

  // Get spacing styles
  const spacingStyles = getSpacingStyles({
    w, h, minW, maxW, minH, maxH,
    m, mt, mr, mb, ml,
    p, pt, pr, pb, pl,
    flex, flexGrow, flexShrink, flexBasis,
    display, position, top, right, bottom, left,
    textAlign,
    style,
  });

  // Generate unique ID for error message and character counter
  const errorId = React.useId();
  const counterId = React.useId();
  const autoInputId = React.useId();

  /**
   * Improved mask implementation
   */
  const applyMask = useCallback((inputValue: string): string => {
    if (!mask || typeof mask !== 'string') return inputValue;

    let result = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      const maskPattern = mask[i];
      
      if (valueIndex >= inputValue.length) {
        break; // No more input characters
      }

      const valueChar = inputValue[valueIndex];

      if (maskPattern === '9') {
        // Only digits
        if (/[0-9]/.test(valueChar)) {
          result += valueChar;
          valueIndex++;
        } else {
          valueIndex++; // Skip invalid character
        }
      } else if (maskPattern === 'a' || maskPattern === 'A') {
        // Only letters
        if (/[a-zA-Z]/.test(valueChar)) {
          result += maskPattern === 'a' ? valueChar.toLowerCase() : valueChar.toUpperCase();
          valueIndex++;
        } else {
          valueIndex++;
        }
      } else if (maskPattern === '*') {
        // Any character
        result += valueChar;
        valueIndex++;
      } else {
        // Static mask character
        result += maskPattern;
        // Only advance if input matches mask character
        if (valueChar === maskPattern) {
          valueIndex++;
        }
      }
    }

    return result;
  }, [mask]);

  /**
   * Handle input change
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    const inputValue = e.target.value;
    let processedValue = inputValue;

    // Apply mask if provided
    if (mask && typeof mask === 'string') {
      processedValue = applyMask(inputValue);
    }

    setDisplayValue(processedValue);

    if (onChange) {
      // For mask, pass the processed value, for normal input pass raw value
      const valueToPass = mask ? processedValue : inputValue;
      onChange({
        ...e,
        target: {
          ...e.target,
          value: valueToPass,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [mask, applyMask, onChange, isDisabled]);

  /**
   * Handle focus — accent border on any focus; keyboard-only ring via :focus-visible (next microtask).
   */
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    setIsFocused(true);
    const el = e.currentTarget;
    queueMicrotask(() => {
      if (document.activeElement === el && el.matches(":focus-visible")) setIsFocusVisible(true);
      else setIsFocusVisible(false);
    });
    onFocus?.(e);
  }, [onFocus, isDisabled]);

  /**
   * Handle blur
   */
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsFocusVisible(false);
    onBlur?.(e);
  }, [onBlur]);

  const handleClearClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isDisabled || isReadOnly) return;

      setDisplayValue("");
      const el = inputRef.current;
      if (el && onChange) {
        const target = Object.assign({}, el, { value: "" }) as HTMLInputElement & EventTarget & {
          value: string;
        };
        onChange({
          target,
          currentTarget: el,
        } as React.ChangeEvent<HTMLInputElement>);
      }

      onClear?.();
      queueMicrotask(() => inputRef.current?.focus());
    },
    [isDisabled, isReadOnly, onChange, onClear],
  );

  /**
   * Sync with external value changes (controlled), or seed once from defaultValue when uncontrolled.
   */
  useEffect(() => {
    if (value !== undefined && value !== null) {
      uncontrolledSeeded.current = true;
      let stringValue: string;

      if (Array.isArray(value)) {
        stringValue = value.join("");
      } else if (typeof value === "number") {
        stringValue = value.toString();
      } else if (typeof value === "string") {
        stringValue = value;
      } else {
        stringValue = String(value);
      }

      const maskedValue = mask ? applyMask(stringValue) : stringValue;
      setDisplayValue(maskedValue);
      return;
    }

    if (!uncontrolledSeeded.current) {
      uncontrolledSeeded.current = true;
      if (defaultValue !== undefined && defaultValue !== null) {
        let stringValue: string;
        if (Array.isArray(defaultValue)) {
          stringValue = defaultValue.join("");
        } else if (typeof defaultValue === "number") {
          stringValue = defaultValue.toString();
        } else if (typeof defaultValue === "string") {
          stringValue = defaultValue;
        } else {
          stringValue = String(defaultValue);
        }
        setDisplayValue(mask ? applyMask(stringValue) : stringValue);
      } else {
        setDisplayValue("");
      }
    }
  }, [value, defaultValue, mask, applyMask]);

  // Size rhythm (longhand padding avoids shorthand vs paddingRight clashes when clearable)
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

  /** Opaque fill behind floated caption so border line does not intersect glyphs (`outline` falls back to surface white). */
  const floatingNotchFill =
    background === "transparent" ? themeToken("white") : background;

  const boxShadow =
    inGroup || variant !== "default" ? "none" : themeToken("shadow.sm");

  const ringOuter = isInvalid ? colors.error[500] : baseColor;
  const focusVisibleRing =
    !inGroup && isFocusVisible && !isDisabled
      ? `0 0 0 2px ${themeToken("white")}, 0 0 0 4px ${ringOuter}`
      : undefined;

  const shadowLayers = [
    focusVisibleRing,
    boxShadow !== "none" ? boxShadow : null,
  ].filter(Boolean) as string[];

  const mergedBoxShadow = shadowLayers.length ? shadowLayers.join(", ") : "none";

  const opacity = isDisabled ? 0.6 : 1;

  const maxLenNum =
    maxLength === undefined || maxLength === null ? NaN : Number(maxLength);

  const showCounter =
    Boolean(showCharacterCount) && Number.isFinite(maxLenNum) && maxLenNum > 0;

  const showClear =
    Boolean(clearable) && !isDisabled && !isReadOnly && displayValue.length > 0;

  const useFloatingUi = Boolean(floatingLabel && placeholder);
  const labelFloated = isFocused || displayValue.length > 0;
  const floatingDomId = htmlId ?? autoInputId;

  const describedBy =
    [
      ariaDescribedBy,
      isInvalid && errorMessage ? errorId : undefined,
      showCounter ? counterId : undefined,
    ]
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
            right: showClear ? "2.125rem" : sp.x,
          }
        : {
            width: "max-content",
            maxWidth: showClear ? `calc(100% - ${sp.x} - 2.125rem)` : `calc(100% - ${sp.x} - ${sp.x})`,
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

  // Combined styles
  const inputStyle = {
    ...(useFloatingUi ? { position: "relative" as const, zIndex: 0 } : {}),
    paddingTop: useFloatingUi ? `calc(${sp.y} + ${floatingExtraTop})` : sp.y,
    paddingBottom: sp.y,
    paddingLeft: sp.x,
    paddingRight: showClear ? `calc(${sp.x} + 1.75rem)` : sp.x,
    fontSize: sp.fontSize,
    ...(useFloatingUi ? { lineHeight: 1.25 as const } : {}),
    borderRadius: inGroup ? 0 : themeToken("borderRadius.md"),
    border: inGroup ? "1px solid transparent" : `1px solid ${borderCol}`,
    background,
    boxShadow: mergedBoxShadow,
    opacity,
    transition: themeToken("transition.default"),
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
    ...spacingStyles,
  };

  const shellStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    ...(useFloatingUi ? { isolation: "isolate" } : {}),
    ...(inGroup ? { flex: 1, minWidth: 0 } : {}),
  };

  return (
    <div style={shellStyle}>
      <input
        ref={assignRef}
        {...restProps}
        {...accessibilityProps}
        className={className}
        style={inputStyle}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        maxLength={maxLength}
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
          data-testid="kv-input-floating-label"
          data-floated={labelFloated ? "true" : "false"}
        >
          {placeholder}
        </label>
      : null}

      {showClear ?
        <button
          type="button"
          data-testid="kv-input-clear"
          aria-label={clearAriaLabel}
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClearClick}
          style={{
            position: "absolute",
            top: "50%",
            right: themeToken("spacing.xs"),
            transform: "translateY(-50%)",
            zIndex: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1.75rem",
            height: "1.75rem",
            padding: 0,
            border: "none",
            borderRadius: themeToken("borderRadius.sm"),
            background: "transparent",
            color: colors.secondary[600],
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          <span aria-hidden style={{ fontSize: "1.125rem", fontWeight: 600 }}>
            ×
          </span>
        </button>
      : null}

      {isInvalid && errorMessage && (
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
      )}

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
});

Input.displayName = "Input";