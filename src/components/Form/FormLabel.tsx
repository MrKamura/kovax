import React from 'react';
import { colors, sizes } from '../theme/tokens';
import { SpacingProps } from '../../types/spacing';
import { getSpacingStyles } from '../../utils/styleUtils';

export interface FormLabelProps extends SpacingProps {
  htmlFor?: string;
  children: React.ReactNode;
  isRequired?: boolean;
  isInvalid?: boolean;
  className?: string;
}

/**
 * FormLabel - accessible label for form fields
 */
export const FormLabel: React.FC<FormLabelProps> = ({
  htmlFor,
  children,
  isRequired = false,
  isInvalid = false,
  className = '',
  ...spacingProps
}) => {
  const spacingStyles = getSpacingStyles(spacingProps);

  return (
    <label
      htmlFor={htmlFor}
      className={className}
      style={{
        display: 'block',
        fontSize: sizes.text.sm,
        fontWeight: 500,
        color: isInvalid ? colors.error[600] : colors.secondary[700],
        marginBottom: sizes.spacing.xs,
        cursor: 'pointer',
        ...spacingStyles,
      }}
    >
      {children}
      {isRequired && (
        <span
          style={{
            color: colors.error[500],
            marginLeft: '4px',
          }}
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
};

FormLabel.displayName = 'FormLabel';