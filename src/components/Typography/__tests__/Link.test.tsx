import React from "react";
import { render, screen } from "@testing-library/react";
import { Link } from "../Link";

describe("Link", () => {
  it("renders anchor with href", () => {
    render(<Link href="/docs">Docs</Link>);
    const a = screen.getByRole("link", { name: "Docs" });
    expect(a).toHaveAttribute("href", "/docs");
  });

  it("sets target and rel when external", () => {
    render(
      <Link href="https://example.com" external>
        Out
      </Link>
    );
    const a = screen.getByRole("link");
    expect(a).toHaveAttribute("target", "_blank");
    expect(a.getAttribute("rel")).toContain("noopener");
    expect(a.getAttribute("rel")).toContain("noreferrer");
  });

  it("merges user rel with external safely", () => {
    render(
      <Link href="https://x.com" external rel="nofollow">
        X
      </Link>
    );
    const rel = screen.getByRole("link").getAttribute("rel")!;
    expect(rel).toContain("nofollow");
    expect(rel).toContain("noopener");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Link href="#" ref={ref}>
        r
      </Link>
    );
    expect(ref.current?.tagName).toBe("A");
  });
});
