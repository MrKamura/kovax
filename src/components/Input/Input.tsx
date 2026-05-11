import React, { useCallback, useEffect, useState } from "react";
import { colors, themeToken } from "../theme/tokens";
import { InputProps } from "./Input.types";
import { getSpacingStyles } from "../../utils/styleUtils";

/**
 * Kovax Input — mask and accessibility; `ref` targets the native &lt;input&gt;.
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
    size = "md",
    colorScheme = "primary",
    isInvalid,
    errorMessage,
    isDisabled,
    isReadOnly,
    isRequired,
    mask,
    maskChar = "_",
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,

    // HTML attributes
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedBy,
    
    // Rest props (native input attributes)
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

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

  // Generate unique ID for error message
  const errorId = React.useId();

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
   * Handle focus
   */
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus, isDisabled]);

  /**
   * Handle blur
   */
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  /**
   * Sync with external value changes
   */
  useEffect(() => {
    if (value !== undefined && value !== null) {
      // Safe conversion to string
      let stringValue: string;
      
      if (Array.isArray(value)) {
        stringValue = value.join('');
      } else if (typeof value === 'number') {
        stringValue = value.toString();
      } else if (typeof value === 'string') {
        stringValue = value;
      } else {
        stringValue = String(value);
      }
      
      const maskedValue = mask ? applyMask(stringValue) : stringValue;
      setDisplayValue(maskedValue);
    } else {
      setDisplayValue("");
    }
  }, [value, mask, applyMask]);

  // Size styles
  const sizeStyles = {
    sm: {
      padding: `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`,
      fontSize: themeToken("text.sm"),
    },
    md: {
      padding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
      fontSize: themeToken("text.base"),
    },
    lg: {
      padding: `${themeToken("spacing.md")} ${themeToken("spacing.lg")}`,
      fontSize: themeToken("text.lg"),
    },
  };

  const baseColor = colors[colorScheme][500];
  const borderColorValue = isInvalid ? colors.error[500] : isFocused ? baseColor : colors.secondary[300];
  const background = isDisabled ? colors.secondary[100] : "white";
  const opacity = isDisabled ? 0.6 : 1;

  // Accessibility attributes with correct types
  const accessibilityProps = {
    'aria-invalid': isInvalid ? true : undefined,
    'aria-describedby': errorMessage ? errorId : undefined,
    'aria-required': isRequired ? true : undefined,
  };

  // Combined styles
  const inputStyle = {
    ...sizeStyles[size],
    borderRadius: themeToken("borderRadius.md"),
    border: `1px solid ${borderColorValue}`,
    background,
    boxShadow: themeToken("shadow.sm"),
    opacity,
    transition: themeToken("transition.default"),
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
    ...spacingStyles,
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        ref={ref}
        {...restProps}
        {...accessibilityProps}
        className={className}
        style={inputStyle}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

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
    </div>
  );
});

Input.displayName = "Input";