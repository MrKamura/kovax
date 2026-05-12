import type { SelectHTMLAttributes } from "react";
import type { SpacingProps } from "../../types/spacing";
import type { ColorName } from "../theme/tokens";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "style" | "color">,
    SpacingProps {
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  colorScheme?: ColorName;

  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}
