import { SpacingProps } from "../../types/spacing";

export interface BaseStackProps extends SpacingProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  id?: string;
  title?: string;
  role?: string;
  tabIndex?: number;
}

export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type Align = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type Justify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface HStackProps extends BaseStackProps {
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
  reverse?: boolean;
}

export interface VStackProps extends BaseStackProps {
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
  reverse?: boolean;
}

export interface StackProps extends BaseStackProps {
  direction?: Direction;
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
}