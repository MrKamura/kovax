import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../Pagination";
import { getPaginationItems } from "../Pagination.logic";

describe("getPaginationItems", () => {
  it("returns one page when total is one", () => {
    expect(getPaginationItems(1, 1, 1)).toEqual([1]);
  });

  it("inserts ellipses around the current window", () => {
    expect(getPaginationItems(5, 10, 1)).toEqual([
      1,
      "ellipsis",
      4,
      5,
      6,
      "ellipsis",
      10,
    ]);
  });
});

describe("Pagination", () => {
  it("invokes onPageChange when a page button is activated", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(
      <Pagination
        page={5}
        pageCount={10}
        onPageChange={onPageChange}
        aria-label="Catalog pages"
      />,
    );

    await user.click(screen.getByRole("button", { name: /page 6/i }));
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("does not call onPageChange for the active page", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(
      <Pagination page={2} pageCount={5} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByRole("button", { name: /page 2/i }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("marks the current page with aria-current", () => {
    render(<Pagination page={2} pageCount={5} onPageChange={() => undefined} />);
    const current = screen.getByRole("button", { name: /page 2/i });
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders nothing when pageCount is below one", () => {
    const { container } = render(
      <Pagination page={1} pageCount={0} onPageChange={() => undefined} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
