import type { CSSProperties, ReactNode } from "react";
import type { SpacingProps } from "../../types/spacing";
import type { TextSizeKey } from "../theme/tokens";

export type TextAsProp =
  | "p"
  | "span"
  | "div"
  | "label"
  | "strong"
  | "em"
  | "small";

export interface TextProps extends SpacingProps {
  /** Host element (default: paragraph). */
  as?: TextAsProp;
  /** `sizes.text` scale via `themeToken`. */
  size?: TextSizeKey;
  fontWeight?: CSSProperties["fontWeight"];
  lineHeight?: CSSProperties["lineHeight"];
  /** Single-line truncation with ellipsis. */
  truncate?: boolean;
  /** `text-wrap: balance` where the browser supports it. */
  balance?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** For `as="label"` — association with an input field. */
  htmlFor?: string;
}
