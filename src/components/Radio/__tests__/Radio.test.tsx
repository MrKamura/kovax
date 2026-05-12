import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Radio } from "../Radio";
import { RadioGroup } from "../RadioGroup";

describe("RadioGroup + Radio", () => {
  function ControlledDemo() {
    const [v, setV] = useState("b");
    return (
      <RadioGroup name="plan" value={v} onValueChange={setV}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </RadioGroup>
    );
  }

  it("selects option and updates group value", () => {
    render(<ControlledDemo />);
    const a = screen.getByRole("radio", { name: /a/i }) as HTMLInputElement;
    const b = screen.getByRole("radio", { name: /b/i }) as HTMLInputElement;
    expect(b.checked).toBe(true);
    fireEvent.click(a);
    expect(a.checked).toBe(true);
    expect(b.checked).toBe(false);
  });

  it("disables radios when RadioGroup isDisabled", () => {
    render(
      <RadioGroup name="x" defaultValue="1" isDisabled>
        <Radio value="1">One</Radio>
        <Radio value="2">Two</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: /one/i })).toBeDisabled();
    expect(screen.getByRole("radio", { name: /two/i })).toBeDisabled();
  });
});

describe("Radio standalone", () => {
  it("invokes onChange when clicked uncontrolled", () => {
    const onChange = jest.fn();
    render(
      <Radio name="solo" value="x" onChange={onChange}>
        Solo
      </Radio>,
    );
    fireEvent.click(screen.getByRole("radio"));
    expect(onChange).toHaveBeenCalled();
  });
});
