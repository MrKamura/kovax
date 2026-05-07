import React from 'react';
import type { SpacingProps } from '../../types/spacing';
import type { BaseBoxProps } from './Box.types';
import { Box } from './Box';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type FlexAlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'space-between'
  | 'space-around';

type FlexOwnProps = {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justify?: FlexJustify;
  align?: FlexAlign;
  alignContent?: FlexAlignContent;
  gap?: number | string;
  grow?: number;
  shrink?: number;
  basis?: string | number;
  reverse?: boolean;
};

export type FlexProps = Omit<
  BaseBoxProps,
  | 'display'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'gap'
  | 'flexGrow'
  | 'flexShrink'
  | 'flexBasis'
> &
  FlexOwnProps;

type ResolvedFlexDirection = NonNullable<SpacingProps['flexDirection']>;

function resolveFlexDirection(
  direction: FlexDirection,
  reverse: boolean
): ResolvedFlexDirection {
  if (!reverse) return direction;
  switch (direction) {
    case 'row':
      return 'row-reverse';
    case 'column':
      return 'column-reverse';
    case 'row-reverse':
      return 'row';
    case 'column-reverse':
      return 'column';
    default:
      return direction;
  }
}

export const Flex: React.FC<FlexProps> = React.memo(
  ({
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
  }) => (
    <Box
      {...rest}
      display="flex"
      flexDirection={resolveFlexDirection(direction, reverse)}
      flexWrap={wrap}
      justifyContent={justify}
      alignItems={align}
      alignContent={alignContent}
      gap={gap}
      flexGrow={grow}
      flexShrink={shrink}
      flexBasis={basis}
      style={style}
    >
      {children}
    </Box>
  )
);

Flex.displayName = 'Flex';
