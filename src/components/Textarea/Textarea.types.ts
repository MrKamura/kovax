import type { CSSProperties, TextareaHTMLAttributes } from "react";
import type { SpacingProps } from "../../types/spacing";
import type { ColorName } from "../theme/tokens";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "style" | "color">,
    SpacingProps {
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  colorScheme?: ColorName;

  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;

  /** Renders “current / max” under the field when `maxLength` is set. */
  showCharacterCount?: boolean;

  /**
   * When `true` and `placeholder` is set, renders an animated floating caption from that text.
   * The native `placeholder` is omitted so only the floating caption is shown.
   */
  floatingLabel?: boolean;

  /** Maps to CSS `resize`. Defaults to `vertical` so layout width stays stable. */
  resize?: CSSProperties["resize"];

  "data-testid"?: string;
}
