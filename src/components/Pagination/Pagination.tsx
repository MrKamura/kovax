import React, {
  useCallback,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../../utils/classNames";
import { themeToken } from "../theme/tokens";
import { useReducedMotion } from "../Accordion/useReducedMotion";
import { getPaginationItems } from "./Pagination.logic";
import type { PaginationProps, PaginationVariant } from "./Pagination.types";
import { paginationControlMetrics } from "./Pagination.types";

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  const flip = dir === "right";
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      aria-hidden
      style={{
        display: "block",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <path
        d="M14 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function paginationMotionTransition(reducedMotion: boolean): string {
  const d = themeToken("duration.normal");
  const e = themeToken("easing.standard");
  const base = `background-color ${d} ${e}, color ${d} ${e}, border-color ${d} ${e}, box-shadow ${d} ${e}`;
  return reducedMotion ? base : `${base}, transform ${d} ${e}`;
}

type Interaction = { hover: boolean; pressed: boolean; focused: boolean };

function mergeInteraction(prev: Interaction, patch: Partial<Interaction>): Interaction {
  return { ...prev, ...patch };
}

function controlColors(
  variant: PaginationVariant,
  disabled: boolean,
  active: boolean,
  ix: Interaction,
): Pick<
  CSSProperties,
  "backgroundColor" | "color" | "border" | "borderStyle" | "borderWidth" | "transform" | "boxShadow"
> {
  if (disabled) {
    return {
      backgroundColor: "transparent",
      color: themeToken("secondary.400"),
      border:
        variant === "outline" ? `1px solid ${themeToken("secondary.200")}` : "none",
      transform: "scale(1)",
      borderWidth: variant === "outline" ? 1 : undefined,
      borderStyle: variant === "outline" ? "solid" : undefined,
    };
  }

  const { hover, pressed, focused } = ix;

  const focusRing =
    focused ?
      `0 0 0 2px ${themeToken("white")}, 0 0 0 4px ${themeToken("primary.500")}`
    : undefined;

  const lift =
    active ?
      pressed ?
        "scale(1)"
      : "scale(1.055)"
    : hover ?
      pressed ?
        "scale(0.98)"
      : "scale(1.02)"
    : "scale(1)";

  if (active) {
    if (variant === "outline") {
      return {
        backgroundColor: hover ? themeToken("primary.100") : themeToken("primary.50"),
        color: themeToken("primary.700"),
        border: `1px solid ${themeToken("primary.500")}`,
        borderStyle: "solid",
        borderWidth: 1,
        transform: lift,
        boxShadow: focusRing,
      };
    }
    return {
      backgroundColor:
        hover ? themeToken("primary.600")
        : pressed ? themeToken("primary.700")
        : themeToken("primary.500"),
      color: themeToken("white"),
      border: "none",
      transform: lift,
      boxShadow: focusRing,
    };
  }

  if (variant === "outline") {
    return {
      backgroundColor: hover ? themeToken("secondary.50") : "transparent",
      color: themeToken("secondary.700"),
      border: `1px solid ${themeToken("secondary.200")}`,
      borderStyle: "solid",
      borderWidth: 1,
      transform: lift,
      boxShadow: focusRing,
    };
  }

  return {
    backgroundColor: hover ? themeToken("secondary.100") : "transparent",
    color: themeToken("secondary.700"),
    border: "none",
    transform: lift,
    boxShadow: focusRing,
  };
}

type ControlBtnProps = {
  ariaLabel: string;
  disabled?: boolean;
  activeVisual?: boolean;
  variant: PaginationVariant;
  minSize: number;
  fontSize: string;
  transition: string;
  onTrigger: () => void;
  children: ReactNode;
  "aria-current"?: "page" | undefined;
};

function PaginationControlButton({
  ariaLabel,
  disabled,
  activeVisual,
  variant,
  minSize,
  fontSize,
  transition,
  onTrigger,
  children,
  "aria-current": ariaCurrent,
}: ControlBtnProps) {
  const [ix, setIx] = useState<Interaction>({
    hover: false,
    pressed: false,
    focused: false,
  });

  const surface = controlColors(variant, !!disabled, !!activeVisual, ix);

  const style: CSSProperties = {
    ...surface,
    transition,
    appearance: "none",
    WebkitAppearance: "none",
    boxSizing: "border-box",
    minWidth: minSize,
    height: minSize,
    padding: 0,
    margin: 0,
    borderRadius: themeToken("borderRadius.md"),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    fontSize,
    fontWeight: 600,
    lineHeight: 1,
    outline: "none",
    fontFamily: "inherit",
  };

  const fire = () => {
    if (!disabled) onTrigger();
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      disabled={disabled}
      style={style}
      onClick={fire}
      onMouseEnter={() => setIx((s) => mergeInteraction(s, { hover: true }))}
      onMouseLeave={() =>
        setIx((s) => mergeInteraction(s, { hover: false, pressed: false }))
      }
      onMouseDown={() => setIx((s) => mergeInteraction(s, { pressed: true }))}
      onMouseUp={() => setIx((s) => mergeInteraction(s, { pressed: false }))}
      onFocus={() => setIx((s) => mergeInteraction(s, { focused: true }))}
      onBlur={() => setIx((s) => mergeInteraction(s, { focused: false }))}
    >
      {children}
    </button>
  );
}

/**
 * Accessible numeric pagination: previous/next controls, page triggers with
 * ellipsis gaps, and smooth motion aligned with theme tokens (respects
 * `prefers-reduced-motion`).
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      page,
      pageCount,
      onPageChange,
      siblingCount = 1,
      disabled = false,
      size = "md",
      variant = "soft",
      previousLabel,
      nextLabel,
      getPageAriaLabel = (p) => `Page ${p}`,
      previousAriaLabel = "Previous page",
      nextAriaLabel = "Next page",
      ellipsisLabel = "…",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const reducedMotion = useReducedMotion();
    const metrics = paginationControlMetrics(size);
    const transition = useMemo(
      () => paginationMotionTransition(reducedMotion),
      [reducedMotion],
    );

    const safePage = Math.min(Math.max(page, 1), Math.max(pageCount, 1));
    const items = useMemo(
      () => getPaginationItems(safePage, pageCount, siblingCount),
      [safePage, pageCount, siblingCount],
    );

    const rootId = useId();
    const itemSuffix = rootId.replace(/:/g, "");

    const go = useCallback(
      (next: number) => {
        const clamped = Math.min(Math.max(next, 1), pageCount);
        if (clamped !== page) onPageChange(clamped);
      },
      [onPageChange, page, pageCount],
    );

    if (pageCount < 1) return null;

    const prevDisabled = disabled || safePage <= 1;
    const nextDisabled = disabled || safePage >= pageCount;

    const navStyle: CSSProperties = {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: metrics.gap,
      ...style,
    };

    return (
      <nav
        ref={ref}
        className={cn("kv-pagination", className)}
        style={navStyle}
        aria-label={rest["aria-label"] ?? "Pagination"}
        {...rest}
      >
        <PaginationControlButton
          ariaLabel={previousAriaLabel}
          disabled={prevDisabled}
          variant={variant}
          minSize={metrics.minSize}
          fontSize={metrics.fontSize}
          transition={transition}
          onTrigger={() => go(safePage - 1)}
        >
          {previousLabel ?? <ChevronIcon dir="left" />}
        </PaginationControlButton>

        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: metrics.gap,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {items.map((token, idx) =>
            token === "ellipsis" ?
              <li
                key={`e-${itemSuffix}-${idx}`}
                style={{
                  minWidth: metrics.ellipsisMinWidth,
                  display: "flex",
                  justifyContent: "center",
                  color: themeToken("secondary.500"),
                  fontSize: metrics.fontSize,
                  userSelect: "none",
                }}
              >
                <span aria-hidden>{ellipsisLabel}</span>
              </li>
            : (
              <li key={token}>
                <PaginationControlButton
                  ariaLabel={getPageAriaLabel(token)}
                  aria-current={token === safePage ? "page" : undefined}
                  disabled={disabled}
                  activeVisual={token === safePage}
                  variant={variant}
                  minSize={metrics.minSize}
                  fontSize={metrics.fontSize}
                  transition={transition}
                  onTrigger={() => go(token)}
                >
                  {token}
                </PaginationControlButton>
              </li>
            ),
          )}
        </ul>

        <PaginationControlButton
          ariaLabel={nextAriaLabel}
          disabled={nextDisabled}
          variant={variant}
          minSize={metrics.minSize}
          fontSize={metrics.fontSize}
          transition={transition}
          onTrigger={() => go(safePage + 1)}
        >
          {nextLabel ?? <ChevronIcon dir="right" />}
        </PaginationControlButton>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
