import type { HTMLAttributes, ReactNode } from "react";
import type { PopoverContentProps, PopoverRootProps, PopoverTriggerProps } from "../Popover/Popover.types";

export interface MenuRootProps extends PopoverRootProps {}

export interface MenuTriggerProps extends Omit<PopoverTriggerProps, "ariaHasPopup"> {}

export interface MenuContentProps extends Omit<PopoverContentProps, "contentRole"> {
  /**
   * Enter animation (`kv-menu-enter` keyframes + motion tokens).
   * Set **`false`** for reduced-motion parity or instant panels.
   * @default true
   */
  motion?: boolean;
}

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "role" | "tabIndex"> {
  /** Greyed out and skipped by arrow-key focus. */
  disabled?: boolean;
  /** Fires before the menu closes. */
  onSelect?: () => void;
  children?: ReactNode;
}

export interface MenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}
