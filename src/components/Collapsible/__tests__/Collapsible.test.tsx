import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Collapsible } from "../Collapsible";

describe("Collapsible", () => {
  function panelForTrigger(btn: HTMLElement) {
    const id = btn.getAttribute("aria-controls");
    expect(id).toBeTruthy();
    return document.getElementById(id!) as HTMLElement;
  }

  it("toggles open state and updates aria-expanded", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Hidden panel</Collapsible.Content>
      </Collapsible.Root>,
    );

    const btn = screen.getByRole("button", { name: /toggle/i });
    const panel = panelForTrigger(btn);
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("aria-hidden", "true");

    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveAttribute("aria-hidden", "false");
  });

  it("respects controlled open prop", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Collapsible.Root open={open} onOpenChange={setOpen}>
            <Collapsible.Trigger>Go</Collapsible.Trigger>
            <Collapsible.Content>Inside</Collapsible.Content>
          </Collapsible.Root>
          <button type="button" onClick={() => setOpen(true)}>
            Force open
          </button>
        </>
      );
    }

    render(<Harness />);

    const goBtn = screen.getByRole("button", { name: /go/i });
    const panel = panelForTrigger(goBtn);
    expect(panel).toHaveAttribute("aria-hidden", "true");

    await user.click(screen.getByRole("button", { name: /force open/i }));
    expect(goBtn).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveAttribute("aria-hidden", "false");
  });

  it("renders default disclosure chevron", () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Hidden panel</Collapsible.Content>
      </Collapsible.Root>,
    );
    expect(document.querySelector("[data-disclosure-chevron]")).toBeTruthy();
    expect(document.querySelector("[data-disclosure-chevron] svg")).toBeTruthy();
  });

  it("omits chevron when chevron is null", () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger chevron={null}>Plain</Collapsible.Trigger>
        <Collapsible.Content>X</Collapsible.Content>
      </Collapsible.Root>,
    );
    expect(document.querySelector("[data-disclosure-chevron]")).toBeNull();
  });
});
