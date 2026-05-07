import React from 'react';
import type { LayoutBoxProps } from './layoutTypes';
import { Box } from './Box';

export interface SeparatorOwnProps {
  orientation?: 'horizontal' | 'vertical';
  size?: number | string;
  /** Separator line color (maps to background) */
  color?: string;
  margin?: number | string;
}

export type SeparatorProps = Omit<LayoutBoxProps, 'color'> & SeparatorOwnProps;

export const Separator: React.FC<SeparatorProps> = React.memo(
  ({
    orientation = 'horizontal',
    size = 1,
    color = 'gray.200',
    margin,
    style,
    className,
    id,
    ...rest
  }) => {
    const isHorizontal = orientation === 'horizontal';

    const separatorStyle: React.CSSProperties = {
      ...(isHorizontal && {
        width: '100%',
        height: typeof size === 'number' ? `${size}px` : size,
        backgroundColor: color,
      }),
      ...(!isHorizontal && {
        width: typeof size === 'number' ? `${size}px` : size,
        height: '100%',
        backgroundColor: color,
      }),
      ...(margin !== undefined && {
        margin: typeof margin === 'number' ? `${margin}px` : margin,
      }),
      ...style,
    };

    return (
      <Box className={className} id={id} style={separatorStyle} {...rest} />
    );
  }
);

Separator.displayName = 'Separator';
