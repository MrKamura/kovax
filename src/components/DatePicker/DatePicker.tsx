import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import type { Matcher } from "react-day-picker";
import { Button } from "../Button/Button";
import { HStack } from "../Layout/HStack";
import { VStack } from "../Layout/VStack";
import { Input } from "../Input/Input";
import { Popover } from "../Popover/Popover";
import { colors, themeToken } from "../theme/tokens";
import { dayPickerCssVariables } from "./calendarCssVars";
import type { DatePickerProps } from "./DatePicker.types";
import { applyTimeToDate, extractHHMM } from "./datePickerTimeUtils";

function localeTag(locale: KovaxLocale): string | undefined {
  if (!locale || typeof locale !== "object") return undefined;
  const code = (locale as { code?: string }).code;
  return typeof code === "string" ? code : undefined;
}

type KovaxLocale = NonNullable<DatePickerProps["calendarProps"]>["locale"];

function defaultFormatDateOnly(date: Date, locale: KovaxLocale): string {
  try {
    return new Intl.DateTimeFormat(localeTag(locale), {
      dateStyle: "medium",
    }).format(date);
  } catch {
    return date.toDateString();
  }
}

function defaultFormatDateTime(date: Date, locale: KovaxLocale): string {
  try {
    return new Intl.DateTimeFormat(localeTag(locale), {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  } catch {
    return date.toString();
  }
}

const chevron = (
  <span aria-hidden style={{ fontSize: "0.6rem", opacity: 0.75 }}>
    ▼
  </span>
);

export function DatePicker(props: DatePickerProps) {
  const {
    variant = "date",
    selected,
    defaultSelected,
    onSelect,
    placeholder = "Pick a date",
    formatDate,
    disabled = false,
    colorScheme = "primary",
    disabledDates,
    fullWidth,
    open,
    defaultOpen = false,
    onOpenChange,
    popoverPlacement = "bottom-start",
    calendarProps,
    panelStyle,
    triggerStyle,
    timeRowStyle,
    defaultStartTime = "09:00",
    applyLabel = "Apply",
  } = props;

  const isOpenControlled = Object.prototype.hasOwnProperty.call(props, "open");
  const isSelControlled = Object.prototype.hasOwnProperty.call(
    props,
    "selected",
  );

  const locale = calendarProps?.locale;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const mergedOpen = isOpenControlled ? (open ?? false) : internalOpen;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange],
  );

  const [innerSelected, setInnerSelected] = useState<Date | undefined>(
    defaultSelected,
  );
  const value = isSelControlled ? selected : innerSelected;

  const [startTime, setStartTime] = useState(defaultStartTime);

  useEffect(() => {
    if (variant !== "datetime") return;
    if (value) setStartTime(extractHHMM(value));
    else setStartTime(defaultStartTime);
  }, [variant, value, defaultStartTime]);

  const fmt = useCallback(
    (d: Date) => {
      if (formatDate) return formatDate(d);
      return variant === "datetime"
        ? defaultFormatDateTime(d, locale)
        : defaultFormatDateOnly(d, locale);
    },
    [formatDate, variant, locale],
  );

  const label = value ? fmt(value) : placeholder;

  const mergedDisabled: Matcher | Matcher[] | undefined = disabled
    ? () => true
    : calendarProps?.disabled ?? disabledDates;

  const rootStyle = useMemo(
    () => ({
      ...dayPickerCssVariables(colorScheme),
      color: colors.secondary[900],
      fontSize: "0.875rem",
    }),
    [colorScheme],
  );

  const pushValue = useCallback(
    (d: Date | undefined) => {
      if (!isSelControlled) setInnerSelected(d);
      onSelect?.(d);
    },
    [isSelControlled, onSelect],
  );

  const handleSelect = useCallback(
    (d: Date | undefined) => {
      if (!d) {
        pushValue(undefined);
        if (variant === "date") handleOpenChange(false);
        return;
      }
      const next =
        variant === "datetime" ? applyTimeToDate(d, startTime) : d;
      pushValue(next);
      if (variant === "date") handleOpenChange(false);
    },
    [variant, startTime, pushValue, handleOpenChange],
  );

  const onTimeChange = useCallback(
    (hhmm: string) => {
      setStartTime(hhmm);
      if (!value) return;
      pushValue(applyTimeToDate(value, hhmm));
    },
    [value, pushValue],
  );

  const panelMaxW = variant === "datetime" ? 360 : 340;

  return (
    <Popover.Root open={mergedOpen} onOpenChange={handleOpenChange}>
      <Popover.Trigger>
        <Button
          type="button"
          variant="outline"
          color="secondary"
          disabled={disabled}
          fullWidth={fullWidth}
          style={{
            justifyContent: "space-between",
            ...triggerStyle,
          }}
          rightIcon={chevron}
          aria-haspopup="dialog"
        >
          {label}
        </Button>
      </Popover.Trigger>
      <Popover.Content
        placement={popoverPlacement}
        aria-label={label}
        style={{
          maxWidth: panelMaxW,
          ...panelStyle,
        }}
      >
        <VStack align="stretch" gap={themeToken("spacing.sm")}>
          <DayPicker
            {...calendarProps}
            mode="single"
            required={false}
            selected={value}
            onSelect={handleSelect}
            disabled={mergedDisabled}
            style={{
              margin: 0,
              ...rootStyle,
              ...calendarProps?.style,
            }}
          />
          {variant === "datetime" ? (
            <VStack
              align="stretch"
              gap={themeToken("spacing.sm")}
              style={timeRowStyle}
            >
              <HStack gap={themeToken("spacing.sm")} align="center" wrap="wrap">
                <Input
                  type="time"
                  size="sm"
                  aria-label="Time"
                  value={startTime}
                  onChange={(e) => onTimeChange(e.target.value)}
                  disabled={disabled || !value}
                />
              </HStack>
              <Button
                type="button"
                size="sm"
                variant="solid"
                color={colorScheme}
                disabled={disabled || !value}
                onClick={() => handleOpenChange(false)}
              >
                {applyLabel}
              </Button>
            </VStack>
          ) : null}
        </VStack>
      </Popover.Content>
    </Popover.Root>
  );
}

DatePicker.displayName = "DatePicker";
