import React from 'react';

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content that should be visually hidden but accessible to screen readers */
  children?: React.ReactNode;
  /** Show content when focused (for skip links) */
  showOnFocus?: boolean;
}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = React.memo(({
  children,
  showOnFocus = false,
  style,
  className,
  ...rest
}) => {
  const baseStyles: React.CSSProperties = {
    border: '0',
    clip: 'rect(0, 0, 0, 0)',
    height: '1px',
    width: '1px',
    margin: '-1px',
    padding: '0',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
  };

  const visuallyHiddenStyle: React.CSSProperties = {
    ...baseStyles,
    ...style,
  };

  const Component = showOnFocus ? 'span' : 'div';

  return (
    <Component
      className={className}
      style={visuallyHiddenStyle}
      {...rest}
    >
      {children}
    </Component>
  );
});

VisuallyHidden.displayName = 'VisuallyHidden';