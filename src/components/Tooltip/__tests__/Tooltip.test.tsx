import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Tooltip } from "../Tooltip";

describe("Tooltip", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("shows tooltip after openDelay with hover", () => {
    render(
      <Tooltip content="Saved locally">
        <button type="button">Disk</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByRole("button"));
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Saved locally");
  });

  it("sets aria-describedby on trigger while tooltip visible", () => {
    render(
      <Tooltip content="Tip" openDelay={0}>
        <button type="button">Target</button>
      </Tooltip>,
    );
    const btn = screen.getByRole("button");
    fireEvent.mouseEnter(btn);
    act(() => {
      jest.advanceTimersByTime(0);
    });
    const tip = screen.getByRole("tooltip");
    expect(btn).toHaveAttribute("aria-describedby", tip.id);
  });
});
