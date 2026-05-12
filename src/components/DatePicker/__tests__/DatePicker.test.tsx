import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "../DatePicker";
import { DateRangePicker } from "../DateRangePicker";

describe("DatePicker", () => {
  it("renders trigger with placeholder", () => {
    render(<DatePicker placeholder="Choose day" />);
    expect(
      screen.getByRole("button", { name: "Choose day" }),
    ).toBeInTheDocument();
  });

  it("shows formatted value when controlled", () => {
    render(
      <DatePicker
        selected={new Date(2025, 0, 15)}
        formatDate={() => "15 Jan 2025"}
        calendarProps={{ defaultMonth: new Date(2025, 0, 1) }}
      />,
    );
    expect(screen.getByRole("button", { name: "15 Jan 2025" })).toBeInTheDocument();
  });

  it("disables trigger when disabled", () => {
    render(<DatePicker placeholder="Pick" disabled />);
    expect(screen.getByRole("button", { name: "Pick" })).toBeDisabled();
  });

  it("datetime variant shows time field and Apply when open", async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        variant="datetime"
        selected={new Date(2026, 3, 10, 14, 30)}
        formatDate={() => "shown"}
      />,
    );
    await user.click(screen.getByRole("button", { name: "shown" }));
    expect(document.querySelector('input[type="time"]')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
  });
});

describe("DateRangePicker", () => {
  it("renders range placeholder", () => {
    render(<DateRangePicker placeholder="Select stay" />);
    expect(
      screen.getByRole("button", { name: "Select stay" }),
    ).toBeInTheDocument();
  });

  it(
    "datetime variant shows two time fields when range complete",
    async () => {
      const user = userEvent.setup();
      render(
        <DateRangePicker
          variant="datetime"
          selected={{
            from: new Date(2026, 4, 1, 9, 0),
            to: new Date(2026, 4, 7, 18, 0),
          }}
          formatRange={() => "range"}
        />,
      );
      await user.click(screen.getByRole("button", { name: "range" }));
      await waitFor(
        () => {
          expect(document.querySelectorAll('input[type="time"]').length).toBe(
            2,
          );
        },
        { timeout: 12000 },
      );
    },
    15000,
  );
});
