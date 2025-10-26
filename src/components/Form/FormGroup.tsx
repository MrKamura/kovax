import React from 'react';
import { sizes } from '../theme/tokens';
import { SpacingProps } from '../../types/spacing';
import { getSpacingStyles } from '../../utils/styleUtils';

export interface FormGroupProps extends SpacingProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * FormGroup - groups related form fields together
 */
export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  direction = 'vertical',
  spacing = 'md',
  className = '',
  ...spacingProps
}) => {
  const spacingMap = {
    sm: sizes.spacing.sm,
    md: sizes.spacing.md,
    lg: sizes.spacing.lg,
  };

  const spacingStyles = getSpacingStyles(spacingProps);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap: spacingMap[spacing],
        width: '100%',
        ...spacingStyles,
      }}
    >
      {children}
    </div>
  );
};

FormGroup.displayName = 'FormGroup';