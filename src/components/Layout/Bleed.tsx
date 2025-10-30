import React from 'react';
import { Box } from './Box';

export interface BleedProps {
  /** Content that should bleed */
  children?: React.ReactNode;
  /** Bleed amount on all sides */
  all?: number | string;
  /** Horizontal bleed amount */
  horizontal?: number | string;
  /** Vertical bleed amount */
  vertical?: number | string;
  /** Top bleed amount */
  top?: number | string;
  /** Right bleed amount */
  right?: number | string;
  /** Bottom bleed amount */
  bottom?: number | string;
  /** Left bleed amount */
  left?: number | string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Class name */
  className?: string;
  /** ID */
  id?: string;
  
  // Box spacing props (applied to the inner content)
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

export const Bleed: React.FC<BleedProps> = React.memo(({
  children,
  all,
  horizontal,
  vertical,
  top,
  right,
  bottom,
  left,
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
  // Calculate negative margins for bleed effect
  const getBleedStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    
    // Handle all sides
    if (all !== undefined) {
      const value = typeof all === 'number' ? `-${all}px` : `-${all}`;
      styles.margin = value;
    }
    
    // Handle horizontal
    if (horizontal !== undefined) {
      const value = typeof horizontal === 'number' ? `-${horizontal}px` : `-${horizontal}`;
      styles.marginLeft = value;
      styles.marginRight = value;
    }
    
    // Handle vertical
    if (vertical !== undefined) {
      const value = typeof vertical === 'number' ? `-${vertical}px` : `-${vertical}`;
      styles.marginTop = value;
      styles.marginBottom = value;
    }
    
    // Handle individual sides
    if (top !== undefined) {
      styles.marginTop = typeof top === 'number' ? `-${top}px` : `-${top}`;
    }
    if (right !== undefined) {
      styles.marginRight = typeof right === 'number' ? `-${right}px` : `-${right}`;
    }
    if (bottom !== undefined) {
      styles.marginBottom = typeof bottom === 'number' ? `-${bottom}px` : `-${bottom}`;
    }
    if (left !== undefined) {
      styles.marginLeft = typeof left === 'number' ? `-${left}px` : `-${left}`;
    }
    
    return styles;
  };

  const bleedStyle: React.CSSProperties = {
    width: width || 'auto',
    height,
    backgroundColor,
    color,
    border,
    borderRadius,
    ...getBleedStyles(),
    ...style,
  };

  return (
    <Box
      className={className}
      id={id}
      style={bleedStyle}
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

Bleed.displayName = 'Bleed';