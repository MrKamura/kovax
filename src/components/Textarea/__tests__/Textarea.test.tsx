import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { colors } from "../../theme/tokens";
import { Textarea } from "../Textarea";

describe("Textarea", () => {
  it("renders textarea element", () => {
    render(<Textarea aria-label="Notes" placeholder="Notes" />);
    expect(screen.getByPlaceholderText("Notes")).toBeTruthy();
  });

  it("handles value change", () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} aria-label="Type" placeholder="Type" />);

    fireEvent.change(screen.getByPlaceholderText("Type"), { target: { value: "hello" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled when isDisabled is true", () => {
    render(<Textarea isDisabled aria-label="Off" placeholder="Off" />);
    expect((screen.getByPlaceholderText("Off") as HTMLTextAreaElement).disabled).toBe(true);
  });

  it("shows error message", () => {
    render(<Textarea isInvalid errorMessage="Bad value" aria-label="x" placeholder="x" />);
    expect(screen.getByText("Bad value")).toBeTruthy();
  });

  it("floatingLabel renders caption", () => {
    render(<Textarea floatingLabel aria-label="Caption" placeholder="Caption" />);
    expect(screen.getByTestId("kv-textarea-floating-label")).toHaveTextContent("Caption");
  });

  it("applies variant filled background", () => {
    render(<Textarea variant="filled" aria-label="Fill" placeholder="Fill" />);
    expect(screen.getByPlaceholderText("Fill")).toHaveStyle({
      backgroundColor: colors.secondary[50],
    });
  });

  it("character counter when maxLength set", () => {
    render(<Textarea showCharacterCount maxLength={10} defaultValue="abc" aria-label="p" placeholder="p" />);
    expect(screen.getByText("3 / 10")).toBeTruthy();
  });
});
