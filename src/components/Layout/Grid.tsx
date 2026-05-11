import React from 'react';
import type { BaseBoxProps } from './Box.types';
import { Box } from './Box';
import { getGridTemplateStyles } from './gridStyles';

function gridGapToCss(value: number | string): string | number {
  return typeof value === 'number' ? `${value}px` : value;
}

export interface GridOwnProps {
  columns?: number | string;
  rows?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  areas?: string[];
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  autoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
  autoColumns?: string;
  autoRows?: string;
  template?: {
    columns?: string;
    rows?: string;
    areas?: string;
  };

  /** Prefer `w` from layout props when possible */
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}

export type GridProps = GridOwnProps &
  Omit<BaseBoxProps, 'alignItems' | 'justifyItems' | 'justifyContent' | 'alignContent'>;

export const Grid: React.FC<GridProps> = React.memo(
  ({
    columns,
    rows,
    gap,
    rowGap,
    columnGap,
    areas,
    justifyItems = 'stretch',
    alignItems = 'stretch',
    justifyContent = 'start',
    alignContent = 'start',
    autoFlow = 'row',
    autoColumns,
    autoRows,
    template,
    className,
    id,
    style,
    children,
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    ...boxProps
  }) => {
    const gridLayoutStyle: React.CSSProperties = {
      display: 'grid',
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
      gridAutoFlow: autoFlow,
      gridAutoColumns: autoColumns,
      gridAutoRows: autoRows,
      ...getGridTemplateStyles({ template, columns, rows, areas }),
    };

    if (gap !== undefined) {
      gridLayoutStyle.gap = gridGapToCss(gap);
    }
    if (rowGap !== undefined) {
      gridLayoutStyle.rowGap = gridGapToCss(rowGap);
    }
    if (columnGap !== undefined) {
      gridLayoutStyle.columnGap = gridGapToCss(columnGap);
    }

    return (
      <Box
        {...boxProps}
        w={boxProps.w ?? width}
        h={boxProps.h ?? height}
        minW={boxProps.minW ?? minWidth}
        maxW={boxProps.maxW ?? maxWidth}
        minH={boxProps.minH ?? minHeight}
        maxH={boxProps.maxH ?? maxHeight}
        className={className}
        id={id}
        style={{ ...gridLayoutStyle, ...style }}
      >
        {children}
      </Box>
    );
  }
);

Grid.displayName = 'Grid';
