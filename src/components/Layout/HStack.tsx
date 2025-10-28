import React from 'react';
import { HStackProps } from './Stack.types';
import { Box } from './Box';

/**
 * HStack - Horizontal layout component for arranging items in a row
 */
export const HStack: React.FC<HStackProps> = ({
  children,
  align = 'center',
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
      flexDirection={reverse ? 'row-reverse' : 'row'}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap}
      gap={typeof gap === 'number' ? `${gap}px` : gap}
    >
      {children}
    </Box>
  );
};

HStack.displayName = 'HStack';

export default HStack;