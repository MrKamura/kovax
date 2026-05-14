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

const wrap = (name: string, fallback: string | number): string =>
  `var(${name}, ${fallback})`;

describe("themeToken", () => {
  it("delegates colors to colorToken (var with fallback)", () => {
    expect(themeToken("secondary.200")).toBe(colorToken("secondary.200"));
    expect(themeToken("white")).toBe(`var(--kx-color-base-white, ${baseColors.white})`);
  });

  it("passes through unknown CSS identifiers (no namespace)", () => {
    expect(themeToken("#abc")).toBe("#abc");
  });

  it("wraps text / spacing / borderRadius in CSS variables", () => {
    expect(themeToken("text.sm")).toBe(wrap("--kx-text-sm", sizes.text.sm));
    expect(themeToken("spacing.md")).toBe(wrap("--kx-spacing-md", sizes.spacing.md));
    expect(themeToken("borderRadius.md")).toBe(
      wrap("--kx-radius-md", sizes.borderRadius.md),
    );
  });

  it("wraps shadow and transition in CSS variables", () => {
    expect(themeToken("shadow.sm")).toBe(wrap("--kx-shadow-sm", shadows.sm));
    expect(themeToken("transition.default")).toBe(
      wrap("--kx-transition-default", transitions.default),
    );
  });

  it("resolves extended size scales as CSS variables", () => {
    expect(themeToken("text.2xl")).toBe(wrap("--kx-text-2xl", sizes.text["2xl"]));
    expect(themeToken("spacing.none")).toBe(wrap("--kx-spacing-none", sizes.spacing.none));
    expect(themeToken("borderRadius.2xl")).toBe(
      wrap("--kx-radius-2xl", sizes.borderRadius["2xl"]),
    );
    expect(themeToken("shadow.inner")).toBe(wrap("--kx-shadow-inner", shadows.inner));
  });

  it("wraps typography refinement tokens", () => {
    expect(themeToken("fontWeight.medium")).toBe(
      wrap("--kx-font-weight-medium", fontWeights.medium),
    );
    expect(themeToken("lineHeight.normal")).toBe(
      wrap("--kx-line-height-normal", lineHeights.normal),
    );
    expect(themeToken("letterSpacing.tight")).toBe(
      wrap("--kx-letter-spacing-tight", letterSpacings.tight),
    );
  });

  it("wraps motion and zIndex namespaces; breakpoints stay raw", () => {
    expect(themeToken("duration.fast")).toBe(wrap("--kx-duration-fast", motion.duration.fast));
    expect(themeToken("easing.standard")).toBe(
      wrap("--kx-easing-standard", motion.easing.standard),
    );
    expect(themeToken("zIndex.modal")).toBe(wrap("--kx-zindex-modal", zIndices.modal));
    expect(themeToken("breakpoint.md")).toBe(breakpoints.md);
  });

  it("passes through unknown namespaced keys", () => {
    expect(themeToken("shadow.invalid")).toBe("shadow.invalid");
    expect(themeToken("spacing.nope")).toBe("spacing.nope");
    expect(themeToken("fontWeight.???")).toBe("fontWeight.???");
    expect(themeToken("duration.???")).toBe("duration.???");
    expect(themeToken("zIndex.???")).toBe("zIndex.???");
  });

  it("colors fall back to the static palette hex (parity)", () => {
    expect(themeToken("secondary.200")).toContain(colors.secondary[200]);
    expect(themeToken("primary.500")).toContain(colors.primary[500]);
  });
});
