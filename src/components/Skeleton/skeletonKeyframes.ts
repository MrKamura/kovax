/** Injected once — Skeleton pulse + shimmer motion (no Tailwind). */
const ATTR = "data-kv-skeleton-keyframes";

export function ensureSkeletonKeyframes(): void {
  if (typeof document === "undefined") return;
  if (document.head.querySelector(`style[${ATTR}]`)) return;
  const style = document.createElement("style");
  style.setAttribute(ATTR, "true");
  style.textContent = `@keyframes kv-skeleton-pulse{
  0%,100%{opacity:1}
  50%{opacity:0.42}
}
@keyframes kv-skeleton-shimmer{
  0%{background-position:200% 0}
  100%{background-position:-200% 0}
}`;
  document.head.appendChild(style);
}
