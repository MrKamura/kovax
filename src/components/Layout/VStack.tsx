import React from 'react';
import { VStackProps } from './Stack.types';
import { Stack } from './Stack';

/**
 * VStack - Vertical layout component for arranging items in a column
 */
export const VStack: React.FC<VStackProps> = ({
  children,
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  reverse = false,
  ...props
}) => {
  return (
    <Stack
      {...props}
      direction={reverse ? 'column-reverse' : 'column'}
      align={align}
      justify={justify}
      wrap={wrap}
    >
      {children}
    </Stack>
  );
};

VStack.displayName = 'VStack';

export default VStack;