// Container.tsx
import React from 'react';
import type { LayoutBoxProps } from './layoutTypes';
import { Box } from './Box';

export interface ContainerOwnProps {
  maxW?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | number | string;
  center?: boolean;
  padding?: number | string;
  /** Prefer `h` from layout props when possible */
  height?: number | string;
}

export type ContainerProps = ContainerOwnProps & LayoutBoxProps;

function resolveMaxWidth(maxW: ContainerOwnProps['maxW']): string | number | undefined {
  if (typeof maxW === 'string') {
    switch (maxW) {
      case 'sm':
        return '640px';
      case 'md':
        return '768px';
      case 'lg':
        return '1024px';
      case 'xl':
        return '1280px';
      case '2xl':
        return '1536px';
      case 'full':
        return '100%';
      default:
        return maxW;
    }
  }
  if (typeof maxW === 'number') {
    return `${maxW}px`;
  }
  return maxW;
}

export const Container: React.FC<ContainerProps> = React.memo(
  ({
    children,
    maxW = 'lg',
    center = true,
    padding,
    height,
    h,
    style,
    className,
    id,
    ...rest
  }) => {
    const resolvedH = h ?? height;

    const containerStyle: React.CSSProperties = {
      width: '100%',
      maxWidth: resolveMaxWidth(maxW),
      ...(center && { marginLeft: 'auto', marginRight: 'auto' }),
      ...(padding !== undefined && { padding }),
      ...style,
    };

    return (
      <Box {...rest} h={resolvedH} className={className} id={id} style={containerStyle}>
        {children}
      </Box>
    );
  }
);

Container.displayName = 'Container';
