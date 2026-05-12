import React from "react";
import { render, screen } from "@testing-library/react";
import { IconButton } from "../IconButton";

describe("IconButton", () => {
  it("requires aria-label and renders icon", () => {
    render(<IconButton aria-label="Delete" icon={<span data-testid="del-icon">×</span>} />);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByTestId("del-icon")).toBeInTheDocument();
  });

  it("hits minimum touch target size on md", () => {
    render(<IconButton aria-label="Menu" icon={<span>t</span>} size="md" />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveStyle({ width: "44px", height: "44px" });
  });
});
