import React, { useCallback, useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/classNames";
import { colors, themeToken, type ColorName } from "../theme/tokens";
import { InputGroupContext } from "./InputGroupContext";

/** Wraps an {@link Input} with addons; shell border tracks focus, ring appears only for `:focus-visible`. */

export interface InputGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Slot before the field (e.g. search icon). */
  leftAddon?: ReactNode;
  /** Slot after the field. */
  rightAddon?: ReactNode;
  /** Matches `<Input colorScheme />` for focus border tint. */
  colorScheme?: ColorName;
  /** Red border when the inner field is invalid. */
  isInvalid?: boolean;
  children: ReactNode;
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup(
  {
    leftAddon,
    rightAddon,
    colorScheme = "primary",
    isInvalid,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const syncFocusVisible = () => {
      const active = document.activeElement;
      setFocusVisible(Boolean(active && el.contains(active) && active.matches(":focus-visible")));
    };

    const onFocusIn = () => {
      setFocused(true);
      requestAnimationFrame(syncFocusVisible);
    };

    const onFocusOut = (ev: FocusEvent) => {
      const next = ev.relatedTarget as Node | null;
      if (next && el.contains(next)) {
        requestAnimationFrame(syncFocusVisible);
        return;
      }
      setFocused(false);
      setFocusVisible(false);
    };

    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const accent = colors[colorScheme][500];
  const borderColor = isInvalid ? colors.error[500] : focused ? accent : colors.secondary[300];

  const ringOuter = isInvalid ? colors.error[500] : accent;
  const focusRing = focusVisible
    ? `0 0 0 2px ${themeToken("white")}, 0 0 0 4px ${ringOuter}`
    : undefined;

  const shellShadow = [focusRing, themeToken("shadow.sm")].filter(Boolean).join(", ");

  return (
    <InputGroupContext.Provider value={true}>
      <div
        ref={setRefs}
        className={cn("kv-input-group", className)}
        style={{
          display: "flex",
          alignItems: "stretch",
          width: "100%",
          border: `1px solid ${borderColor}`,
          borderRadius: themeToken("borderRadius.md"),
          boxShadow: shellShadow,
          overflow: focusVisible ? "visible" : "hidden",
          transition: themeToken("transition.default"),
          background: "transparent",
          ...style,
        }}
        {...rest}
      >
        {leftAddon ?
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: themeToken("spacing.sm"),
              paddingRight: themeToken("spacing.xs"),
              borderRight: `1px solid ${colors.secondary[200]}`,
              color: colors.secondary[500],
              flexShrink: 0,
            }}
          >
            {leftAddon}
          </span>
        : null}
        <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "stretch" }}>{children}</div>
        {rightAddon ?
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: themeToken("spacing.xs"),
              paddingRight: themeToken("spacing.sm"),
              borderLeft: `1px solid ${colors.secondary[200]}`,
              color: colors.secondary[500],
              flexShrink: 0,
            }}
          >
            {rightAddon}
          </span>
        : null}
      </div>
    </InputGroupContext.Provider>
  );
});

InputGroup.displayName = "InputGroup";
