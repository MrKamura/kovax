import React from 'react';
import { colors, themeToken } from '../theme/tokens';
import { SpacingProps } from '../../types/spacing';
import { getSpacingStyles } from '../../utils/styleUtils';

export interface FormHelperTextProps extends SpacingProps {
  children: React.ReactNode;
  isInvalid?: boolean;
  className?: string;
}

/**
 * FormHelperText - displays helper text or hints for form fields
 */
export const FormHelperText: React.FC<FormHelperTextProps> = ({
  children,
  isInvalid = false,
  className = '',
  ...spacingProps
}) => {
  const spacingStyles = getSpacingStyles(spacingProps);

  return (
    <div
      className={className}
      style={{
        color: isInvalid ? colors.error[500] : colors.secondary[500],
        fontSize: themeToken("text.sm"),
        marginTop: themeToken("spacing.xs"),
        lineHeight: 1.4,
        ...spacingStyles,
      }}
    >
      {children}
    </div>
  );
};

FormHelperText.displayName = 'FormHelperText';