# Table & DataTable

Token-backed **`<table>`** primitives (**`Table`**) plus a small **`DataTable`** that maps **columns + rows** with optional **sort** controls (**`aria-sort`**, keyboard-focusable header buttons).

## Import

```tsx
import {
  Table,
  DataTable,
  cycleSort,
  resolveDataCell,
  type DataTableColumn,
  type DataTableSortState,
} from "kovax-react";

import { Table, DataTable } from "kovax-react/table";
```

## Table primitives

Compound export (**`Table.*`**) mirrors **`Tabs.*`**:

- **`Table.Root`** — horizontal scroll shell (`overflow-x: auto`, rounded corners).
- **`Table`** — native **`<table>`** (`ref` forwarded); props **`variant`**, **`size`**, **`striped`**, **`stickyHeader`**.
- **`Table.Caption`**, **`Table.Thead`**, **`Table.Tbody`**, **`Table.Tfoot`**, **`Table.Tr`**, **`Table.Th`**, **`Table.Td`**.

```tsx
<Table.Root>
  <Table variant="bordered" size="md" striped stickyHeader>
    <Table.Caption>Quarterly totals</Table.Caption>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Region</Table.Th>
        <Table.Th textAlign="right">Sales</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      <Table.Tr>
        <Table.Td>EU</Table.Td>
        <Table.Td textAlign="right">120</Table.Td>
      </Table.Tr>
    </Table.Tbody>
  </Table>
</Table.Root>
```

### Variants

| Value | Appearance |
| --- | --- |
| **`simple`** (default) | Row dividers (`border-bottom` on cells). |
| **`bordered`** | Full grid (`1px` **`secondary[200]`**). |

### Striped rows

**`striped`** applies **`secondary[50]`** to even body rows via a scoped **`<style>`** tag (supports **`td`** and **`th[scope="row"]`**).

### Sticky header

**`stickyHeader`** (default **`true`**) pins **`thead`** cells with **`position: sticky`** and a subtle bottom inset shadow.

## DataTable

Declarative columns:

```tsx
type Row = { sku: string; name: string; qty: number };

const columns: DataTableColumn<Row>[] = [
  { id: "sku", header: "SKU", accessor: "sku", sortable: true },
  { id: "name", header: "Product", accessor: "name" },
  {
    id: "qty",
    header: "Qty",
    accessor: "qty",
    align: "right",
    sortable: true,
  },
];

<DataTable<Row>
  caption="Inventory"
  columns={columns}
  data={rows}
  sort={sort}
  onSortChange={setSort}
  getRowId={(row) => row.sku}
  emptyContent="No rows"
/>;
```

Sorting is **controlled**: handle **`onSortChange`** and pass sorted **`data`** (helpers **`cycleSort`** / **`resolveDataCell`** are exported for reuse).

**`rowHeader: true`** renders the column’s body cells as **`<th scope="row">`** (accessible row labels).

## Accessibility

- Prefer a **`caption`** (or **`Table.Caption`**) when the table isn’t introduced by a nearby heading.
- Sortable **`DataTable`** headers expose **`aria-sort`** when **`sort`** matches the column.
- Explicit **`scope`** on **`Table.Th`** defaults to **`col`**; row labels use **`scope="row"`**.

## Playground

**Components → Table** (Markdown under **Documentation → Table**).
