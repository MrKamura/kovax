import { InputHTMLAttributes } from "react";
import { SpacingProps } from "../../types/spacing";
import { ColorName } from "../theme/tokens";

export interface InputProps 
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style' | 'color'>,
    SpacingProps {
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  colorScheme?: ColorName;

  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;

  mask?: string;
  maskChar?: string;

  'data-testid'?: string;
}