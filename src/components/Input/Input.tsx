import React, { useCallback, useEffect, useState } from "react";
import { colors, shadows, sizes, transitions } from "../theme/tokens";
import { InputProps } from "./Input.types";
import { getSpacingStyles } from "../../utils/styleUtils";

/**
 * Kovax Input v1.0.0 - improved mask and accessibility
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
    // Если input disabled, не обрабатываем изменения
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
    // Если input disabled, не обрабатываем фокус
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

  // Accessibility attributes with correct types
  const accessibilityProps = {
    'aria-invalid': isInvalid ? true : undefined,
    'aria-describedby': errorMessage ? errorId : undefined,
    'aria-required': isRequired ? true : undefined,
  };

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
        {...accessibilityProps}
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
            fontSize: sizes.text.sm, 
            marginTop: sizes.spacing.xs 
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

Input.displayName = "Input";