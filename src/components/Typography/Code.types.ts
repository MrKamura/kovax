import type { CSSProperties, ReactNode } from "react";
import type { SpacingProps } from "../../types/spacing";
import type { TextSizeKey } from "../theme/tokens";

export interface CodeProps extends SpacingProps {
  /** `inline` — `<code>` only; `block` — `<pre><code>` for multi-line snippets. */
  variant?: "inline" | "block";
  /** Font size (`sizes.text`); block defaults to `sm`. */
  size?: TextSizeKey;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
