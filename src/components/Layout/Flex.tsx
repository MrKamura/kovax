import React from 'react';
import { Box } from './Box';

type BoxComponentProps = React.ComponentProps<typeof Box>;

export interface FlexProps extends Omit<BoxComponentProps, 'display' | 'style'> {
  /** Flex direction */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Flex wrap behavior */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Justify content */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  /** Align items */
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** Align content */
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
  /** Gap between items */
  gap?: number | string;
  /** Flex grow */
  grow?: number;
  /** Flex shrink */
  shrink?: number;
  /** Flex basis */
  basis?: string | number;
  /** Reverse order */
  reverse?: boolean;
  /** Custom styles */
  style?: React.CSSProperties;
}

export const Flex: React.FC<FlexProps> = React.memo(({
  direction = 'row',
  wrap = 'nowrap',
  justify = 'flex-start',
  align = 'stretch',
  alignContent = 'stretch',
  gap,
  grow,
  shrink,
  basis,
  reverse = false,
  style,
  children,
  ...rest
}) => {
  // Правильное вычисление flexDirection
  let flexDirection: React.CSSProperties['flexDirection'] = direction;
  
  if (reverse) {
    if (direction === 'row') flexDirection = 'row-reverse';
    else if (direction === 'column') flexDirection = 'column-reverse';
    else if (direction === 'row-reverse') flexDirection = 'row';
    else if (direction === 'column-reverse') flexDirection = 'column';
  }

  const flexStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems: align,
    alignContent,
    gap,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    ...style,
  };

  return (
    <Box style={flexStyle} {...rest}>
      {children}
    </Box>
  );
});

Flex.displayName = 'Flex';