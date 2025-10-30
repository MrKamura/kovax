// Container.tsx
import React from 'react';
import { Box } from './Box';

export interface ContainerProps {
  /** Content */
  children?: React.ReactNode;
  /** Maximum width of the container */
  maxW?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | number | string;
  /** Center the container horizontally */
  center?: boolean;
  /** Padding */
  padding?: number | string;
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
  p?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  px?: number | string;
  py?: number | string;
  
  // Other Box props
  height?: number | string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderRadius?: number | string;
}

export const Container: React.FC<ContainerProps> = React.memo(({
  children,
  maxW = 'lg',
  center = true,
  padding,
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
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  height,
  backgroundColor,
  color,
  border,
  borderRadius,
  ...rest
}) => {
  // Map maxW presets to actual values
  const getMaxWidth = () => {
    if (typeof maxW === 'string') {
      switch (maxW) {
        case 'sm':
          return '640px';
        case 'md':
          return '768px';
        case 'lg':
          return '1024px';
        case 'xl':
          return '1280px';
        case '2xl':
          return '1536px';
        case 'full':
          return '100%';
        default:
          return maxW;
      }
    }
    return typeof maxW === 'number' ? `${maxW}px` : maxW;
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: getMaxWidth(),
    ...(center && { marginLeft: 'auto', marginRight: 'auto' }),
    ...(padding && { padding }),
    height,
    backgroundColor,
    color,
    border,
    borderRadius,
    ...style,
  };

  return (
    <Box
      className={className}
      id={id}
      style={containerStyle}
      m={m}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      mx={mx}
      my={my}
      p={p}
      pt={pt}
      pr={pr}
      pb={pb}
      pl={pl}
      px={px}
      py={py}
      {...rest}
    >
      {children}
    </Box>
  );
});

Container.displayName = 'Container';