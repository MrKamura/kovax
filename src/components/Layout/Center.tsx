import React from 'react';
import type { LayoutBoxProps } from './layoutTypes';
import { Box } from './Box';

export interface CenterOwnProps {
  horizontal?: boolean;
  vertical?: boolean;
  center?: boolean;
  inline?: boolean;
  /** Prefer `w` / `h` from layout props when possible */
  width?: number | string;
  height?: number | string;
}

export type CenterProps = CenterOwnProps & LayoutBoxProps;

export const Center: React.FC<CenterProps> = React.memo(
  ({
    children,
    horizontal = true,
    vertical = true,
    center = true,
    inline = false,
    width,
    height,
    w,
    h,
    minW,
    minH,
    maxW,
    maxH,
    style,
    ...rest
  }) => {
    const shouldCenterHorizontal = center ? true : horizontal;
    const shouldCenterVertical = center ? true : vertical;

    const resolvedW = w ?? width;
    const resolvedH = h ?? height;

    const flexStyles: React.CSSProperties = {
      display: inline ? 'inline-flex' : 'flex',
    };

    if (shouldCenterHorizontal) {
      flexStyles.justifyContent = 'center';
    }

    if (shouldCenterVertical) {
      flexStyles.alignItems = 'center';
    }

    return (
      <Box
        {...rest}
        w={resolvedW}
        h={resolvedH}
        minW={minW}
        minH={minH}
        maxW={maxW}
        maxH={maxH}
        style={{ ...flexStyles, ...style }}
      >
        {children}
      </Box>
    );
  }
);

Center.displayName = 'Center';
