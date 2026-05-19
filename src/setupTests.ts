/// <reference types="@testing-library/jest-dom/jest-globals" />
import "@testing-library/jest-dom";
import { expectNoAxeViolations, toHaveNoViolations, AXE_SKIP_ATTR } from "./test-utils/axe";

expect.extend(toHaveNoViolations);

afterEach(async () => {
  if (document.body.querySelector(`[${AXE_SKIP_ATTR}]`)) return;
  if (document.body.childElementCount > 0) {
    await expectNoAxeViolations(document.body);
  }
});
