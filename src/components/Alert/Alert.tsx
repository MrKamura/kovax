import React, { useId } from "react";
import { colors, themeToken } from "../theme/tokens";
import { HStack } from "../Layout/HStack";
import { VStack } from "../Layout/VStack";
import type { AlertProps, AlertTone } from "./Alert.types";

function toneSurfaces(tone: AlertTone): {
  bg: string;
  border: string;
  fg: string;
  fgMuted: string;
  iconFg: string;
} {
  switch (tone) {
    case "info":
      return {
        bg: colors.primary[50],
        border: colors.primary[200],
        fg: colors.primary[900],
        fgMuted: colors.primary[800],
        iconFg: colors.primary[600],
      };
    case "success":
      return {
        bg: colors.success[50],
        border: colors.success[200],
        fg: colors.success[900],
        fgMuted: colors.success[800],
        iconFg: colors.success[600],
      };
    case "warning":
      return {
        bg: colors.warning[50],
        border: colors.warning[200],
        fg: colors.warning[900],
        fgMuted: colors.warning[800],
        iconFg: colors.warning[700],
      };
    case "error":
      return {
        bg: colors.error[50],
        border: colors.error[200],
        fg: colors.error[900],
        fgMuted: colors.error[800],
        iconFg: colors.error[600],
      };
    default:
      return {
        bg: colors.secondary[50],
        border: colors.secondary[200],
        fg: colors.secondary[900],
        fgMuted: colors.secondary[700],
        iconFg: colors.secondary[600],
      };
  }
}

function DefaultIcon({ tone }: { tone: AlertTone }) {
  const stroke = toneSurfaces(tone).iconFg;
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (tone) {
    case "success":
      return (
        <svg {...common}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "warning":
      return (
        <svg {...common}>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "error":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
  }
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    children,
    tone = "neutral",
    heading,
    assertive = false,
    onDismiss,
    dismissLabel = "Dismiss",
    icon,
    className,
    style,
    ...rest
  },
  ref,
) {
  const uid = useId().replace(/:/g, "");
  const headingId = heading != null && heading !== false ? `kovax-alert-h-${uid}` : undefined;
  const surfaces = toneSurfaces(tone);

  const showIcon = icon !== null && icon !== false;
  const resolvedIcon = icon === undefined ? <DefaultIcon tone={tone} /> : icon;

  const role = assertive ? "alert" : "status";
  const live = assertive ? "assertive" : ("polite" as const);

  return (
    <div
      ref={ref}
      role={role}
      aria-live={live}
      aria-labelledby={headingId}
      className={className}
      style={{
        boxSizing: "border-box",
        border: `1px solid ${surfaces.border}`,
        borderRadius: themeToken("borderRadius.md"),
        background: surfaces.bg,
        color: surfaces.fgMuted,
        padding: themeToken("spacing.md"),
        fontSize: themeToken("text.sm"),
        lineHeight: 1.55,
        outline: "none",
        ...style,
      }}
      data-alert-tone={tone}
      {...rest}
    >
      <HStack align="flex-start" gap={themeToken("spacing.sm")} style={{ width: "100%" }}>
        {showIcon ? (
          <span style={{ flexShrink: 0, display: "inline-flex", marginTop: 2 }}>{resolvedIcon}</span>
        ) : null}
        <VStack align="stretch" gap={themeToken("spacing.xs")} style={{ flex: 1, minWidth: 0 }}>
          {heading != null && heading !== false ? (
            <div
              id={headingId}
              style={{
                margin: 0,
                fontWeight: 600,
                color: surfaces.fg,
                fontSize: themeToken("text.sm"),
              }}
            >
              {heading}
            </div>
          ) : null}
          {children != null && children !== false ? (
            <div style={{ color: surfaces.fgMuted }}>{children}</div>
          ) : null}
        </VStack>
        {onDismiss ? (
          <button
            type="button"
            aria-label={dismissLabel}
            onClick={onDismiss}
            style={{
              flexShrink: 0,
              marginTop: -4,
              marginRight: -4,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: surfaces.iconFg,
              borderRadius: themeToken("borderRadius.sm"),
              padding: themeToken("spacing.xs"),
              lineHeight: 1,
              fontSize: themeToken("text.lg"),
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span aria-hidden style={{ position: "relative", top: -1 }}>
              ×
            </span>
          </button>
        ) : null}
      </HStack>
    </div>
  );
});

Alert.displayName = "Alert";
