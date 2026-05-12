import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  UseComboboxOptions,
  UseComboboxReturn,
} from "./Combobox.types";
import { mergeRefs } from "../../utils/mergeRefs";

function defaultItemToString<T>(item: T): string {
  if (item == null) return "";
  return String(item);
}

function defaultFilter<T>(
  items: readonly T[],
  inputValue: string,
  itemToString: (item: T) => string,
): readonly T[] {
  const q = inputValue.trim().toLowerCase();
  if (!q) return items;
  return items.filter((i) => itemToString(i).toLowerCase().includes(q));
}

function defaultItemKey<T>(item: T): string | number {
  if (typeof item === "string" || typeof item === "number") return item;
  try {
    return JSON.stringify(item);
  } catch {
    return String(item);
  }
}

/**
 * Headless combobox / autocomplete: listbox popup, typeahead filter, keyboard navigation, ARIA wiring.
 * Pair with {@link VirtualizedListbox} for long option lists.
 */
export function useCombobox<T>(options: UseComboboxOptions<T>): UseComboboxReturn<T> {
  const {
    items,
    itemToString = defaultItemToString,
    itemKey = defaultItemKey,
    selectedItem: selectedProp,
    defaultSelectedItem = null,
    onSelectedItemChange,
    inputValue: inputValueProp,
    defaultInputValue = "",
    onInputValueChange,
    filterItems,
    id: idProp,
    closeOnSelect = true,
    isOptionDisabled,
    scrollContainerRef,
  } = options;

  const reactId = useId();
  const baseId = idProp ?? `kv-combobox-${reactId.replace(/:/g, "")}`;
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;

  const containerRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isControlledSelection = selectedProp !== undefined;
  const isControlledInput = inputValueProp !== undefined;

  const [internalSelected, setInternalSelected] = useState<T | null>(defaultSelectedItem);
  const selectedItem = isControlledSelection ? selectedProp! : internalSelected;

  const [internalInput, setInternalInput] = useState(() => {
    if (defaultInputValue) return defaultInputValue;
    const initialSel = selectedProp !== undefined ? selectedProp : defaultSelectedItem;
    return initialSel != null ? itemToString(initialSel) : "";
  });
  const inputValue = isControlledInput ? inputValueProp! : internalInput;

  const setSelected = useCallback(
    (next: T | null) => {
      if (!isControlledSelection) setInternalSelected(next);
      onSelectedItemChange?.(next);
    },
    [isControlledSelection, onSelectedItemChange],
  );

  const setInputValue = useCallback(
    (next: string) => {
      if (!isControlledInput) setInternalInput(next);
      onInputValueChange?.(next);
    },
    [isControlledInput, onInputValueChange],
  );

  const filteredItems = useMemo(() => {
    if (filterItems) return filterItems(items, inputValue);
    return defaultFilter(items, inputValue, itemToString);
  }, [items, inputValue, filterItems, itemToString]);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const optionDisabledAt = useCallback(
    (index: number) => {
      const item = filteredItems[index];
      return item !== undefined && Boolean(isOptionDisabled?.(item, index));
    },
    [filteredItems, isOptionDisabled],
  );

  const firstEnabledIndex = useCallback(
    (direction: 1 | -1, start = direction === 1 ? -1 : filteredItems.length): number => {
      const len = filteredItems.length;
      if (len === 0) return -1;
      let i = start;
      for (let step = 0; step < len + 2; step++) {
        i = direction === 1 ? (i + 1) % len : (i - 1 + len) % len;
        if (!optionDisabledAt(i)) return i;
      }
      return -1;
    },
    [filteredItems, optionDisabledAt],
  );

  const indexOfSelectedInFiltered = useCallback(() => {
    if (selectedItem == null) return -1;
    const key = itemKey(selectedItem);
    return filteredItems.findIndex((it) => itemKey(it) === key);
  }, [filteredItems, itemKey, selectedItem]);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    const selIdx = indexOfSelectedInFiltered();
    const next =
      selIdx >= 0 && !optionDisabledAt(selIdx) ? selIdx : firstEnabledIndex(1, -1);
    setHighlightedIndex(next);
  }, [firstEnabledIndex, indexOfSelectedInFiltered, optionDisabledAt]);

  const toggleMenu = useCallback(() => {
    if (isOpen) closeMenu();
    else openMenu();
  }, [closeMenu, isOpen, openMenu]);

  const selectItem = useCallback(
    (item: T | null) => {
      setSelected(item);
      const label = item == null ? "" : itemToString(item);
      setInputValue(label);
      if (closeOnSelect) closeMenu();
    },
    [closeMenu, closeOnSelect, itemToString, setInputValue, setSelected],
  );

  useEffect(() => {
    if (!isOpen) return;
    setHighlightedIndex((hi) => {
      if (filteredItems.length === 0) return -1;
      if (hi >= filteredItems.length) return filteredItems.length - 1;
      if (hi >= 0 && optionDisabledAt(hi)) return firstEnabledIndex(1, hi - 1);
      return hi;
    });
  }, [filteredItems, firstEnabledIndex, isOpen, optionDisabledAt]);

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;
    scrollContainerRef?.current?.scrollToIndex(highlightedIndex);
  }, [highlightedIndex, isOpen, scrollContainerRef]);

  useEffect(() => {
    if (!isOpen) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const node = e.target as Node;
      if (containerRef.current?.contains(node)) return;
      closeMenu();
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [closeMenu, isOpen]);

  /** Sync display string when controlled selection changes */
  useEffect(() => {
    if (!isControlledSelection || isControlledInput) return;
    setInternalInput(selectedProp == null ? "" : itemToString(selectedProp));
  }, [isControlledInput, isControlledSelection, itemToString, selectedProp]);

  const getRootProps = useCallback(
    (userProps: React.HTMLAttributes<HTMLElement> = {}) => {
      const { ref: userRef, ...rest } = userProps as React.HTMLAttributes<HTMLElement> & {
        ref?: React.Ref<HTMLElement>;
      };
      return {
        ...rest,
        ref: mergeRefs(
          userRef,
          (node: HTMLElement | null) => {
            containerRef.current = node;
          },
        ),
      };
    },
    [],
  );

  const getListProps = useCallback(
    (userProps: React.HTMLAttributes<HTMLElement> = {}) => ({
      ...userProps,
      id: listboxId,
      role: "listbox" as const,
      hidden:
        !isOpen || filteredItems.length === 0 ? true : undefined,
    }),
    [filteredItems.length, isOpen, listboxId],
  );

  const getOptionProps = useCallback(
    (index: number): React.HTMLAttributes<HTMLElement> => {
      const item = filteredItems[index];
      const disabled = optionDisabledAt(index);
      const selected =
        item !== undefined && selectedItem != null && itemKey(item) === itemKey(selectedItem);
      return {
        id: `${baseId}-opt-${index}`,
        role: "option",
        "aria-selected": selected,
        "aria-disabled": disabled || undefined,
        onMouseDown: (e) => {
          e.preventDefault();
        },
        onClick: () => {
          if (disabled || item === undefined) return;
          selectItem(item);
        },
      };
    },
    [
      baseId,
      filteredItems,
      itemKey,
      optionDisabledAt,
      selectItem,
      selectedItem,
    ],
  );

  const getInputProps = useCallback(
    (
      userProps: React.InputHTMLAttributes<HTMLInputElement> = {},
    ): React.InputHTMLAttributes<HTMLInputElement> & {
      ref: React.RefCallback<HTMLInputElement | null>;
    } => {
      const { ref: userRef, onKeyDown: userKeyDown, onChange: userChange, ...rest } =
        userProps as React.InputHTMLAttributes<HTMLInputElement> & {
          ref?: React.Ref<HTMLInputElement>;
        };

      const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        userKeyDown?.(e);
        if (e.defaultPrevented) return;

        switch (e.key) {
          case "ArrowDown": {
            e.preventDefault();
            if (!isOpen) openMenu();
            else {
              const start = highlightedIndex < 0 ? -1 : highlightedIndex;
              const next = firstEnabledIndex(1, start);
              if (next >= 0) setHighlightedIndex(next);
            }
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            if (!isOpen) openMenu();
            else {
              const start = highlightedIndex < 0 ? filteredItems.length : highlightedIndex;
              const next = firstEnabledIndex(-1, start);
              if (next >= 0) setHighlightedIndex(next);
            }
            break;
          }
          case "Home": {
            if (!isOpen) return;
            e.preventDefault();
            const next = firstEnabledIndex(1, -1);
            if (next >= 0) setHighlightedIndex(next);
            break;
          }
          case "End": {
            if (!isOpen) return;
            e.preventDefault();
            const next = firstEnabledIndex(-1, filteredItems.length);
            if (next >= 0) setHighlightedIndex(next);
            break;
          }
          case "Enter": {
            if (!isOpen) return;
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
              const item = filteredItems[highlightedIndex];
              if (!optionDisabledAt(highlightedIndex)) selectItem(item);
            }
            break;
          }
          case "Escape": {
            if (!isOpen) return;
            e.preventDefault();
            closeMenu();
            const fallback =
              selectedItem == null ? "" : itemToString(selectedItem);
            setInputValue(fallback);
            break;
          }
          case "Tab":
            closeMenu();
            break;
          default:
            break;
        }
      };

      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userChange?.(e);
        setInputValue(e.target.value);
        if (!isOpen) setIsOpen(true);
        setHighlightedIndex(firstEnabledIndex(1, -1));
      };

      return {
        ...rest,
        ref: mergeRefs(userRef, inputRef),
        id: inputId,
        role: "combobox",
        "aria-expanded": isOpen,
        "aria-controls": listboxId,
        "aria-autocomplete": "list" as const,
        "aria-activedescendant":
          isOpen && highlightedIndex >= 0 ? `${baseId}-opt-${highlightedIndex}` : undefined,
        autoComplete: "off",
        value: inputValue,
        onChange,
        onKeyDown,
      };
    },
    [
      baseId,
      closeMenu,
      filteredItems,
      firstEnabledIndex,
      highlightedIndex,
      inputId,
      inputValue,
      isOpen,
      itemToString,
      listboxId,
      openMenu,
      optionDisabledAt,
      selectItem,
      selectedItem,
      setInputValue,
    ],
  );

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu,
    highlightedIndex,
    selectedItem,
    selectItem,
    inputValue,
    setInputValue,
    filteredItems,
    inputId,
    listboxId,
    getRootProps,
    getInputProps,
    getListProps,
    getOptionProps,
  };
}
