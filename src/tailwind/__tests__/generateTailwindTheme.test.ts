import { generateTailwindThemeCss } from "../generateTailwindTheme";
import { colors } from "../../components/theme/tokens";

describe("generateTailwindThemeCss", () => {
  const css = generateTailwindThemeCss();

  it("uses @theme inline for runtime --kx-* resolution", () => {
    expect(css).toContain("@theme inline {");
  });

  it("maps palette colors to --color-kx-* utilities", () => {
    expect(css).toContain(
      `--color-kx-primary-500: var(--kx-color-primary-500, ${colors.primary[500]});`,
    );
    expect(css).toContain(
      `--color-kx-error-600: var(--kx-color-error-600, ${colors.error[600]});`,
    );
  });

  it("maps spacing and typography tokens", () => {
    expect(css).toContain("--spacing-kx-md: var(--kx-spacing-md, 1rem);");
    expect(css).toContain("--text-kx-sm: var(--kx-text-sm, 0.875rem);");
    expect(css).toContain("--radius-kx-lg: var(--kx-radius-lg, 0.75rem);");
  });

  it("omits comma fallbacks for shadow vars", () => {
    expect(css).toMatch(/--shadow-kx-md: var\(--kx-shadow-md\);/);
  });

  it("maps motion and layering tokens", () => {
    expect(css).toContain(
      "--transition-duration-kx-fast: var(--kx-duration-fast, 120ms);",
    );
    expect(css).toContain(
      "--ease-kx-standard: var(--kx-easing-standard);",
    );
    expect(css).toContain("--z-index-kx-modal: var(--kx-zindex-modal, 1400);");
  });

  it("exports static breakpoint variants", () => {
    expect(css).toContain("--breakpoint-kx-md: 48em;");
  });
});
