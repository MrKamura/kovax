import { useState } from "react";
import {
  Box,
  Button,
  DatePicker,
  DateRangePicker,
  FormControl,
  FormLabel,
  HStack,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import type { DateRange } from "kovax-react";
import { enUS } from "react-day-picker/locale";
import { Controller, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

type RhfDateDemo = {
  appointment?: Date;
  stay?: DateRange;
};

function ReactHookFormDateDemo() {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<RhfDateDemo>({
    defaultValues: {
      appointment: new Date(2026, 4, 12, 10, 0),
      stay: {
        from: new Date(2026, 5, 1, 14, 0),
        to: new Date(2026, 5, 8, 11, 30),
      },
    },
  });

  const [parsed, setParsed] = useState<string | null>(null);

  return (
    <Box as="form" maxW={480} w="100%" onSubmit={handleSubmit((data) => setParsed(JSON.stringify(data)))}>
      <VStack align="stretch" gap={themeToken("spacing.md")}>
        <FormControl>
          <FormLabel>{t("datePicker.rhfLabelSingle")}</FormLabel>
          <Controller
            name="appointment"
            control={control}
            render={({ field }) => (
              <DatePicker
                variant="datetime"
                selected={field.value}
                onSelect={(d) => field.onChange(d)}
                placeholder={t("datePicker.placeholderSingle")}
                applyLabel={t("datePicker.apply")}
                fullWidth
                calendarProps={{
                  locale: enUS,
                  defaultMonth: field.value ?? new Date(),
                }}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{t("datePicker.rhfLabelRange")}</FormLabel>
          <Controller
            name="stay"
            control={control}
            render={({ field }) => (
              <DateRangePicker
                variant="datetime"
                selected={field.value}
                onSelect={(r) => field.onChange(r)}
                placeholder={t("datePicker.placeholderRange")}
                applyLabel={t("datePicker.apply")}
                closeOnComplete={false}
                fullWidth
                calendarProps={{
                  locale: enUS,
                  defaultMonth: field.value?.from ?? new Date(),
                }}
              />
            )}
          />
        </FormControl>
        <HStack gap={themeToken("spacing.sm")} wrap="wrap">
          <Button type="submit">{t("datePicker.rhfSubmit")}</Button>
        </HStack>
        {parsed ?
          <Text size="sm" color={themeToken("secondary.700")}>
            {t("datePicker.rhfParsed")}: {parsed}
          </Text>
        : null}
        <Text size="xs" color={themeToken("secondary.600")}>
          {t("datePicker.rhfNote")}
        </Text>
      </VStack>
    </Box>
  );
}

export function DatePickerSection() {
  const { t } = useTranslation();
  const [single, setSingle] = useState<Date | undefined>(
    () => new Date(2026, 4, 10),
  );
  const [range, setRange] = useState<DateRange | undefined>(() => ({
    from: new Date(2026, 4, 5),
    to: new Date(2026, 4, 18),
  }));

  const [singleDt, setSingleDt] = useState<Date | undefined>(
    () => new Date(2026, 4, 15, 14, 45),
  );
  const [rangeDt, setRangeDt] = useState<DateRange | undefined>(() => ({
    from: new Date(2026, 5, 3, 9, 15),
    to: new Date(2026, 5, 9, 18, 30),
  }));

  const [customStyled, setCustomStyled] = useState(() => new Date(2026, 7, 20));

  const accentVar = themeToken("success.600");
  const accentBg = themeToken("success.100");

  return (
    <>
      <h1>{t("datePicker.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="datePicker.intro"
          components={{ strong: <strong />, code: <code /> }}
        />
      </p>

      <h2>{t("datePicker.examplesSingle")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import { DatePicker } from "kovax-react";
import { enUS } from "react-day-picker/locale";

const [day, setDay] = useState<Date | undefined>(new Date(2026, 4, 10));

<DatePicker
  selected={day}
  onSelect={setDay}
  placeholder="Pick a date"
  calendarProps={{ locale: enUS, defaultMonth: day ?? new Date() }}
/>`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          <DatePicker
            selected={single}
            onSelect={setSingle}
            placeholder={t("datePicker.placeholderSingle")}
            fullWidth
            calendarProps={{
              locale: enUS,
              defaultMonth: single ?? new Date(),
            }}
          />
          <Text size="sm" color={themeToken("secondary.600")}>
            {single
              ? t("datePicker.stateSingle", {
                  value: single.toDateString(),
                })
              : t("datePicker.stateSingleEmpty")}
          </Text>
        </VStack>
      </LiveExample>

      <h2>{t("datePicker.examplesDatetimeSingle")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import { DatePicker } from "kovax-react";
import { enUS } from "react-day-picker/locale";

const [dt, setDt] = useState<Date | undefined>(
  new Date(2026, 4, 15, 14, 45),
);

<DatePicker
  variant="datetime"
  selected={dt}
  onSelect={setDt}
  defaultStartTime="14:45"
  applyLabel="Apply"
  calendarProps={{ locale: enUS }}
/>`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          <DatePicker
            variant="datetime"
            selected={singleDt}
            onSelect={setSingleDt}
            defaultStartTime="14:45"
            applyLabel={t("datePicker.apply")}
            placeholder={t("datePicker.placeholderDatetime")}
            fullWidth
            calendarProps={{
              locale: enUS,
              defaultMonth: singleDt ?? new Date(),
            }}
          />
          <Text size="sm" color={themeToken("secondary.600")}>
            {singleDt
              ? t("datePicker.stateDatetimeSingle", {
                  value: singleDt.toISOString(),
                })
              : t("datePicker.stateSingleEmpty")}
          </Text>
        </VStack>
      </LiveExample>

      <h2>{t("datePicker.examplesRange")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import { DateRangePicker } from "kovax-react";
import type { DateRange } from "kovax-react";
import { enUS } from "react-day-picker/locale";

const [range, setRange] = useState<DateRange | undefined>({
  from: new Date(2026, 4, 5),
  to: new Date(2026, 4, 18),
});

<DateRangePicker
  selected={range}
  onSelect={setRange}
  placeholder="Check-in — check-out"
  calendarProps={{ locale: enUS }}
/>`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          <DateRangePicker
            selected={range}
            onSelect={setRange}
            placeholder={t("datePicker.placeholderRange")}
            fullWidth
            calendarProps={{
              locale: enUS,
              defaultMonth: range?.from ?? new Date(),
            }}
          />
          <Text size="sm" color={themeToken("secondary.600")}>
            {range?.from && range?.to
              ? t("datePicker.stateRange", {
                  from: range.from.toDateString(),
                  to: range.to.toDateString(),
                })
              : t("datePicker.stateRangePartial")}
          </Text>
        </VStack>
      </LiveExample>

      <h2>{t("datePicker.examplesDatetimeRange")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import { DateRangePicker } from "kovax-react";
import type { DateRange } from "kovax-react";
import { enUS } from "react-day-picker/locale";

const [r, setR] = useState<DateRange | undefined>({
  from: new Date(2026, 5, 3, 9, 15),
  to: new Date(2026, 5, 9, 18, 30),
});

<DateRangePicker
  variant="datetime"
  selected={r}
  onSelect={setR}
  closeOnComplete={false}
  defaultStartTime="09:15"
  defaultEndTime="18:30"
  applyLabel="Apply"
  calendarProps={{ locale: enUS }}
/>`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          <DateRangePicker
            variant="datetime"
            selected={rangeDt}
            onSelect={setRangeDt}
            closeOnComplete={false}
            defaultStartTime="09:15"
            defaultEndTime="18:30"
            applyLabel={t("datePicker.apply")}
            placeholder={t("datePicker.placeholderDatetimeRange")}
            fullWidth
            calendarProps={{
              locale: enUS,
              defaultMonth: rangeDt?.from ?? new Date(),
            }}
          />
          <Text size="sm" color={themeToken("secondary.600")}>
            {rangeDt?.from && rangeDt?.to
              ? t("datePicker.stateDatetimeRange", {
                  value: `${rangeDt.from.toISOString()} | ${rangeDt.to.toISOString()}`,
                })
              : t("datePicker.stateRangePartial")}
          </Text>
        </VStack>
      </LiveExample>

      <h2>{t("datePicker.examplesReactHookForm")}</h2>
      <LiveExample
        code={`import { Controller, useForm } from "react-hook-form";
import { DatePicker, DateRangePicker, Button } from "kovax-react";
import type { DateRange } from "kovax-react";
import { enUS } from "react-day-picker/locale";

type Form = { appointment?: Date; stay?: DateRange };

const { control, handleSubmit } = useForm<Form>({ ... });

<form onSubmit={handleSubmit(console.log)}>
  <Controller
    name="appointment"
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
    name="stay"
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
  <Button type="submit">Save</Button>
</form>`}
      >
        <ReactHookFormDateDemo />
      </LiveExample>

      <h2>{t("datePicker.examplesCustomStyles")}</h2>
      <LiveExample
        code={`import { DatePicker, themeToken } from "kovax-react";
import { enUS } from "react-day-picker/locale";

<DatePicker
  colorScheme="success"
  triggerStyle={{
    borderRadius: themeToken("borderRadius.lg"),
    border: \`2px solid \${themeToken("success.400")}\`,
  }}
  panelStyle={{
    background: themeToken("secondary.50"),
    border: \`1px solid \${themeToken("success.200")}\`,
  }}
  calendarProps={{
    locale: enUS,
    style: {
      ["--rdp-accent-color" as string]: themeToken("success.600"),
      ["--rdp-accent-background-color" as string]: themeToken("success.100"),
    },
  }}
/>`}
      >
        <DatePicker
          colorScheme="success"
          selected={customStyled}
          onSelect={(d) => {
            if (d) setCustomStyled(d);
          }}
          formatDate={(d) =>
            new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(d)
          }
          triggerStyle={{
            borderRadius: themeToken("borderRadius.lg"),
            border: `2px solid ${themeToken("success.400")}`,
          }}
          panelStyle={{
            background: themeToken("secondary.50"),
            border: `1px solid ${themeToken("success.200")}`,
          }}
          calendarProps={{
            locale: enUS,
            defaultMonth: new Date(2026, 7, 1),
            style: {
              ["--rdp-accent-color" as string]: accentVar,
              ["--rdp-accent-background-color" as string]: accentBg,
            },
          }}
        />
      </LiveExample>

      <Text size="xs" color={themeToken("secondary.600")} style={{ marginTop: themeToken("spacing.md") }}>
        <Trans i18nKey="datePicker.docsHint" components={{ strong: <strong /> }} />
      </Text>
    </>
  );
}
