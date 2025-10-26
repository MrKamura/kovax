import { SpacingProps } from '../types/spacing';

/**
 * Converts spacing props to CSS styles
 */
export const getSpacingStyles = (props: SpacingProps): React.CSSProperties => {
  const {
    // Width & Height
    w, h, minW, maxW, minH, maxH,
    
    // Margin
    m, mt, mr, mb, ml,
    
    // Padding
    p, pt, pr, pb, pl,
    
    // Flex
    flex, flexGrow, flexShrink, flexBasis, flexDirection, flexWrap,
    
    // Display & Position
    display, position, top, right, bottom, left,
    
    // Text Alignment
    textAlign,
    
    // CSS Grid
    gap, gridTemplateColumns, gridTemplateRows, gridColumn, gridRow, gridArea,
    
    // Flexbox Alignment
    alignItems, justifyContent, alignContent, justifyItems, alignSelf, justifySelf,
    
    // Additional CSS
    backgroundColor, color, border, borderRadius, boxShadow, cursor, opacity, zIndex,
    
    // Exclude these from styles object
    className,
    style,
    ...restStyles
  } = props;

  return {
    // Width & Height
    width: w,
    height: h,
    minWidth: minW,
    maxWidth: maxW,
    minHeight: minH,
    maxHeight: maxH,
    
    // Margin
    margin: m,
    marginTop: mt,
    marginRight: mr,
    marginBottom: mb,
    marginLeft: ml,
    
    // Padding
    padding: p,
    paddingTop: pt,
    paddingRight: pr,
    paddingBottom: pb,
    paddingLeft: pl,
    
    // Flex
    flex,
    flexGrow,
    flexShrink,
    flexBasis,
    flexDirection,
    flexWrap,
    
    // Display & Position
    display,
    position,
    top,
    right,
    bottom,
    left,
    
    // Text Alignment
    textAlign,
    
    // CSS Grid
    gap,
    gridTemplateColumns,
    gridTemplateRows,
    gridColumn,
    gridRow,
    gridArea,
    
    // Flexbox Alignment
    alignItems,
    justifyContent,
    alignContent,
    justifyItems,
    alignSelf,
    justifySelf,
    
    // Additional CSS
    backgroundColor,
    color,
    border,
    borderRadius,
    boxShadow,
    cursor,
    opacity,
    zIndex,
    
    // Additional styles
    ...restStyles,
    ...style,
  };
};