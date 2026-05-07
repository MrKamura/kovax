import React from 'react';
import type { LayoutBoxProps } from './layoutTypes';
import { Box } from './Box';

export interface AspectRatioOwnProps {
  ratio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export type AspectRatioProps = AspectRatioOwnProps & LayoutBoxProps;

export const AspectRatio: React.FC<AspectRatioProps> = React.memo(
  ({
    children,
    ratio = 16 / 9,
    maxW,
    maxH,
    objectFit = 'cover',
    style,
    className,
    id,
    ...boxRest
  }) => {
    const paddingBottom = `${Math.round((1 / ratio) * 100 * 100) / 100}%`;

    const aspectRatioStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      ...style,
    };

    const wrapperStyle: React.CSSProperties = {
      width: '100%',
      height: 0,
      paddingBottom,
      position: 'relative',
    };

    const contentStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit,
    };

    const renderContent = () => {
      if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: { ...contentStyle, ...((children as React.ReactElement).props.style || {}) },
        });
      }

      return <Box style={contentStyle}>{children}</Box>;
    };

    return (
      <Box {...boxRest} maxW={maxW} maxH={maxH} className={className} id={id} style={aspectRatioStyle}>
        <Box style={wrapperStyle}>{renderContent()}</Box>
      </Box>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';
