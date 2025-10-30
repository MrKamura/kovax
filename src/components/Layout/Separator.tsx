import React from 'react';
import { Box } from './Box';

export interface SeparatorProps {
  /** Orientation of the separator */
  orientation?: 'horizontal' | 'vertical';
  /** Size (thickness) of the separator */
  size?: number | string;
  /** Color of the separator */
  color?: string;
  /** Margin around the separator */
  margin?: number | string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Class name */
  className?: string;
  /** ID */
  id?: string;
  
  // Box spacing props
  m?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  mx?: number | string;
  my?: number | string;
}

export const Separator: React.FC<SeparatorProps> = React.memo(({
  orientation = 'horizontal',
  size = 1,
  color = 'gray.200',
  margin,
  style,
  className,
  id,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  ...rest
}) => {
  const isHorizontal = orientation === 'horizontal';
  
  const separatorStyle: React.CSSProperties = {
    // Horizontal separator
    ...(isHorizontal && {
      width: '100%',
      height: typeof size === 'number' ? `${size}px` : size,
      backgroundColor: color,
    }),
    // Vertical separator  
    ...(!isHorizontal && {
      width: typeof size === 'number' ? `${size}px` : size,
      height: '100%',
      backgroundColor: color,
    }),
    // Apply margin if provided
    ...(margin && {
      margin: typeof margin === 'number' ? `${margin}px` : margin,
    }),
    ...style,
  };

  return (
    <Box
      className={className}
      id={id}
      style={separatorStyle}
      m={m}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      mx={mx}
      my={my}
      {...rest}
    />
  );
});

Separator.displayName = 'Separator';