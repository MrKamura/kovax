## Checkbox, Radio & Switch

Native **`checkbox`** / **`radio`** inputs with Kovax tokens, **`size`** / **`colorScheme`**, spacing props, and **`FormControl`** integration (**`isInvalid`**, **`isDisabled`**, **`isRequired`** merge from context unless overridden). **`Switch`** is a styled **`checkbox`** with **`role="switch"`** for binary on/off UI.

## Import

```tsx
import { Checkbox, Radio, RadioGroup, Switch } from "kovax-react";
```

## Checkbox

Implicit label when **`children`** wrap the control (native **`label`**). Controlled vs uncontrolled matches **`checked`** / **`defaultChecked`** as usual.

```tsx
<Checkbox defaultChecked>Accept terms</Checkbox>

<Checkbox size="sm" colorScheme="success">
  Small success
</Checkbox>

<FormControl isInvalid>
  <Checkbox id="tos">Terms</Checkbox>
  <FormError id="tos-error">Required.</FormError>
</FormControl>
```

### Checkbox props

Extends **`InputHTMLAttributes<HTMLInputElement>`** except **`size`** and **`type`**, plus **`SpacingProps`**.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`size`** | `'sm' \| 'md' \| 'lg'` | `'md'` | Box and check glyph scale. |
| **`colorScheme`** | **`ColorName`** | `'primary'` | Checked / focus accent palette. |
| **`isInvalid`** | `boolean` | — | **`aria-invalid`**; uses **`FormControl`** context when omitted. |
| **`isDisabled`** | `boolean` | — | Disables input; uses context when omitted. |
| **`isRequired`** | `boolean` | — | **`required`** / **`aria-required`**; uses context when omitted. |

## RadioGroup & Radio

**`RadioGroup`** sets a shared **`name`**, manages selection (**`value`** / **`defaultValue`** / **`onValueChange`**), renders **`role="radiogroup"`**, and can disable all radios with **`isDisabled`**.

```tsx
const [tier, setTier] = React.useState("pro");

<RadioGroup name="tier" value={tier} onValueChange={setTier}>
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
</RadioGroup>
```

Outside **`RadioGroup`**, each **`Radio`** needs its own **`name`** (and **`checked`** / **`onChange`** or uncontrolled **`defaultChecked`**) so browsers group them correctly.

### RadioGroup props

Extends **`SpacingProps`** (applied to the radiogroup wrapper).

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`name`** | `string` | — | **`name`** on nested **`Radio`** inputs. |
| **`value`** | `string` | — | Controlled selected **`Radio`** **`value`**. |
| **`defaultValue`** | `string` | `''` | Initial selection when uncontrolled. |
| **`onValueChange`** | `(value: string) => void` | — | Fires when selection changes. |
| **`isDisabled`** | `boolean` | `false` | Disables all radios in the group. |
| **`children`** | `ReactNode` | — | **`Radio`** elements (and layout wrappers if needed). |

### Radio props

**`value`** is required (submitted string for this option). Same **`size`** / **`colorScheme`** / validation helpers as **`Checkbox`**.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| **`value`** | `string` | — | Option value; must match group selection when grouped. |
| **`size`** | `'sm' \| 'md' \| 'lg'` | `'md'` | Control scale. |
| **`colorScheme`** | **`ColorName`** | `'primary'` | Selected / focus accent. |
| **`isInvalid`** / **`isDisabled`** / **`isRequired`** | `boolean` | — | Same semantics as **`Checkbox`**; **`isDisabled`** also respects group **`isDisabled`**. |

## Switch

Binary toggle: native **`checkbox`** with **`role="switch"`** and **`aria-checked`**. Labeling via **`children`** (implicit **`label`**) or **`aria-label`**.

```tsx
<Switch defaultChecked>Notifications</Switch>

<Switch size="lg" colorScheme="secondary" aria-label="Dark mode" />
```

### Switch props

Extends **`InputHTMLAttributes<HTMLInputElement>`** except **`size`**, **`type`**, and **`role`**, plus **`SpacingProps`**. Same **`size`** / **`colorScheme`** / **`isInvalid`** / **`isDisabled`** / **`isRequired`** pattern as **`Checkbox`**.

## Accessibility

- Focus rings follow **`:focus-visible`** behavior via shared **`useFocusVisible`**.
- Invalid state sets **`aria-invalid`** when **`isInvalid`** is true (from prop or **`FormControl`**).
- **`RadioGroup`** exposes **`radiogroup`**; individual radios rely on native **`radio`** semantics (**do not** add redundant **`role="radio"`** on the input).

## Related

- [Input](./Input.md)
- [Select & Combobox](./Select.md)
- [Tooltip & Dialog](./Overlays.md)
- [Form primitives](./Form.md) — **`FormControl`**, **`FormLabel`**, **`FormError`**
