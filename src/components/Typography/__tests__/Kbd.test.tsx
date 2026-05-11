import React from "react";
import { render, screen } from "@testing-library/react";
import { getComputedStyleProperty as css } from "../../../test-utils/computedStyle";
import { Kbd } from "../Kbd";

describe("Kbd", () => {
  it("renders kbd element", () => {
    render(<Kbd>Ctrl</Kbd>);
    expect(screen.getByText("Ctrl").tagName).toBe("KBD");
  });

  it("applies monospace and border", () => {
    const { container } = render(<Kbd>K</Kbd>);
    const el = container.firstChild as HTMLElement;
    expect(css(el, "border-top-width")).toMatch(/\d/);
    expect(css(el, "font-family").toLowerCase()).toContain("mono");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Kbd ref={ref}>⌘</Kbd>);
    expect(ref.current?.tagName).toBe("KBD");
  });
});
