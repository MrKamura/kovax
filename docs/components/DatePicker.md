# DatePicker & DateRangePicker

Kovax wrappers around **[react-day-picker](https://daypicker.dev)** v9: outline **`Button`** trigger + **`Popover`** panel with token-mapped CSS variables for accents. Suited for forms and filters; not a full scheduler.

## Peer dependency

Install **`react-day-picker`** alongside Kovax (same major as Kovax targets):

```bash
npm install react-day-picker
```

Import the library stylesheet **once** in your app (or equivalent global CSS):

```tsx
import "react-day-picker/style.css";
```

Without this import, the calendar grid will be unstyled.

## Import

```tsx
import { DatePicker, DateRangePicker } from "kovax-react";
import type { DateRange } from "kovax-react";
// Optional bundle:
import { DatePicker, DateRangePicker } from "kovax-react/date-picker";
```

## Usage

Single date:

```tsx
const [day, setDay] = useState<Date | undefined>();

<DatePicker
  selected={day}
  onSelect={setDay}
  placeholder="Due date"
  calendarProps={{ locale: enUS }}
/>
```

Range:

```tsx
const [range, setRange] = useState<DateRange | undefined>();

<DateRangePicker
  selected={range}
  onSelect={setRange}
  placeholder="Check-in — check-out"
  closeOnComplete
/>
```

Disable weekends:

```tsx
<DatePicker
  disabledDates={{ dayOfWeek: [0, 6] }}
/>
```

## Variants: date vs datetime

**`variant="date"`** (default): picking a day closes the popover after **`onSelect`** (single) or when the range is complete if **`closeOnComplete`** is true (range).

**`variant="datetime"`**: after choosing calendar days, the panel stays open so the user can edit **`input type="time"`** values and confirm with **Apply** (`applyLabel`). **`onSelect`** still receives dates with the chosen wall-clock times merged in. For **`DateRangePicker`**, use **`closeOnComplete={false}`** with **`datetime`** so the flow is not cut off before times are set.

Single with time:

```tsx
<DatePicker
  variant="datetime"
  selected={when}
  onSelect={setWhen}
  defaultStartTime="09:15"
  applyLabel="Apply"
  calendarProps={{ locale: enUS }}
/>
```

Range with time:

```tsx
<DateRangePicker
  variant="datetime"
  selected={stay}
  onSelect={setStay}
  closeOnComplete={false}
  defaultStartTime="09:00"
  defaultEndTime="17:00"
  calendarProps={{ locale: enUS }}
/>
```

## react-hook-form

Wire **`selected`** / **`onSelect`** through **`Controller`** so the field value stays the single **`Date`** or **`DateRange`**:

```tsx
import { Controller, useForm } from "react-hook-form";
import { DatePicker, DateRangePicker } from "kovax-react";
import type { DateRange } from "kovax-react";

type Form = { start?: Date; trip?: DateRange };

const { control, handleSubmit } = useForm<Form>();

<form onSubmit={handleSubmit(console.log)}>
  <Controller
    name="start"
    control={control}
    render={({ field }) => (
      <DatePicker
        variant="datetime"
        selected={field.value}
        onSelect={field.onChange}
        calendarProps={{ locale: enUS }}
      />
    )}
  />
  <Controller
    name="trip"
    control={control}
    render={({ field }) => (
      <DateRangePicker
        variant="datetime"
        selected={field.value}
        onSelect={field.onChange}
        closeOnComplete={false}
        calendarProps={{ locale: enUS }}
      />
    )}
  />
</form>
```

## Custom styles

- **`triggerStyle`** / **`panelStyle`** / **`timeRowStyle`**: inline styles merged onto the trigger **`Button`**, **`Popover.Content`**, and the datetime footer row.
- **`calendarProps.style`**: pass **`react-day-picker`** CSS variables (e.g. **`--rdp-accent-color`**) or any layout tweaks supported by **`DayPicker`**.

```tsx
import { DatePicker, themeToken } from "kovax-react";

<DatePicker
  colorScheme="success"
  triggerStyle={{
    borderRadius: themeToken("borderRadius.lg"),
    border: `2px solid ${themeToken("success.400")}`,
  }}
  panelStyle={{
    background: themeToken("secondary.50"),
    border: `1px solid ${themeToken("success.200")}`,
  }}
  calendarProps={{
    style: {
      ["--rdp-accent-color" as string]: themeToken("success.600"),
      ["--rdp-accent-background-color" as string]: themeToken("success.100"),
    },
  }}
/>
```

## Props (shared)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"date" \| "datetime"` | `"date"` | Day-only vs day + time + Apply |
| `panelStyle` | `CSSProperties` | — | Popover panel |
| `triggerStyle` | `CSSProperties` | — | Trigger button |
| `timeRowStyle` | `CSSProperties` | — | Datetime footer row |
| `defaultStartTime` | `HH:mm` string | `"09:00"` | Default time (single + range start) |
| `defaultEndTime` | `HH:mm` string | `"17:00"` | Default range end time |
| `applyLabel` | `string` | — | Apply button label (`datetime`) |
| `placeholder` | `string` | see below | Trigger label when empty |
| `disabled` | `boolean` | `false` | Disables trigger + blocks selection in grid |
| `colorScheme` | palette key | `"primary"` | Maps to `--rdp-accent-*` variables |
| `fullWidth` | `boolean` | `false` | Full-width trigger (`Button`) |
| `open` | `boolean` | — | Controlled popover open (`"open" in props`) |
| `defaultOpen` | `boolean` | `false` | Initial popover when `open` omitted |
| `onOpenChange` | `(open: boolean) => void` | — | Popover visibility |
| `popoverPlacement` | `PopoverPlacement` | `"bottom-start"` | Passed to **`Popover.Content`** |
| `disabledDates` | `Matcher \| Matcher[]` | — | Forwarded as DayPicker `disabled` |
| `calendarProps` | `KovaxDayPickerPassthrough` | — | Extra **`DayPicker`** props (`locale`, `weekStartsOn`, `captionLayout`, …) |

### DatePicker-only

| Prop | Type | Description |
| --- | --- | --- |
| `selected` | `Date \| undefined` | Controlled value (`"selected" in props`) |
| `defaultSelected` | `Date \| undefined` | Initial value when uncontrolled |
| `onSelect` | `(date: Date \| undefined) => void` | Selection callback; with **`date`**, panel closes after pick; with **`datetime`**, closes on Apply |
| `formatDate` | `(date: Date) => string` | Trigger label formatter |

### DateRangePicker-only

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `selected` | `DateRange \| undefined` | — | Controlled range |
| `defaultSelected` | `DateRange \| undefined` | — | Initial range |
| `onSelect` | `(range: DateRange \| undefined) => void` | — | Selection updates |
| `formatRange` | `(range: DateRange) => string` | built-in | Trigger formatter |
| `closeOnComplete` | `boolean` | `true` | Close when both `from` and `to` set (**`variant="date"`** only; **`datetime`** uses Apply) |

## Notes

- **Controlled vs uncontrolled**: passing **`selected`** / **`open`** (even as `undefined`) opts into controlled mode via `in` checks — omit the key entirely for local state only.
- **`DateRange`** is re-exported from **`react-day-picker`** (`{ from?, to? }`).
- **Playground**: **Components → Date picker** (stylesheet imported in playground `main.tsx`).
