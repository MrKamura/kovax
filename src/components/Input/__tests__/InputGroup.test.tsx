import React from "react";
import { render, screen } from "@testing-library/react";
import { colors } from "../../theme/tokens";
import { Input } from "../Input";
import { InputGroup } from "../InputGroup";

describe("InputGroup", () => {
  it("renders left addon and search input", () => {
    render(
      <InputGroup leftAddon={<span aria-label="Test field" data-testid="icon-left">🔎</span>}>
        <Input placeholder="Search" aria-label="Search field" />
      </InputGroup>,
    );
    expect(screen.getByTestId("icon-left")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search field" })).toBeInTheDocument();
  });

  it("uses error border when isInvalid", () => {
    render(
      <InputGroup isInvalid aria-label="Test field" data-testid="group">
        <Input aria-label="Bad" placeholder="Bad" />
      </InputGroup>,
    );
    expect(screen.getByTestId("group")).toHaveStyle({
      border: `1px solid ${colors.error[500]}`,
    });
  });
});
