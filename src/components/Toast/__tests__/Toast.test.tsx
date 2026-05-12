import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { ToastProvider } from "../Toast";
import { useToast } from "../useToast";

function ToastHarness({
  onReady,
}: {
  onReady: (api: ReturnType<typeof useToast>) => void;
}) {
  const api = useToast();
  React.useEffect(() => {
    onReady(api);
  }, [api, onReady]);
  return null;
}

describe("Toast", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows a toast and dismiss button removes it", () => {
    let api!: ReturnType<typeof useToast>;
    render(
      <ToastProvider>
        <ToastHarness onReady={(a) => (api = a)} />
      </ToastProvider>,
    );

    act(() => {
      api.toast({ title: "Saved", description: "Your draft is stored." });
    });

    expect(screen.getByText("Saved")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /dismiss notification/i }));
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });

  it("auto-dismisses after duration", () => {
    let api!: ReturnType<typeof useToast>;
    render(
      <ToastProvider>
        <ToastHarness onReady={(a) => (api = a)} />
      </ToastProvider>,
    );

    act(() => {
      api.toast({ title: "Ping", duration: 1000 });
    });
    expect(screen.getByText("Ping")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("Ping")).not.toBeInTheDocument();
  });

  it("dismiss removes by id", () => {
    let api!: ReturnType<typeof useToast>;
    render(
      <ToastProvider>
        <ToastHarness onReady={(a) => (api = a)} />
      </ToastProvider>,
    );

    let id = "";
    act(() => {
      id = api.toast({ title: "One", duration: 60_000 });
    });
    expect(screen.getByText("One")).toBeInTheDocument();

    act(() => {
      api.dismiss(id);
    });
    expect(screen.queryByText("One")).not.toBeInTheDocument();
  });

  it("auto-dismisses using durationSeconds", () => {
    let api!: ReturnType<typeof useToast>;
    render(
      <ToastProvider>
        <ToastHarness onReady={(a) => (api = a)} />
      </ToastProvider>,
    );

    act(() => {
      api.toast({ title: "Sec", durationSeconds: 2 });
    });
    expect(screen.getByText("Sec")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.queryByText("Sec")).not.toBeInTheDocument();
  });

  it("persistUntilAction hides dismiss until action completes", () => {
    let api!: ReturnType<typeof useToast>;
    const onAction = jest.fn();
    render(
      <ToastProvider>
        <ToastHarness onReady={(a) => (api = a)} />
      </ToastProvider>,
    );

    act(() => {
      api.toast({
        title: "Confirm",
        persistUntilAction: true,
        action: { label: "OK", onClick: onAction },
        durationSeconds: 1,
      });
    });

    expect(screen.queryByRole("button", { name: /dismiss notification/i })).not.toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText("Confirm")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^OK$/i }));
    expect(onAction).toHaveBeenCalled();
    expect(screen.queryByText("Confirm")).not.toBeInTheDocument();
  });

  it("throws useToast outside provider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ToastHarness onReady={() => {}} />)).toThrow(
      /useToast must be used within ToastProvider/,
    );
    spy.mockRestore();
  });
});
