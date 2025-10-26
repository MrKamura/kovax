import React from 'react';
import { SpacingProps } from '../../types/spacing';
import { getSpacingStyles } from '../../utils/styleUtils';

export interface BoxProps extends SpacingProps {
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * Box - foundational layout component with full spacing control
 */
export const Box: React.FC<BoxProps> = ({
  children,
  as = 'div',
  className = '',
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...spacingProps
}) => {
  const spacingStyles = getSpacingStyles(spacingProps);
  
  const Component = as as any;

  return (
    <Component
      className={className}
      style={{
        ...spacingStyles,
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Component>
  );
};

// Явный экспорт по умолчанию для избежания проблем
export default Box;