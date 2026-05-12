import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";

describe("ButtonGroup", () => {
  it('has role="group" and accessible name', () => {
    render(
      <ButtonGroup aria-label="Text alignment">
        <Button variant="outline">Left</Button>
        <Button variant="outline">Center</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group", { name: "Text alignment" })).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("button", { name: /one/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /two/i })).toBeInTheDocument();
  });
});
