import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { colors, themeToken } from "../theme/tokens";
import type {
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionTriggerProps,
  AccordionType,
  AccordionVariant,
  AccordionSize,
} from "./Accordion.types";
import { DisclosureChevronIcon } from "./DisclosureChevronIcon";
import { useReducedMotion } from "./useReducedMotion";

function sanitizeIdPart(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function useIdStable(): string {
  const reactId = React.useId();
  return reactId.replace(/:/g, "");
}

interface AccordionRegisterPayload {
  value: string;
  element: HTMLElement | null;
}

interface AccordionContextValue {
  type: AccordionType;
  collapsible: boolean;
  baseId: string;
  itemOrder: string[];
  registerTrigger: (payload: AccordionRegisterPayload) => void;
  triggerRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  disabledItemsRef: React.MutableRefObject<Set<string>>;
  toggle: (itemValue: string) => void;
  isOpen: (itemValue: string) => boolean;
  motionDurationMs: number;
  variant: AccordionVariant;
  size: AccordionSize;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionCtx(component: string): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error(`${component} must be used within Accordion.Root`);
  return ctx;
}

const AccordionDisabledContext = createContext<
  ((value: string, disabled: boolean) => void) | null
>(null);

interface AccordionItemContextValue {
  value: string;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemCtx(component: string): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error(`${component} must be used within Accordion.Item`);
  return ctx;
}

function accordionRootChrome(variant: AccordionVariant): React.CSSProperties {
  switch (variant) {
    case "flush":
      return {
        border: "none",
        borderRadius: 0,
        boxShadow: "none",
        background: "transparent",
      };
    case "soft":
      return {
        border: `1px solid ${colors.secondary[200]}`,
        borderRadius: themeToken("borderRadius.md"),
        boxShadow: "none",
        background: colors.secondary[50],
      };
    case "elevated":
      return {
        border: "none",
        borderRadius: themeToken("borderRadius.lg"),
        boxShadow: themeToken("shadow.md"),
        background: themeToken("white"),
      };
    default:
      return {
        border: `1px solid ${colors.secondary[200]}`,
        borderRadius: themeToken("borderRadius.md"),
        boxShadow: "none",
        background: themeToken("white"),
      };
  }
}

function accordionItemDividerColor(variant: AccordionVariant): string {
  return variant === "elevated" ? colors.secondary[100] : colors.secondary[200];
}

function accordionTriggerPadding(size: AccordionSize): string {
  switch (size) {
    case "sm":
      return `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`;
    case "lg":
      return `${themeToken("spacing.md")} ${themeToken("spacing.lg")}`;
    default:
      return `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`;
  }
}

function accordionTriggerFontSize(size: AccordionSize): string {
  switch (size) {
    case "sm":
      return themeToken("text.xs");
    case "lg":
      return themeToken("text.base");
    default:
      return themeToken("text.sm");
  }
}

function accordionContentFontSize(size: AccordionSize): string {
  switch (size) {
    case "sm":
      return themeToken("text.xs");
    case "lg":
      return themeToken("text.base");
    default:
      return themeToken("text.sm");
  }
}

function accordionContentPadding(size: AccordionSize): string {
  switch (size) {
    case "sm":
      return `${themeToken("spacing.xs")} ${themeToken("spacing.sm")} ${themeToken("spacing.sm")}`;
    case "lg":
      return `${themeToken("spacing.sm")} ${themeToken("spacing.md")} ${themeToken("spacing.md")}`;
    default:
      return `${themeToken("spacing.sm")} ${themeToken("spacing.md")} ${themeToken("spacing.md")}`;
  }
}

function accordionTriggerBackground(variant: AccordionVariant, open: boolean): string {
  if (!open) return themeToken("white");
  switch (variant) {
    case "soft":
      return colors.primary[50];
    case "elevated":
      return colors.secondary[100];
    default:
      return colors.secondary[50];
  }
}

function normalizeDefaultValue(
  type: AccordionType,
  raw: string | string[] | undefined,
): string | undefined | string[] {
  if (type === "multiple") {
    if (Array.isArray(raw)) return [...raw];
    if (raw === undefined) return [];
    return [raw];
  }
  if (raw === undefined) return undefined;
  return Array.isArray(raw) ? raw[0] : raw;
}

export function AccordionRoot({
  children,
  type = "single",
  collapsible = false,
  value: valueProp,
  defaultValue,
  onValueChange,
  className,
  style,
  variant = "bordered",
  size = "md",
  motionDurationMs = 200,
  ...rest
}: AccordionRootProps) {
  const baseId = useIdStable();
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const disabledItemsRef = useRef<Set<string>>(new Set());
  const [itemOrder, setItemOrder] = useState<string[]>([]);

  const normalizedDefault = normalizeDefaultValue(type, defaultValue);
  const [internalValue, setInternalValue] = useState<string | undefined | string[]>(
    () => normalizedDefault,
  );

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const setValue = useCallback(
    (next: string | undefined | string[]) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const isOpen = useCallback(
    (itemValue: string): boolean => {
      if (type === "single") return (value as string | undefined) === itemValue;
      return ((value as string[]) ?? []).includes(itemValue);
    },
    [type, value],
  );

  const registerTrigger = useCallback((payload: AccordionRegisterPayload) => {
    const { value: v, element } = payload;
    setItemOrder((prev) => {
      if (element) {
        if (prev.includes(v)) return prev;
        return [...prev, v];
      }
      if (!prev.includes(v)) return prev;
      return prev.filter((x) => x !== v);
    });
    if (element) triggerRefs.current.set(v, element);
    else triggerRefs.current.delete(v);
  }, []);

  const toggle = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        const cur = value as string | undefined;
        if (cur === itemValue) {
          if (collapsible) setValue(undefined);
        } else {
          setValue(itemValue);
        }
        return;
      }
      const arr = [...((value as string[]) ?? [])];
      const i = arr.indexOf(itemValue);
      if (i >= 0) arr.splice(i, 1);
      else arr.push(itemValue);
      setValue(arr);
    },
    [collapsible, setValue, type, value],
  );

  const registerItemDisabled = useCallback((itemValue: string, disabled: boolean) => {
    if (disabled) disabledItemsRef.current.add(itemValue);
    else disabledItemsRef.current.delete(itemValue);
  }, []);

  const ctx = useMemo(
    (): AccordionContextValue => ({
      type,
      collapsible,
      baseId,
      itemOrder,
      registerTrigger,
      triggerRefs,
      disabledItemsRef,
      toggle,
      isOpen,
      motionDurationMs,
      variant,
      size,
    }),
    [
      baseId,
      collapsible,
      isOpen,
      itemOrder,
      motionDurationMs,
      registerTrigger,
      size,
      toggle,
      type,
      variant,
    ],
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <AccordionDisabledContext.Provider value={registerItemDisabled}>
        <div
          className={className}
          style={{
            overflow: "hidden",
            ...accordionRootChrome(variant),
            ...style,
          }}
          data-accordion-root=""
          data-accordion-variant={variant}
          data-accordion-size={size}
          {...rest}
        >
          {children}
        </div>
      </AccordionDisabledContext.Provider>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  disabled = false,
  children,
  className,
  style,
  ...rest
}: AccordionItemProps) {
  const registerItemDisabled = useContext(AccordionDisabledContext);
  const { variant } = useAccordionCtx("Accordion.Item");

  useLayoutEffect(() => {
    registerItemDisabled?.(value, disabled);
    return () => registerItemDisabled?.(value, false);
  }, [disabled, registerItemDisabled, value]);

  const itemCtx = useMemo((): AccordionItemContextValue => ({ value, disabled }), [value, disabled]);

  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <div
        className={className}
        style={{
          borderBottom: `1px solid ${accordionItemDividerColor(variant)}`,
          ...style,
        }}
        data-accordion-item=""
        {...rest}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionHeader({
  children,
  className,
  style,
  ...rest
}: AccordionHeaderProps) {
  return (
    <div
      className={className}
      style={{
        margin: 0,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function AccordionTrigger({
  children,
  className,
  style,
  type = "button",
  disabled: disabledProp,
  onClick,
  onKeyDown,
  chevron,
  ...rest
}: AccordionTriggerProps) {
  const acc = useAccordionCtx("Accordion.Trigger");
  const item = useAccordionItemCtx("Accordion.Trigger");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const disabled = Boolean(disabledProp || item.disabled);

  const triggerId = `${acc.baseId}-trigger-${sanitizeIdPart(item.value)}`;
  const contentId = `${acc.baseId}-content-${sanitizeIdPart(item.value)}`;
  const open = acc.isOpen(item.value);

  const motionMs = reduced ? 0 : acc.motionDurationMs;
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

  const { registerTrigger } = acc;

  useLayoutEffect(() => {
    const el = ref.current;
    registerTrigger({ value: item.value, element: el });
    return () => registerTrigger({ value: item.value, element: null });
  }, [registerTrigger, item.value]);

  const focusNeighbor = (delta: number) => {
    const order = acc.itemOrder.filter((v) => !acc.disabledItemsRef.current.has(v));
    const idx = order.indexOf(item.value);
    if (idx < 0) return;
    const len = order.length;
    if (!len) return;
    const nextIdx = (idx + delta + len) % len;
    const nextVal = order[nextIdx];
    acc.triggerRefs.current.get(nextVal)?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || disabled) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      focusNeighbor(1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      focusNeighbor(-1);
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      e.stopPropagation();
      const order = acc.itemOrder.filter((v) => !acc.disabledItemsRef.current.has(v));
      const first = order[0];
      if (first) acc.triggerRefs.current.get(first)?.focus();
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      e.stopPropagation();
      const order = acc.itemOrder.filter((v) => !acc.disabledItemsRef.current.has(v));
      const last = order[order.length - 1];
      if (last) acc.triggerRefs.current.get(last)?.focus();
    }
  };

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      id={triggerId}
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      className={className}
      data-state={open ? "open" : "closed"}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: themeToken("spacing.sm"),
        padding: accordionTriggerPadding(acc.size),
        fontSize: accordionTriggerFontSize(acc.size),
        fontFamily: "inherit",
        fontWeight: 600,
        lineHeight: 1.4,
        color: colors.secondary[800],
        background: accordionTriggerBackground(acc.variant, open),
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "left",
        outline: "none",
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented && !disabled) acc.toggle(item.value);
      }}
    >
      <span
        style={{
          flex: 1,
          minWidth: 0,
          textAlign: "inherit",
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

export function AccordionContent({
  children,
  className,
  style,
  ...rest
}: AccordionContentProps) {
  const acc = useAccordionCtx("Accordion.Content");
  const item = useAccordionItemCtx("Accordion.Content");
  const reduced = useReducedMotion();
  const safe = sanitizeIdPart(item.value);
  const triggerId = `${acc.baseId}-trigger-${safe}`;
  const contentId = `${acc.baseId}-content-${safe}`;
  const open = acc.isOpen(item.value);

  const motionMs = reduced ? 0 : acc.motionDurationMs;
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
            padding: accordionContentPadding(acc.size),
            fontSize: accordionContentFontSize(acc.size),
            color: colors.secondary[700],
            lineHeight: 1.55,
            background: themeToken("white"),
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

AccordionRoot.displayName = "Accordion.Root";
AccordionItem.displayName = "Accordion.Item";
AccordionHeader.displayName = "Accordion.Header";
AccordionTrigger.displayName = "Accordion.Trigger";
AccordionContent.displayName = "Accordion.Content";

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
