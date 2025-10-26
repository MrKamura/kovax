import React, { useCallback, useEffect, useState } from "react";
import { colors, shadows, sizes, transitions } from "../theme/tokens";
import { InputProps } from "./Input.types";
import { getSpacingStyles } from "../../utils/styleUtils";

/**
 * Kovax Input v0.6 - with spacing support
 */
export const Input: React.FC<InputProps> = (props) => {
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
    isDisabled,
    isInvalid,
    isReadOnly,
    isRequired,
    mask,
    maskChar = "_",
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    errorMessage,

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

  /**
   * Simple mask implementation
   */
  const applyMask = useCallback((inputValue: string): string => {
    if (!mask || typeof mask !== 'string') return inputValue;

    let result = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length && valueIndex < inputValue.length; i++) {
      const maskPattern = mask[i];
      const valueChar = inputValue[valueIndex];

      if (maskPattern === '9') {
        // Only digits
        if (/[0-9]/.test(valueChar)) {
          result += valueChar;
          valueIndex++;
        } else {
          valueIndex++; // Skip invalid
        }
      } else if (maskPattern === 'a') {
        // Only letters
        if (/[a-zA-Z]/.test(valueChar)) {
          result += valueChar;
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
    const inputValue = e.target.value;
    let processedValue = inputValue;

    // Apply mask if provided
    if (mask && typeof mask === 'string') {
      processedValue = applyMask(inputValue);
    }

    setDisplayValue(processedValue);

    if (onChange) {
      const rawValue = processedValue.replace(new RegExp(`[^0-9a-zA-Z]`, 'g'), '');
      onChange({
        ...e,
        target: {
          ...e.target,
          value: rawValue,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [mask, applyMask, onChange]);

  /**
   * Handle focus
   */
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus]);

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
      padding: `${sizes.spacing.xs} ${sizes.spacing.sm}`, 
      fontSize: sizes.text.sm 
    },
    md: { 
      padding: `${sizes.spacing.sm} ${sizes.spacing.md}`, 
      fontSize: sizes.text.base 
    },
    lg: { 
      padding: `${sizes.spacing.md} ${sizes.spacing.lg}`, 
      fontSize: sizes.text.lg 
    },
  };

  const baseColor = colors[colorScheme][500];
  const borderColorValue = isInvalid ? colors.error[500] : isFocused ? baseColor : colors.secondary[300];
  const background = isDisabled ? colors.secondary[100] : "white";
  const opacity = isDisabled ? 0.6 : 1;

  // Combined styles
  const inputStyle = {
    ...sizeStyles[size],
    borderRadius: sizes.borderRadius.md,
    border: `1px solid ${borderColorValue}`,
    background,
    boxShadow: shadows.sm,
    opacity,
    transition: transitions.default,
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
    ...spacingStyles,
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        {...restProps}
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
        <div style={{ 
          color: colors.error[500], 
          fontSize: sizes.text.sm, 
          marginTop: sizes.spacing.xs 
        }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

Input.displayName = "Input";