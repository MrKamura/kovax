import { InputHTMLAttributes } from "react";
import { colors } from "../theme/tokens";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  colorScheme?: keyof typeof colors;
  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  mask?: string;
  maskChar?: string;
  // Убрали variant, если он не используется
}