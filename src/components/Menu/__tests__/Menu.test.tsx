import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Menu } from "../Menu";

describe("Menu", () => {
  it("opens with menu role and focuses first item", async () => {
    render(
      <Menu.Root>
        <Menu.Trigger>
          <button type="button">Actions</button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onSelect={() => {}}>Alpha</Menu.Item>
          <Menu.Item>Beta</Menu.Item>
        </Menu.Content>
      </Menu.Root>,
    );

    fireEvent.click(screen.getByRole("button", { name: /actions/i }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await waitFor(() => {
      const items = screen.getAllByRole("menuitem");
      expect(items[0]).toHaveFocus();
    });
  });

  it("ArrowDown moves focus to next enabled item", async () => {
    render(
      <Menu.Root defaultOpen>
        <Menu.Trigger>
          <button type="button">Open</button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item>One</Menu.Item>
          <Menu.Item disabled>Skip</Menu.Item>
          <Menu.Item>Three</Menu.Item>
        </Menu.Content>
      </Menu.Root>,
    );

    await waitFor(() => {
      expect(screen.getAllByRole("menuitem")[0]).toHaveFocus();
    });

    const menu = screen.getByRole("menu");
    fireEvent.keyDown(menu, { key: "ArrowDown" });

    await waitFor(() => {
      const items = screen.getAllByRole("menuitem");
      expect(items[2]).toHaveFocus();
    });
  });

  it("selecting an item closes the menu", async () => {
    const onSelect = jest.fn();
    render(
      <Menu.Root defaultOpen>
        <Menu.Trigger>
          <button type="button">Open</button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onSelect={onSelect}>Pick me</Menu.Item>
        </Menu.Content>
      </Menu.Root>,
    );

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("menuitem", { name: /pick me/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });
});
