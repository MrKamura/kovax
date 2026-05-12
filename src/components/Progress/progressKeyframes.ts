/** Injected once — indeterminate linear bar motion (no Tailwind). */
const LINEAR_NAME = "kv-progress-linear-indeterminate";
const LINEAR_ATTR = "data-kv-progress-linear-indeterminate-kf";

/** Injected once — indeterminate circular rotation. */
const CIRCULAR_NAME = "kv-progress-circular-indeterminate";
const CIRCULAR_ATTR = "data-kv-progress-circular-indeterminate-kf";

export function ensureLinearIndeterminateKeyframes(): void {
  if (typeof document === "undefined") return;
  if (document.head.querySelector(`style[${LINEAR_ATTR}]`)) return;
  const style = document.createElement("style");
  style.setAttribute(LINEAR_ATTR, "true");
  style.textContent = `@keyframes ${LINEAR_NAME}{
    0%{transform:translateX(-120%)}
    50%{transform:translateX(45%)}
    100%{transform:translateX(220%)}
  }`;
  document.head.appendChild(style);
}

export function ensureCircularIndeterminateKeyframes(): void {
  if (typeof document === "undefined") return;
  if (document.head.querySelector(`style[${CIRCULAR_ATTR}]`)) return;
  const style = document.createElement("style");
  style.setAttribute(CIRCULAR_ATTR, "true");
  style.textContent = `@keyframes ${CIRCULAR_NAME}{
    0%{transform:rotate(-90deg)}
    100%{transform:rotate(270deg)}
  }`;
  document.head.appendChild(style);
}

export const LINEAR_INDETERMINATE_ANIMATION = `${LINEAR_NAME} 1.35s ease-in-out infinite`;
export const CIRCULAR_INDETERMINATE_ANIMATION = `${CIRCULAR_NAME} 1s linear infinite`;
