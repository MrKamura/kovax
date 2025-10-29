import React from 'react';
import { StackProps } from './Stack.types';
import { Box } from './Box';

/**
 * Stack - Flexible layout component that can arrange items horizontally or vertically
 */
export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'row',
  align = 'center',
  justify = 'flex-start',
  wrap = 'nowrap',
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
      flexDirection={direction}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap}
    >
      {children}
    </Box>
  );
};

Stack.displayName = 'Stack';

export default Stack;