import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  ReactNode,
} from "react";
import { BaseProps, InteractiveProps } from "../../core/types/common";
import { ColorName, ShadowKey, SizeKey } from "../theme/tokens";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link" | "destructive";
export type LoaderPosition = "left" | "right" | "center";

export interface ButtonPolymorphicProps {
  /** Render as another element (for example `Link` from React Router or `"a"`). */
  as?: ElementType;
  /** Shortcut for `w="100%"`. */
  fullWidth?: boolean;
  /** Announced politely while `isLoading` when combined with `aria-live`. */
  loadingText?: string;
  /** Sets `aria-pressed` for toggle-style controls. */
  pressed?: boolean;
  /** Font size for icon and loader slots (SVG icons from react-icons inherit `em` sizing). */
  iconSize?: number | string;
}

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
  loader?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/** Attributes often needed when `as="a"` or `as={Link}` (add router-specific props via assertion if needed). */
export type ButtonAnchorPassthrough = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel" | "download" | "referrerPolicy" | "hrefLang" | "ping"
>;

export interface ButtonProps
  extends BaseProps,
    InteractiveProps,
    ButtonStyleProps,
    ButtonContentProps,
    ButtonPolymorphicProps,
    ButtonAnchorPassthrough,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      | "color"
      | "style"
      | "onClick"
      | "onMouseEnter"
      | "onMouseLeave"
      | "onFocus"
      | "onBlur"
    > {
  children: ReactNode;
}
