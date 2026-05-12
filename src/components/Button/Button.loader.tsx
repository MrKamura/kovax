import React from "react";

/** Injected once — avoids relying on Tailwind’s `animate-spin` (not bundled with Kovax). */
const KEYFRAME_NAME = "kv-button-spinner-rotate";
const STYLE_ATTR = "data-kv-button-spinner-keyframes";

function ensureSpinnerKeyframes(): void {
  if (typeof document === "undefined") return;
  if (document.head.querySelector(`style[${STYLE_ATTR}]`)) return;
  const style = document.createElement("style");
  style.setAttribute(STYLE_ATTR, "true");
  style.textContent = `@keyframes ${KEYFRAME_NAME}{to{transform:rotate(360deg)}}`;
  document.head.appendChild(style);
}

interface LoaderProps {
  size?: number | string;
  color?: string;
}

export const DefaultLoader: React.FC<LoaderProps> = ({
  size = "1em",
  color = "currentColor",
}) => {
  ensureSpinnerKeyframes();

  return (
    <svg
      aria-hidden
      data-testid="kv-default-button-loader"
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        verticalAlign: "middle",
        animation: `${KEYFRAME_NAME} 0.75s linear infinite`,
      }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
        opacity={0.25}
      />
      <path
        fill={color}
        opacity={0.75}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
};
