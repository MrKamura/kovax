import type { CSSProperties } from 'react';

export interface GridTemplateOptions {
  template?: {
    columns?: string;
    rows?: string;
    areas?: string;
  };
  columns?: number | string;
  rows?: number | string;
  areas?: string[];
}

export function getGridTemplateStyles(
  options: GridTemplateOptions
): Pick<CSSProperties, 'gridTemplateColumns' | 'gridTemplateRows' | 'gridTemplateAreas'> {
  if (options.template) {
    return {
      gridTemplateColumns: options.template.columns,
      gridTemplateRows: options.template.rows,
      gridTemplateAreas: options.template.areas,
    };
  }

  const gridTemplateColumns =
    typeof options.columns === 'number'
      ? `repeat(${options.columns}, 1fr)`
      : options.columns;

  const gridTemplateRows =
    typeof options.rows === 'number' ? `repeat(${options.rows}, 1fr)` : options.rows;

  const gridTemplateAreas = options.areas?.map((area) => `"${area}"`).join(' ');

  return {
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
  };
}
