# Accordion & Collapsible

Two disclosure primitives:

- **`Collapsible`** — one trigger + one panel (`aria-expanded`, `aria-controls`, `role="region"`).
- **`Accordion`** — several **`Accordion.Item`** sections with **`type="single"`** (one open) or **`type="multiple"`**, optional **`collapsible`** (single mode only), and arrow-key navigation between triggers.

## Import

```tsx
import { Collapsible, Accordion } from "kovax-react";
// Optional bundle:
import { Collapsible, Accordion } from "kovax-react/accordion";
```

## Chevron on triggers

**`Collapsible.Trigger`** and **`Accordion.Trigger`** render a **down chevron** on the **right** by default. It **rotates 180°** when the section opens; rotation duration follows **`motionDurationMs`** on **`Collapsible.Root`** / **`Accordion.Root`** (default **200** ms; skipped when **`prefers-reduced-motion: reduce`**). Use the **`chevron`** prop to override or remove it:

- Omit **`chevron`** — default SVG icon (also exported as **`DisclosureChevronIcon`** from `kovax-react` / `kovax-react/accordion`).
- **`chevron={null}`** or **`chevron={false}`** — no icon.
- **`chevron={<YourIcon />}`** — custom node; it sits in the same rotating wrapper so it turns with open state.

Triggers expose **`data-state="open" | "closed"`** for CSS hooks.

## Variants & sizing (`Accordion.Root`)

- **`variant`**: **`bordered`** (default) — full border; **`flush`** — no outer border / flush corners; **`soft`** — muted outer tint; **`elevated`** — shadow card (good on tinted page backgrounds).
- **`size`**: **`sm`** · **`md`** (default) · **`lg`** — scales trigger padding and panel typography.
- **`motionDurationMs`**: duration for **chevron rotation** and **panel height** easing (CSS `grid-template-rows`); default **200**.

## Collapsible

```tsx
<Collapsible.Root defaultOpen>
  <Collapsible.Trigger>Show details</Collapsible.Trigger>
  <Collapsible.Content>
    <p>Extra information stays mounted; the panel animates closed with height easing and uses <code>aria-hidden</code> when collapsed.</p>
  </Collapsible.Content>
</Collapsible.Root>
```

Controlled:

```tsx
const [open, setOpen] = useState(false);

<Collapsible.Root open={open} onOpenChange={setOpen}>
  …
</Collapsible.Root>;
```

## Accordion

Basic single selection:

```tsx
<Accordion.Root type="single" defaultValue="shipping">
  <Accordion.Item value="shipping">
    <Accordion.Header>
      <Accordion.Trigger>Shipping</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>We ship in 2–3 days.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="returns">
    <Accordion.Header>
      <Accordion.Trigger>Returns</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>30-day policy.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

Wrap the trigger in a **heading** with Kovax **`Heading`** when you need an outline level:

```tsx
<Accordion.Item value="faq1">
  <Accordion.Header>
    <Heading level={4} style={{ margin: 0 }}>
      <Accordion.Trigger>Delivery zones?</Accordion.Trigger>
    </Heading>
  </Accordion.Header>
  <Accordion.Content>…</Accordion.Content>
</Accordion.Item>
```

Allow closing the open row (no section expanded):

```tsx
<Accordion.Root type="single" collapsible defaultValue="a">
  …
</Accordion.Root>
```

Multiple sections open:

```tsx
<Accordion.Root type="multiple" defaultValue={["a", "c"]}>
  …
</Accordion.Root>
```

Hide or replace the chevron:

```tsx
<Accordion.Trigger chevron={null}>Plain label</Accordion.Trigger>
<Collapsible.Trigger chevron={<span aria-hidden>▸</span>}>Custom</Collapsible.Trigger>
```

Content can include lists or another accordion (separate **`Accordion.Root`** — each keeps its own keyboard scope):

```tsx
<Accordion.Root type="single" defaultValue="topics">
  <Accordion.Item value="topics">
    <Accordion.Header>
      <Accordion.Trigger>Topics</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <ul>
        <li>Alpha</li>
        <li>Beta</li>
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="nested">
    <Accordion.Header>
      <Accordion.Trigger>Nested panels</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="inner-a">
          <Accordion.Header>
            <Accordion.Trigger>Inner A</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>…</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

Keyboard when focus is on a trigger: **ArrowDown** / **ArrowUp** move between triggers **in that accordion root**, **Home** / **End** jump to first / last (disabled items are skipped). Arrow keys **stop propagating** so nested roots do not steal navigation from the focused row.

## Props — `Collapsible.Root`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial open |
| `onOpenChange` | `(open: boolean) => void` | — | Fires when open changes |
| `disabled` | `boolean` | `false` | Disables the trigger |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Trigger + panel typography scale |
| `motionDurationMs` | `number` | `200` | Chevron + panel animation (ms); **0** when reduced-motion |
| … | `HTMLAttributes<HTMLDivElement>` | — | Wrapper div |

## Props — `Collapsible.Trigger` / `Collapsible.Content`

Native **`button`** / **`div`** props (Trigger defaults to `type="button"`). Content is a **`role="region"`** with **`aria-labelledby`**; collapsed panels use **`aria-hidden="true"`** and animate height via CSS grid (see **`motionDurationMs`** on **`Collapsible.Root`**).

| Prop (`Trigger`) | Type | Default | Description |
| --- | --- | --- | --- |
| `chevron` | `ReactNode` \| `null` \| `false` | default SVG | Right-side disclosure icon; `null` / `false` hides it |

## Props — `Accordion.Trigger`

Same as a native **`button`** plus:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `chevron` | `ReactNode` \| `null` \| `false` | default SVG | Same behavior as **`Collapsible.Trigger`** |

## Props — `Accordion.Root`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"single"` \| `"multiple"` | `"single"` | Selection mode |
| `collapsible` | `boolean` | `false` | **`single` only**: clicking the open section closes it |
| `value` | `string` \| `string[]` | — | Controlled value |
| `defaultValue` | `string` \| `string[]` | — | Uncontrolled initial |
| `onValueChange` | `(value: string \| undefined \| string[]) => void` | — | Emits `undefined` when all closed in single + collapsible |
| `variant` | `"bordered"` \| `"flush"` \| `"soft"` \| `"elevated"` | `"bordered"` | Outer chrome |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Density scale |
| `motionDurationMs` | `number` | `200` | Chevron + panel animation (ms) |
| … | `HTMLAttributes<HTMLDivElement>` | — | Outer wrapper (`data-accordion-variant`, `data-accordion-size`) |

## Props — `Accordion.Item`

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string` | **Required**, stable id |
| `disabled` | `boolean` | Disables this row’s trigger |
| … | `HTMLAttributes<HTMLDivElement>` | Row wrapper |

## Props — `Accordion.Header`

Semantic wrapper only — passthrough `HTMLAttributes<HTMLDivElement>`.

## Props — `Accordion.Content`

Passthrough `HTMLAttributes<HTMLDivElement>`. Panels stay mounted; collapsed state uses **`aria-hidden`** and **animated height** (`grid-template-rows`); focus target **`tabIndex`** toggles with open state.

## Notes

- **Playground**: **Components → Accordion** for Preview / Code (variants, sizes, motion, tinted backgrounds).
- Panels stay mounted; closing runs a shared **`motionDurationMs`** animation on chevron + height.
