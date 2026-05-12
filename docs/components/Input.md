## Input

Text field with optional **`variant`**, **`InputGroup`** chrome (prefix/suffix), **`floatingLabel`** animated caption, mask, validation-related props, shared spacing props, and **`forwardRef`** to the native **`<input>`**.

For multi-line text see **[Textarea](./Textarea.md)** (same variants / sizes / palettes).

## Import

```tsx
import { Input, InputGroup } from "kovax-react";
```

## Variants

| Value       | Appearance |
| ----------- | ---------- |
| **`default`** | White surface (**`themeToken("white")`**) and **`shadow.sm`**. |
| **`outline`** | Transparent background, border only, no shadow (flat on the page). |
| **`filled`**  | **`colors.secondary[50]`** fill with a softer idle border (**`secondary[200]`**). |

Focus and invalid borders behave the same across variants (accent **`500`** on focus, **`error`** when **`isInvalid`**).

```tsx
<Input variant="default" placeholder="Default" />
<Input variant="outline" placeholder="Outline" />
<Input variant="filled" placeholder="Filled" />
```

## InputGroup

Shared chrome for prefix/suffix slots: one outer border and shadow; focus tint follows **`colorScheme`** (palette **`500`**). Use **`focusin` / `focusout`** on the wrapper so focus is tracked while the caret is inside **`Input`**.

When **`Input`** is **`isInvalid`** or shows **`errorMessage`**, also pass **`isInvalid`** on **`InputGroup`** so the outer border matches the error state.

```tsx
import { Input, InputGroup } from "kovax-react";

<InputGroup leftAddon={<span aria-hidden>🔎</span>} colorScheme="primary">
  <Input variant="outline" placeholder="Search…" aria-label="Search" />
</InputGroup>
```

**`InputGroup`** props (extends **`HTMLAttributes<HTMLDivElement>`** except **`children`**):

- **`leftAddon`** / **`rightAddon`** — **`ReactNode`** (icons usually **`aria-hidden`**).
- **`colorScheme`** — same tokens as **`Input`** (default **`primary`**).
- **`isInvalid`** — error chroma on the outer shell.

Inside a group, **`Input`** drops its own outer border radius and shadow so the control visually merges with the shell.

## Basic usage

```tsx
<Input placeholder="Enter your name" />
<Input value={value} onChange={handleChange} placeholder="Controlled" />

<Input mask="+7 (999) 999-99-99" placeholder="+7 (___) ___-__-__" />

<Input type="email" placeholder="email@example.com" isRequired />
```

## Sizes and color schemes

`size` controls padding and typography; `colorScheme` drives focus/active border color (palette shade **500**).

```tsx
<Input size="sm" colorScheme="success" placeholder="Small · success" />
<Input size="md" colorScheme="warning" placeholder="Medium · warning" />
<Input size="lg" colorScheme="error" placeholder="Large · error" />
```

## States and validation

- **`isReadOnly`** — native `readOnly`, editable only programmatically.
- **`isDisabled`** — native `disabled`, muted surface.
- **`isRequired`** — sets **`required`** and **`aria-required`**.
- **`isInvalid`** + **`errorMessage`** — **`aria-invalid`**, inline error text below the field, and **`aria-describedby`** linking to that message. Any existing **`aria-describedby`** you pass is merged with the error region id.

```tsx
<Input isReadOnly defaultValue="Snapshot" />
<Input isRequired aria-label="Username" />
<Input
  type="email"
  isInvalid
  errorMessage="Enter a valid email."
  defaultValue="bad"
/>
```

## Native types and attributes

Standard **`InputHTMLAttributes`** pass through via **`...restProps`** (e.g. **`type`**, **`min`**, **`max`**, **`step`**, **`maxLength`**, **`autoComplete`**, **`inputMode`**, **`pattern`**).

```tsx
<Input type="password" autoComplete="current-password" aria-label="Password" />
<Input type="number" min={0} step={0.01} aria-label="Amount" />
<Input type="search" maxLength={120} placeholder="Search…" />
```

## Clear button & character count

- **`clearable`** — shows a trailing **`×`** control while there is text (hidden when **`isDisabled`** or **`isReadOnly`**). Uses **`onMouseDown`** **`preventDefault`** so focus stays predictable.
- **`clearAriaLabel`** — required semantics via **`aria-label`** on the button (localize in your app).
- **`onClear`** — fires after **`setDisplayValue("")`** and **`onChange`** (when **`onChange`** is provided).
- Controlled usage: keep **`value`** / **`onChange`** in sync — clearing emits **`onChange`** with **`target.value`** **`""`**.
- **`showCharacterCount`** — when **`true`** and **`maxLength`** is a positive number, renders **`current / max`** under the field (length follows **`displayValue`**, including mask output).
- The counter region **`id`** is appended to **`aria-describedby`** alongside **`errorMessage`** and any **`aria-describedby`** you pass.

