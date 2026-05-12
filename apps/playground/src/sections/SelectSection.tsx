import type { CSSProperties } from "react";
import { useMemo, useRef } from "react";
import {
  Select,
  FormControl,
  FormError,
  FormLabel,
  Text,
  themeToken,
  useCombobox,
  VirtualizedListbox,
  VStack,
  colors,
  type VirtualizedListboxHandle,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

const inputOutlineStyle = (invalid?: boolean): CSSProperties => ({
  width: "100%",
  boxSizing: "border-box",
  padding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
  fontSize: themeToken("text.base"),
  borderRadius: themeToken("borderRadius.md"),
  border: `1px solid ${invalid ? colors.error[500] : colors.secondary[300]}`,
  outline: "none",
  background: themeToken("white"),
});

function FruitComboboxDemo() {
  const items = useMemo(() => ["Apple", "Apricot", "Banana", "Cherry", "Date"], []);
  const cb = useCombobox({ items, itemToString: (x) => x });

  return (
    <div {...cb.getRootProps()}>
      <input
        {...cb.getInputProps({
          placeholder: "Type to filter…",
          style: inputOutlineStyle(),
          "aria-label": "Fruit combobox",
        })}
      />
      <ul
        {...cb.getListProps()}
        style={{
          margin: `${themeToken("spacing.xs")} 0 0`,
          padding: 0,
          listStyle: "none",
          maxHeight: 220,
          overflowY: "auto",
          borderRadius: themeToken("borderRadius.md"),
          border: `1px solid ${colors.secondary[200]}`,
          background: themeToken("white"),
          boxShadow: themeToken("shadow.sm"),
        }}
      >
        {cb.filteredItems.map((_, i) => (
          <li
            key={`${cb.filteredItems[i]}-${i}`}
            {...cb.getOptionProps(i)}
            style={{
              padding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
              cursor: "pointer",
              backgroundColor:
                cb.highlightedIndex === i ? colors.secondary[100] : undefined,
            }}
          >
            {cb.filteredItems[i]}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LargeListComboboxDemo() {
  const virtRef = useRef<VirtualizedListboxHandle>(null);
  const items = useMemo(
    () => Array.from({ length: 5000 }, (_, i) => `Row ${i + 1}`),
    [],
  );
  const cb = useCombobox({
    items,
    itemToString: (x) => x,
    scrollContainerRef: virtRef,
  });

  return (
    <div {...cb.getRootProps()}>
      <input
        {...cb.getInputProps({
          placeholder: "Search 5000 rows…",
          style: inputOutlineStyle(),
          "aria-label": "Virtualized combobox",
        })}
      />
      {cb.isOpen ?
        <div
          {...cb.getListProps()}
          style={{
            marginTop: themeToken("spacing.xs"),
            borderRadius: themeToken("borderRadius.md"),
            border: `1px solid ${colors.secondary[200]}`,
            background: themeToken("white"),
            boxShadow: themeToken("shadow.sm"),
          }}
        >
          <VirtualizedListbox
            ref={virtRef}
            rowCount={cb.filteredItems.length}
            rowHeight={36}
            height={240}
            overscan={8}
          >
            {({ index }) => (
              <div
                {...cb.getOptionProps(index)}
                style={{
                  padding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    cb.highlightedIndex === index ? colors.secondary[100] : undefined,
                }}
              >
                {cb.filteredItems[index]}
              </div>
            )}
          </VirtualizedListbox>
        </div>
      : null}
    </div>
  );
}

export function SelectSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("select.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="select.intro"
          components={{ strong: <strong /> }}
        />
      </p>

      <h2>{t("select.examplesNative")}</h2>
      <LiveExample
        code={`import { Select, VStack, themeToken } from "kovax-react";

<VStack align="stretch" gap={12} maxW={360}>
  <Select variant="outline" size="sm" colorScheme="primary" defaultValue="">
    <option value="">Small outline</option>
    <option value="a">Option A</option>
    <option value="b">Option B</option>
  </Select>
  <Select variant="filled" size="md" colorScheme="secondary" defaultValue="md">
    <option value="sm">Medium filled</option>
    <option value="md">Middle state</option>
  </Select>
</VStack>`}
      >
        <VStack align="stretch" gap={12} maxW={360}>
          <Select variant="outline" size="sm" colorScheme="primary" defaultValue="">
            <option value="">Small outline</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
          </Select>
          <Select variant="filled" size="md" colorScheme="secondary" defaultValue="md">
            <option value="sm">Medium filled</option>
            <option value="md">Middle state</option>
          </Select>
        </VStack>
      </LiveExample>

      <h2>{t("select.examplesFormControl")}</h2>
      <LiveExample
        code={`import { FormControl, FormError, FormLabel, Select, VStack } from "kovax-react";

<VStack align="stretch" gap={12} maxW={380}>
  <FormControl isRequired isInvalid>
    <FormLabel htmlFor="pg-region">Region</FormLabel>
    <Select id="pg-region" defaultValue="">
      <option value="">Choose region</option>
      <option value="eu">EU</option>
      <option value="us">US</option>
    </Select>
    <FormError id="pg-region-err">Pick a region to continue.</FormError>
  </FormControl>
</VStack>`}
      >
        <VStack align="stretch" gap={12} maxW={380}>
          <FormControl isRequired isInvalid>
            <FormLabel htmlFor="pg-region">Region</FormLabel>
            <Select id="pg-region" defaultValue="">
              <option value="">Choose region</option>
              <option value="eu">EU</option>
              <option value="us">US</option>
            </Select>
            <FormError id="pg-region-err">Pick a region to continue.</FormError>
          </FormControl>
        </VStack>
      </LiveExample>

      <h2>{t("select.examplesCombobox")}</h2>
      <p>
        <Text size="sm" color={themeToken("secondary.600")}>
          Headless <code>useCombobox</code>: compose styles (here a minimal outline field); list uses role=listbox / option.
        </Text>
      </p>
      <LiveExample
        code={`import { useCombobox, themeToken } from "kovax-react";
import { useMemo } from "react";

const items = ["Apple", "Apricot", "Banana"];

function Demo() {
  const cb = useCombobox({ items, itemToString: (x) => x });
  return (
    <div {...cb.getRootProps()}>
      <input {...cb.getInputProps({ placeholder: "Filter…", "aria-label": "Fruit" })} />
      <ul {...cb.getListProps()}>
        {cb.filteredItems.map((_, i) => (
          <li key={i} {...cb.getOptionProps(i)}>{cb.filteredItems[i]}</li>
        ))}
      </ul>
    </div>
  );
}`}
      >
        <VStack align="stretch" gap={8} maxW={400}>
          <FruitComboboxDemo />
        </VStack>
      </LiveExample>

      <h2>{t("select.examplesVirtual")}</h2>
      <p>
        <Text size="sm" color={themeToken("secondary.600")}>
          <code>VirtualizedListbox</code> + <code>scrollContainerRef</code> keeps keyboard highlights in view for long lists.
        </Text>
      </p>
      <LiveExample
        code={`import { useCombobox, VirtualizedListbox, themeToken } from "kovax-react";
import { useMemo, useRef } from "react";

const items = Array.from({ length: 5000 }, (_, i) => \`Row \${i + 1}\`);

function Demo() {
  const virtRef = useRef(null);
  const cb = useCombobox({ items, scrollContainerRef: virtRef });
  return (
    <div {...cb.getRootProps()}>
      <input {...cb.getInputProps()} />
      {cb.isOpen ?
        <div {...cb.getListProps()}>
          <VirtualizedListbox ref={virtRef} rowCount={cb.filteredItems.length} rowHeight={36} height={240}>
            {({ index }) => <div {...cb.getOptionProps(index)}>{cb.filteredItems[index]}</div>}
          </VirtualizedListbox>
        </div>
      : null}
    </div>
  );
}`}
      >
        <VStack align="stretch" gap={8} maxW={440}>
          <LargeListComboboxDemo />
        </VStack>
      </LiveExample>
    </>
  );
}
