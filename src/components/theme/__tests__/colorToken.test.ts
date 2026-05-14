import { baseColors, colorToken, colors } from "../tokens";

describe("colorToken", () => {
  it("returns a CSS variable with palette hex fallback", () => {
    expect(colorToken("secondary.200")).toBe(
      `var(--kx-color-secondary-200, ${colors.secondary[200]})`,
    );
    expect(colorToken("primary.500")).toBe(
      `var(--kx-color-primary-500, ${colors.primary[500]})`,
    );
    expect(colorToken("error.300")).toBe(
      `var(--kx-color-error-300, ${colors.error[300]})`,
    );
  });

  it("returns a CSS variable for white / black with fallback", () => {
    expect(colorToken("white")).toBe(`var(--kx-color-base-white, ${baseColors.white})`);
    expect(colorToken("black")).toBe(`var(--kx-color-base-black, ${baseColors.black})`);
  });

  it("passes through unknown css identifiers", () => {
    expect(colorToken("#fafafa")).toBe("#fafafa");
    expect(colorToken("rgba(0,0,0,.5)")).toBe("rgba(0,0,0,.5)");
    expect(colorToken("nope.999")).toBe("nope.999");
  });
});