```tsx
<Input clearable clearAriaLabel="Clear search" value={q} onChange={(e) => setQ(e.target.value)} />
<Input showCharacterCount maxLength={80} value={bio} onChange={(e) => setBio(e.target.value)} />
```

## Floating label (animated caption)

Set **`floatingLabel`** together with **`placeholder`** to replace the native disappearing placeholder with a caption that:

- rests centered in the field while empty and unfocused;
- transitions to the **top edge** (straddling the border), **scales down**, and picks up accent or error coloring while **focused** or whenever the field has text.

Notes:

- The native **`placeholder`** attribute is omitted so text does not duplicate; an accessible **`<label htmlFor={…}>`** carries the same copy (**`data-testid="kv-input-floating-label"`**).
- Extra **`padding-top`** reserves space for the shrunk caption; in **floated** state the caption is **`width: max-content`** (pill hugs the label text), with minimal padding and a tight **`box-shadow`** spread so the border line clears the glyphs without a wide band.

```tsx
<Input floatingLabel placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
<Input floatingLabel variant="filled" placeholder="Company name" />
```

## Mask patterns

- **`9`** — digit  
- **`a`** / **`A`** — letter (lower / upper enforced on commit per segment)  
- **`*`** — any character  
- Other characters — literals in the mask  

Mask runs on change and normalizes **`value`** for controlled usage.

```tsx
<Input mask="9999 9999 9999 9999" placeholder="Card" inputMode="numeric" />
```

## Composition

Wrap with layout primitives (e.g. **`Box`**) and typography for labels and hints:

```tsx
import { Box, Input, themeToken } from "kovax-react";

<Box p={16} borderRadius={themeToken("borderRadius.md")} boxShadow={themeToken("shadow.sm")}>
  <Input placeholder="Inside card" w="100%" />
</Box>
```

For labelled fields, prefer **`FormControl`** / **`FormLabel`** from the Form docs.

## Props reference

Behaviour and layout types extend `InputHTMLAttributes<HTMLInputElement>` (except **`size`**, **`style`**, and **`color`**, which are used by the styling API) and **`SpacingProps`**.

**Visual and state**

- **`variant`** — **`"default"`** \| **`"outline"`** \| **`"filled"`** (see Variants above).
- **`size`** — **`"sm"`** \| **`"md"`** \| **`"lg"`** (default **`"md"`**).
- **`colorScheme`** — keyof exported **`colors`** (e.g. **`"primary"`**, **`"secondary"`**, **`"error"`**).
- **`isInvalid`**, **`errorMessage`**, **`isDisabled`**, **`isReadOnly`**, **`isRequired`**
- **`mask`** — pattern string (see above).
- **`maskChar`** — documented placeholder character for empty slots (default **`"_"`**); formatting primarily follows literals in **`mask`** today.
- **`clearable`**, **`clearAriaLabel`**, **`onClear`** — optional reset affordance (see Clear button section above).
- **`showCharacterCount`** — toggles the **`maxLength`** helper row when **`maxLength`** is set.
- **`floatingLabel`** — animated caption from **`placeholder`** (see Floating label section above).

**Spacing**

Any **`SpacingProps`** field applies to the input (**`w`**, **`h`**, **`m`**, **`p`**, **`display`**, …). See [**`Box`**](./Layout/Box.md) / **`src/types/spacing.ts`**.

**Ref**

`Input` is a **`forwardRef`** component; the ref attaches to the native **`<input>`**.

## Implementation notes

- Masking is implemented in the component; there is no **`react-input-mask`** dependency.
- Border, shadow, and transitions resolve tokens via **`themeToken(...)`** from **`src/components/theme/tokens.ts`**.
- **`InputGroup`** exposes **`InputGroupContext`** for consumers that need to detect grouping ( **`Input`** reads it internally ).
- **`maskChar`** is part of the public API; slot rendering still primarily follows literals in **`mask`**.
- **Keyboard focus:** a **`:focus-visible`** double ring (**`white`** + **`colorScheme`** **`500`**, or **`error`** when invalid) is layered on **`boxShadow`** for standalone **`Input`** and on the **`InputGroup`** shell when the field is grouped (mouse focus keeps the accent border only).
- **`clearable`** fields expose **`data-testid="kv-input-clear"`** on the reset control for tests.
- **`floatingLabel`** exposes **`data-testid="kv-input-floating-label"`** ( **`data-floated`** reflects focus/filled state).

## Roadmap ideas

- **Textarea** or **`as`** polymorphism — multiline or **`React.forwardRef`** host switching where typings stay strict.

## Meta

- Package version: root **`package.json`**
- Tests: **`src/components/Input/__tests__/`**
