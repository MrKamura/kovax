import React, {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
} from "react";
import { colors, themeToken } from "../theme/tokens";
import type {
  DataTableColumn,
  DataTableSortState,
  TableCaptionProps,
  TableProps,
  TableRootProps,
  TableSectionProps,
  TableTdProps,
  TableThProps,
  TableTrProps,
  TableSize,
  TableVariant,
} from "./Table.types";

interface TableChromeContextValue {
  variant: TableVariant;
  size: TableSize;
  striped: boolean;
  stickyHeader: boolean;
}

const TableChromeContext = createContext<TableChromeContextValue | null>(null);

function useTableChrome(component: string): TableChromeContextValue {
  const ctx = useContext(TableChromeContext);
  if (!ctx) throw new Error(`${component} must be used within Table`);
  return ctx;
}

function cellPadding(size: TableSize): {
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
} {
  switch (size) {
    case "sm":
      return {
        paddingLeft: themeToken("spacing.sm"),
        paddingRight: themeToken("spacing.sm"),
        paddingTop: themeToken("spacing.xs"),
        paddingBottom: themeToken("spacing.xs"),
      };
    case "lg":
      return {
        paddingLeft: themeToken("spacing.lg"),
        paddingRight: themeToken("spacing.lg"),
        paddingTop: themeToken("spacing.md"),
        paddingBottom: themeToken("spacing.md"),
      };
    default:
      return {
        paddingLeft: themeToken("spacing.md"),
        paddingRight: themeToken("spacing.md"),
        paddingTop: themeToken("spacing.sm"),
        paddingBottom: themeToken("spacing.sm"),
      };
  }
}

function cellChrome(variant: TableVariant): Pick<
  React.CSSProperties,
  "border" | "borderBottom"
> {
  const line = colors.secondary[200];
  if (variant === "bordered") {
    return { border: `1px solid ${line}` };
  }
  return { borderBottom: `1px solid ${line}` };
}

