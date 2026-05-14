import type { HTMLAttributes, ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export type AvatarShape = "circle" | "rounded";

export type AvatarColorScheme =
  | "neutral"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Image URL; when missing or after load error, fallback is shown. */
  src?: string;
  /** Passed to `<img>` when `src` is set; use empty string for decorative photos only. */
  alt?: string;
  /** Used for accessible label and default initials fallback (e.g. `"Jane Doe"` → `JD`). */
  name?: string;
  /** Overrides initials / default placeholder when no image is shown. */
  fallback?: ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  /** Tint for the fallback surface (initials or custom `fallback`). */
  colorScheme?: AvatarColorScheme;
}
