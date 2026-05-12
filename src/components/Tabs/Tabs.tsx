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
  TabsContentProps,
  TabsIndicatorEdge,
  TabsIndicatorMode,
  TabsListProps,
  TabsOrientation,
  TabsRootProps,
  TabsTriggerProps,
} from "./Tabs.types";

interface TabsRegisterPayload {
  value: string;
  element: HTMLElement | null;
  disabled: boolean;
}

interface TabsContextValue {
  selectedId: string;
  select: (value: string) => void;
  orientation: TabsOrientation;
  baseId: string;
  tabOrder: string[];
  registerTrigger: (payload: TabsRegisterPayload) => void;
  triggerRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  disabledRef: React.MutableRefObject<Set<string>>;
  indicator: TabsIndicatorMode;
  indicatorEdge: TabsIndicatorEdge;
  indicatorTransitionMs: number;
  panelTransitionMs?: number;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsCtx(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used within Tabs.Root`);
  return ctx;
}

function sanitizeIdPart(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, "-");
}

const INDICATOR_PX = 2;

function coerceIndicatorEdge(
  orientation: TabsOrientation,
  edge: TabsIndicatorEdge,
): TabsIndicatorEdge {
  if (orientation === "horizontal") {
    if (edge === "inline-start" || edge === "inline-end") return "bottom";
    return edge;
  }
  if (edge === "bottom" || edge === "top") return "inline-start";
  return edge;
}

function resolveIndicatorEdge(
  orientation: TabsOrientation,
  indicatorPosition: TabsRootProps["indicatorPosition"],
): TabsIndicatorEdge {
  const raw =
    indicatorPosition ?? (orientation === "vertical" ? "inline-start" : "bottom");
  return coerceIndicatorEdge(orientation, raw);
}

export function TabsRoot({
  children,
  defaultValue,
  value: valueProp,
  onValueChange,
  orientation = "horizontal",
  indicator = "line",
  indicatorPosition,
  indicatorTransitionMs = 220,
  panelTransitionMs,
  className,
  style,
  ...rest
}: TabsRootProps) {
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const isControlled = valueProp !== undefined;
  const [tabOrder, setTabOrder] = useState<string[]>([]);
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const disabledRef = useRef<Set<string>>(new Set());
  const baseId = useIdStable();

  const indicatorEdge = resolveIndicatorEdge(orientation, indicatorPosition);

  const selectedId =
    (isControlled ? valueProp : internalValue ?? tabOrder[0]) ?? "";

  const select = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const registerTrigger = useCallback((payload: TabsRegisterPayload) => {
    const { value: v, element, disabled } = payload;
    setTabOrder((prev) => {
      if (element) {
        if (prev.includes(v)) return prev;
        return [...prev, v];
      }
      if (!prev.includes(v)) return prev;
      return prev.filter((x) => x !== v);
    });
    if (element) {
      triggerRefs.current.set(v, element);
      if (disabled) disabledRef.current.add(v);
      else disabledRef.current.delete(v);
    } else {
      triggerRefs.current.delete(v);
      disabledRef.current.delete(v);
    }
  }, []);

  const ctx = useMemo(
    (): TabsContextValue => ({
      selectedId,
      select,
      orientation,
      baseId,
      tabOrder,
      registerTrigger,
      triggerRefs,
      disabledRef,
      indicator,
      indicatorEdge,
      indicatorTransitionMs,
      panelTransitionMs,
    }),
    [
      baseId,
      indicator,
      indicatorEdge,
      indicatorTransitionMs,
      orientation,
      panelTransitionMs,
      registerTrigger,
      select,
      selectedId,
      tabOrder,
    ],
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className={className} style={style} data-tabs-root="" {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/** useId without ':' for safer DOM ids in selectors */
function useIdStable(): string {
  const reactId = React.useId();
  return reactId.replace(/:/g, "");
}

export function TabsList({
  children,
  className,
  style,
  onKeyDown,
  ...rest
}: TabsListProps) {
  const ctx = useTabsCtx("Tabs.List");
  const listRef = useRef<HTMLDivElement>(null);
  const [indicatorGeom, setIndicatorGeom] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: INDICATOR_PX,
    visible: false,
  });

  const updateIndicatorGeom = useCallback(() => {
    const list = listRef.current;
    if (!list || ctx.indicator === "none") {
      setIndicatorGeom((g) => ({ ...g, visible: false }));
      return;
    }
    const trigger = ctx.triggerRefs.current.get(ctx.selectedId);
    if (!trigger) {
      setIndicatorGeom((g) => ({ ...g, visible: false }));
      return;
    }

    const lr = list.getBoundingClientRect();
    const tr = trigger.getBoundingClientRect();
    const sl = list.scrollLeft;
    const st = list.scrollTop;
    const edge = ctx.indicatorEdge;

    if (ctx.orientation === "horizontal") {
      const left = tr.left - lr.left + sl;
      const width = Math.max(0, tr.width);
      if (edge === "bottom") {
        const top = tr.bottom - lr.top + st - INDICATOR_PX;
        setIndicatorGeom({
          left,
          top,
          width,
          height: INDICATOR_PX,
          visible: width > 0,
        });
        return;
      }
      const top = tr.top - lr.top + st;
      setIndicatorGeom({
        left,
        top,
        width,
        height: INDICATOR_PX,
        visible: width > 0,
      });
      return;
    }

    const top = tr.top - lr.top + st;
    const height = Math.max(0, tr.height);
    if (edge === "inline-start") {
      const left = tr.left - lr.left + sl;
      setIndicatorGeom({
        left,
        top,
        width: INDICATOR_PX,
        height,
        visible: height > 0,
      });
      return;
    }
    const left = tr.right - lr.left + sl - INDICATOR_PX;
    setIndicatorGeom({
      left,
      top,
      width: INDICATOR_PX,
      height,
      visible: height > 0,
    });
  }, [
    ctx.indicator,
    ctx.indicatorEdge,
    ctx.orientation,
    ctx.selectedId,
    ctx.triggerRefs,
  ]);

  useLayoutEffect(() => {
    updateIndicatorGeom();
  }, [updateIndicatorGeom, ctx.tabOrder]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || ctx.indicator === "none") return undefined;

    updateIndicatorGeom();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateIndicatorGeom);
      list.addEventListener("scroll", updateIndicatorGeom);
      return () => {
        window.removeEventListener("resize", updateIndicatorGeom);
        list.removeEventListener("scroll", updateIndicatorGeom);
      };
    }

    const ro = new ResizeObserver(() => updateIndicatorGeom());
    ro.observe(list);
    ctx.triggerRefs.current.forEach((el) => {
      ro.observe(el);
    });

    window.addEventListener("resize", updateIndicatorGeom);
    list.addEventListener("scroll", updateIndicatorGeom);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateIndicatorGeom);
      list.removeEventListener("scroll", updateIndicatorGeom);
    };
  }, [ctx.indicator, ctx.tabOrder, updateIndicatorGeom]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    const { orientation, tabOrder, selectedId, select, triggerRefs, disabledRef } = ctx;

    const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
    const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";

    const focused = document.activeElement as HTMLElement | null;
    let idx = tabOrder.findIndex((v) => triggerRefs.current.get(v) === focused);
    if (idx < 0) idx = tabOrder.indexOf(selectedId);

    const step = (from: number, delta: number): string | null => {
      const len = tabOrder.length;
      if (!len) return null;
      let i = from;
      for (let k = 0; k < len; k++) {
        i = (i + delta + len) % len;
        const v = tabOrder[i];
        if (!disabledRef.current.has(v)) return v;
      }
      return null;
    };

    const firstEnabled = (): string | null => {
      for (const v of tabOrder) {
        if (!disabledRef.current.has(v)) return v;
      }
      return null;
    };

    const lastEnabled = (): string | null => {
      for (let i = tabOrder.length - 1; i >= 0; i--) {
        const v = tabOrder[i];
        if (!disabledRef.current.has(v)) return v;
      }
      return null;
    };

    const focusTrigger = (value: string) => {
      const el = triggerRefs.current.get(value);
      el?.focus();
    };

    if (e.key === nextKey) {
      e.preventDefault();
      const next = step(idx, 1);
      if (next) {
        select(next);
        focusTrigger(next);
      }
      return;
    }

    if (e.key === prevKey) {
      e.preventDefault();
      const next = step(idx, -1);
      if (next) {
        select(next);
        focusTrigger(next);
      }
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      const next = firstEnabled();
      if (next) {
        select(next);
        focusTrigger(next);
      }
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      const next = lastEnabled();
      if (next) {
        select(next);
        focusTrigger(next);
      }
    }
  };

  const ms = ctx.indicatorTransitionMs;
  const transitionStyle = `left ${ms}ms cubic-bezier(0.4, 0, 0.2, 1), width ${ms}ms cubic-bezier(0.4, 0, 0.2, 1), top ${ms}ms cubic-bezier(0.4, 0, 0.2, 1), height ${ms}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${Math.min(ms, 160)}ms ease`;

  const listStyle: React.CSSProperties =
    ctx.orientation === "vertical"
      ? {
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 0,
          margin: 0,
          padding: 0,
          listStyle: "none",
          borderRight: `1px solid ${colors.secondary[200]}`,
          alignSelf: "flex-start",
          minWidth: themeToken("spacing.xl"),
          position: ctx.indicator === "line" ? "relative" : undefined,
          ...style,
        }
      : {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 0,
          margin: 0,
          padding: 0,
          listStyle: "none",
          borderBottom: `1px solid ${colors.secondary[200]}`,
          position: ctx.indicator === "line" ? "relative" : undefined,
          ...style,
        };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={ctx.orientation}
      className={className}
      style={listStyle}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
      {ctx.indicator === "line" ? (
        <span
          aria-hidden
          data-tabs-indicator=""
          style={{
            position: "absolute",
            left: indicatorGeom.left,
            top: indicatorGeom.top,
            width: indicatorGeom.width,
            height: indicatorGeom.height,
            backgroundColor: colors.primary[600],
            borderRadius: 1,
            opacity: indicatorGeom.visible ? 1 : 0,
            transition: transitionStyle,
            pointerEvents: "none",
            zIndex: 1,
            boxSizing: "border-box",
          }}
        />
      ) : null}
    </div>
  );
}

export function TabsTrigger({
  value,
  disabled = false,
  children,
  className,
  style,
  type = "button",
  onClick,
  ...rest
}: TabsTriggerProps) {
  const { registerTrigger, select, selectedId, baseId, orientation, indicator } =
    useTabsCtx("Tabs.Trigger");
  const ref = useRef<HTMLButtonElement>(null);
  const safe = sanitizeIdPart(value);
  const tabId = `${baseId}-tab-${safe}`;
  const panelId = `${baseId}-panel-${safe}`;
  const active = selectedId === value && !disabled;

  useLayoutEffect(() => {
    const el = ref.current;
    registerTrigger({ value, element: el, disabled });
    return () => registerTrigger({ value, element: null, disabled: false });
  }, [registerTrigger, value, disabled]);

  const triggerStyle: React.CSSProperties = {
    appearance: "none",
    WebkitAppearance: "none",
    border: "none",
    background: "transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    fontSize: themeToken("text.sm"),
    fontFamily: "inherit",
    lineHeight: 1.4,
    fontWeight: active ? 600 : 500,
    color: active ? colors.primary[700] : colors.secondary[600],
    padding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
    textAlign: orientation === "vertical" ? "left" : "center",
    outline: "none",
    position: "relative",
    zIndex: indicator === "line" ? 2 : undefined,
    ...(indicator === "none"
      ? orientation === "horizontal"
        ? {
            borderBottom: `2px solid ${active ? colors.primary[600] : "transparent"}`,
            marginBottom: "-1px",
          }
        : {
            borderRight: `2px solid ${active ? colors.primary[600] : "transparent"}`,
            marginRight: "-1px",
          }
      : orientation === "horizontal"
        ? {
            borderBottom: "2px solid transparent",
            marginBottom: "-1px",
          }
        : {
            borderRight: "2px solid transparent",
            marginRight: "-1px",
          }),
    ...style,
  };

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      role="tab"
      id={tabId}
      aria-selected={active}
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : active ? 0 : -1}
      data-selected={active ? "" : undefined}
      className={className}
      style={triggerStyle}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented && !disabled) select(value);
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
  style,
  ...rest
}: TabsContentProps) {
  const ctx = useTabsCtx("Tabs.Content");
  const safe = sanitizeIdPart(value);
  const tabId = `${ctx.baseId}-tab-${safe}`;
  const panelId = `${ctx.baseId}-panel-${safe}`;
  const selected = ctx.selectedId === value;
  const panelMs = ctx.panelTransitionMs ?? 0;

  const skipEnterFade = useRef(true);
  const [panelOpacity, setPanelOpacity] = useState(1);

  useLayoutEffect(() => {
    if (!panelMs || !selected) return;
    if (skipEnterFade.current) {
      skipEnterFade.current = false;
      setPanelOpacity(1);
      return;
    }
    setPanelOpacity(0);
    const id = requestAnimationFrame(() => setPanelOpacity(1));
    return () => cancelAnimationFrame(id);
  }, [panelMs, selected, value]);

  const fadeStyle: React.CSSProperties =
    panelMs > 0 && selected
      ? {
          opacity: panelOpacity,
          transition: `opacity ${panelMs}ms ease`,
        }
      : {};

  return (
    <div
      {...rest}
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!selected}
      className={className}
      style={{
        paddingTop: themeToken("spacing.md"),
        outline: "none",
        ...fadeStyle,
        ...style,
      }}
      tabIndex={selected ? 0 : -1}
    >
      {children}
    </div>
  );
}

TabsRoot.displayName = "Tabs.Root";
TabsList.displayName = "Tabs.List";
TabsTrigger.displayName = "Tabs.Trigger";
TabsContent.displayName = "Tabs.Content";

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
