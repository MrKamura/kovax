import React from "react";
import { render, screen } from "@testing-library/react";
import { getComputedStyleProperty as css } from "../../../test-utils/computedStyle";
import { Heading } from "../Heading";

describe("Heading", () => {
  it("renders h2 by default", () => {
    render(<Heading>Title</Heading>);
    const el = screen.getByRole("heading", { level: 2 });
    expect(el.textContent).toBe("Title");
  });

  it("maps level to h1", () => {
    render(<Heading level={1}>H1</Heading>);
    expect(screen.getByRole("heading", { level: 1 }).tagName).toBe("H1");
  });

  it("maps level to h6", () => {
    render(<Heading level={6}>H6</Heading>);
    expect(screen.getByRole("heading", { level: 6 }).tagName).toBe("H6");
  });

  it("applies preset font-size for level", () => {
    const { container } = render(<Heading level={4}>L4</Heading>);
    const el = container.querySelector("h4")!;
    expect(css(el, "font-size")).toBeTruthy();
    expect(css(el, "font-weight")).toBe("600");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<Heading ref={ref}>R</Heading>);
    expect(ref.current?.tagName).toBe("H2");
  });
});
