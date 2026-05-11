import type { CSSProperties, ReactNode } from "react";
import type { SpacingProps } from "../../types/spacing";

export interface BlockquoteProps extends SpacingProps {
  /** Attribution text (rendered in `<footer><cite>`). */
  citation?: string;
  /** Source URL (`cite` on `<blockquote>`). */
  cite?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
