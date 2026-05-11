import { baseColors, colorToken, colors } from "../tokens";

describe("colorToken", () => {
  it("resolves palette.shade", () => {
    expect(colorToken("secondary.200")).toBe(colors.secondary[200]);
    expect(colorToken("primary.500")).toBe(colors.primary[500]);
    expect(colorToken("error.300")).toBe(colors.error[300]);
  });

  it("resolves white/black", () => {
    expect(colorToken("white")).toBe(baseColors.white);
    expect(colorToken("black")).toBe(baseColors.black);
  });

  it("passes through unknown css identifiers", () => {
    expect(colorToken("#fafafa")).toBe("#fafafa");
    expect(colorToken("rgba(0,0,0,.5)")).toBe("rgba(0,0,0,.5)");
    expect(colorToken("nope.999")).toBe("nope.999");
  });
});
