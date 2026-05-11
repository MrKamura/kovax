import type { CSSProperties, ReactNode } from "react";
import type { SpacingProps } from "../../types/spacing";
import type { TextSizeKey } from "../theme/tokens";

export interface KbdProps extends SpacingProps {
  /** Text size from the `sizes.text` scale. */
  size?: TextSizeKey;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
