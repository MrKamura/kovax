import { useMemo, useState } from "react";
import {
  DataTable,
  Table,
  Text,
  themeToken,
  type DataTableColumn,
  type DataTableSortState,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

type InvRow = {
  sku: string;
  product: string;
  qty: number;
};

const INV_ROWS: InvRow[] = [
  { sku: "KVX-100", product: "Switch panel", qty: 42 },
  { sku: "KVX-042", product: "Cable kit", qty: 18 },
  { sku: "KVX-017", product: "Wall bracket", qty: 7 },
];

function DataTableSortDemo() {
  const { t } = useTranslation();
  const columns: DataTableColumn<InvRow>[] = [
    { id: "sku", header: t("table.demoColSku"), accessor: "sku", sortable: true },
    { id: "product", header: t("table.demoColProduct"), accessor: "product" },
    {
      id: "qty",
      header: t("table.demoColQty"),
      accessor: "qty",
      align: "right",
      sortable: true,
    },
  ];

  const [sort, setSort] = useState<DataTableSortState | undefined>();

  const sorted = useMemo(() => {
    if (!sort) return INV_ROWS;
    const mult = sort.direction === "asc" ? 1 : -1;
    return [...INV_ROWS].sort((a, b) => {
      const av = a[sort.columnId as keyof InvRow];
      const bv = b[sort.columnId as keyof InvRow];
      if (typeof av === "number" && typeof bv === "number") return mult * (av - bv);
      return mult * String(av).localeCompare(String(bv), undefined, { sensitivity: "base" });
    });
  }, [sort]);

  return (
    <DataTable<InvRow>
      caption={t("table.demoCaption")}
      columns={columns}
      data={sorted}
      sort={sort}
      onSortChange={setSort}
      getRowId={(row) => row.sku}
      variant="bordered"
      size="md"
      striped
      rootProps={{ style: { maxWidth: 560 } }}
    />
  );
}

export function TableSection() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("table.pageTitle")}</h1>
      <p>
        <Trans i18nKey="table.intro" components={{ strong: <strong />, code: <code /> }} />
      </p>

      <h2>{t("table.examplesPrimitive")}</h2>
      <LiveExample
        code={`import { Table } from "kovax-react";

<Table.Root>
  <Table variant="bordered" size="sm" striped stickyHeader={false}>
    <Table.Caption>Sales snapshot</Table.Caption>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Region</Table.Th>
        <Table.Th textAlign="right">Units</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      <Table.Tr>
        <Table.Td>EU</Table.Td>
        <Table.Td textAlign="right">120</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td>APAC</Table.Td>
        <Table.Td textAlign="right">84</Table.Td>
      </Table.Tr>
    </Table.Tbody>
    <Table.Tfoot>
      <Table.Tr>
        <Table.Th scope="row">Total</Table.Th>
        <Table.Td textAlign="right" style={{ fontWeight: 600 }}>
          204
        </Table.Td>
      </Table.Tr>
    </Table.Tfoot>
  </Table>
</Table.Root>`}
      >
        <Table.Root style={{ maxWidth: 480 }}>
          <Table variant="bordered" size="sm" striped stickyHeader={false}>
            <Table.Caption>{t("table.primitiveCaption")}</Table.Caption>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t("table.primitiveColRegion")}</Table.Th>
                <Table.Th textAlign="right">{t("table.primitiveColUnits")}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>EU</Table.Td>
                <Table.Td textAlign="right">120</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>APAC</Table.Td>
                <Table.Td textAlign="right">84</Table.Td>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tfoot>
              <Table.Tr>
                <Table.Th scope="row">{t("table.primitiveFooterLabel")}</Table.Th>
                <Table.Td textAlign="right" style={{ fontWeight: 600 }}>
                  204
                </Table.Td>
              </Table.Tr>
            </Table.Tfoot>
          </Table>
        </Table.Root>
      </LiveExample>

      <h2>{t("table.examplesData")}</h2>
      <LiveExample
        code={`import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn, type DataTableSortState } from "kovax-react";

type Row = { sku: string; product: string; qty: number };

const rows: Row[] = [ /* … */ ];

const columns: DataTableColumn<Row>[] = [
  { id: "sku", header: "SKU", accessor: "sku", sortable: true },
  { id: "product", header: "Product", accessor: "product" },
  { id: "qty", header: "Qty", accessor: "qty", align: "right", sortable: true },
];

function Demo() {
  const [sort, setSort] = useState<DataTableSortState | undefined>();
  const sorted = useMemo(() => {
    if (!sort) return rows;
    const mult = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = a[sort.columnId as keyof Row];
      const bv = b[sort.columnId as keyof Row];
      if (typeof av === "number" && typeof bv === "number") return mult * (av - bv);
      return mult * String(av).localeCompare(String(bv));
    });
  }, [sort]);

  return (
    <DataTable<Row>
      caption="Inventory"
      columns={columns}
      data={sorted}
      sort={sort}
      onSortChange={setSort}
      getRowId={(r) => r.sku}
      variant="bordered"
      striped
    />
  );
}`}
      >
        <Text size="sm" color={themeToken("secondary.600")} style={{ marginBottom: themeToken("spacing.md") }}>
          {t("table.dataHint")}
        </Text>
        <DataTableSortDemo />
      </LiveExample>

      <Text size="xs" color={themeToken("secondary.600")} style={{ marginTop: themeToken("spacing.md") }}>
        <Trans i18nKey="table.docsHint" components={{ strong: <strong /> }} />
      </Text>
    </>
  );
}
