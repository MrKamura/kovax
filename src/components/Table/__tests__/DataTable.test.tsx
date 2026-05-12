import React, { useMemo, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import type { DataTableSortState } from "../Table.types";
import { DataTable } from "../DataTable";

interface Row {
  name: string;
  qty: number;
}

const ROWS: Row[] = [
  { name: "gamma", qty: 3 },
  { name: "alpha", qty: 1 },
];

describe("DataTable", () => {
  it("renders rows from columns + data", () => {
    render(
      <DataTable<Row>
        columns={[
          { id: "name", header: "Name", accessor: "name" },
          { id: "qty", header: "Qty", accessor: "qty", align: "right" },
        ]}
        data={ROWS}
        striped={false}
        caption="Stock"
      />,
    );

    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getByText("alpha")).toBeTruthy();
    expect(screen.getByText("gamma")).toBeTruthy();
    expect(screen.getByText("Stock")).toBeTruthy();
  });

  it("shows empty placeholder when data is empty", () => {
    render(
      <DataTable<Row>
        columns={[{ id: "name", header: "Name", accessor: "name" }]}
        data={[]}
        emptyContent="Nothing here"
        striped={false}
      />,
    );
    expect(screen.getByText("Nothing here")).toBeTruthy();
  });

  it("cycles sort via header button", () => {
    function Harness() {
      const [sort, setSort] = useState<DataTableSortState | undefined>();
      const sorted = useMemo(() => {
        if (!sort || sort.columnId !== "name") return ROWS;
        const m = sort.direction === "asc" ? 1 : -1;
        return [...ROWS].sort((a, b) => m * a.name.localeCompare(b.name));
      }, [sort]);

      return (
        <DataTable<Row>
          columns={[{ id: "name", header: "Name", accessor: "name", sortable: true }]}
          data={sorted}
          sort={sort}
          onSortChange={setSort}
          striped={false}
        />
      );
    }

    render(<Harness />);

    const dataRows = () => screen.getAllByRole("row").slice(1);

    const btn = screen.getByRole("button", { name: /name/i });
    expect(dataRows()[0]).toHaveTextContent("gamma");

    fireEvent.click(btn);
    expect(dataRows()[0]).toHaveTextContent("alpha");

    fireEvent.click(btn);
    expect(dataRows()[0]).toHaveTextContent("gamma");

    fireEvent.click(btn);
    expect(dataRows()[0]).toHaveTextContent("gamma");
  });

  it("renders row header cells when rowHeader is set", () => {
    render(
      <DataTable<{ label: string; v: string }>
        columns={[
          { id: "label", header: "Metric", accessor: "label", rowHeader: true },
          { id: "v", header: "Value", accessor: "v" },
        ]}
        data={[{ label: "CPU", v: "12%" }]}
        striped={false}
      />,
    );

    expect(screen.getByRole("rowheader", { name: "CPU" })).toBeTruthy();
  });
});
