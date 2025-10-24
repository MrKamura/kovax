import React from "react";
import { colors, shadows, sizes } from "../theme/tokens";


export type VariantKey = "solid" | "outline" | "ghost" | "link";
export type ColorKey = keyof typeof colors;
export type ShadowKey = keyof typeof shadows;
export type SizeKey = keyof typeof sizes.spacing;
export type LoaderPosition = "left" | "right" | "center";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantKey;
  color?: ColorKey;
  size?: SizeKey | string | number;
  isLoading?: boolean;
  loaderPosition?: LoaderPosition;
  loader?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shadow?: ShadowKey;
  w?: string | number;
  h?: string | number;
  bg?: string;
  textColor?: string;
  borderRadius?: string | number;
  borderColor?: string;
}

