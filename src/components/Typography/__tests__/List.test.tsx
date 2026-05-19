import React from "react";
import { render, screen } from "@testing-library/react";
import { getComputedStyleProperty as css } from "../../../test-utils/computedStyle";
import { List } from "../List";
import { ListItem } from "../ListItem";

describe("List", () => {
  it("renders unordered list by default", () => {
    render(
      <List>
        <ListItem>a</ListItem>
        <ListItem>b</ListItem>
      </List>
    );
    const ul = screen.getByRole("list");
    expect(ul.tagName).toBe("UL");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders ordered list when ordered", () => {
    render(
      <List ordered>
        <ListItem>x</ListItem>
      </List>
    );
    expect(screen.getByRole("list").tagName).toBe("OL");
  });

  it("adds vertical spacing between ListItem except last", () => {
    const { container } = render(
      <List spacing="sm">
        <ListItem>one</ListItem>
        <ListItem>two</ListItem>
      </List>
    );
    const items = container.querySelectorAll("li");
    expect(css(items[0], "margin-bottom")).not.toBe("");
    expect(css(items[1], "margin-bottom")).toMatch(/^0(px)?$/);
  });

  it("leaves non-ListItem children untouched", () => {
    render(
      <div data-axe-skip>
        <List>
          <ListItem>ok</ListItem>
          <span data-testid="raw">skip</span>
        </List>
      </div>,
    );
    expect(screen.getByTestId("raw").tagName).toBe("SPAN");
  });
});
