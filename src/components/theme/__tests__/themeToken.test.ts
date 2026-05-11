import {
  baseColors,
  colorToken,
  colors,
  shadows,
  sizes,
  themeToken,
  transitions,
} from "../tokens";

describe("themeToken", () => {
  it("delegates colors to the same values as colorToken", () => {
    expect(themeToken("secondary.200")).toBe(colorToken("secondary.200"));
    expect(themeToken("white")).toBe(baseColors.white);
    expect(themeToken("#abc")).toBe("#abc");
  });

  it("resolves text, spacing, borderRadius", () => {
    expect(themeToken("text.sm")).toBe(sizes.text.sm);
    expect(themeToken("spacing.md")).toBe(sizes.spacing.md);
    expect(themeToken("borderRadius.md")).toBe(sizes.borderRadius.md);
  });

  it("resolves shadow and transition", () => {
    expect(themeToken("shadow.sm")).toBe(shadows.sm);
    expect(themeToken("transition.default")).toBe(transitions.default);
  });

  it("passes through unknown namespaced keys", () => {
    expect(themeToken("shadow.invalid")).toBe("shadow.invalid");
    expect(themeToken("spacing.nope")).toBe("spacing.nope");
  });
});
