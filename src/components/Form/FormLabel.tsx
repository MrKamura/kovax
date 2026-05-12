import React from 'react';
import { colors, themeToken } from '../theme/tokens';
import { SpacingProps } from '../../types/spacing';
import { getSpacingStyles } from '../../utils/styleUtils';
import { Box } from '../Layout/Box';
import { useFormControlContext } from './FormControlContext';

export interface FormLabelProps extends SpacingProps {
  htmlFor?: string;
  children: React.ReactNode;
  isRequired?: boolean;
  isInvalid?: boolean;
  className?: string;
}

/**
 * FormLabel — accessible label for form fields
 */
export const FormLabel: React.FC<FormLabelProps> = ({
  htmlFor,
  children,
  isRequired,
  isInvalid,
  className = '',
  ...spacingProps
}) => {
  const formCtrlCtx = useFormControlContext();
  const resolvedInvalid = isInvalid ?? formCtrlCtx?.isInvalid ?? false;
  const resolvedRequired = isRequired ?? formCtrlCtx?.isRequired ?? false;

  const spacingStyles = getSpacingStyles(spacingProps);

  return (
    <Box
      as="label"
      htmlFor={htmlFor}
      className={className}
      display="block"
      style={{
        fontSize: themeToken("text.sm"),
        fontWeight: 500,
        color: resolvedInvalid ? colors.error[600] : colors.secondary[700],
        marginBottom: themeToken("spacing.xs"),
        cursor: 'pointer',
        ...spacingStyles,
      }}
    >
      {children}
      {resolvedRequired && (
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
    </Box>
  );
};

FormLabel.displayName = 'FormLabel';
