import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../ThemeProvider";
import { useColorMode } from "../useColorMode";

function ColorModeProbe() {
  const { colorMode, resolvedColorMode, setColorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <p data-testid="mode">{colorMode}</p>
      <p data-testid="resolved">{resolvedColorMode}</p>
      <button type="button" onClick={() => setColorMode("light")}>set light</button>
      <button type="button" onClick={() => setColorMode("dark")}>set dark</button>
      <button type="button" onClick={toggleColorMode}>toggle</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-kovax-theme");
  });

  it("flips data-kovax-theme on documentElement", async () => {
    render(
      <ThemeProvider defaultColorMode="light" storageKey={false}>
        <ColorModeProbe />
      </ThemeProvider>,
    );

    expect(document.documentElement.getAttribute("data-kovax-theme")).toBe("light");

    await userEvent.click(screen.getByText("set dark"));
    expect(document.documentElement.getAttribute("data-kovax-theme")).toBe("dark");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
  });

  it("toggleColorMode swaps light / dark even after starting from system", async () => {
    render(
      <ThemeProvider defaultColorMode="system" storageKey={false}>
        <ColorModeProbe />
      </ThemeProvider>,
    );

    const initiallyDark =
      screen.getByTestId("resolved").textContent === "dark";

    await userEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("resolved").textContent).toBe(initiallyDark ? "light" : "dark");
  });

  it("persists the choice in localStorage when storageKey is set", async () => {
    render(
      <ThemeProvider defaultColorMode="light" storageKey="kovax-test-mode">
        <ColorModeProbe />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByText("set dark"));
    expect(window.localStorage.getItem("kovax-test-mode")).toBe("dark");
  });

  it("injects CSS variables for both palettes", () => {
    const { container } = render(
      <ThemeProvider defaultColorMode="light" storageKey={false}>
        <ColorModeProbe />
      </ThemeProvider>,
    );

    const style = container.querySelector("style[data-kovax-theme-style]");
    expect(style).not.toBeNull();
    const css = style!.textContent ?? "";

    expect(css).toContain("--kx-color-primary-500: #3b82f6");
    expect(css).toContain(`:root[data-kovax-theme="dark"]`);
    expect(css).toContain("--kx-color-primary-500: #60a5fa");
    expect(css).toContain("--kx-spacing-md: 1rem");
  });

  it("supports controlled colorMode", () => {
    function Controlled({ mode }: { mode: "light" | "dark" | "system" }) {
      return (
        <ThemeProvider colorMode={mode} storageKey={false}>
          <ColorModeProbe />
        </ThemeProvider>
      );
    }

    const { rerender } = render(<Controlled mode="light" />);
    expect(document.documentElement.getAttribute("data-kovax-theme")).toBe("light");

    rerender(<Controlled mode="dark" />);
    expect(document.documentElement.getAttribute("data-kovax-theme")).toBe("dark");
  });

  it("useColorMode degrades gracefully without a provider", () => {
    let captured: ReturnType<typeof useColorMode> | null = null;
    function Bare() {
      captured = useColorMode();
      return null;
    }
    render(<Bare />);
    expect(captured!.colorMode).toBe("light");
    expect(captured!.resolvedColorMode).toBe("light");

    expect(() => act(() => captured!.toggleColorMode())).not.toThrow();
  });
});
