import { render, screen } from "@testing-library/react";
import { CircularProgress } from "../CircularProgress";
import { LinearProgress } from "../LinearProgress";

describe("LinearProgress", () => {
  it("exposes progressbar semantics when determinate", () => {
    render(<LinearProgress value={40} max={100} aria-label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("clips value into range for aria-valuenow", () => {
    render(<LinearProgress value={120} max={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("omits aria-valuenow when indeterminate", () => {
    render(<LinearProgress indeterminate aria-label="Busy" />);
    const bar = screen.getByRole("progressbar", { name: "Busy" });
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("respects custom min / max", () => {
    render(<LinearProgress value={5} min={0} max={10} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "5",
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "10",
    );
  });
});

describe("CircularProgress", () => {
  it("exposes progressbar semantics when determinate", () => {
    render(<CircularProgress value={75} aria-label="Score" />);
    const c = screen.getByRole("progressbar", { name: "Score" });
    expect(c).toHaveAttribute("aria-valuenow", "75");
  });

  it("omits aria-valuenow when indeterminate", () => {
    render(<CircularProgress indeterminate />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute(
      "aria-valuenow",
    );
  });

  it("renders svg helper hidden from a11y tree", () => {
    const { container } = render(<CircularProgress value={50} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden");
  });
});
