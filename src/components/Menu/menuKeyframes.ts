/** Injected once — menu panel enter animation (no Tailwind). */
const ATTR = "data-kv-menu-keyframes";

export function ensureMenuKeyframes(): void {
  if (typeof document === "undefined") return;
  if (document.head.querySelector(`style[${ATTR}]`)) return;
  const style = document.createElement("style");
  style.setAttribute(ATTR, "true");
  style.textContent = `@keyframes kv-menu-enter{
  from{opacity:0;transform:translateY(-6px) scale(0.98)}
  to{opacity:1;transform:translateY(0) scale(1)}
}`;
  document.head.appendChild(style);
}

/** Compose **`animation`** for **`kv-menu-enter`** using motion tokens. */
export function menuPanelMotionAnimation(durationCss: string, easingCss: string): string {
  return `kv-menu-enter ${durationCss} ${easingCss} both`;
}
