import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { colors, themeToken } from "../theme/tokens";
import { DisclosureChevronIcon } from "../Accordion/DisclosureChevronIcon";
import type {
  CollapsibleContentProps,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleSize,
} from "./Collapsible.types";
import { useReducedMotion } from "../Accordion/useReducedMotion";

interface CollapsibleContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  disabled: boolean;
  baseId: string;
  motionDurationMs: number;
  size: CollapsibleSize;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleCtx(component: string): CollapsibleContextValue {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) throw new Error(`${component} must be used within Collapsible.Root`);
  return ctx;
}

function useIdStable(): string {
  const reactId = React.useId();
  return reactId.replace(/:/g, "");
}

function collapsibleTriggerPadding(size: CollapsibleSize): string {
  switch (size) {
    case "sm":
      return `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`;
    case "lg":
      return `${themeToken("spacing.md")} ${themeToken("spacing.lg")}`;
    default:
      return `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`;
  }
}

function collapsibleFontSize(size: CollapsibleSize): string {
  switch (size) {
    case "sm":
      return themeToken("text.xs");
    case "lg":
      return themeToken("text.base");
    default:
      return themeToken("text.sm");
  }
}

function collapsibleContentPaddingTop(size: CollapsibleSize): string {
  switch (size) {
    case "sm":
      return themeToken("spacing.xs");
    case "lg":
      return themeToken("spacing.md");
    default:
      return themeToken("spacing.sm");
  }
}

export function CollapsibleRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  className,
  style,
  size = "md",
  motionDurationMs = 200,
  ...rest
}: CollapsibleRootProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const baseId = useIdStable();

  const ctx = useMemo(
    (): CollapsibleContextValue => ({
      open,
      setOpen,
      disabled,
      baseId,
      motionDurationMs,
      size,
    }),
    [baseId, disabled, motionDurationMs, open, setOpen, size],
  );

  return (
    <CollapsibleContext.Provider value={ctx}>
      <div className={className} style={style} data-collapsible-root="" data-collapsible-size={size} {...rest}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleTrigger({
  children,
  className,
  style,
  type = "button",
  disabled: disabledProp,
  onClick,
  chevron,
  ...rest
}: CollapsibleTriggerProps) {
  const ctx = useCollapsibleCtx("Collapsible.Trigger");
  const reduced = useReducedMotion();
  const disabled = Boolean(disabledProp || ctx.disabled);
  const triggerId = `${ctx.baseId}-trigger`;
  const contentId = `${ctx.baseId}-content`;
  const open = ctx.open;

  const motionMs = reduced ? 0 : ctx.motionDurationMs;
  const motionSec = motionMs / 1000;

  const showChevron = chevron !== null && chevron !== false;
  const resolvedChevron = chevron === undefined ? <DisclosureChevronIcon /> : chevron;

  const chevronWrap: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: motionMs > 0 ? `transform ${motionSec}s ease` : undefined,
  };

  return (
    <button
      {...rest}
      type={type}
      id={triggerId}
      aria-expanded={ctx.open}
      aria-controls={contentId}
      disabled={disabled}
      className={className}
      data-state={open ? "open" : "closed"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: themeToken("spacing.sm"),
        padding: collapsibleTriggerPadding(ctx.size),
        fontSize: collapsibleFontSize(ctx.size),
        fontFamily: "inherit",
        fontWeight: 500,
        lineHeight: 1.4,
        color: colors.secondary[800],
        background: themeToken("white"),
        border: `1px solid ${colors.secondary[300]}`,
        borderRadius: themeToken("borderRadius.md"),
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented && !disabled) ctx.setOpen(!ctx.open);
      }}
    >
      <span
        style={{
          flex: 1,
          minWidth: 0,
          textAlign: "left",
        }}
      >
        {children}
      </span>
      {showChevron ? (
        <span aria-hidden data-disclosure-chevron="" style={chevronWrap}>
          {resolvedChevron}
        </span>
      ) : null}
    </button>
  );
}

export function CollapsibleContent({
  children,
  className,
  style,
  ...rest
}: CollapsibleContentProps) {
  const ctx = useCollapsibleCtx("Collapsible.Content");
  const reduced = useReducedMotion();
  const triggerId = `${ctx.baseId}-trigger`;
  const contentId = `${ctx.baseId}-content`;
  const open = ctx.open;

  const motionMs = reduced ? 0 : ctx.motionDurationMs;
  const motionSec = motionMs / 1000;

  return (
    <div
      {...rest}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!open}
      className={className}
      style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: motionMs > 0 ? `grid-template-rows ${motionSec}s ease` : undefined,
        outline: "none",
        ...style,
      }}
    >
      <div style={{ overflow: "hidden", minHeight: 0 }}>
        <div
          style={{
            paddingTop: collapsibleContentPaddingTop(ctx.size),
            fontSize: collapsibleFontSize(ctx.size),
            color: colors.secondary[700],
            lineHeight: 1.5,
            outline: "none",
          }}
          tabIndex={open ? 0 : -1}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

CollapsibleRoot.displayName = "Collapsible.Root";
CollapsibleTrigger.displayName = "Collapsible.Trigger";
CollapsibleContent.displayName = "Collapsible.Content";

export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
};
