import React, { useCallback } from "react";
import { colors, themeToken } from "../theme/tokens";
import type { DataTableProps, DataTableSortState } from "./Table.types";
import {
  cycleSort,
  resolveDataCell,
  Table,
} from "./Table";

function ariaSortFor(columnId: string, sort: DataTableSortState | undefined): React.AriaAttributes["aria-sort"] {
  if (!sort || sort.columnId !== columnId) return undefined;
  return sort.direction === "asc" ? "ascending" : "descending";
}

export function DataTable<T extends object>(props: DataTableProps<T>) {
  const {
    columns,
    data,
    getRowId,
    caption,
    emptyContent,
    sort,
    onSortChange,
    variant = "simple",
    size = "md",
    striped = true,
    stickyHeader = true,
    rootProps,
    tableProps,
  } = props;

  if (columns.length === 0) {
    return (
      <Table.Root {...rootProps}>
        <Table variant={variant} size={size} striped={false} stickyHeader={false} {...tableProps}>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td style={{ color: colors.secondary[600] }}>{emptyContent ?? "—"}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.Root>
    );
  }

  const handleHeaderClick = useCallback(
    (columnId: string, sortable?: boolean) => {
      if (!sortable || !onSortChange) return;
      onSortChange(cycleSort(sort, columnId));
    },
    [onSortChange, sort],
  );

  const colCount = columns.length;

  return (
    <Table.Root {...rootProps}>
      <Table variant={variant} size={size} striped={striped} stickyHeader={stickyHeader} {...tableProps}>
        {caption != null ?
          <Table.Caption>{caption}</Table.Caption>
        : null}
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => {
              const sortable = Boolean(col.sortable && onSortChange);
              const ariaSort = sortable ? ariaSortFor(col.id, sort) : undefined;

              const headerInner =
                sortable ?
                  <button
                    type="button"
                    onClick={() => handleHeaderClick(col.id, col.sortable)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: themeToken("spacing.xs"),
                      font: "inherit",
                      fontWeight: 600,
                      color: "inherit",
                      boxSizing: "border-box",
                      maxWidth: "100%",
                    }}
                  >
                    <span>{col.header}</span>
                    <span aria-hidden style={{ fontSize: themeToken("text.xs"), color: colors.secondary[500] }}>
                      {sort?.columnId === col.id ? (sort.direction === "asc" ? "▲" : "▼") : "⇅"}
                    </span>
                  </button>
                : (
                  col.header
                );

              return (
                <Table.Th
                  key={col.id}
                  scope="col"
                  textAlign={col.align}
                  aria-sort={ariaSort}
                  {...col.headerProps}
                >
                  {headerInner}
                </Table.Th>
              );
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.length === 0 ?
            <Table.Tr>
              <Table.Td colSpan={Math.max(colCount, 1)} style={{ color: colors.secondary[600] }}>
                {emptyContent ?? "—"}
              </Table.Td>
            </Table.Tr>
          : data.map((row, rowIndex) => {
              const rowKey = getRowId?.(row, rowIndex) ?? rowIndex;
              return (
                <Table.Tr key={String(rowKey)}>
                  {columns.map((col) => {
                    const { style: cellStyle, ...cellRest } = col.cellProps ?? {};
                    return col.rowHeader ?
                        <Table.Th
                          key={col.id}
                          scope="row"
                          textAlign={col.align}
                          {...cellRest}
                          style={{
                            fontWeight: 500,
                            ...cellStyle,
                          }}
                        >
                          {resolveDataCell(row, col)}
                        </Table.Th>
                      : (
                        <Table.Td key={col.id} textAlign={col.align} {...col.cellProps}>
                          {resolveDataCell(row, col)}
                        </Table.Td>
                      );
                  })}
                </Table.Tr>
              );
            })
          }
        </Table.Tbody>
      </Table>
    </Table.Root>
  );
}

DataTable.displayName = "DataTable";
