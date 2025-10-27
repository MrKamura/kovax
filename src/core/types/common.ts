export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export interface InteractiveProps {
  onClick?: React.MouseEventHandler<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onFocus?: React.FocusEventHandler<any>;
  onBlur?: React.FocusEventHandler<any>;
}