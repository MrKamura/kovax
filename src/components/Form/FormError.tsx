import React from 'react';
import { colors, sizes } from '../theme/tokens';
import { SpacingProps } from '../../types/spacing';
import { getSpacingStyles } from '../../utils/styleUtils';

export interface FormErrorProps extends SpacingProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * FormError - displays error messages for form fields
 */
export const FormError: React.FC<FormErrorProps> = ({
  children,
  className = '',
  ...spacingProps
}) => {
  const spacingStyles = getSpacingStyles(spacingProps);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: sizes.spacing.xs,
        color: colors.error[500],
        fontSize: sizes.text.sm,
        marginTop: sizes.spacing.xs,
        ...spacingStyles,
      }}
      role="alert"
      aria-live="polite"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        style={{ flexShrink: 0 }}
      >
        <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1-4H7V4h2v4z"/>
      </svg>
      {children}
    </div>
  );
};

FormError.displayName = 'FormError';