## Tooltip, Dialog, Modal, Toast & Popover

### Tooltip

**`Tooltip`** adds a [`role="tooltip"`](https://w3c.github.io/aria/#tooltip) layer in a **portal**, positioned from the trigger’s bounding rect (**`top` | `bottom` | `left` | `right`**). The trigger must be a **single React element**; refs and DOM handlers are merged.

- **`aria-describedby`** on the trigger points at the tooltip **while visible**.
- **`openDelay`** / **`closeDelay`** reduce accidental flashes (defaults **400ms** / **50ms**).

### Popover / Dropdown

Compound **`Popover`** (**`Popover.Root`**, **`Popover.Trigger`**, **`Popover.Content`**): clicking the trigger toggles a non-modal floating panel in a **`fixed`** **portal**, anchored to the trigger via **`placement`**. Default **`contentRole="dialog"`** sets **`role="dialog"`** (**`aria-modal="false"`**); set **`contentRole="menu"`** (or use **`Menu`**) for **`role="menu"`** with arrow-key focus among **`menuitem`** children. **`Dropdown`** is the **same exported object** as **`Popover`** (pick either name for generic anchored panels).

- **Dismiss:** outside pointer down and **Escape** (configurable).
- **Position:** recomputed on scroll (capture) and resize; viewport clamping with padding.
- **`sameWidth`:** panel **`min-width`** matches trigger width.
- **Layer:** **`z-index`** ~**10850** — above typical sticky headers and modal shells are lower concern than **`Tooltip`** (~11000); does **not** trap focus or lock scroll (unlike **`Dialog`**).

### Menu

Compound **`Menu`** / **`DropdownMenu`** — anchored **`role="menu"`** with keyboard support and optional enter animation. Full reference, props tables, and **`motion`** flag: **[Menu.md](./Menu.md)** · bundle **`kovax-react/menu`**.

- **Keyboard:** **↑** / **↓**, **Home** / **End**, **Enter** / **Space**; **Escape** closes (Popover).
- **Animation:** default **`kv-menu-enter`** on **`Menu.Content`** (disable with **`motion={false}`** or **`style`**).

### Dialog

Compound **`Dialog`** (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Content`, …): modal **`role="dialog"`**, **`aria-modal="true"`**, optional **`Dialog.Description`** for **`aria-describedby`**, **Escape** and overlay click to dismiss (configurable), **focus trap** inside the panel, **scroll lock** on `document.body`, **`createPortal`** to **`document.body`**.

Default **`z-index`** on the overlay and panel is **above typical sticky headers** (common site chrome ~1000–1100). **`Tooltip`** uses a **higher** layer so it can still render above an open **`Dialog`** / **`Modal`** when needed.

### Modal

**`Modal`** is the same modal behavior as **`Dialog`**, with an opinionated **column layout**: **`Modal.Header`**, **`Modal.Body`** (scrolls when content is tall), **`Modal.Footer`**, plus **`Modal.Title`** / **`Modal.Description`** / **`Modal.Close`**. Use **`Dialog`** when you want a single flat panel; use **`Modal`** for confirmations, long forms, or media.

- **`Modal.Content`** accepts **`size`**: **`sm`** | **`md`** | **`lg`** | **`xl`** | **`full`** (panel width).
- **`Modal.Body`** supports **`flush`** to drop padding (edge-to-edge image or video).

### Toast (snackbar)

**`ToastProvider`** + **`useToast()`** (implemented in **`useToast.ts`**, re-exported from the package) drive imperative **snackbar** notifications: **`toast({ ... })`** returns an id; **`dismiss(id)`** and **`dismissAll()`** remove them. Each toast can override **`placement`** (multiple corners can show at once). **`normalizeToastPlacement()`** maps aliases (**`top`**, **`bottom`**, **`bottom-left`**, **`bottom-right`**) to canonical **`top-center`**, **`bottom-center`**, **`bottom-start`**, **`bottom-end`**.

- **Variants:** **`default`**, **`success`**, **`warning`**, **`error`** (token-backed surfaces).
- **Size:** **`sm`** \| **`md`** \| **`lg`** — padding and typography.
- **Timing:** **`durationSeconds`** (seconds, preferred for readability) or **`duration`** (ms). If both are set, **`durationSeconds`** wins. **`0`** / **`Infinity`** → no auto-dismiss (unless **`persistUntilAction`** applies).
- **`persistUntilAction`:** with an **`action`**, disables auto-dismiss and hides the × button until the user clicks the action (programmatic **`dismiss(id)`** still works).
- **Accessibility:** **`role="status"`** + **`aria-live="polite"`** by default; **`error`** / **`priority: 'assertive'`** → **`role="alert"`** / **`aria-live="assertive"`**.
- **Optional `action`:** primary-looking button; click runs **`onClick`** then closes the toast.

## Import

```tsx
import {
  Tooltip,
  Dialog,
  Modal,
  Popover,
  ToastProvider,
  useToast,
} from "kovax-react";
```

> **Playground:** **Preview** / **Code** for Tooltip, Popover, Modal, Toast, and Dialog — **Components → Overlays**. **Menu** — **Components → Menu**; markdown topic **Documentation → Menu**. This file covers Tooltip, Popover, Dialog, Modal, and Toast.

## Tooltip — usage

```tsx
<Tooltip content="Saved to disk">
  <button type="button" aria-label="Save info">
    ?
  </button>
</Tooltip>

<Tooltip content="Right side" placement="right" openDelay={200}>
  <span tabIndex={0}>Keyboard focus</span>
</Tooltip>
```

### Tooltip props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`content`** | `ReactNode` | — | Tooltip body. |
| **`children`** | `ReactElement` | — | Trigger element (single child). |
| **`placement`** | `top \| bottom \| left \| right` | `top` | Viewport-fixed placement. |
| **`openDelay`** | `number` | `400` | Show delay (ms). |
| **`closeDelay`** | `number` | `50` | Hide delay after leaving trigger (ms). |
| **`disabled`** | `boolean` | — | Never shows tooltip. |
| **`id`** | `string` | auto | Stable id for the tooltip node. |

## Popover — usage

```tsx
import { Button, Popover, Text, VStack } from "kovax-react";

<Popover.Root>
  <Popover.Trigger>
    <Button type="button">Open</Button>
  </Popover.Trigger>
  <Popover.Content placement="bottom-start" sideOffset={8}>
    <VStack align="stretch" gap={8}>
      <Text size="sm">Option one</Text>
      <Text size="sm">Option two</Text>
    </VStack>
  </Popover.Content>
</Popover.Root>
```

`import { Dropdown } from "kovax-react"` is equivalent — **`Dropdown.Root`** / **`Dropdown.Trigger`** / **`Dropdown.Content`** match **`Popover`**.

### Popover — more examples

**Controlled `open`:**

```tsx
const [open, setOpen] = useState(false);

<Popover.Root open={open} onOpenChange={setOpen}>
  <Popover.Trigger>
    <Button type="button">Toggle</Button>
  </Popover.Trigger>
  <Popover.Content placement="bottom-start">
    <Text size="sm">Panel stays in sync with state.</Text>
  </Popover.Content>
</Popover.Root>
```

**Top edge, end-aligned, same width as trigger:**

```tsx
<Popover.Root>
  <Popover.Trigger>
    <Button type="button">Account</Button>
  </Popover.Trigger>
  <Popover.Content placement="top-end" sameWidth sideOffset={10}>
    <VStack align="stretch" gap={8}>
      <Text size="sm">Profile</Text>
      <Text size="sm">Sign out</Text>
    </VStack>
  </Popover.Content>
</Popover.Root>
```

**`Dropdown` alias (identical API):**

```tsx
import { Dropdown } from "kovax-react";

<Dropdown.Root>
  <Dropdown.Trigger>
    <Button type="button">Menu</Button>
  </Dropdown.Trigger>
  <Dropdown.Content placement="bottom-end">
    <Text size="sm">Item</Text>
  </Dropdown.Content>
</Dropdown.Root>
```

### `Popover.Content` props

Extends **`HTMLAttributes<HTMLDivElement>`** for the floating panel.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`placement`** | **`PopoverPlacement`** | **`bottom-start`** | Side + alignment (`bottom`, `bottom-end`, `top-start`, …). |
| **`sideOffset`** | `number` | **`8`** | Gap (px) between trigger and panel. |
| **`sameWidth`** | `boolean` | **`false`** | **`min-width`** matches trigger width. |
| **`closeOnInteractOutside`** | `boolean` | **`true`** | Pointer down outside closes. |
| **`closeOnEscape`** | `boolean` | **`true`** | **Escape** closes. |
| **`contentRole`** | **`dialog` \| `menu`** | **`dialog`** | **`menu`** → **`role="menu"`** on the panel and arrow / Home / End focus among **`role="menuitem"`** descendants (see **`Menu`**). |

### Popover primitives

| Export | Role |
| ------ | ---- |
| **`Popover.Root`** | Provider + controlled / uncontrolled **`open`**. |
| **`Popover.Trigger`** | **`cloneElement`**: toggles open (merges **`onClick`**, **`aria-expanded`**). Optional **`ariaHasPopup`** (**`dialog`** \| **`menu`**) → **`aria-haspopup`**. |
| **`Popover.Content`** | Portal + **`fixed`** positioning vs viewport. |
| **`Dropdown`** | Alias of **`Popover`**. |

Full **`Menu`** / **`DropdownMenu`** documentation lives in **[Menu.md](./Menu.md)** (`kovax-react/menu`).

## Dialog — usage

```tsx
const [open, setOpen] = useState(false);

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger>
    <button type="button">Open</button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Delete item?</Dialog.Title>
    <Dialog.Description>This cannot be undone.</Dialog.Description>
    <Dialog.Close>
      <button type="button">Cancel</button>
    </Dialog.Close>
  </Dialog.Content>
</Dialog.Root>
```

### `Dialog.Content` props

Extends **`HTMLAttributes<HTMLDivElement>`** for the panel.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`closeOnOverlayClick`** | `boolean` | `true` | Click backdrop closes. |
| **`closeOnEscape`** | `boolean` | `true` | **Escape** closes. |

### Primitives

| Export | Role |
| ------ | ---- |
| **`Dialog.Root`** | Provider + controlled / uncontrolled **`open`**. |
| **`Dialog.Trigger`** | **`cloneElement`**: opens dialog on click (merges **`onClick`**). |
| **`Dialog.Content`** | Portal, overlay, trap, lock. |
| **`Dialog.Title`** | **`h2`** + **`aria-labelledby`**. |
| **`Dialog.Description`** | **`p`** + registers **`aria-describedby`** when mounted. |
| **`Dialog.Close`** | Optional child element or default **Close** button. |

## Modal — usage

**Confirmation** (`size="sm"`), **form** (`size="lg"`), **media** (`size="xl"` or **`full`**, **`flush`** body):

```tsx
<Modal.Root>
  <Modal.Trigger>
    <button type="button">Open</button>
  </Modal.Trigger>
  <Modal.Content size="lg">
    <Modal.Header>
      <Modal.Title>Edit profile</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Modal.Description>Update your display name.</Modal.Description>
      {/* inputs */}
    </Modal.Body>
    <Modal.Footer>
      <Modal.Close>
        <button type="button">Cancel</button>
      </Modal.Close>
      <button type="submit">Save</button>
    </Modal.Footer>
  </Modal.Content>
</Modal.Root>
```

### `Modal.Content` props

Extends **`Dialog.Content`** ( **`closeOnOverlayClick`**, **`closeOnEscape`**, …).

| Prop | Type | Default | Description |
| ---- | ---- | ----- | ----------- |
| **`size`** | **`sm`** \| **`md`** \| **`lg`** \| **`xl`** \| **`full`** | **`md`** | Max-width preset for the panel. |

### Layout sections

| Export | Role |
| ------ | ---- |
| **`Modal.Root`** | Same as **`Dialog.Root`**. |
| **`Modal.Trigger`** | Same as **`Dialog.Trigger`**. |
| **`Modal.Content`** | **`Dialog.Content`** + column shell; outer panel does not scroll — **`Modal.Body`** does. |
| **`Modal.Header`** | Top chrome (title row, optional actions). |
| **`Modal.Body`** | **`flex: 1`** + **`overflow-y: auto`**; optional **`flush`** (no padding). |
| **`Modal.Footer`** | Right-aligned action row (**`justify-content: flex-end`**). |
| **`Modal.Title`** | **`Dialog.Title`** without extra heading margin. |
| **`Modal.Description`** | **`Dialog.Description`**. |
| **`Modal.Close`** | **`Dialog.Close`**. |

## Toast — usage

Wrap your app (or a subtree) once:

```tsx
import { Button, ToastProvider, useToast } from "kovax-react";

function Notifier() {
  const { toast, dismissAll } = useToast();
  return (
    <>
      <button type="button" onClick={() => toast({ title: "Saved", variant: "success" })}>
        Save
      </button>
      <button type="button" onClick={() => dismissAll()}>
        Clear
      </button>
    </>
  );
}

export function App() {
  return (
    <ToastProvider placement="bottom-end" limit={5}>
      <Notifier />
    </ToastProvider>
  );
}
```

### Toast — more examples

**Seconds, variant, corner (`toast()` overrides provider placement):**

```tsx
const { toast } = useToast();

toast({
  title: "Saved",
  description: "Draft stored locally.",
  variant: "success",
  durationSeconds: 4,
});

toast({
  title: "Notice",
  placement: "top",
  durationSeconds: 3,
});

toast({
  title: "Corner",
  placement: "bottom-right",
  durationSeconds: 5,
});
```

**Larger surface and action:**

```tsx
toast({
  title: "Archived",
  description: "You can undo this.",
  size: "lg",
  durationSeconds: 8,
  action: { label: "Undo", onClick: () => {} },
});
```

**Stay until the user clicks the action (no ×, no auto-dismiss):**

```tsx
toast({
  title: "Approve to continue",
  persistUntilAction: true,
  action: {
    label: "Approve",
    onClick: () => {},
  },
});
```

**Normalize placement strings (e.g. labels or saved prefs):**

```tsx
import { normalizeToastPlacement, ToastProvider } from "kovax-react";

const corner = normalizeToastPlacement("bottom-left"); // → "bottom-start"
```

### `toast(options)`

| Field | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| **`title`** | `ReactNode` | — | Primary line. |
| **`description`** | `ReactNode` | — | Secondary line. |
| **`variant`** | **`default` \| `success` \| `warning` \| `error`** | **`default`** | Visual tone. |
| **`size`** | **`sm` \| `md` \| `lg`** | **`md`** | Density / max-width. |
| **`placement`** | **`ToastPlacement`** | provider default | Per-toast viewport (aliases **`top`**, **`bottom`**, **`bottom-left`**, **`bottom-right`**). |
| **`durationSeconds`** | `number` | — | Auto-dismiss after N seconds; overrides **`duration`** when set. |
| **`duration`** | `number` | **`5000`** | ms when **`durationSeconds`** omitted; **`0`** / **`Infinity`** = no timer. |
| **`persistUntilAction`** | `boolean` | **`false`** | With **`action`**, no timer and no × until action. |
| **`action`** | **`{ label, onClick }`** | — | Action runs then toast closes. |
| **`id`** | `string` | auto | Custom id (returned from **`toast()`**). |
| **`onDismiss`** | `() => void` | — | Fires when removed for any reason. |
| **`priority`** | **`polite` \| `assertive`** | variant-based | Live region priority. |

### `ToastProvider` props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`placement`** | **`ToastPlacement`** | **`bottom-end`** | Default corner / edge when **`toast()`** omits **`placement`**. |
| **`limit`** | `number` | **`5`** | Max queued toasts; oldest removed when exceeded. |

## Related

- [Button](./Button.md)
- [Form primitives](./Form.md)
