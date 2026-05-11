import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { SpacingProps } from "../../types/spacing";

export interface LinkProps
  extends SpacingProps,
    Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "color" | "children" | "style"
    > {
  /** Open in a new tab + `rel="noopener noreferrer"`. */
  external?: boolean;
  /** Underline link text (enabled by default). */
  underline?: boolean;
  children?: ReactNode;
}
