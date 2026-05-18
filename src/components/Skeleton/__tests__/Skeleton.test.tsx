import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders with pulse animation when variant is pulse", () => {
    const { container } = render(<Skeleton variant="pulse" data-testid="sk" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.animation).toContain("kv-skeleton-pulse");
    expect(el.style.backgroundColor).toBeTruthy();
  });

  it("renders shimmer gradient when variant is shimmer", () => {
    const { container } = render(<Skeleton variant="shimmer" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.animation).toContain("kv-skeleton-shimmer");
    expect(el.style.backgroundImage).toContain("linear-gradient");
  });

  it("has no animation when variant is none", () => {
    const { container } = render(<Skeleton variant="none" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.animation).toBe("");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("maps numeric width/height to px", () => {
    const { container } = render(<Skeleton width={120} height={8} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("120px");
    expect(el.style.height).toBe("8px");
  });
});
