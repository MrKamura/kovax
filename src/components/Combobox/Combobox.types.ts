import type {
  HTMLAttributes,
  InputHTMLAttributes,
  RefCallback,
  RefObject,
} from "react";

/** Scroll helper exposed by {@link VirtualizedListbox}. */
export interface VirtualizedListboxHandle {
  scrollToIndex(index: number): void;
}

export type ComboboxFilterFn<T> = (items: readonly T[], inputValue: string) => readonly T[];

export interface UseComboboxOptions<T> {
  items: readonly T[];
  itemToString?: (item: T) => string;
  /** Stable identity for selection and labels; defaults to string/number primitive or `JSON.stringify`. */
  itemKey?: (item: T) => string | number;

  selectedItem?: T | null;
  defaultSelectedItem?: T | null;
  onSelectedItemChange?: (item: T | null) => void;

  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;

  /** Override filtering (default: case-insensitive substring on `itemToString`). */
  filterItems?: ComboboxFilterFn<T>;

  /** Prefix for generated ids (`listbox`, options). */
  id?: string;

  /** When false, list stays open after picking an option (default true). */
  closeOnSelect?: boolean;

  /** Options skipped by arrow-key navigation and mouse clicks. */
  isOptionDisabled?: (item: T, index: number) => boolean;

  /** Call `scrollToIndex` when the highlighted row changes (virtualized lists). */
  scrollContainerRef?: RefObject<VirtualizedListboxHandle | null>;
}

export interface UseComboboxReturn<T> {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;

  highlightedIndex: number;

  selectedItem: T | null;
  selectItem: (item: T | null) => void;

  inputValue: string;
  setInputValue: (value: string) => void;

  filteredItems: readonly T[];

  inputId: string;
  listboxId: string;

  /** Attach to the element that wraps both input and popup (outside-click closes). */
  getRootProps: (
    userProps?: HTMLAttributes<HTMLElement>,
  ) => HTMLAttributes<HTMLElement> & { ref: RefCallback<HTMLElement | null> };

  getInputProps: (
    userProps?: InputHTMLAttributes<HTMLInputElement>,
  ) => InputHTMLAttributes<HTMLInputElement> & { ref: RefCallback<HTMLInputElement | null> };

  getListProps: (userProps?: HTMLAttributes<HTMLElement>) => HTMLAttributes<HTMLElement>;

  getOptionProps: (index: number) => HTMLAttributes<HTMLElement>;
}
