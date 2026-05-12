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

  /** Shows a trailing clear control when the field has text (hidden when disabled/read-only). */
  clearable?: boolean;
  /** Accessible name for the clear control (localize in your app). */
  clearAriaLabel?: string;
  /** Called after the value is cleared and `onChange` runs. */
  onClear?: () => void;

  /** Renders “current / max” under the field when `maxLength` is set. */
  showCharacterCount?: boolean;

  /**
   * When `true` and `placeholder` is set, renders an animated floating caption from that text:
   * rests in the field like a placeholder, then moves to the top edge and scales down on focus or when there is a value.
   * The native `placeholder` is omitted so only the floating caption is shown.
   */
  floatingLabel?: boolean;

  'data-testid'?: string;
}