import React from "react";
import { themeToken } from "../theme/tokens";
import type { SpacingProps } from "../../types/spacing";
import { getSpacingStyles } from "../../utils/styleUtils";
import { RadioGroupContext, type RadioGroupContextValue } from "./RadioGroupContext";

export interface RadioGroupProps extends SpacingProps {
  /** Shared `name` for nested `Radio` inputs. */
  name: string;
  /** Controlled selected value (must match one `Radio` `value`). */
  value?: string;
  /** Uncontrolled initial selection. */
  defaultValue?: string;
  /** Called when the selected option changes. */
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
}

/**
 * Groups radios under one name with optional controlled `value` / `onValueChange`.
 */
export function RadioGroup({
  name,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  children,
  isDisabled = false,
  className,
  ...spacingProps
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const setValue = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const ctx = React.useMemo(
    (): RadioGroupContextValue => ({
      name,
      value,
      setValue,
      isDisabled,
    }),
    [name, value, setValue, isDisabled],
  );

  const spacingStyles = getSpacingStyles(spacingProps);

  return (
    <RadioGroupContext.Provider value={ctx}>
      <div
        role="radiogroup"
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: themeToken("spacing.xs"),
          alignItems: "flex-start",
          ...spacingStyles,
        }}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

RadioGroup.displayName = "RadioGroup";
