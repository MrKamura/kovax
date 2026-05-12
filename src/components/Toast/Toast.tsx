import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { colors, themeToken } from "../theme/tokens";
import { ToastContext } from "./toastContext";
import type {
  ToastContextValue,
  ToastOptions,
  ToastPlacement,
  ToastPlacementCanonical,
  ToastProviderProps,
  ToastSize,
  ToastVariant,
} from "./Toast.types";

const toastLayerZ = 12000;

function genToastId(): string {
  return `kv-toast-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Maps shorthand placements to fixed viewport anchors. */
export function normalizeToastPlacement(placement: ToastPlacement): ToastPlacementCanonical {
  switch (placement) {
    case "top":
      return "top-center";
    case "bottom":
      return "bottom-center";
    case "bottom-left":
      return "bottom-start";
    case "bottom-right":
      return "bottom-end";
    default:
      return placement;
  }
}

interface ToastRecord {
  id: string;
  variant: ToastVariant;
  placement: ToastPlacementCanonical;
  size: ToastSize;
  duration: number;
  persistUntilAction: boolean;
  title?: ToastOptions["title"];
  description?: ToastOptions["description"];
  action?: ToastOptions["action"];
  priority: "polite" | "assertive";
}

function resolvePriority(opts: ToastOptions): "polite" | "assertive" {
  if (opts.priority) return opts.priority;
  return opts.variant === "error" ? "assertive" : "polite";
}

function resolveDurationMs(options: ToastOptions): number {
  if (options.durationSeconds !== undefined) return options.durationSeconds * 1000;
  if (options.duration !== undefined) return options.duration;
  return 5000;
}

function variantSurface(variant: ToastVariant): {
  bg: string;
  border: string;
  titleColor: string;
  descColor: string;
} {
  switch (variant) {
    case "success":
      return {
        bg: colors.success[50],
        border: colors.success[200],
        titleColor: colors.success[900],
        descColor: colors.success[700],
      };
    case "warning":
      return {
        bg: colors.warning[50],
        border: colors.warning[200],
        titleColor: colors.warning[900],
        descColor: colors.warning[800],
      };
    case "error":
      return {
        bg: colors.error[50],
        border: colors.error[200],
        titleColor: colors.error[900],
        descColor: colors.error[700],
      };
    default:
      return {
        bg: themeToken("white"),
        border: colors.secondary[200],
        titleColor: colors.secondary[900],
        descColor: colors.secondary[600],
      };
  }
}

function toastDimensions(size: ToastSize): {
  padding: string;
  titleSize: string;
  descSize: string;
  maxWidth: string;
  dismissBtnPadding: string;
  dismissBtnFont: string;
  actionFont: string;
  actionPadding: string;
} {
  switch (size) {
    case "sm":
      return {
        padding: themeToken("spacing.sm"),
        titleSize: themeToken("text.xs"),
        descSize: themeToken("text.xs"),
        maxWidth: "18rem",
        dismissBtnPadding: `${themeToken("spacing.xs")} ${themeToken("spacing.xs")}`,
        dismissBtnFont: themeToken("text.xs"),
        actionFont: themeToken("text.xs"),
        actionPadding: `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`,
      };
    case "lg":
      return {
        padding: themeToken("spacing.lg"),
        titleSize: themeToken("text.base"),
        descSize: themeToken("text.sm"),
        maxWidth: "28rem",
        dismissBtnPadding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
        dismissBtnFont: themeToken("text.sm"),
        actionFont: themeToken("text.sm"),
        actionPadding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
      };
    default:
      return {
        padding: themeToken("spacing.md"),
        titleSize: themeToken("text.sm"),
        descSize: themeToken("text.sm"),
        maxWidth: "24rem",
        dismissBtnPadding: `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`,
        dismissBtnFont: themeToken("text.xs"),
        actionFont: themeToken("text.sm"),
        actionPadding: `${themeToken("spacing.xs")} ${themeToken("spacing.md")}`,
      };
  }
}

function placementContainerStyle(placement: ToastPlacementCanonical): React.CSSProperties {
  const pad = themeToken("spacing.md");
  const base: React.CSSProperties = {
    position: "fixed",
    zIndex: toastLayerZ,
    display: "flex",
    flexDirection: "column",
    gap: themeToken("spacing.sm"),
    maxWidth: "min(100vw - 2rem, 28rem)",
    pointerEvents: "none",
    boxSizing: "border-box",
  };

  const horizontal = (edge: "start" | "center" | "end"): Partial<React.CSSProperties> => {
    switch (edge) {
      case "start":
        return { left: pad, right: "auto", alignItems: "flex-start" };
      case "center":
        return {
          left: "50%",
          right: "auto",
          transform: "translateX(-50%)",
          alignItems: "stretch",
        };
      case "end":
        return { right: pad, left: "auto", alignItems: "flex-end" };
      default:
        return {};
    }
  };

  if (placement.startsWith("top")) {
    const h = placement.slice("top-".length) as "start" | "center" | "end";
    return {
      ...base,
      top: pad,
      bottom: "auto",
      ...horizontal(h),
      flexDirection: "column",
    };
  }

  const h = placement.slice("bottom-".length) as "start" | "center" | "end";
  return {
    ...base,
    bottom: pad,
    top: "auto",
    ...horizontal(h),
    flexDirection: "column-reverse",
  };
}

function ToastItem({
  record,
  onDismiss,
}: {
  record: ToastRecord;
  onDismiss: (id: string) => void;
}) {
  const surface = variantSurface(record.variant);
  const live = record.priority === "assertive" ? "assertive" : "polite";
  const role = record.priority === "assertive" ? "alert" : "status";
  const dim = toastDimensions(record.size);

  const hideDismiss =
    record.persistUntilAction && Boolean(record.action);
  const timerMs =
    hideDismiss || !Number.isFinite(record.duration) || record.duration <= 0
      ? null
      : record.duration;

  useEffect(() => {
    if (timerMs == null) return undefined;
    const timer = window.setTimeout(() => onDismiss(record.id), timerMs);
    return () => window.clearTimeout(timer);
  }, [timerMs, record.id, onDismiss]);

  return (
    <div
      role={role}
      aria-live={live}
      style={{
        pointerEvents: "auto",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: dim.maxWidth,
        padding: dim.padding,
        borderRadius: themeToken("borderRadius.md"),
        border: `1px solid ${surface.border}`,
        background: surface.bg,
        boxShadow: themeToken("shadow.lg"),
        display: "flex",
        flexDirection: "column",
        gap: themeToken("spacing.xs"),
      }}
    >
      <div style={{ display: "flex", gap: themeToken("spacing.sm"), alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {record.title != null ? (
            <div
              style={{
                margin: 0,
                fontSize: dim.titleSize,
                fontWeight: 600,
                color: surface.titleColor,
                lineHeight: 1.35,
              }}
            >
              {record.title}
            </div>
          ) : null}
          {record.description != null ? (
            <div
              style={{
                marginTop: record.title != null ? themeToken("spacing.xs") : 0,
                fontSize: dim.descSize,
                color: surface.descColor,
                lineHeight: 1.45,
              }}
            >
              {record.description}
            </div>
          ) : null}
        </div>
        {!hideDismiss ? (
          <button
            type="button"
            onClick={() => onDismiss(record.id)}
            aria-label="Dismiss notification"
            style={{
              flexShrink: 0,
              margin: 0,
              padding: dim.dismissBtnPadding,
              border: `1px solid ${surface.border}`,
              borderRadius: themeToken("borderRadius.sm"),
              background: "transparent",
              color: surface.descColor,
              cursor: "pointer",
              fontSize: dim.dismissBtnFont,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        ) : null}
      </div>
      {record.action ? (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: themeToken("spacing.xs") }}>
          <button
            type="button"
            onClick={() => {
              record.action?.onClick();
              onDismiss(record.id);
            }}
            style={{
              padding: dim.actionPadding,
              borderRadius: themeToken("borderRadius.sm"),
              border: "none",
              background: colors.secondary[900],
              color: themeToken("white"),
              cursor: "pointer",
              fontSize: dim.actionFont,
              fontWeight: 500,
            }}
          >
            {record.action.label}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ToastViewport({
  placement,
  toasts,
  onDismiss,
}: {
  placement: ToastPlacementCanonical;
  toasts: ToastRecord[];
  onDismiss: (id: string) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div style={placementContainerStyle(placement)} data-kovax-toast-region={placement}>
      {toasts.map((t) => (
        <ToastItem key={t.id} record={t} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  );
}

export function ToastProvider({
  children,
  placement: providerPlacementProp = "bottom-end",
  limit = 5,
}: ToastProviderProps) {
  const providerPlacement = normalizeToastPlacement(providerPlacementProp);
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const dismissFns = useRef<Map<string, ToastOptions["onDismiss"]>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => {
      const cb = dismissFns.current.get(id);
      dismissFns.current.delete(id);
      cb?.();
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const dismissAll = useCallback(() => {
    setToasts((prev) => {
      prev.forEach((t) => {
        dismissFns.current.get(t.id)?.();
        dismissFns.current.delete(t.id);
      });
      return [];
    });
  }, []);

  const toast = useCallback(
    (options: ToastOptions): string => {
      const id = options.id ?? genToastId();
      const variant = options.variant ?? "default";
      const size = options.size ?? "md";
      const persistUntilAction = options.persistUntilAction ?? false;
      const placement = normalizeToastPlacement(options.placement ?? providerPlacementProp);

      let duration = resolveDurationMs(options);
      if (persistUntilAction && options.action) {
        duration = 0;
      }

      const record: ToastRecord = {
        id,
        title: options.title,
        description: options.description,
        variant,
        placement,
        size,
        duration,
        persistUntilAction,
        action: options.action,
        priority: resolvePriority({ ...options, variant }),
      };

      if (options.onDismiss) {
        dismissFns.current.set(id, options.onDismiss);
      }

      const topStack = placement.startsWith("top");

      setToasts((prev) => {
        const next = topStack ? [record, ...prev] : [...prev, record];
        if (next.length <= limit) return next;
        const overflow = next.length - limit;
        const dropped = topStack ? next.slice(-overflow) : next.slice(0, overflow);
        dropped.forEach((t) => {
          dismissFns.current.get(t.id)?.();
          dismissFns.current.delete(t.id);
        });
        return topStack ? next.slice(0, limit) : next.slice(overflow);
      });

      return id;
    },
    [limit, providerPlacementProp],
  );

  const ctx = useMemo(
    (): ToastContextValue => ({
      toast,
      dismiss,
      dismissAll,
    }),
    [dismiss, dismissAll, toast],
  );

  const placementsInUse = useMemo(() => {
    const seen = new Set<ToastPlacementCanonical>();
    toasts.forEach((t) => seen.add(t.placement));
    return [...seen];
  }, [toasts]);

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {placementsInUse.map((p) => (
        <ToastViewport
          key={p}
          placement={p}
          toasts={toasts.filter((t) => t.placement === p)}
          onDismiss={dismiss}
        />
      ))}
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = "ToastProvider";
