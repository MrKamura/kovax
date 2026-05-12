import React, {
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { colors, themeToken } from "../theme/tokens";
import { mergeRefs } from "../../utils/mergeRefs";
import type { TooltipPlacement, TooltipProps, TooltipTriggerProps } from "./Tooltip.types";

const tooltipZ = 11000;

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

function computePosition(
  placement: TooltipPlacement,
  trigger: DOMRect,
  tip: DOMRect,
  gap = 8,
): { top: number; left: number } {
  let top = 0;
  let left = 0;
  switch (placement) {
    case "bottom":
      top = trigger.bottom + gap;
      left = trigger.left + trigger.width / 2 - tip.width / 2;
      break;
    case "top":
      top = trigger.top - tip.height - gap;
      left = trigger.left + trigger.width / 2 - tip.width / 2;
      break;
    case "left":
      top = trigger.top + trigger.height / 2 - tip.height / 2;
      left = trigger.left - tip.width - gap;
      break;
    case "right":
      top = trigger.top + trigger.height / 2 - tip.height / 2;
      left = trigger.right + gap;
      break;
    default:
      break;
  }
  const pad = 8;
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  left = clamp(left, pad, Math.max(pad, vw - tip.width - pad));
  top = clamp(top, pad, Math.max(pad, vh - tip.height - pad));
  return { top, left };
}

/**
 * Hover / focus tooltip with portal positioning and `aria-describedby` wiring.
 */
export function Tooltip({
  content,
  children,
  placement = "top",
  openDelay = 400,
  closeDelay = 50,
  disabled,
  id: idProp,
}: TooltipProps) {
  const autoId = useId().replace(/:/g, "");
  const tooltipId = idProp ?? `kv-tip-${autoId}`;
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clearOpenTimer = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
  };

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleShow = () => {
    if (disabled) return;
    clearCloseTimer();
    clearOpenTimer();
    openTimer.current = setTimeout(() => setVisible(true), openDelay);
  };

  const scheduleHide = () => {
    clearOpenTimer();
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setVisible(false), closeDelay);
  };

  useEffect(() => () => {
    clearOpenTimer();
    clearCloseTimer();
  }, []);

  useEffect(() => {
    if (disabled) setVisible(false);
  }, [disabled]);

  useLayoutEffect(() => {
    if (!visible || !triggerRef.current || !floatingRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const f = floatingRef.current.getBoundingClientRect();
    setCoords(computePosition(placement, t, f));
  }, [visible, placement, content]);

  const cp = children.props as TooltipTriggerProps;

  const mergedChild = cloneElement(children, {
    ref: mergeRefs(cp.ref, triggerRef),
    "aria-describedby": visible ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      cp.onMouseEnter?.(e);
      scheduleShow();
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      cp.onMouseLeave?.(e);
      scheduleHide();
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      cp.onFocus?.(e);
      scheduleShow();
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      cp.onBlur?.(e);
      scheduleHide();
    },
  });

  const tip =
    mounted && visible && typeof document !== "undefined" ?
      createPortal(
        <div
          ref={floatingRef}
          id={tooltipId}
          role="tooltip"
          style={{
            position: "fixed",
            top: coords.top,
            left: coords.left,
            zIndex: tooltipZ,
            maxWidth: "min(18rem, calc(100vw - 1rem))",
            padding: `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`,
            borderRadius: themeToken("borderRadius.sm"),
            fontSize: themeToken("text.sm"),
            lineHeight: 1.35,
            color: themeToken("white"),
            backgroundColor: colors.secondary[900],
            boxShadow: themeToken("shadow.md"),
            pointerEvents: "none",
          }}
        >
          {content}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {mergedChild}
      {tip}
    </>
  );
}

Tooltip.displayName = "Tooltip";
