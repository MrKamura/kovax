import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  ModalRoot,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from "../Modal";

describe("Modal", () => {
  it("renders structured modal when open", () => {
    render(
      <ModalRoot defaultOpen>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Delete project?</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <ModalDescription>This cannot be undone.</ModalDescription>
          </ModalBody>
          <ModalFooter>
            <ModalClose />
          </ModalFooter>
        </ModalContent>
      </ModalRoot>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /delete project/i })).toBeInTheDocument();
    expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(
      <ModalRoot defaultOpen>
        <ModalContent>
          <ModalBody>
            <ModalTitle>T</ModalTitle>
          </ModalBody>
        </ModalContent>
      </ModalRoot>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Close dismisses", () => {
    render(
      <ModalRoot defaultOpen>
        <ModalContent size="sm">
          <ModalFooter>
            <ModalClose />
          </ModalFooter>
        </ModalContent>
      </ModalRoot>,
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
