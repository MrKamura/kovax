# Tabs

Accessible tabbed interface: **`Tabs.Root`** (state), **`Tabs.List`** (`role="tablist"`), **`Tabs.Trigger`** (`role="tab"`), **`Tabs.Content`** (`role="tabpanel"`). Matches are wired with stable ids (`aria-controls` / `aria-labelledby`). Keyboard: **ArrowLeft** / **ArrowRight** (horizontal) or **ArrowUp** / **ArrowDown** (vertical), **Home**, **End**; disabled triggers are skipped.

By default (**`indicator="line"`**) one shared **sliding bar** tracks the selected tab (`left` / `width` / `top` / `height` animate with **`indicatorTransitionMs`**). Use **`indicator="none"`** for the classic style where each trigger draws its own underline. Optionally **`panelTransitionMs`** fades the active panel when switching.

## Import

```tsx
import { Tabs } from "kovax-react";
// Optional slice:
import { Tabs } from "kovax-react/tabs";
```

## Basic usage

```tsx
<Tabs.Root defaultValue="general">
  <Tabs.List>
    <Tabs.Trigger value="general">General</Tabs.Trigger>
    <Tabs.Trigger value="security">Security</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="general">
    <p>General settings</p>
  </Tabs.Content>
  <Tabs.Content value="security">
    <p>Security settings</p>
  </Tabs.Content>
</Tabs.Root>
```

## Sliding indicator options

```tsx
// Top rail instead of bottom underline (horizontal)
<Tabs.Root defaultValue="one" indicatorPosition="top" indicatorTransitionMs={260}>
  …
</Tabs.Root>

// No shared slider — per-trigger underline (like earlier Kovax versions)
<Tabs.Root defaultValue="a" indicator="none">
  …
</Tabs.Root>

// Vertical strip: rail on trailing edge of the tab column
<Tabs.Root orientation="vertical" indicatorPosition="inline-end">
  …
</Tabs.Root>

// Softer motion + panel crossfade when switching
<Tabs.Root indicatorTransitionMs={320} panelTransitionMs={180}>
  …
</Tabs.Root>
```

## Controlled

```tsx
const [tab, setTab] = useState("general");

<Tabs.Root value={tab} onValueChange={setTab}>
  …
</Tabs.Root>;
```

## Vertical list

Put **`Tabs.List`** and the **`Tabs.Content`** blocks side by side with **`HStack`** (and wrap panels in **`VStack`** so only one column shows the active panel):

```tsx
<Tabs.Root defaultValue="a" orientation="vertical">
  <HStack align="flex-start" gap={24}>
    <Tabs.List>
      <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
      <Tabs.Trigger value="b">Bravo</Tabs.Trigger>
    </Tabs.List>
    <VStack align="stretch" style={{ flex: 1, minWidth: 0 }}>
      <Tabs.Content value="a">Panel A</Tabs.Content>
      <Tabs.Content value="b">Panel B</Tabs.Content>
    </VStack>
  </HStack>
</Tabs.Root>
```

`Tabs.Root` itself is a neutral wrapper (`display` defaults to block); compose layout with Kovax **`HStack`** / **`VStack`** as needed.

## Props

### `Tabs.Root`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled selected trigger `value`. |
| `defaultValue` | `string` | — | Uncontrolled initial selection; first registered tab is used if omitted and uncontrolled. |
| `onValueChange` | `(value: string) => void` | — | Fires when the active tab changes. |
| `orientation` | `"horizontal"` \| `"vertical"` | `"horizontal"` | Affects layout of `Tabs.List` and arrow-key axes. |
| `indicator` | `"line"` \| `"none"` | `"line"` | Shared sliding bar vs per-trigger underline. |
| `indicatorPosition` | `"bottom"` \| `"top"` \| `"inline-start"` \| `"inline-end"` | by orientation | Placement of the sliding bar relative to the **selected** trigger (horizontal: `bottom` / `top`; vertical: leading / trailing edge). Invalid combos are coerced (e.g. `top` + vertical → `inline-start`). |
| `indicatorTransitionMs` | `number` | `220` | CSS transition duration for the sliding indicator. |
| `panelTransitionMs` | `number` | — | When set, the newly visible panel fades in (`opacity`) after each switch. |
| … | `HTMLAttributes<HTMLDivElement>` | — | Passed to the outer wrapper. |

### `Tabs.List`

| Prop | Type | Description |
| --- | --- | --- |
| … | `HTMLAttributes<HTMLDivElement>` | `role="tablist"`; arrow-key handling; flex styles applied inline; hosts the sliding indicator (`aria-hidden`). |

### `Tabs.Trigger`

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | **Required.** Must match a `Tabs.Content` `value`. |
| `disabled` | `boolean` | Excluded from focus order and arrow navigation. |
| … | `ButtonHTMLAttributes` | Native `button` props (`type` defaults to `"button"`). |

### `Tabs.Content`

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | **Required.** Panel shown when this tab is selected. Inactive panels stay mounted and use the `hidden` attribute. |
| … | `HTMLAttributes<HTMLDivElement>` | Passed to the panel container. |

## Notes

- **`value` strings** should be stable ids (ASCII recommended); they are sanitized for DOM ids (`[^a-zA-Z0-9_-]` → `-`).
- **Panels** remain mounted when hidden so local state inside a panel is preserved.
- **`ResizeObserver`** is used when available to keep the indicator aligned on resize; otherwise window resize + scroll listeners update geometry.
- **Playground**: **Components → Tabs** for live Preview / Code examples.
