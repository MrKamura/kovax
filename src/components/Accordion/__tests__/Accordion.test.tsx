import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "../Accordion";

describe("Accordion", () => {
  function panelForTrigger(btn: HTMLElement) {
    const id = btn.getAttribute("aria-controls");
    expect(id).toBeTruthy();
    return document.getElementById(id!) as HTMLElement;
  }

  function BasicSingle() {
    return (
      <Accordion.Root type="single" defaultValue="a">
        <Accordion.Item value="a">
          <Accordion.Trigger>Section A</Accordion.Trigger>
          <Accordion.Content>Content A</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>Section B</Accordion.Trigger>
          <Accordion.Content>Content B</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  }

  it("shows one panel in single mode", async () => {
    const user = userEvent.setup();
    render(<BasicSingle />);

    const btnA = screen.getByRole("button", { name: /section a/i });
    const btnB = screen.getByRole("button", { name: /section b/i });
    const panelA = panelForTrigger(btnA);
    const panelB = panelForTrigger(btnB);

    expect(btnA).toHaveAttribute("aria-expanded", "true");
    expect(btnB).toHaveAttribute("aria-expanded", "false");
    expect(panelA).toHaveAttribute("aria-hidden", "false");
    expect(panelB).toHaveAttribute("aria-hidden", "true");

    await user.click(btnB);
    expect(btnB).toHaveAttribute("aria-expanded", "true");
    expect(btnA).toHaveAttribute("aria-expanded", "false");
    expect(panelB).toHaveAttribute("aria-hidden", "false");
    expect(panelA).toHaveAttribute("aria-hidden", "true");
  });

  it("collapsible single allows closing the open section", async () => {
    const user = userEvent.setup();
    render(
      <Accordion.Root type="single" defaultValue="a" collapsible>
        <Accordion.Item value="a">
          <Accordion.Trigger>Solo</Accordion.Trigger>
          <Accordion.Content>Inner</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const btn = screen.getByRole("button", { name: /solo/i });
    const panel = panelForTrigger(btn);

    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("aria-hidden", "true");
  });

  it("supports multiple independent sections", async () => {
    const user = userEvent.setup();
    render(
      <Accordion.Root type="multiple" defaultValue={["x"]}>
        <Accordion.Item value="x">
          <Accordion.Trigger>X</Accordion.Trigger>
          <Accordion.Content>Px</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="y">
          <Accordion.Trigger>Y</Accordion.Trigger>
          <Accordion.Content>Py</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );

    const btnX = screen.getByRole("button", { name: "X" });
    const btnY = screen.getByRole("button", { name: "Y" });
    const panelX = panelForTrigger(btnX);
    const panelY = panelForTrigger(btnY);

    expect(panelX).toHaveAttribute("aria-hidden", "false");
    expect(panelY).toHaveAttribute("aria-hidden", "true");

    await user.click(btnY);
    expect(panelX).toHaveAttribute("aria-hidden", "false");
    expect(panelY).toHaveAttribute("aria-hidden", "false");
  });

  it("moves focus between triggers with ArrowDown", async () => {
    const user = userEvent.setup();
    render(<BasicSingle />);

    await user.click(screen.getByRole("button", { name: /section a/i }));
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: /section b/i })).toHaveFocus();
  });

  it("renders default disclosure chevrons", () => {
    render(<BasicSingle />);
    expect(document.querySelectorAll("[data-disclosure-chevron]")).toHaveLength(2);
    expect(document.querySelector("[data-disclosure-chevron] svg")).toBeTruthy();
  });

  it("hides chevron when chevron is null", () => {
    render(
      <Accordion.Root type="single" defaultValue="a">
        <Accordion.Item value="a">
          <Accordion.Trigger chevron={null}>No icon</Accordion.Trigger>
          <Accordion.Content>C</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    expect(document.querySelector("[data-disclosure-chevron]")).toBeNull();
  });

  it("allows nested accordion roots", () => {
    render(
      <Accordion.Root type="single" defaultValue="outer">
        <Accordion.Item value="outer">
          <Accordion.Header>
            <Accordion.Trigger>Outer</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Accordion.Root type="single" defaultValue="inner">
              <Accordion.Item value="inner">
                <Accordion.Header>
                  <Accordion.Trigger>Inner</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>Nested</Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    expect(screen.getByRole("button", { name: /outer/i })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /inner/i })).toHaveAttribute("aria-expanded", "true");
    const innerBtn = screen.getByRole("button", { name: /inner/i });
    expect(panelForTrigger(innerBtn)).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByText("Nested")).toBeTruthy();
  });

  it("applies variant data attribute on root", () => {
    render(
      <Accordion.Root type="single" variant="elevated">
        <Accordion.Item value="z">
          <Accordion.Trigger>Z</Accordion.Trigger>
          <Accordion.Content>c</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    expect(document.querySelector('[data-accordion-root][data-accordion-variant="elevated"]')).toBeTruthy();
  });
});
