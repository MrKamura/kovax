import React, {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { colors, themeToken } from "../theme/tokens";
import { mergeRefs } from "../../utils/mergeRefs";
import type {
  PopoverContentProps,
  PopoverPlacement,
  PopoverRootProps,
  PopoverTriggerProps,
} from "./Popover.types";

const popoverZ = 10850;

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";

function parsePlacement(p: PopoverPlacement): { side: Side; align: Align } {
  const parts = p.split("-");
  if (parts.length === 1) {
    return { side: parts[0] as Side, align: "center" };
  }
  return { side: parts[0] as Side, align: parts[1] as Align };
}

function computePopoverPosition(
  trigger: DOMRect,
  floating: DOMRect,
  placement: PopoverPlacement,
  gap: number,
): { top: number; left: number } {
  const { side, align } = parsePlacement(placement);
  let top = 0;
  let left = 0;

  switch (side) {
    case "bottom":
      top = trigger.bottom + gap;
      if (align === "start") left = trigger.left;
      else if (align === "end") left = trigger.right - floating.width;
      else left = trigger.left + trigger.width / 2 - floating.width / 2;
      break;
    case "top":
      top = trigger.top - floating.height - gap;
      if (align === "start") left = trigger.left;
      else if (align === "end") left = trigger.right - floating.width;
      else left = trigger.left + trigger.width / 2 - floating.width / 2;
      break;
    case "left":
      left = trigger.left - floating.width - gap;
      if (align === "start") top = trigger.top;
      else if (align === "end") top = trigger.bottom - floating.height;
      else top = trigger.top + trigger.height / 2 - floating.height / 2;
      break;
    case "right":
      left = trigger.right + gap;
      if (align === "start") top = trigger.top;
      else if (align === "end") top = trigger.bottom - floating.height;
      else top = trigger.top + trigger.height / 2 - floating.height / 2;
      break;
    default:
      break;
  }

  const pad = 8;
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  left = clamp(left, pad, Math.max(pad, vw - floating.width - pad));
  top = clamp(top, pad, Math.max(pad, vh - floating.height - pad));
  return { top, left };
}

interface PopoverContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentId: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverCtx(component: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error(`${component} must be used within Popover.Root`);
  return ctx;
}

export function PopoverRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: PopoverRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const triggerRef = useRef<HTMLElement | null>(null);
  const uid = useId().replace(/:/g, "");
  const contentId = `kv-popover-${uid}`;

  const value = useMemo(
    (): PopoverContextValue => ({
      open,
      setOpen,
      triggerRef,
      contentId,
    }),
    [open, setOpen, contentId],
  );

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const ctx = usePopoverCtx("Popover.Trigger");
  const childProps = children.props as {
    ref?: React.Ref<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLElement>;
  };

  return cloneElement(children, {
    ref: mergeRefs(childProps.ref, ctx.triggerRef),
    "aria-expanded": ctx.open,
    "aria-haspopup": "dialog",
    "aria-controls": ctx.open ? ctx.contentId : undefined,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      childProps.onClick?.(e);
      if (!e.defaultPrevented) ctx.setOpen(!ctx.open);
    },
  } as never);
}

export function PopoverContent({
  placement = "bottom-start",
  sideOffset = 8,
  sameWidth = false,
  closeOnInteractOutside = true,
  closeOnEscape = true,
  style,
  className,
  children,
  ...rest
}: PopoverContentProps) {
  const ctx = usePopoverCtx("Popover.Content");
  const floatingRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    const triggerEl = ctx.triggerRef.current;
    const floatEl = floatingRef.current;
    if (!triggerEl || !floatEl || !ctx.open) return;
    const t = triggerEl.getBoundingClientRect();
    const f = floatEl.getBoundingClientRect();
    setCoords(computePopoverPosition(t, f, placement, sideOffset));
  }, [ctx.open, ctx.triggerRef, placement, sideOffset]);

  useLayoutEffect(() => {
    if (!ctx.open || !mounted) return;
    updatePosition();
  }, [ctx.open, mounted, placement, sideOffset, children, updatePosition]);

  useEffect(() => {
    if (!ctx.open) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [ctx.open, updatePosition]);

  useEffect(() => {
    if (!ctx.open || !closeOnInteractOutside) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (ctx.triggerRef.current?.contains(target)) return;
      if (floatingRef.current?.contains(target)) return;
      ctx.setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [ctx, closeOnInteractOutside]);

  useEffect(() => {
    if (!ctx.open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ctx, closeOnEscape]);

  if (!mounted || typeof document === "undefined" || !ctx.open) return null;

  const triggerW = ctx.triggerRef.current?.getBoundingClientRect().width;

  const mergedStyle: React.CSSProperties = {
    position: "fixed",
    top: coords.top,
    left: coords.left,
    zIndex: popoverZ,
    boxSizing: "border-box",
    minWidth: sameWidth && triggerW ? triggerW : undefined,
    maxWidth: "min(calc(100vw - 1rem), 20rem)",
    padding: themeToken("spacing.md"),
    borderRadius: themeToken("borderRadius.md"),
    background: themeToken("white"),
    border: `1px solid ${colors.secondary[200]}`,
    boxShadow: themeToken("shadow.lg"),
    outline: "none",
    ...style,
  };

  return createPortal(
    <div
      ref={floatingRef}
      id={ctx.contentId}
      role="dialog"
      aria-modal="false"
      className={className}
      {...rest}
      style={mergedStyle}
      tabIndex={-1}
    >
      {children}
    </div>,
    document.body,
  );
}

PopoverRoot.displayName = "Popover.Root";
PopoverTrigger.displayName = "Popover.Trigger";
PopoverContent.displayName = "Popover.Content";

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};

/** Same compound API as `Popover` — anchored menus / dropdown panels. */
export const Dropdown = Popover;
