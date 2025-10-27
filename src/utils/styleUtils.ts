import { SpacingProps } from '../types/spacing';

/**
 * Converts spacing props to CSS styles
 */
export const getSpacingStyles = (props: SpacingProps): React.CSSProperties => {
  const {
    // Width & Height
    w, h, minW, maxW, minH, maxH,
    
    // Margin
    m, mt, mr, mb, ml, mx, my,
    
    // Padding
    p, pt, pr, pb, pl, px, py,
    
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
    style: propStyle,
    ...restStyles
  } = props;

  // Функция для преобразования числовых значений в px
  const toCssValue = (value: any): string | number | undefined => {
    if (typeof value === 'number') {
      return `${value}px`;
    }
    return value;
  };

  const styles: React.CSSProperties = {};

  // Width & Height
  if (w !== undefined) styles.width = toCssValue(w);
  if (h !== undefined) styles.height = toCssValue(h);
  if (minW !== undefined) styles.minWidth = toCssValue(minW);
  if (maxW !== undefined) styles.maxWidth = toCssValue(maxW);
  if (minH !== undefined) styles.minHeight = toCssValue(minH);
  if (maxH !== undefined) styles.maxHeight = toCssValue(maxH);
  
  // Margin
  if (m !== undefined) styles.margin = toCssValue(m);
  if (mt !== undefined) styles.marginTop = toCssValue(mt);
  if (mr !== undefined) styles.marginRight = toCssValue(mr);
  if (mb !== undefined) styles.marginBottom = toCssValue(mb);
  if (ml !== undefined) styles.marginLeft = toCssValue(ml);
  if (mx !== undefined) {
    styles.marginLeft = toCssValue(mx);
    styles.marginRight = toCssValue(mx);
  }
  if (my !== undefined) {
    styles.marginTop = toCssValue(my);
    styles.marginBottom = toCssValue(my);
  }
  
  // Padding
  if (p !== undefined) styles.padding = toCssValue(p);
  if (pt !== undefined) styles.paddingTop = toCssValue(pt);
  if (pr !== undefined) styles.paddingRight = toCssValue(pr);
  if (pb !== undefined) styles.paddingBottom = toCssValue(pb);
  if (pl !== undefined) styles.paddingLeft = toCssValue(pl);
  if (px !== undefined) {
    styles.paddingLeft = toCssValue(px);
    styles.paddingRight = toCssValue(px);
  }
  if (py !== undefined) {
    styles.paddingTop = toCssValue(py);
    styles.paddingBottom = toCssValue(py);
  }
  
  // Flex
  if (flex !== undefined) styles.flex = flex;
  if (flexGrow !== undefined) styles.flexGrow = flexGrow;
  if (flexShrink !== undefined) styles.flexShrink = flexShrink;
  if (flexBasis !== undefined) styles.flexBasis = flexBasis;
  if (flexDirection !== undefined) styles.flexDirection = flexDirection;
  if (flexWrap !== undefined) styles.flexWrap = flexWrap;
  
  // Display & Position
  if (display !== undefined) styles.display = display;
  if (position !== undefined) styles.position = position;
  if (top !== undefined) styles.top = toCssValue(top);
  if (right !== undefined) styles.right = toCssValue(right);
  if (bottom !== undefined) styles.bottom = toCssValue(bottom);
  if (left !== undefined) styles.left = toCssValue(left);
  
  // Text Alignment
  if (textAlign !== undefined) styles.textAlign = textAlign;
  
  // CSS Grid
  if (gap !== undefined) styles.gap = toCssValue(gap);
  if (gridTemplateColumns !== undefined) styles.gridTemplateColumns = gridTemplateColumns;
  if (gridTemplateRows !== undefined) styles.gridTemplateRows = gridTemplateRows;
  if (gridColumn !== undefined) styles.gridColumn = gridColumn;
  if (gridRow !== undefined) styles.gridRow = gridRow;
  if (gridArea !== undefined) styles.gridArea = gridArea;
  
  // Flexbox Alignment
  if (alignItems !== undefined) styles.alignItems = alignItems;
  if (justifyContent !== undefined) styles.justifyContent = justifyContent;
  if (alignContent !== undefined) styles.alignContent = alignContent;
  if (justifyItems !== undefined) styles.justifyItems = justifyItems;
  if (alignSelf !== undefined) styles.alignSelf = alignSelf;
  if (justifySelf !== undefined) styles.justifySelf = justifySelf;
  
  // Additional CSS
  if (backgroundColor !== undefined) styles.backgroundColor = backgroundColor;
  if (color !== undefined) styles.color = color;
  if (border !== undefined) styles.border = border;
  if (borderRadius !== undefined) styles.borderRadius = toCssValue(borderRadius);
  if (boxShadow !== undefined) styles.boxShadow = boxShadow;
  if (cursor !== undefined) styles.cursor = cursor;
  if (opacity !== undefined) styles.opacity = opacity;
  if (zIndex !== undefined) styles.zIndex = zIndex;

  // Merge with additional styles and prop style
  return {
    ...styles,
    ...restStyles,
    ...propStyle,
  };
};