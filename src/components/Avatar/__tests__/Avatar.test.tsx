import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { Avatar } from "../Avatar";

describe("Avatar", () => {
  it("renders initials from name when no src", () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByRole("img", { name: "Jane Doe" })).toHaveTextContent("JD");
  });

  it("renders single-word initials (first two letters)", () => {
    render(<Avatar name="Acme" />);
    expect(screen.getByRole("img", { name: "Acme" })).toHaveTextContent("AC");
  });

  it("renders custom fallback when provided", () => {
    render(<Avatar name="X" fallback={<span data-testid="ico">★</span>} />);
    expect(screen.getByTestId("ico")).toBeInTheDocument();
  });

  it("shows image when src is set", () => {
    const { container } = render(
      <Avatar
        src="https://example.com/photo.png"
        alt="Portrait"
        name="Ignored for img"
      />,
    );
    const img = container.querySelector("img");
    expect(img).toBeTruthy();
    expect(img).toHaveAttribute("alt", "Portrait");
  });

  it("falls back to initials when image fails", async () => {
    const { container } = render(
      <Avatar src="https://invalid.invalid/nope.png" alt="" name="Sam Ray" />,
    );

    const img = container.querySelector("img");
    expect(img).toBeTruthy();

    await act(async () => {
      img!.dispatchEvent(new Event("error", { bubbles: true }));
    });
    expect(await screen.findByRole("img", { name: "Sam Ray" })).toHaveTextContent("SR");
  });
});
