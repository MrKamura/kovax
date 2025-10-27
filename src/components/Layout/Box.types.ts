import { SpacingProps } from '../../types/spacing';

// Basic props common to all elements
export interface BaseBoxProps extends SpacingProps {
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

// Expanding the list of supported HTML elements
export type BoxAsProp = 
  | 'div'
  | 'section'
  | 'header'
  | 'footer'
  | 'main'
  | 'article'
  | 'nav'
  | 'aside'
  | 'span'
  | 'p'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'a'
  | 'button'
  | 'input'
  | 'form'
  | 'label'
  | 'img'
  | 'textarea'
  | 'select'
  | 'option';

// Conditional types for different HTML elements
export type BoxProps = BaseBoxProps & {
  as?: BoxAsProp;
} | BaseBoxProps & {
  as: 'a';
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
} | BaseBoxProps & {
  as: 'button';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  form?: string;
} | BaseBoxProps & {
  as: 'input';
  type?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
} | BaseBoxProps & {
  as: 'form';
  action?: string;
  method?: string;
  encType?: string;
} | BaseBoxProps & {
  as: 'label';
  htmlFor?: string;
} | BaseBoxProps & {
  as: 'img';
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
} | BaseBoxProps & {
  as: 'textarea';
  rows?: number;
  cols?: number;
  placeholder?: string;
  value?: string;
} | BaseBoxProps & {
  as: 'select';
  value?: string;
  multiple?: boolean;
} | BaseBoxProps & {
  as: 'option';
  value?: string;
  selected?: boolean;
};