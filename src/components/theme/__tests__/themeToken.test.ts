import {
  baseColors,
  breakpoints,
  colorToken,
  colors,
  fontWeights,
  letterSpacings,
  lineHeights,
  motion,
  shadows,
  sizes,
  themeToken,
  transitions,
  zIndices,
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

  it("resolves extended size scales", () => {
    expect(themeToken("text.2xl")).toBe(sizes.text["2xl"]);
    expect(themeToken("spacing.none")).toBe(sizes.spacing.none);
    expect(themeToken("borderRadius.2xl")).toBe(sizes.borderRadius["2xl"]);
    expect(themeToken("shadow.2xl")).toBe(shadows["2xl"]);
    expect(themeToken("shadow.inner")).toBe(shadows.inner);
  });

  it("resolves typography refinement tokens", () => {
    expect(themeToken("fontWeight.medium")).toBe(String(fontWeights.medium));
    expect(themeToken("lineHeight.normal")).toBe(String(lineHeights.normal));
    expect(themeToken("letterSpacing.tight")).toBe(letterSpacings.tight);
  });

  it("resolves motion, zIndex, and breakpoint namespaces", () => {
    expect(themeToken("duration.fast")).toBe(motion.duration.fast);
    expect(themeToken("easing.standard")).toBe(motion.easing.standard);
    expect(themeToken("zIndex.modal")).toBe(String(zIndices.modal));
    expect(themeToken("breakpoint.md")).toBe(breakpoints.md);
  });

  it("passes through unknown namespaced keys", () => {
    expect(themeToken("shadow.invalid")).toBe("shadow.invalid");
    expect(themeToken("spacing.nope")).toBe("spacing.nope");
    expect(themeToken("fontWeight.???")).toBe("fontWeight.???");
    expect(themeToken("duration.???")).toBe("duration.???");
    expect(themeToken("zIndex.???")).toBe("zIndex.???");
  });
});
