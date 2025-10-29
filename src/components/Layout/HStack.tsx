import React from 'react';
import { HStackProps } from './Stack.types';
import { Stack } from './Stack';

/**
 * HStack - Horizontal layout component for arranging items in a row
 */
export const HStack: React.FC<HStackProps> = ({
  children,
  align = 'center',
  justify = 'flex-start',
  wrap = 'nowrap',
  reverse = false,
  ...props
}) => {
  return (
    <Stack
      {...props}
      direction={reverse ? 'row-reverse' : 'row'}
      align={align}
      justify={justify}
      wrap={wrap}
    >
      {children}
    </Stack>
  );
};

HStack.displayName = 'HStack';

export default HStack;