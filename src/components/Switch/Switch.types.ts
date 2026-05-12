import type { InputHTMLAttributes } from "react";
import type { SpacingProps } from "../../types/spacing";
import type { ColorName } from "../theme/tokens";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "role">,
    SpacingProps {
  size?: "sm" | "md" | "lg";
  colorScheme?: ColorName;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}
