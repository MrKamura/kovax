import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoAxeViolations } from "../../../test-utils";
import { Alert } from "../Alert";

describe("Alert", () => {
  it("renders body with neutral tone by default", async () => {
    const { container } = render(<Alert>Saved locally.</Alert>);
    expect(screen.getByText("Saved locally.")).toBeTruthy();
    expect(screen.getByRole("status")).toHaveAttribute("data-alert-tone", "neutral");
    await expectNoAxeViolations(container);
  });

  it("uses status + polite live region when not assertive", () => {
    render(<Alert>Notice</Alert>);
    const el = screen.getByRole("status");
    expect(el).toHaveAttribute("aria-live", "polite");
  });

  it("uses alert + assertive when assertive", () => {
    render(<Alert assertive>Critical</Alert>);
    const el = screen.getByRole("alert");
    expect(el).toHaveAttribute("aria-live", "assertive");
  });

  it("wires heading id to aria-labelledby", () => {
    render(<Alert heading="Heads up">Details here.</Alert>);
    const region = screen.getByRole("status");
    const labelledBy = region.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    const heading = document.getElementById(labelledBy!);
    expect(heading?.textContent).toBe("Heads up");
  });

  it("hides icon when icon is null", () => {
    const { container } = render(
      <Alert tone="info" icon={null}>
        Text only
      </Alert>,
    );
    expect(container.querySelector("svg")).toBeNull();
  });

  it("calls onDismiss when dismiss is activated", async () => {
    const user = userEvent.setup();
    const fn = jest.fn();
    render(
      <Alert onDismiss={fn} dismissLabel="Close banner">
        Bye
      </Alert>,
    );
    await user.click(screen.getByRole("button", { name: /close banner/i }));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
