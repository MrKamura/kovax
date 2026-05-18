import type { ReactNode } from "react";

export type PaginationSize = "sm" | "md";
export type PaginationVariant = "soft" | "outline";

export interface PaginationProps extends Omit<
  React.ComponentPropsWithoutRef<"nav">,
  "onChange" | "children"
> {
  /** Current page (1-based). */
  page: number;
  /** Total pages; when `< 1` nothing is rendered. */
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current page (excluding first / last). @default 1 */
  siblingCount?: number;
  disabled?: boolean;
  size?: PaginationSize;
  variant?: PaginationVariant;
  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
  /** Defaults to `(p) => \`Page ${p}\``. */
  getPageAriaLabel?: (page: number) => string;
  /** Previous control accessible name. */
  previousAriaLabel?: string;
  /** Next control accessible name. */
  nextAriaLabel?: string;
  /** Ellipsis character(s); wrapped in a span with `aria-hidden`. */
  ellipsisLabel?: ReactNode;
}

export function paginationControlMetrics(size: PaginationSize): {
  minSize: number;
  fontSize: string;
  gap: string;
  ellipsisMinWidth: number;
} {
  return size === "sm" ?
      {
        minSize: 32,
        fontSize: "0.75rem",
        gap: "0.25rem",
        ellipsisMinWidth: 28,
      }
    : {
        minSize: 38,
        fontSize: "0.875rem",
        gap: "0.35rem",
        ellipsisMinWidth: 32,
      };
}
