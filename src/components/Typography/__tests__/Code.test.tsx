import React from "react";
import { render } from "@testing-library/react";
import { getComputedStyleProperty as css } from "../../../test-utils/computedStyle";
import { Code } from "../Code";

describe("Code", () => {
  it("renders inline code by default", () => {
    const { container } = render(<Code>fn()</Code>);
    const el = container.querySelector("code")!;
    expect(el.tagName).toBe("CODE");
    expect(el.parentElement?.tagName).not.toBe("PRE");
    expect(css(el, "white-space")).not.toBe("pre");
  });

  it("renders block as pre > code", () => {
    const { container } = render(<Code variant="block">{"line\n2"}</Code>);
    const pre = container.querySelector("pre")!;
    expect(pre).toBeTruthy();
    expect(pre.querySelector("code")).toBeTruthy();
    expect(css(pre.querySelector("code")!, "white-space")).toBe("pre");
  });

  it("forwards ref to code when inline", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Code ref={ref}>x</Code>);
    expect(ref.current?.tagName).toBe("CODE");
  });

  it("forwards ref to pre when block", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Code variant="block" ref={ref}>
        x
      </Code>
    );
    expect(ref.current?.tagName).toBe("PRE");
  });
});
