import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { colors } from "../../theme/tokens";
import { Textarea } from "../Textarea";

describe("Textarea", () => {
  it("renders textarea element", () => {
    render(<Textarea placeholder="Notes" />);
    expect(screen.getByPlaceholderText("Notes")).toBeTruthy();
  });

  it("handles value change", () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} placeholder="Type" />);

    fireEvent.change(screen.getByPlaceholderText("Type"), { target: { value: "hello" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled when isDisabled is true", () => {
    render(<Textarea isDisabled placeholder="Off" />);
    expect((screen.getByPlaceholderText("Off") as HTMLTextAreaElement).disabled).toBe(true);
  });

  it("shows error message", () => {
    render(<Textarea isInvalid errorMessage="Bad value" placeholder="x" />);
    expect(screen.getByText("Bad value")).toBeTruthy();
  });

  it("floatingLabel renders caption", () => {
    render(<Textarea floatingLabel placeholder="Caption" />);
    expect(screen.getByTestId("kv-textarea-floating-label")).toHaveTextContent("Caption");
  });

  it("applies variant filled background", () => {
    render(<Textarea variant="filled" placeholder="Fill" />);
    expect(screen.getByPlaceholderText("Fill")).toHaveStyle({
      backgroundColor: colors.secondary[50],
    });
  });

  it("character counter when maxLength set", () => {
    render(<Textarea showCharacterCount maxLength={10} defaultValue="abc" placeholder="p" />);
    expect(screen.getByText("3 / 10")).toBeTruthy();
  });
});
