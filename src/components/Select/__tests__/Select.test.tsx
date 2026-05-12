import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Select } from "../Select";
import { FormControl } from "../../Form/FormControl";

describe("Select", () => {
  it("fires change when picking an option", () => {
    const onChange = jest.fn();
    render(
      <Select defaultValue="b" onChange={onChange} aria-label="Fruit">
        <option value="a">
          Apple
        </option>
        <option value="b">
          Berry
        </option>
      </Select>,
    );
    const sel = screen.getByRole("combobox") as HTMLSelectElement;
    expect(sel.value).toBe("b");
    fireEvent.change(sel, { target: { value: "a" } });
    expect(sel.value).toBe("a");
    expect(onChange).toHaveBeenCalled();
  });

  it("respects FormControl disabled context", () => {
    render(
      <FormControl isDisabled>
        <Select aria-label="Pick">
          <option value="x">X</option>
        </Select>
      </FormControl>,
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("reflects FormControl invalid context", () => {
    render(
      <FormControl isInvalid>
        <Select aria-label="Pick">
          <option value="x">X</option>
        </Select>
      </FormControl>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });
});
