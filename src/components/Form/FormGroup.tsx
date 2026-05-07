import React from 'react';
import { sizes } from '../theme/tokens';
import { SpacingProps } from '../../types/spacing';
import { Stack } from '../Layout/Stack';

export interface FormGroupProps extends SpacingProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * FormGroup — groups related form fields together
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

  return (
    <Stack
      direction={direction === 'horizontal' ? 'row' : 'column'}
      align="stretch"
      justify="flex-start"
      gap={spacingMap[spacing]}
      w="100%"
      className={className}
      {...spacingProps}
    >
      {children}
    </Stack>
  );
};

FormGroup.displayName = 'FormGroup';
