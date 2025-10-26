export interface SpacingProps {
  // Width & Height
  w?: string | number;
  h?: string | number;
  minW?: string | number;
  maxW?: string | number;
  minH?: string | number;
  maxH?: string | number;
  
  // Margin
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  mx?: string | number;
  my?: string | number;
  
  // Padding
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
  
  // Flex
  flex?: string | number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number;
  
  // Display & Position
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'none';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  
  // Text Alignment
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  
  // Additional
  className?: string;
  style?: React.CSSProperties;
}