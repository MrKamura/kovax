import { InputHTMLAttributes } from "react";
import { colors } from "../theme/tokens";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  colorScheme?: keyof typeof colors;
  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
}

