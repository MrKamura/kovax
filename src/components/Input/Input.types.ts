import { InputHTMLAttributes } from "react";
import { SpacingProps } from "../../types/spacing";
import { ColorName } from "../theme/tokens";

export interface InputProps 
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style' | 'color'>,
    SpacingProps {
  // Стилевые пропсы
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  colorScheme?: ColorName;
  
  // Валидационные пропсы
  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  
  // Маска
  mask?: string;
  maskChar?: string;
  
  // Дополнительные пропсы
  'data-testid'?: string;
}