export function TableRoot({ style, className, children, ...rest }: TableRootProps) {
  return (
    <div
      {...rest}
      className={className}
      style={{
        maxWidth: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: themeToken("borderRadius.md"),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

TableRoot.displayName = "Table.Root";

const TableFrame = forwardRef<HTMLTableElement, TableProps>(function TableFrame(props, ref) {
  const {
    variant = "simple",
    size = "md",
    striped = false,
    stickyHeader = true,
    style,
    className,
    children,
    ...rest
  } = props;

  const stripeScope = useId().replace(/:/g, "");

  const ctx = useMemo(
    (): TableChromeContextValue => ({
      variant,
      size,
      striped,
      stickyHeader,
    }),
    [variant, size, striped, stickyHeader],
  );

  const fontSize =
    size === "sm" ? themeToken("text.sm") : size === "lg" ? themeToken("text.lg") : themeToken("text.base");

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: 0,
    fontSize,
    color: colors.secondary[800],
    ...style,
  };

  const stripeCss =
    striped ?
      `[data-kv-table-stripes="${stripeScope}"] tbody > tr:nth-child(even) > td,
      [data-kv-table-stripes="${stripeScope}"] tbody > tr:nth-child(even) > th[scope="row"] {
        background-color: ${colors.secondary[50]};
      }`
    : "";

  return (
    <TableChromeContext.Provider value={ctx}>
      {striped ?
        <style dangerouslySetInnerHTML={{ __html: stripeCss }} />
      : null}
      <table
        ref={ref}
        {...rest}
        data-kv-table=""
        data-kv-variant={variant}
        {...(striped ? { "data-kv-table-stripes": stripeScope } : {})}
        className={className}
        style={tableStyle}
      >
        {children}
      </table>
    </TableChromeContext.Provider>
  );
});

TableFrame.displayName = "Table";

export function TableThead(props: TableSectionProps) {
  const { style, ...rest } = props;
  useTableChrome("Table.Thead");
  return (
    <thead
      {...rest}
      style={{
        background: colors.secondary[100],
        ...style,
      }}
    />
  );
}

TableThead.displayName = "Table.Thead";

export function TableTbody(props: TableSectionProps) {
  useTableChrome("Table.Tbody");
  return <tbody {...props} />;
}

TableTbody.displayName = "Table.Tbody";

export function TableTfoot(props: TableSectionProps) {
  const { style, ...rest } = props;
  useTableChrome("Table.Tfoot");
  return (
    <tfoot
      {...rest}
      style={{
        background: colors.secondary[50],
        ...style,
      }}
    />
  );
}

TableTfoot.displayName = "Table.Tfoot";

export function TableTr(props: TableTrProps) {
  const { style, ...rest } = props;
  useTableChrome("Table.Tr");
  return (
    <tr
      {...rest}
      style={{
        transition: themeToken("transition.fast"),
        ...style,
      }}
    />
  );
}

TableTr.displayName = "Table.Tr";

export function TableTh(props: TableThProps) {
  const { style, scope = "col", textAlign, ...rest } = props;
  const ctx = useTableChrome("Table.Th");
  const pad = cellPadding(ctx.size);
  const border = cellChrome(ctx.variant);
  const sticky: React.CSSProperties =
    ctx.stickyHeader ?
      {
        position: "sticky",
        top: 0,
        zIndex: 2,
        background: colors.secondary[100],
        boxShadow: `inset 0 -1px 0 ${colors.secondary[200]}`,
      }
    : {};

  return (
    <th
      {...rest}
      scope={scope}
      style={{
        fontWeight: 600,
        textAlign: textAlign ?? "left",
        whiteSpace: "nowrap",
        ...pad,
        ...border,
        ...sticky,
        ...style,
      }}
    />
  );
}

TableTh.displayName = "Table.Th";

export function TableTd(props: TableTdProps) {
  const { style, textAlign, ...rest } = props;
  const ctx = useTableChrome("Table.Td");
  const pad = cellPadding(ctx.size);
  const border = cellChrome(ctx.variant);

  return (
    <td
      {...rest}
      style={{
        textAlign: textAlign ?? "left",
        verticalAlign: "top",
        ...pad,
        ...border,
        ...style,
      }}
    />
  );
}

TableTd.displayName = "Table.Td";

export function TableCaption(props: TableCaptionProps) {
  const { style, ...rest } = props;
  useTableChrome("Table.Caption");
  return (
    <caption
      {...rest}
      style={{
        captionSide: "top",
        textAlign: "left",
        paddingBottom: themeToken("spacing.sm"),
        fontSize: themeToken("text.sm"),
        color: colors.secondary[600],
        ...style,
      }}
    />
  );
}

TableCaption.displayName = "Table.Caption";

/** Kovax **`<table>`** with token chrome; use **`Table.Root`** for horizontal scrolling. Subcomponents: **`Table.Thead`**, **`Table.Tbody`**, **`Table.Tr`**, **`Table.Th`**, **`Table.Td`**, **`Table.Caption`**. */
export const Table = Object.assign(TableFrame, {
  Root: TableRoot,
  Thead: TableThead,
  Tbody: TableTbody,
  Tfoot: TableTfoot,
  Tr: TableTr,
  Th: TableTh,
  Td: TableTd,
  Caption: TableCaption,
});

export function resolveDataCell<T extends object>(
  row: T,
  column: DataTableColumn<T>,
): React.ReactNode {
  if (column.accessor === undefined) return null;
  if (typeof column.accessor === "function") return column.accessor(row);
  const raw = row[column.accessor];
  if (raw == null) return "";
  if (typeof raw === "string" || typeof raw === "number" || typeof raw === "boolean") {
    return String(raw);
  }
  return String(raw);
}

export function cycleSort(
  current: DataTableSortState | undefined,
  columnId: string,
): DataTableSortState | undefined {
  if (!current || current.columnId !== columnId) return { columnId, direction: "asc" };
  if (current.direction === "asc") return { columnId, direction: "desc" };
  return undefined;
}
