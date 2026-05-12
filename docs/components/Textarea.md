## Textarea

Multi-line field with the same **`variant`**, **`size`**, and **`colorScheme`** rhythm as **`Input`**, plus **`floatingLabel`**, **`showCharacterCount`**, validation helpers, **`resize`** (CSS), shared **`SpacingProps`**, and **`forwardRef`** to the native **`<textarea>`**.

## Import

```tsx
import { Textarea } from "kovax-react";
// Optional bundle:
import { Textarea } from "kovax-react/input";
```

## Usage

```tsx
<Textarea placeholder="Comments" rows={5} />

<Textarea
  floatingLabel
  placeholder="Description"
  variant="outline"
  maxLength={500}
  showCharacterCount
/>

<Textarea isInvalid errorMessage="Required." aria-label="Notes" />
```

## Props

Extends **`TextareaHTMLAttributes<HTMLTextAreaElement>`** (minus conflicting **`style`** / **`color`**) and **`SpacingProps`**.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "outline" \| "filled"` | `"default"` | Surface / shadow like **`Input`**. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding and font size. |
| `colorScheme` | palette key | `"primary"` | Focus border (**500**) and floating caption tint. |
| `rows` | `number` | `4` | Forwarded to **`<textarea>`**. |
| `resize` | CSS `resize` | `"vertical"` | Pass `"none"`, `"both"`, etc., as needed. |
| `floatingLabel` | `boolean` | `false` | Uses **`placeholder`** text as animated caption (native placeholder hidden). |
| `showCharacterCount` | `boolean` | `false` | Shows current / **`maxLength`** when **`maxLength`** is set. |
| `isInvalid` | `boolean` | `false` | Error border + **`aria-invalid`**. |
| `errorMessage` | `string` | — | Inline error below; wired via **`aria-describedby`**. |
| `isDisabled` | `boolean` | `false` | Native **`disabled`**. |
| `isReadOnly` | `boolean` | `false` | Native **`readOnly`**. |
| `isRequired` | `boolean` | `false` | **`required`** + **`aria-required`**. |

Other native attributes (**`name`**, **`autoComplete`**, **`wrap`**, **`cols`**, …) pass through.

## FormControl

Like **`Input`**, **`Textarea`** reads **`FormControlContext`** (**`isInvalid`**, **`isRequired`**, **`isDisabled`**) when you omit those props — see [Form](./Form.md).

## Notes

- **Controlled vs uncontrolled**: passing **`value`** opts into syncing from props (same **`in`** pattern as **`Input`**).
- **Focus ring**: keyboard **`focus-visible`** adds a stacked shadow ring; pointer focus keeps the accent border only.
