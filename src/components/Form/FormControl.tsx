import React, { useMemo } from "react";
import { themeToken } from "../theme/tokens";
import { SpacingProps } from "../../types/spacing";
import { VStack } from "../Layout/VStack";
import { FormControlContext, type FormControlContextValue } from "./FormControlContext";

export interface FormControlProps extends SpacingProps {
  children: React.ReactNode;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
}

/**
 * FormControl — vertical wrapper with shared invalid/required/disabled context for fields (`Input`, `FormLabel`, `FormHelperText`).
 */
export const FormControl: React.FC<FormControlProps> = ({
  children,
  isInvalid = false,
  isRequired = false,
  isDisabled = false,
  className = "",
  ...spacingProps
}) => {
  const ctx = useMemo(
    (): FormControlContextValue => ({ isInvalid, isRequired, isDisabled }),
    [isInvalid, isRequired, isDisabled],
  );

  return (
    <FormControlContext.Provider value={ctx}>
      <VStack
        align="stretch"
        gap={themeToken("spacing.xs")}
        opacity={isDisabled ? 0.6 : 1}
        w="100%"
        className={className}
        {...spacingProps}
      >
        {children}
      </VStack>
    </FormControlContext.Provider>
  );
};

FormControl.displayName = "FormControl";
