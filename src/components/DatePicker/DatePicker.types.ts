import type { ComponentProps, CSSProperties } from "react";
import type { DayPicker } from "react-day-picker";
import type { DateRange, Matcher } from "react-day-picker";
import type { PopoverPlacement } from "../Popover/Popover.types";
import type { ColorName } from "../theme/tokens";

/** Extra props forwarded to the underlying `DayPicker` (selection props are managed by Kovax). */
export type KovaxDayPickerPassthrough = Omit<
  ComponentProps<typeof DayPicker>,
  "mode" | "selected" | "defaultSelected" | "onSelect" | "required"
>;

/** `date` — day only (popover closes on pick). `datetime` — day + time inputs + Apply to close. */
export type KovaxDatePickerVariant = "date" | "datetime";

export interface KovaxDatePickerChromeProps {
  variant?: KovaxDatePickerVariant;
  /** Merged into `Popover.Content` style (maxWidth presets remain unless overridden). */
  panelStyle?: CSSProperties;
  /** Merged into trigger `Button` style. */
  triggerStyle?: CSSProperties;
  /** Wrapper around time inputs + Apply row when `variant="datetime"`. */
  timeRowStyle?: CSSProperties;
  /** Initial / reset `HH:mm` for single picker and range start (default `09:00`). */
  defaultStartTime?: string;
  /** Initial / reset `HH:mm` for range end (default `17:00`). */
  defaultEndTime?: string;
  /** Label for the button that closes the panel in `datetime` mode. */
  applyLabel?: string;
}

export interface DatePickerProps extends KovaxDatePickerChromeProps {
  selected?: Date | undefined;
  defaultSelected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  formatDate?: (date: Date) => string;
  disabled?: boolean;
  colorScheme?: ColorName;
  disabledDates?: Matcher | Matcher[];
  fullWidth?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  popoverPlacement?: PopoverPlacement;
  calendarProps?: KovaxDayPickerPassthrough;
}

export interface DateRangePickerProps extends KovaxDatePickerChromeProps {
  selected?: DateRange | undefined;
  defaultSelected?: DateRange | undefined;
  onSelect?: (range: DateRange | undefined) => void;
  placeholder?: string;
  formatRange?: (range: NonNullable<DateRange>) => string;
  disabled?: boolean;
  colorScheme?: ColorName;
  disabledDates?: Matcher | Matcher[];
  fullWidth?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  popoverPlacement?: PopoverPlacement;
  /** Close when both ends are set (`variant="date"` only). With `variant="datetime"`, use Apply. */
  closeOnComplete?: boolean;
  calendarProps?: KovaxDayPickerPassthrough;
}
