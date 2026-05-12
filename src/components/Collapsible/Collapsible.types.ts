import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/** Padding / font scale on trigger + body (default `md`). */
export type CollapsibleSize = "sm" | "md" | "lg";

export interface CollapsibleRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "open"
> {
  children: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled initial open */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Disables the trigger */
  disabled?: boolean;
  size?: CollapsibleSize;
  /**
   * Chevron + panel animation duration (ms).
   * Ignored when `prefers-reduced-motion: reduce`.
   */
  motionDurationMs?: number;
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Disclosure indicator on the right. Omit for default animated chevron;
   * pass `null` or `false` to hide; pass any React node for a custom icon (inherits rotation).
   */
  chevron?: ReactNode | null | false;
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {}
