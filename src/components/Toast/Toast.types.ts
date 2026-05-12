import type { ReactNode } from "react";

export type ToastVariant = "default" | "success" | "warning" | "error";

/** Resolved viewport anchor (after normalizing aliases). */
export type ToastPlacementCanonical =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

/**
 * Where to show toasts. Aliases: `top` / `bottom` → centered on that edge;
 * `bottom-left` / `bottom-right` → corners.
 */
export type ToastPlacement =
  | ToastPlacementCanonical
  | "top"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

export type ToastSize = "sm" | "md" | "lg";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  /** Padding / typography scale. @default "md" */
  size?: ToastSize;
  /**
   * Viewport corner / edge for this toast only (defaults to `ToastProvider` placement).
   */
  placement?: ToastPlacement;
  /**
   * Auto-dismiss after this many seconds (converted to ms internally).
   * Takes precedence over `duration` when both are set.
   */
  durationSeconds?: number;
  /**
   * Time until removed (ms). Ignored if `durationSeconds` is set.
   * `0` or `Infinity` → no timer unless `persistUntilAction` applies.
   * @default 5000
   */
  duration?: number;
  /**
   * Do not auto-dismiss and hide the × control until the user clicks **`action`**.
   * If there is no **`action`**, behaves like infinite duration (× stays visible).
   */
  persistUntilAction?: boolean;
  action?: ToastAction;
  /** If omitted, a unique id is generated and returned from `toast()`. */
  id?: string;
  onDismiss?: () => void;
  /** Overrides automatic choice (`error` → assertive). */
  priority?: "polite" | "assertive";
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Default placement when `toast()` omits `placement`. @default "bottom-end" */
  placement?: ToastPlacement;
  /** Drop oldest toasts when the queue exceeds this count. @default 5 */
  limit?: number;
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
