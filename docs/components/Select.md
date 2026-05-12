## Select & Combobox

### Native Select

**`Select`** is a styled **`<select>`** aligned with **`Input`** (**`variant`**, **`size`**, **`colorScheme`**, focus-visible ring, **`FormControl`** context). Use normal **`<option>`** / **`<optgroup>`** children.

### Headless combobox

**`useCombobox`** wires **ARIA combobox + listbox** semantics, filtering, outside-click close, and keyboard navigation (**ArrowUp/Down**, **Home/End**, **Enter**, **Escape**, **Tab**). Compose your own input and list markup (including portals).

**`VirtualizedListbox`** renders only visible rows for fixed **`rowHeight`** scroll regions; pass **`scrollContainerRef`** into **`useCombobox`** so **`aria-activedescendant`** stays scrolled into view.

## Import

```tsx
import { Select, useCombobox, VirtualizedListbox } from "kovax-react";
```

## Select — usage

```tsx
<Select variant="outline" size="md" colorScheme="primary" defaultValue="">
  <option value="">Choose…</option>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</Select>

<FormControl isInvalid>
  <Select id="country" aria-describedby="country-err" required>
    <option value="">Country</option>
    <option value="de">Germany</option>
  </Select>
  <FormError id="country-err">Required.</FormError>
</FormControl>
```

### Select props

Extends **`SelectHTMLAttributes<HTMLSelectElement>`** except **`size`**, **`style`**, and **`color`**, plus **`SpacingProps`** (applied to the outer wrapper; the inner **`<select>`** stays full width).

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`variant`** | `'default' \| 'outline' \| 'filled'` | `'default'` | Same surfaces as **`Input`**. |
| **`size`** | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding and font scale. |
| **`colorScheme`** | **`ColorName`** | `'primary'` | Focus border palette (**500**). |
| **`isInvalid`** / **`isDisabled`** / **`isRequired`** | `boolean` | — | Merge from **`FormControl`** when omitted (same as **`Checkbox`**). |

Native **`multiple`** is supported; pair with **`size`** / **`value`** per HTML rules.

## useCombobox — options

| Prop | Description |
| ---- | ----------- |
| **`items`** | Full option list (`readonly T[]`). |
| **`itemToString`** | Label for filtering and after selection (default **`String(item)`**). |
| **`itemKey`** | Stable id for equality (default primitives / **`JSON.stringify`**). |
| **`selectedItem`** / **`defaultSelectedItem`** / **`onSelectedItemChange`** | Controlled or uncontrolled selection. |
| **`inputValue`** / **`defaultInputValue`** / **`onInputValueChange`** | Controlled or uncontrolled filter text. |
| **`filterItems`** | Replace default case-insensitive substring filter. |
| **`isOptionDisabled`** | Skip option in keyboard nav and clicks. |
| **`closeOnSelect`** | Close popup after **`Enter`** / click (default **`true`**). |
| **`scrollContainerRef`** | **`VirtualizedListbox`** ref — **`scrollToIndex`** on highlight changes. |
| **`id`** | Prefix for generated ids (`input`, `listbox`, `option-*`). |

### Returned helpers

- **`getRootProps()`** — **`ref`** closes on outside **`mousedown`** when open.
- **`getInputProps()`** — **`role="combobox"`**, **`aria-expanded`**, **`aria-controls`**, **`aria-activedescendant`**, **`aria-autocomplete="list"`**.
- **`getListProps()`** — **`role="listbox"`**, **`hidden`** when closed or empty filtered set.
- **`getOptionProps(index)`** — **`role="option"`**, **`aria-selected`**, **`mousedown`** preventDefault (keeps focus on input).

## VirtualizedListbox

Fixed **`rowHeight`**; **`children({ index })`** renders one row. **`ref`** implements **`scrollToIndex`** for **`useCombobox`**.

```tsx
const virtRef = useRef<VirtualizedListboxHandle>(null);
const cb = useCombobox({
  items: largeList,
  scrollContainerRef: virtRef,
  itemToString: (x) => x.label,
});

<div {...cb.getRootProps()}>
  <input {...cb.getInputProps({ placeholder: "Search…" })} />
  {cb.isOpen ?
    <div {...cb.getListProps()}>
      <VirtualizedListbox
        ref={virtRef}
        rowCount={cb.filteredItems.length}
        rowHeight={36}
        height={280}
      >
        {({ index }) => {
          const row = cb.filteredItems[index];
          return (
            <div {...cb.getOptionProps(index)}>
              {row.label}
            </div>
          );
        }}
      </VirtualizedListbox>
    </div>
  : null}
</div>
```

Use **`div`** roots with **`role="option"`** from **`getOptionProps`** when a plain **`ul`/`li`** tree is not compatible with the scroll shell.

## Accessibility notes

- **`aria-activedescendant`** targets the highlighted **`option`** id while the input keeps focus.
- **`Escape`** closes the list and restores the input string to the current **`selectedItem`** label (via **`setInputValue`**).
- For purely visual chrome (icons, badges), keep **`getOptionProps`** on the interactive row or ensure auxiliary nodes are **`aria-hidden`**.

## Related

- [Input](./Input.md)
- [Form primitives](./Form.md)
- [Checkbox / Radio / Switch](./Controls.md)
