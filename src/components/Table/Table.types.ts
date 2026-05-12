import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

/** Surface chrome for Kovax tables. */
export type TableVariant = "simple" | "bordered";

/** Cell density — maps to padding and header typography. */
export type TableSize = "sm" | "md" | "lg";

export interface TableRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Horizontal scroll when content overflows; keeps rounded chrome outside the scrollport when paired with bordered tables. */
  children?: ReactNode;
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  size?: TableSize;
  /** Alternating row background in **tbody**. */
  striped?: boolean;
  /** Highlight header row / column labels (default **true**). */
  stickyHeader?: boolean;
}

export interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
}

export interface TableTrProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode;
}

export interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Passed through to **`<th>`** (defaults to **col** for column headers). */
  scope?: ThHTMLAttributes<HTMLTableCellElement>["scope"];
  /** Cell alignment shortcut → **`style.textAlign`**. */
  textAlign?: CSSProperties["textAlign"];
}

export interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  /** Cell alignment shortcut → **`style.textAlign`**. */
  textAlign?: CSSProperties["textAlign"];
}

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  children?: ReactNode;
}

export type SortDirection = "asc" | "desc";

export interface DataTableSortState {
  columnId: string;
  direction: SortDirection;
}

export interface DataTableColumn<T extends object> {
  /** Stable id for sorting and keys. */
  id: string;
  header: ReactNode;
  /** Column value — property key or render function. */
  accessor?: keyof T | ((row: T) => React.ReactNode);
  align?: "left" | "right" | "center";
  /** When **true**, header is a sort button if **`onSortChange`** / **`sort`** are used. */
  sortable?: boolean;
/** Use **scope="row"** for this column’s body cells (first column labels). Header cells remain **scope="col"**. */
  rowHeader?: boolean;
  /** Extra props for header cell (merged last). */
  headerProps?: Omit<TableThProps, "children" | "scope">;
  /** Extra props for body cells (merged last). */
  cellProps?: Omit<TableTdProps, "children">;
}

export interface DataTableProps<T extends object> {
  columns: readonly DataTableColumn<T>[];
  data: readonly T[];
  /** Row key; defaults to index (acceptable only for static lists). */
  getRowId?: (row: T, index: number) => string | number;
  caption?: ReactNode;
  emptyContent?: ReactNode;
  /** Controlled sort indicator + **`aria-sort`** on headers. */
  sort?: DataTableSortState;
  /** Called when a **sortable** header is activated (parent sorts **`data`**). */
  onSortChange?: (next: DataTableSortState | undefined) => void;
  variant?: TableVariant;
  size?: TableSize;
  striped?: boolean;
  stickyHeader?: boolean;
  rootProps?: Omit<TableRootProps, "children">;
  tableProps?: Omit<TableProps, "children">;
}
