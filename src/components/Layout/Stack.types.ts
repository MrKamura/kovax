import type { BaseBoxProps } from './Box.types';

export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type Align = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type Justify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

type StackLayoutShorthand = {
  direction?: Direction;
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
};

export type StackProps = Omit<
  BaseBoxProps,
  'flexDirection' | 'alignItems' | 'justifyContent' | 'flexWrap'
> &
  StackLayoutShorthand;

export type HStackProps = Omit<StackProps, 'direction'> & {
  reverse?: boolean;
};

export type VStackProps = Omit<StackProps, 'direction'> & {
  reverse?: boolean;
};
