import type { CSSProperties, ReactNode } from "react";
import type { SpacingProps } from "../../types/spacing";
import type { SizeKey } from "../theme/tokens";

export interface ListProps extends SpacingProps {
  /** Ordered list (`<ol>`). */
  ordered?: boolean;
  /** Vertical gap between items (`sizes.spacing` key). */
  spacing?: SizeKey;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
