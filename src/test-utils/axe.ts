import { configureAxe, toHaveNoViolations } from "jest-axe";

type AxeOptions = Parameters<ReturnType<typeof configureAxe>>[1];

/** Set on a wrapper when a test intentionally renders a11y-invalid markup. */
export const AXE_SKIP_ATTR = "data-axe-skip";

/**
 * axe instance tuned for isolated jsdom unit tests.
 * `configureAxe` returns a new runner — it does not patch the default export.
 */
export const axe = configureAxe({
  rules: {
    region: { enabled: false },
    "color-contrast": { enabled: false },
  },
});

/**
 * Assert that a DOM subtree has no accessibility violations (jest-axe / axe-core).
 *
 * @example
 * const { container } = render(<Button>Save</Button>);
 * await expectNoAxeViolations(container);
 */
export async function expectNoAxeViolations(
  container: Parameters<typeof axe>[0] = document.body,
  options?: AxeOptions,
): Promise<void> {
  const results = await axe(container, options);
  expect(results).toHaveNoViolations();
}

export { configureAxe, toHaveNoViolations };
