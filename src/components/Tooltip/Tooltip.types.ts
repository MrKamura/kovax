import type {
  FocusEventHandler,
  JSXElementConstructor,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
} from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipTriggerProps = {
  ref?: Ref<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  "aria-describedby"?: string;
};

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement<TooltipTriggerProps, string | JSXElementConstructor<unknown>>;
  placement?: TooltipPlacement;
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
  id?: string;
}
