import type { CSSProperties, ReactNode } from "react";
import type { SpacingProps } from "../../types/spacing";
import type { TextSizeKey } from "../theme/tokens";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends SpacingProps {
  /** Heading level `h1`–`h6` (default `2`). */
  level?: HeadingLevel;
  /** Override font size from `sizes.text` tokens. */
  size?: TextSizeKey;
  /** Override `font-weight`. */
  fontWeight?: CSSProperties["fontWeight"];
  /** Override `line-height`. */
  lineHeight?: CSSProperties["lineHeight"];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
