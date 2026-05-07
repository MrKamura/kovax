import React from 'react';
import type { StackProps } from './Stack.types';
import { Box } from './Box';

/**
 * Stack — flex container with shorthand alignment props (composes Box).
 */
export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'row',
  align = 'center',
  justify = 'flex-start',
  wrap = 'nowrap',
  ...rest
}) => (
  <Box
    {...rest}
    display="flex"
    flexDirection={direction}
    alignItems={align}
    justifyContent={justify}
    flexWrap={wrap}
  >
    {children}
  </Box>
);

Stack.displayName = 'Stack';

export default Stack;
