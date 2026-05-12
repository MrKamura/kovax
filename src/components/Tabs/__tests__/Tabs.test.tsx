import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "../Tabs";

describe("Tabs", () => {
  function BasicTabs(props: { defaultValue?: string; orientation?: "horizontal" | "vertical" }) {
    const { defaultValue = "a", orientation } = props;
    return (
      <Tabs.Root defaultValue={defaultValue} orientation={orientation}>
        <Tabs.List>
          <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
          <Tabs.Trigger value="b">Bravo</Tabs.Trigger>
          <Tabs.Trigger value="c">Charlie</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Panel A</Tabs.Content>
        <Tabs.Content value="b">Panel B</Tabs.Content>
        <Tabs.Content value="c">Panel C</Tabs.Content>
      </Tabs.Root>
    );
  }

  it("shows the selected panel and switches on click", async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);

    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Alpha" })).toBeVisible();
    expect(screen.getByText("Panel B")).not.toBeVisible();

    await user.click(screen.getByRole("tab", { name: "Bravo" }));
    expect(screen.getByRole("tab", { name: "Bravo" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Panel B")).toBeVisible();
    expect(screen.getByText("Panel A")).not.toBeVisible();
  });

  it("navigates with arrow keys and Home / End", async () => {
    const user = userEvent.setup();
    render(<BasicTabs />);

    await user.click(screen.getByRole("tab", { name: "Alpha" }));
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Bravo" })).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Charlie" })).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute("aria-selected", "true");
  });

  it("skips disabled tabs when navigating with arrows", async () => {
    const user = userEvent.setup();
    render(
      <Tabs.Root defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
          <Tabs.Trigger value="b" disabled>
            Bravo
          </Tabs.Trigger>
          <Tabs.Trigger value="c">Charlie</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Panel A</Tabs.Content>
        <Tabs.Content value="b">Panel B</Tabs.Content>
        <Tabs.Content value="c">Panel C</Tabs.Content>
      </Tabs.Root>,
    );

    await user.click(screen.getByRole("tab", { name: "Alpha" }));
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Charlie" })).toHaveAttribute("aria-selected", "true");
  });

  it("supports controlled value", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [val, setVal] = React.useState("b");
      return (
        <>
          <Tabs.Root value={val} onValueChange={setVal}>
            <Tabs.List>
              <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
              <Tabs.Trigger value="b">Bravo</Tabs.Trigger>
              <Tabs.Trigger value="c">Charlie</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="a">Panel A</Tabs.Content>
            <Tabs.Content value="b">Panel B</Tabs.Content>
            <Tabs.Content value="c">Panel C</Tabs.Content>
          </Tabs.Root>
          <button type="button" onClick={() => setVal("c")}>
            Select Charlie
          </button>
        </>
      );
    }

    render(<Harness />);

    expect(screen.getByRole("tab", { name: "Bravo" })).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByRole("button", { name: "Select Charlie" }));
    expect(screen.getByRole("tab", { name: "Charlie" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Panel C")).toBeVisible();
  });

  it("renders a sliding line indicator by default", () => {
    render(<BasicTabs />);
    expect(document.querySelector("[data-tabs-indicator]")).toBeTruthy();
  });

  it("omits the sliding indicator when indicator is none", () => {
    render(
      <Tabs.Root defaultValue="a" indicator="none">
        <Tabs.List>
          <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
          <Tabs.Trigger value="b">Bravo</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">A</Tabs.Content>
        <Tabs.Content value="b">B</Tabs.Content>
      </Tabs.Root>,
    );
    expect(document.querySelector("[data-tabs-indicator]")).toBeNull();
  });

  it("uses vertical arrows when orientation is vertical", async () => {
    const user = userEvent.setup();
    render(<BasicTabs orientation="vertical" />);

    await user.click(screen.getByRole("tab", { name: "Alpha" }));
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("tab", { name: "Bravo" })).toHaveAttribute("aria-selected", "true");
  });
});
