import type { CSSProperties, ReactNode } from "react";
import type { SpacingProps } from "../../types/spacing";

export interface ListItemProps extends SpacingProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
