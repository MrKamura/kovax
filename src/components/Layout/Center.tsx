import React from 'react';
import { Box } from './Box';

export interface CenterProps {
  /** Content to be centered */
  children?: React.ReactNode;
  /** Center horizontally */
  horizontal?: boolean;
  /** Center vertically */
  vertical?: boolean;
  /** Center both horizontally and vertically (default: true) */
  center?: boolean;
  /** Inline center (inline-flex instead of flex) */
  inline?: boolean;
  /** Minimum width */
  minW?: number | string;
  /** Minimum height */
  minH?: number | string;
  /** Maximum width */
  maxW?: number | string;
  /** Maximum height */
  maxH?: number | string;
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
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderRadius?: number | string;
}

export const Center: React.FC<CenterProps> = React.memo(({
  children,
  horizontal = true,
  vertical = true,
  center = true,
  inline = false,
  minW,
  minH,
  maxW,
  maxH,
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
  width,
  height,
  backgroundColor,
  color,
  border,
  borderRadius,
  ...rest
}) => {
  // Determine centering behavior
  const shouldCenterHorizontal = center ? true : horizontal;
  const shouldCenterVertical = center ? true : vertical;
  
  // Build flex styles based on props
  const flexStyles: React.CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    minWidth: minW,
    minHeight: minH,
    maxWidth: maxW,
    maxHeight: maxH,
    width,
    height,
    backgroundColor,
    color,
    border,
    borderRadius,
  };

  // Add horizontal centering
  if (shouldCenterHorizontal) {
    flexStyles.justifyContent = 'center';
  }

  // Add vertical centering
  if (shouldCenterVertical) {
    flexStyles.alignItems = 'center';
  }

  // If both horizontal and vertical centering, make it a perfect center
  if (shouldCenterHorizontal && shouldCenterVertical) {
    flexStyles.justifyContent = 'center';
    flexStyles.alignItems = 'center';
  }

  const centerStyle: React.CSSProperties = {
    ...flexStyles,
    ...style,
  };

  return (
    <Box
      className={className}
      id={id}
      style={centerStyle}
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

Center.displayName = 'Center';