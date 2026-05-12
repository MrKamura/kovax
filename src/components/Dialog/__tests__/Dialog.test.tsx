import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  DialogRoot,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../Dialog";

describe("Dialog", () => {
  it("renders dialog when open (uncontrolled defaultOpen)", () => {
    render(
      <DialogRoot defaultOpen>
        <DialogContent>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription>Proceed?</DialogDescription>
          <DialogClose />
        </DialogContent>
      </DialogRoot>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /confirm/i })).toBeInTheDocument();
    expect(screen.getByText(/proceed/i)).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(
      <DialogRoot defaultOpen>
        <DialogContent>
          <DialogTitle>T</DialogTitle>
        </DialogContent>
      </DialogRoot>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Close button dismisses", () => {
    render(
      <DialogRoot defaultOpen>
        <DialogContent>
          <DialogTitle>T</DialogTitle>
          <DialogClose />
        </DialogContent>
      </DialogRoot>,
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
