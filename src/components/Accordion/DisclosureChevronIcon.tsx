import type { SVGAttributes } from "react";
import { colors } from "../theme/tokens";

/** Down-pointing chevron (rotates with disclosure open state). */
export function DisclosureChevronIcon(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.secondary[500]}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
