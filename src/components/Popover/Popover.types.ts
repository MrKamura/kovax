import type {
  HTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  JSXElementConstructor,
} from "react";

/** Side + alignment along the trigger edge (see Radix-style naming). */
export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface PopoverRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface PopoverTriggerProps {
  children: ReactElement<
    { ref?: Ref<HTMLElement>; onClick?: MouseEventHandler<HTMLElement> },
    string | JSXElementConstructor<unknown>
  >;
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Where the panel anchors relative to the trigger. @default "bottom-start" */
  placement?: PopoverPlacement;
  /** Gap between trigger and panel (px). @default 8 */
  sideOffset?: number;
  /** Match trigger width as minimum width of the panel. @default false */
  sameWidth?: boolean;
  /** @default true */
  closeOnInteractOutside?: boolean;
  /** @default true */
  closeOnEscape?: boolean;
}
