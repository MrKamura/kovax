import React from "react";
import { render, screen } from "@testing-library/react";
import { Blockquote } from "../Blockquote";

describe("Blockquote", () => {
  it("renders quote body", () => {
    render(<Blockquote>Quote text</Blockquote>);
    expect(screen.getByText("Quote text")).toBeTruthy();
  });

  it("renders citation footer when citation provided", () => {
    render(<Blockquote citation="Author">Q</Blockquote>);
    expect(screen.getByText(/Author/)).toBeTruthy();
    expect(screen.getByText("Author").tagName).toBe("CITE");
  });

  it("sets cite attribute on blockquote", () => {
    render(
      <Blockquote cite="https://example.com/source">
        Q
      </Blockquote>
    );
    expect(screen.getByText("Q").closest("blockquote")).toHaveAttribute(
      "cite",
      "https://example.com/source"
    );
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLQuoteElement>();
    render(<Blockquote ref={ref}>x</Blockquote>);
    expect(ref.current?.tagName).toBe("BLOCKQUOTE");
  });
});
