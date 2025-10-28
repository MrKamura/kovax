import React from 'react';
import { VStackProps } from './Stack.types';
import { Box } from './Box';

/**
 * VStack - Vertical layout component for arranging items in a column
 */
export const VStack: React.FC<VStackProps> = ({
  children,
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap = '0px',
  reverse = false,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  id,
  title,
  role,
  tabIndex,
  ...props
}) => {
  return (
    <Box
      {...props}
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      id={id}
      title={title}
      role={role}
      tabIndex={tabIndex}
      display="flex"
      flexDirection={reverse ? 'column-reverse' : 'column'}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap}
      gap={typeof gap === 'number' ? `${gap}px` : gap}
    >
      {children}
    </Box>
  );
};

VStack.displayName = 'VStack';

export default VStack;