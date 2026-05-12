import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

export type TabsOrientation = "horizontal" | "vertical";

/** Resolved placement of the sliding line indicator. */
export type TabsIndicatorEdge =
  | "bottom"
  | "top"
  | "inline-start"
  | "inline-end";

export type TabsIndicatorMode = "line" | "none";

export interface TabsRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> {
  children: ReactNode;
  /** Controlled selected panel id (must match a `Tabs.Trigger` `value`). */
  value?: string;
  /** Uncontrolled initial selection. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Layout for the tab list and arrow-key navigation. */
  orientation?: TabsOrientation;
  /**
   * `line` — one sliding indicator bar (smooth between tabs).
   * `none` — each trigger draws its own edge (no shared animation).
   */
  indicator?: TabsIndicatorMode;
  /**
   * Where the line sits relative to the **selected** trigger.
   * Horizontal: `bottom` (default) or `top`.
   * Vertical: `inline-start` (default, leading edge) or `inline-end`.
   */
  indicatorPosition?: TabsIndicatorEdge;
  /** Duration (ms) for indicator position/size transitions. */
  indicatorTransitionMs?: number;
  /** When set, the active panel fades in after each switch (ms). */
  panelTransitionMs?: number;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export interface TabsTriggerProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> {
  value: string;
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}
