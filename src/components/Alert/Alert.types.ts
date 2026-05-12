import type { HTMLAttributes, ReactNode } from "react";

export type AlertTone = "info" | "success" | "warning" | "error" | "neutral";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children?: ReactNode;
  /** Visual intent — maps to palette surfaces and icon. Default `neutral`. */
  tone?: AlertTone;
  /**
   * Optional bold line above the body. Named `heading` to avoid clashing with the native HTML `title` tooltip attribute.
   */
  heading?: ReactNode;
  /**
   * Default `false`: `role="status"` and `aria-live="polite"` (inline updates).
   * When `true`: `role="alert"` and `aria-live="assertive"` (interrupting — use sparingly).
   */
  assertive?: boolean;
  /** Renders a dismiss control; typically paired with local state in your app. */
  onDismiss?: () => void;
  /** Accessible label for the dismiss control (when `onDismiss` is set). */
  dismissLabel?: string;
  /**
   * Leading glyph; omit for default icon per tone. Pass `null` or `false` to hide.
   */
  icon?: ReactNode | null | false;
}
