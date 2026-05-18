# Menu / DropdownMenu

Anchored **`role="menu"`** built on **`Popover`** — same portal positioning, outside dismiss, and **Escape** to close, plus **↑ / ↓**, **Home / End** among **`Menu.Item`** rows and **Enter / Space** to activate.

**`DropdownMenu`** is an alias of **`Menu`** (same object); use whichever reads clearer in your codebase.

## Import

```tsx
import { Menu, DropdownMenu } from "kovax-react";
import {
  Menu,
  DropdownMenu,
  ensureMenuKeyframes,
  menuPanelMotionAnimation,
} from "kovax-react/menu";
```

Use **`usePopoverRootContext`** only when building custom primitives; it is exported from **`kovax-react`** (Popover surface), not from **`kovax-react/menu`**.

## Usage

```tsx
import { Button, Menu, Text, themeToken } from "kovax-react";

<Menu.Root>
  <Menu.Trigger>
    <Button type="button" variant="outline" color="secondary">
      Account
    </Button>
  </Menu.Trigger>
  <Menu.Content placement="bottom-start">
    <Menu.Item onSelect={() => {}}>
      <Text size="sm">Profile</Text>
    </Menu.Item>
    <Menu.Item onSelect={() => {}}>
      <Text size="sm">Settings</Text>
    </Menu.Item>
    <Menu.Separator />
    <Menu.Item onSelect={() => {}}>
      <Text size="sm" style={{ color: themeToken("error.600") }}>
        Sign out
      </Text>
    </Menu.Item>
  </Menu.Content>
</Menu.Root>
```

### Controlled open state

```tsx
const [open, setOpen] = useState(false);

<Menu.Root open={open} onOpenChange={setOpen}>
  <Menu.Trigger>
    <Button type="button">Toggle</Button>
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item onSelect={() => setOpen(false)}>Done</Menu.Item>
  </Menu.Content>
</Menu.Root>
```

### Same width as trigger

Forward **`sameWidth`** to **`Menu.Content`** (Popover prop):

```tsx
<Menu.Content placement="bottom-start" sameWidth>
  …
</Menu.Content>
```

### Animation (`motion`)

By default **`Menu.Content`** runs a short **enter** animation (**`kv-menu-enter`**: fade + slight slide / scale). Motion timing uses **`themeToken("duration.fast")`** and **`themeToken("easing.decelerate")`**.

- **`motion={false}`** — no keyframes; use when matching **`prefers-reduced-motion`** from app logic or for tests.
- Keyframes are injected once via **`ensureMenuKeyframes()`** (called automatically when **`motion`** is true).

Override via **`style`** if needed, e.g. **`style={{ animation: "none" }}`**.

### Advanced: raw Popover

You can build a custom menu surface with **`Popover.Content contentRole="menu"`** and **`Popover.Trigger ariaHasPopup="menu"`**; **`Menu.Item`** still works inside **`Popover.Root`** because it uses the same context (**`usePopoverRootContext`**).

## Props

### `Menu.Content`

Extends **`Popover.Content`** props except **`contentRole`** (forced to **`menu`**).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| **`motion`** | **`boolean`** | **`true`** | **`kv-menu-enter`** animation on open. |
| … | — | — | **`placement`**, **`sameWidth`**, **`sideOffset`**, **`closeOnEscape`**, **`closeOnInteractOutside`**, **`style`**, **`className`**, native **`div`** attributes. |

### `Menu.Item`

Extends **`HTMLAttributes<HTMLDivElement>`** (minus **`role`** / **`tabIndex`**).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| **`disabled`** | **`boolean`** | — | Skipped by arrow keys; **`aria-disabled`**. |
| **`onSelect`** | **`() => void`** | — | Runs before the menu closes (unless **`preventDefault`** on click). |

### `Menu.Separator`

Horizontal **`role="separator"`** — purely visual grouping.

## Accessibility

- Trigger: **`aria-expanded`**, **`aria-haspopup="menu"`**, **`aria-controls`** when open.
- Panel: **`role="menu"`**; items **`role="menuitem"`**, **`tabIndex={-1}`**, roving focus via arrow keys.
- Prefer **`motion={false}`** when the user requests reduced motion.

## See also

- **[Overlays](./Overlays.md)** — **`Popover`**, **`Tooltip`**, **`Dialog`**, **`Modal`**, **`Toast`**.
- **Playground:** **Components → Menu** — live examples (Preview / Code).
