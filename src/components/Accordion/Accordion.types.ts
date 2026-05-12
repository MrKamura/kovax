import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type AccordionType = "single" | "multiple";

/** Visual preset for the outer chrome and trigger/content surfaces. */
export type AccordionVariant = "bordered" | "flush" | "soft" | "elevated";

/** Density scale for trigger padding and body typography. */
export type AccordionSize = "sm" | "md" | "lg";

export interface AccordionRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  children: ReactNode;
  type?: AccordionType;
  /** When `type="single"`, clicking the open section closes it (no item expanded). */
  collapsible?: boolean;
  /** Controlled: `string` or `undefined` for single; `string[]` for multiple. */
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | undefined | string[]) => void;
  /** Default `bordered`. */
  variant?: AccordionVariant;
  /** Trigger/body scale; default `md`. */
  size?: AccordionSize;
  /**
   * Chevron rotation + panel height animation duration (ms).
   * Ignored (instant) when `prefers-reduced-motion: reduce` is set.
   */
  motionDurationMs?: number;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Disables this item's trigger */
  disabled?: boolean;
}

export interface AccordionHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Disclosure indicator on the right. Omit for default animated chevron;
   * pass `null` or `false` to hide; pass any React node for a custom icon (inherits rotation).
   */
  chevron?: ReactNode | null | false;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}
