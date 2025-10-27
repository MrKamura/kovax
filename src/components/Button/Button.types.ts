import { BaseProps, InteractiveProps } from '../../core/types/common';
import { ColorName, ShadowKey, SizeKey } from '../theme/tokens';

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type LoaderPosition = "left" | "right" | "center";

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  color?: ColorName;
  size?: SizeKey | string | number;
  shadow?: ShadowKey;
  w?: string | number;
  h?: string | number;
  bg?: string;
  textColor?: string;
  borderRadius?: string | number;
  borderColor?: string;
}

export interface ButtonContentProps {
  isLoading?: boolean;
  loaderPosition?: LoaderPosition;
  loader?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface ButtonProps 
  extends BaseProps,
    InteractiveProps,
    ButtonStyleProps,
    ButtonContentProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 
      'color' | 
      'style' | 
      'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur' 
    > {
  children: React.ReactNode;
}