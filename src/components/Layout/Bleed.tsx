import React from 'react';
import type { LayoutBoxProps } from './layoutTypes';
import { Box } from './Box';
import { getBleedMarginStyles } from '../../utils/styleUtils';

export interface BleedOwnProps {
  all?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  /** Prefer `w` / `h` from layout props when possible */
  width?: number | string;
  height?: number | string;
}

export type BleedProps = BleedOwnProps & LayoutBoxProps;

export const Bleed: React.FC<BleedProps> = React.memo(
  ({
    children,
    all,
    horizontal,
    vertical,
    top,
    right,
    bottom,
    left,
    width,
    height,
    w,
    h,
    style,
    ...rest
  }) => {
    const resolvedW = w ?? width;
    const resolvedH = h ?? height;

    const bleedStyle: React.CSSProperties = {
      width: resolvedW ?? 'auto',
      height: resolvedH as React.CSSProperties['height'],
      ...getBleedMarginStyles({ all, horizontal, vertical, top, right, bottom, left }),
      ...style,
    };

    return (
      <Box {...rest} w={resolvedW} h={resolvedH} style={bleedStyle}>
        {children}
      </Box>
    );
  }
);

Bleed.displayName = 'Bleed';
