import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "../Checkbox";
import { FormControl } from "../../Form/FormControl";

describe("Checkbox", () => {
  it("toggles on click", () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange}>Accept</Checkbox>);
    const box = screen.getByRole("checkbox", { name: /accept/i }) as HTMLInputElement;
    expect(box.checked).toBe(false);
    fireEvent.click(box);
    expect(box.checked).toBe(true);
    expect(onChange).toHaveBeenCalled();
  });

  it("respects FormControl disabled context", () => {
    render(
      <FormControl isDisabled>
        <Checkbox>Terms</Checkbox>
      </FormControl>,
    );
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("marks aria-invalid from FormControl", () => {
    render(
      <FormControl isInvalid>
        <Checkbox aria-label="Agree" />
      </FormControl>,
    );
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });
});
