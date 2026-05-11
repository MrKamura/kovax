/**
 * Resolved CSS value for an element (use kebab-case names, e.g. `flex-direction`).
 * Works in Jest jsdom and the browser.
 */
export function getComputedStyleProperty(
  element: HTMLElement,
  property: string
): string {
  return window.getComputedStyle(element).getPropertyValue(property);
}
