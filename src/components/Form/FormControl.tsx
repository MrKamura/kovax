import React from "react";
import { sizes } from "../theme/tokens";
import { SpacingProps } from "../../types/spacing";
import { VStack } from "../Layout/VStack";

export interface FormControlProps extends SpacingProps {
  children: React.ReactNode;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
}

/**
 * FormControl — wrapper for form fields with label and error handling
 */
export const FormControl: React.FC<FormControlProps> = ({
  children,
  isInvalid = false,
  isRequired = false,
  isDisabled = false,
  className = "",
  ...spacingProps
}) => (
  <VStack
    align="stretch"
    gap={sizes.spacing.xs}
    opacity={isDisabled ? 0.6 : 1}
    w="100%"
    className={className}
    {...spacingProps}
  >
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      if (typeof child.type === 'string') {
        return child;
      }
      return React.cloneElement(child, {
        isInvalid,
        isRequired,
        isDisabled,
      } as Record<string, unknown>);
    })}
  </VStack>
);

FormControl.displayName = "FormControl";
