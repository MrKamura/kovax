# 🧩 Input Component

A flexible and accessible text input field with full TypeScript support.

---

## 📦 Import

```tsx
import { Input } from "kovax-react";
```

## 🚀 Usage

```tsx
<Input placeholder="Enter your name" />
```
## 🎨 Variants

Variant	Description
| Variant   | Description             |
| --------- | ----------------------- |
| `default` | Standard bordered input |
| `outline` | Thicker outlined border |
| `filled`  | Background-filled style |


```tsx
<Input variant="outline" placeholder="Outlined input" />
<Input variant="filled" placeholder="Filled input" />
```
## 🌈 Color Schemes
| Scheme    | Description |
| --------- | ----------- |
| `primary` | Blue        |
| `success` | Green       |
| `warning` | Yellow      |
| `danger`  | Red         |
| `neutral` | Gray        |


```tsx
<Input colorScheme="success" placeholder="Success input" />
<Input colorScheme="danger" placeholder="Error input" />
```

## 📏 Sizes
| Size | Description        |
| ---- | ------------------ |
| `sm` | Small (compact UI) |
| `md` | Default            |
| `lg` | Large for forms    |


```tsx
<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />
<Input size="lg" placeholder="Large input" />
```

## ⚠️ Validation States
```tsx
<Input
  isInvalid
  errorMessage="Invalid email"
  placeholder="Enter your email"
/>
```
## 🔧 Props
| Prop           | Type                                                           | Default     | Description             |
| -------------- | -------------------------------------------------------------- | ----------- | ----------------------- |
| `variant`      | `"default" \| "outline" \| "filled"`                           | `"default"` | Visual variant          |
| `size`         | `"sm" \| "md" \| "lg"`                                         | `"md"`      | Input size              |
| `colorScheme`  | `"primary" \| "success" \| "warning" \| "danger" \| "neutral"` | `"primary"` | Theme color             |
| `isInvalid`    | `boolean`                                                      | `false`     | Validation error state  |
| `errorMessage` | `string`                                                       | `undefined` | Error text below input  |
| `isDisabled`   | `boolean`                                                      | `false`     | Disable the input       |
| `isReadOnly`   | `boolean`                                                      | `false`     | Make input read-only    |
| `isRequired`   | `boolean`                                                      | `false`     | Mark as required        |
| `className`    | `string`                                                       | —           | Custom Tailwind classes |


