import React from "react";
import { render, screen } from "@testing-library/react";
import { getComputedStyleProperty as css } from "../../../test-utils/computedStyle";
import { Text } from "../Text";
import { sizes } from "../../theme/tokens";

describe("Text", () => {
  it("renders as paragraph by default", () => {
    render(<Text>Hello</Text>);
    const el = screen.getByText("Hello");
    expect(el.tagName).toBe("P");
  });

  it("renders as span when as=\"span\"", () => {
    render(
      <Text as="span" data-testid="t">
        Inline
      </Text>
    );
    expect(screen.getByTestId("t").tagName).toBe("SPAN");
  });

  it("applies size token as font-size", () => {
    const { container } = render(<Text size="sm">Small</Text>);
    const el = container.firstChild as HTMLElement;
    expect(css(el, "font-size")).toBe(sizes.text.sm);
  });

  it("applies fontWeight and lineHeight", () => {
    const { container } = render(
      <Text fontWeight={600} lineHeight={1.5}>
        Weighted
      </Text>
    );
    const el = container.firstChild as HTMLElement;
    expect(css(el, "font-weight")).toBe("600");
    expect(css(el, "line-height")).toBe("1.5");
  });

  it("applies truncate styles", () => {
    const { container } = render(<Text truncate>Long</Text>);
    const el = container.firstChild as HTMLElement;
    expect(css(el, "overflow")).toBe("hidden");
    expect(css(el, "text-overflow")).toBe("ellipsis");
    expect(css(el, "white-space")).toBe("nowrap");
  });

  it("merges spacing props", () => {
    const { container } = render(
      <Text mb={8} color="rgb(90, 90, 90)">
        Spaced
      </Text>
    );
    const el = container.firstChild as HTMLElement;
    expect(css(el, "margin-bottom")).toBe("8px");
    expect(css(el, "color")).toBe("rgb(90, 90, 90)");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<Text ref={ref}>Ref</Text>);
    expect(ref.current?.tagName).toBe("P");
    expect(ref.current?.textContent).toBe("Ref");
  });

  it("passes label htmlFor to DOM", () => {
    render(
      <Text as="label" htmlFor="field-id">
        Label
      </Text>
    );
    expect(screen.getByText("Label")).toHaveAttribute("for", "field-id");
  });
});
