import type { InputHTMLAttributes } from "react";
import type { SpacingProps } from "../../types/spacing";
import type { ColorName } from "../theme/tokens";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    SpacingProps {
  /** Value submitted with the field; in a `RadioGroup`, becomes the group's selection when chosen. */
  value: string;
  size?: "sm" | "md" | "lg";
  colorScheme?: ColorName;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}
