import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange, Matcher } from "react-day-picker";
import { Button } from "../Button/Button";
import { HStack } from "../Layout/HStack";
import { VStack } from "../Layout/VStack";
import { Input } from "../Input/Input";
import { Popover } from "../Popover/Popover";
import { colors, themeToken } from "../theme/tokens";
import { dayPickerCssVariables } from "./calendarCssVars";
import type { DateRangePickerProps } from "./DatePicker.types";
import { applyTimeToDate, extractHHMM } from "./datePickerTimeUtils";

function localeTag(locale: KovaxLocale): string | undefined {
  if (!locale || typeof locale !== "object") return undefined;
  const code = (locale as { code?: string }).code;
  return typeof code === "string" ? code : undefined;
}

type KovaxLocale = NonNullable<DateRangePickerProps["calendarProps"]>["locale"];

function defaultFormatRangeDateOnly(
  range: NonNullable<DateRange>,
  locale: KovaxLocale,
) {
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat(localeTag(locale), { dateStyle: "medium" }).format(
      d,
    );
  const { from, to } = range;
  if (from && to) return `${fmt(from)} – ${fmt(to)}`;
  if (from) return `${fmt(from)} – …`;
  return "";
}

function defaultFormatRangeDateTime(
  range: NonNullable<DateRange>,
  locale: KovaxLocale,
) {
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat(localeTag(locale), {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  const { from, to } = range;
  if (from && to) return `${fmt(from)} – ${fmt(to)}`;
  if (from) return `${fmt(from)} – …`;
  return "";
}

function mergeRangeWithTimes(
  range: DateRange | undefined,
  startHHMM: string,
  endHHMM: string,
): DateRange | undefined {
  if (!range) return range;
  return {
    from: range.from ? applyTimeToDate(range.from, startHHMM) : undefined,
    to: range.to ? applyTimeToDate(range.to, endHHMM) : undefined,
  };
}

const chevron = (
  <span aria-hidden style={{ fontSize: "0.6rem", opacity: 0.75 }}>
    ▼
  </span>
);

export function DateRangePicker(props: DateRangePickerProps) {
  const {
    variant = "date",
    selected,
    defaultSelected,
    onSelect,
    placeholder = "Pick a date range",
    formatRange,
    disabled = false,
    colorScheme = "primary",
    disabledDates,
    fullWidth,
    open,
    defaultOpen = false,
    onOpenChange,
    popoverPlacement = "bottom-start",
    closeOnComplete = true,
    calendarProps,
    panelStyle,
    triggerStyle,
    timeRowStyle,
    defaultStartTime = "09:00",
    defaultEndTime = "17:00",
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

  const [innerSelected, setInnerSelected] = useState<DateRange | undefined>(
    defaultSelected,
  );
  const value = isSelControlled ? selected : innerSelected;

  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);

  useEffect(() => {
    if (variant !== "datetime") return;
    if (value?.from) setStartTime(extractHHMM(value.from));
    else setStartTime(defaultStartTime);
    if (value?.to) setEndTime(extractHHMM(value.to));
    else setEndTime(defaultEndTime);
  }, [
    variant,
    value?.from?.getTime(),
    value?.to?.getTime(),
    defaultStartTime,
    defaultEndTime,
  ]);

  const fmtRangeLabel = useCallback(
    (r: NonNullable<DateRange>) => {
      if (formatRange) return formatRange(r);
      return variant === "datetime"
        ? defaultFormatRangeDateTime(r, locale)
        : defaultFormatRangeDateOnly(r, locale);
    },
    [formatRange, variant, locale],
  );

  const label = useMemo(() => {
    if (value?.from || value?.to)
      return fmtRangeLabel(value as NonNullable<DateRange>);
    return placeholder;
  }, [value, fmtRangeLabel, placeholder]);

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

  const pushRange = useCallback(
    (r: DateRange | undefined) => {
      if (!isSelControlled) setInnerSelected(r);
      onSelect?.(r);
    },
    [isSelControlled, onSelect],
  );

  const handleSelect = useCallback(
    (range: DateRange | undefined) => {
      const next =
        variant === "datetime"
          ? mergeRangeWithTimes(range, startTime, endTime)
          : range;
      pushRange(next);
      if (
        closeOnComplete &&
        variant === "date" &&
        next?.from &&
        next?.to
      ) {
        handleOpenChange(false);
      }
    },
    [
      variant,
      startTime,
      endTime,
      pushRange,
      closeOnComplete,
      handleOpenChange,
    ],
  );

  const onStartTimeChange = useCallback(
    (hhmm: string) => {
      setStartTime(hhmm);
      if (!value?.from) return;
      pushRange(mergeRangeWithTimes(value, hhmm, endTime));
    },
    [value, endTime, pushRange],
  );

  const onEndTimeChange = useCallback(
    (hhmm: string) => {
      setEndTime(hhmm);
      if (!value?.from) return;
      pushRange(mergeRangeWithTimes(value, startTime, hhmm));
    },
    [value, startTime, pushRange],
  );

  const rangeComplete = Boolean(value?.from && value?.to);
  const panelMaxW = variant === "datetime" ? 380 : 360;

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
            mode="range"
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
                  aria-label="Start time"
                  value={startTime}
                  onChange={(e) => onStartTimeChange(e.target.value)}
                  disabled={disabled || !value?.from}
                />
                <Input
                  type="time"
                  size="sm"
                  aria-label="End time"
                  value={endTime}
                  onChange={(e) => onEndTimeChange(e.target.value)}
                  disabled={disabled || !value?.to}
                />
              </HStack>
              <Button
                type="button"
                size="sm"
                variant="solid"
                color={colorScheme}
                disabled={disabled || !rangeComplete}
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

DateRangePicker.displayName = "DateRangePicker";
