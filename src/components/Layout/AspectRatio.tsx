import React from 'react';
import { Box } from './Box';

export interface AspectRatioProps {
  /** Content to maintain aspect ratio */
  children: React.ReactNode;
  /** Aspect ratio (width/height), e.g., 16/9, 4/3, 1 */
  ratio?: number;
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
  backgroundColor?: string;
  border?: string;
  borderRadius?: number | string;
  /** Object fit for child content */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const AspectRatio: React.FC<AspectRatioProps> = React.memo(({
  children,
  ratio = 16 / 9,
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
  backgroundColor,
  border,
  borderRadius,
  objectFit = 'cover',
  ...rest
}) => {
  // Более точное вычисление с округлением до 2 знаков
  const paddingBottom = `${Math.round((1 / ratio) * 100 * 100) / 100}%`;

  const aspectRatioStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: maxW,
    maxHeight: maxH,
    backgroundColor,
    border,
    borderRadius,
    ...style,
  };

  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    height: 0,
    paddingBottom,
    position: 'relative',
  };

  const contentStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit,
  };

  // Check if child is a valid React element that can accept style prop
  const renderContent = () => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        style: { ...contentStyle, ...(children.props.style || {}) },
      });
    }

    return (
      <Box style={contentStyle}>
        {children}
      </Box>
    );
  };

  return (
    <Box
      className={className}
      id={id}
      style={aspectRatioStyle}
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
      <Box style={wrapperStyle}>
        {renderContent()}
      </Box>
    </Box>
  );
});

AspectRatio.displayName = 'AspectRatio';