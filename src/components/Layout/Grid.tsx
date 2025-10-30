import React from 'react';
import { Box } from './Box';

// Создаем собственные пропсы без наследования от Box
export interface GridProps {
  // Grid специфичные пропсы
  columns?: number | string;
  rows?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  areas?: string[];
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  autoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
  autoColumns?: string;
  autoRows?: string;
  template?: {
    columns?: string;
    rows?: string;
    areas?: string;
  };
  
  // Базовые HTML атрибуты
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  
  // Box-like пропсы (только те, которые не конфликтуют)
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  
  // Spacing props - обрабатываем отдельно
  m?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  mx?: number | string;
  my?: number | string;
  p?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  px?: number | string;
  py?: number | string;
  
  backgroundColor?: string;
  color?: string;
  border?: string;
  borderRadius?: number | string;
}

export const Grid: React.FC<GridProps> = React.memo(({
  // Grid пропсы
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
  
  // Базовые пропсы
  className,
  id,
  style,
  children,
  
  // Box-like пропсы
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  
  // Spacing
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  
  backgroundColor,
  color,
  border,
  borderRadius,
  ...rest
}) => {
  const getGridTemplate = () => {
    if (template) {
      return {
        gridTemplateColumns: template.columns,
        gridTemplateRows: template.rows,
        gridTemplateAreas: template.areas,
      };
    }

    const gridTemplateColumns = typeof columns === 'number' 
      ? `repeat(${columns}, 1fr)` 
      : columns;

    const gridTemplateRows = typeof rows === 'number' 
      ? `repeat(${rows}, 1fr)` 
      : rows;

    const gridTemplateAreas = areas?.map(area => `"${area}"`).join(' ');

    return {
      gridTemplateColumns,
      gridTemplateRows,
      gridTemplateAreas,
    };
  };

  // Создаем базовый стиль для grid
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
    gridAutoFlow: autoFlow,
    gridAutoColumns: autoColumns,
    gridAutoRows: autoRows,
    gap,
    rowGap,
    columnGap,
    ...getGridTemplate(),
  };

  // Создаем стиль для Box (spacing и другие стили)
  const boxStyle: React.CSSProperties = {
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    backgroundColor,
    color,
    border,
    borderRadius,
    ...style,
  };

  // Обрабатываем spacing пропсы для Box
  const spacingProps = {
    ...(m && { m }),
    ...(mt && { mt }),
    ...(mr && { mr }),
    ...(mb && { mb }),
    ...(ml && { ml }),
    ...(mx && { mx }),
    ...(my && { my }),
    ...(p && { p }),
    ...(pt && { pt }),
    ...(pr && { pr }),
    ...(pb && { pb }),
    ...(pl && { pl }),
    ...(px && { px }),
    ...(py && { py }),
  };

  return (
    <Box 
      className={className}
      id={id}
      style={{ ...gridStyle, ...boxStyle }}
      {...spacingProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

Grid.displayName = 'Grid';