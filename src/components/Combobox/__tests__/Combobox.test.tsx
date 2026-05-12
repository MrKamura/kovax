import React, { useRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useCombobox } from "../useCombobox";
import { VirtualizedListbox } from "../VirtualizedListbox";
import type { VirtualizedListboxHandle } from "../Combobox.types";

function StringCombo({ items = ["apple", "apricot", "banana"] }: { items?: string[] }) {
  const cb = useCombobox({ items });
  return (
    <div {...cb.getRootProps()}>
      <input {...cb.getInputProps({ "aria-label": "Search fruit" })} />
      <ul {...cb.getListProps()} style={{ display: cb.isOpen ? "block" : "none" }}>
        {cb.filteredItems.map((_, i) => (
          <li key={`${cb.filteredItems[i]}-${i}`} {...cb.getOptionProps(i)}>
            {cb.filteredItems[i]}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VirtualCombo({ rowCount }: { rowCount: number }) {
  const virtRef = useRef<VirtualizedListboxHandle>(null);
  const items = React.useMemo(
    () => Array.from({ length: rowCount }, (_, i) => `item-${i}`),
    [rowCount],
  );
  const cb = useCombobox({
    items,
    scrollContainerRef: virtRef,
    itemToString: (x) => x,
  });

  return (
    <div {...cb.getRootProps()}>
      <input {...cb.getInputProps({ "aria-label": "Virtual list" })} />
      {cb.isOpen ?
        <div {...cb.getListProps()}>
          <VirtualizedListbox
            ref={virtRef}
            rowCount={cb.filteredItems.length}
            rowHeight={28}
            height={120}
            overscan={4}
          >
            {({ index }) => (
              <div {...cb.getOptionProps(index)}>{cb.filteredItems[index]}</div>
            )}
          </VirtualizedListbox>
        </div>
      : null}
    </div>
  );
}

describe("useCombobox", () => {
  it("filters options while typing", () => {
    render(<StringCombo />);
    const input = screen.getByRole("combobox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "ban" } });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /banana/i })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /apple/i })).not.toBeInTheDocument();
  });

  it("selects highlighted option on Enter", () => {
    render(<StringCombo />);
    const input = screen.getByRole("combobox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "ban" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(input.value).toBe("banana");
  });

  it("opens list with ArrowDown", () => {
    render(<StringCombo />);
    const input = screen.getByRole("combobox");
    fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" });
    expect(input).toHaveAttribute("aria-expanded", "true");
  });

  it("scrollToIndex on VirtualizedListbox keeps highlighted row reachable", () => {
    render(<VirtualCombo rowCount={200} />);
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "item-150" } });
    fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(input).toHaveValue("item-150");
  });
});
