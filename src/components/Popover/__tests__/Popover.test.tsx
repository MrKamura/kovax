import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from "../Popover";

describe("Popover", () => {
  it("opens panel and shows dialog content", () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>
          <button type="button">Menu</button>
        </PopoverTrigger>
        <PopoverContent aria-label="Panel">
          <div>Item A</div>
        </PopoverContent>
      </PopoverRoot>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Item A")).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(
      <PopoverRoot defaultOpen>
        <PopoverTrigger>
          <button type="button">Menu</button>
        </PopoverTrigger>
        <PopoverContent aria-label="Panel">
          <div>Inside</div>
        </PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on outside click", () => {
    render(
      <div>
        <PopoverRoot defaultOpen>
          <PopoverTrigger>
            <button type="button">Menu</button>
          </PopoverTrigger>
          <PopoverContent aria-label="Panel">
            <div>Inside</div>
          </PopoverContent>
        </PopoverRoot>
        <button type="button">Outside</button>
      </div>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("button", { name: /outside/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
