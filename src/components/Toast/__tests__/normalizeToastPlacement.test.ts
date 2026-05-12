import { normalizeToastPlacement } from "../Toast";

describe("normalizeToastPlacement", () => {
  it("maps shorthand aliases to canonical corners / edges", () => {
    expect(normalizeToastPlacement("top")).toBe("top-center");
    expect(normalizeToastPlacement("bottom")).toBe("bottom-center");
    expect(normalizeToastPlacement("bottom-left")).toBe("bottom-start");
    expect(normalizeToastPlacement("bottom-right")).toBe("bottom-end");
    expect(normalizeToastPlacement("top-end")).toBe("top-end");
  });
});
