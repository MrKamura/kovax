import React from "react";
import { sizes } from "../theme/tokens";
import { SpacingProps } from "../../types/spacing";
import { getSpacingStyles } from "../../utils/styleUtils";

export interface FormControlProps extends SpacingProps {
  children: React.ReactNode;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
}

/**
 * FormControl - wrapper for form fields with label and error handling
 */
export const FormControl: React.FC<FormControlProps> = ({
  children,
  isInvalid = false,
  isRequired = false,
  isDisabled = false,
  className = "",
  ...spacingProps
}) => {
  const spacingStyles = getSpacingStyles(spacingProps);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: sizes.spacing.xs,
        opacity: isDisabled ? 0.6 : 1,
        width: "100%",
        ...spacingStyles,
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isInvalid,
            isRequired,
            isDisabled,
          } as any);
        }
        return child;
      })}
    </div>
  );
};

FormControl.displayName = "FormControl";
