import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from "../Table";

describe("Table", () => {
  it("renders semantic regions", () => {
    render(
      <Table.Root>
        <Table variant="simple" stickyHeader={false}>
          <Table.Caption>Demo</Table.Caption>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Ada</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.Root>,
    );

    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeTruthy();
    expect(screen.getByRole("cell", { name: "Ada" })).toBeTruthy();
    expect(screen.getByText("Demo")).toBeTruthy();
  });

  it("throws when Thead is outside Table", () => {
    expect(() =>
      render(
        <table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>x</Table.Th>
            </Table.Tr>
          </Table.Thead>
        </table>,
      ),
    ).toThrow(/Table\.Thead must be used within Table/);
  });
});
