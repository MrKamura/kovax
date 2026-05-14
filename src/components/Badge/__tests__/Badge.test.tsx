import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Beta</Badge>);
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders leading dot when dot is true", () => {
    const { container } = render(
      <Badge dot color="success">
        Live
      </Badge>,
    );
    const dots = container.querySelectorAll('span[aria-hidden="true"]');
    expect(dots.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>R</Badge>);
    expect(ref.current?.tagName).toBe("SPAN");
    expect(ref.current).toHaveTextContent("R");
  });
});
