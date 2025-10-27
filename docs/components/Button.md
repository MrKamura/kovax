## 🚀 Button Component Documentation

## 📄 Overview

The **`<Button />`** component is a universal, customizable React button with support for multiple styles (`variant`), colors (`color`), sizes (`size`), loading states (`isLoading`), icons, and full design customization.

Built with SOLID principles and TypeScript.

---

## 📦 Import

```tsx
import { Button } from "kovax";
```

## ⚙️ Props

| Prop                  | Type                                                             | Description                                                    | Default         |
| --------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- | --------------- |
| **`children`**        | `React.ReactNode`                                                | Button content                                                 | `—`             |
| **`variant`**         | `"solid" \| "outline" \| "ghost" \| "link"`                      | Button style variant                                           | `"solid"`       |
| **`size`**            | `"xs" \| "sm" \| "md" \| "lg"\| "xl"`                            | Button size                                                    | `"md"`          |
| **`bg`**              | `string`                                                         | Custom background color (e.g. `"#111827"`)                   | —               |
| **`textColor`**       | `string`                                                         | Custom text color                                              | —               |
| **`borderRadius`**    | `string \| number`                                               | Border radius (e.g. `4`, `"10px"`)                             | `8px`           |
| **`w`**               | `string \| number`                                               | Width (e.g. `"100%"`, `200`)                                   | —               |
| **`h`**               | `string \| number`                                               | Height                                                         | —               |
| **`isLoading`**       | `boolean`                                                        | Enables loading state                                          | `false`         |
| **`color`**           | `"primary" \| "secondary" \| "success" \| "warning"`             | Color theme                                                    | `"primary"`     |
| **`loader`**          | `React.ReactNode`                                                | Custom loader component                                        | Default spinner |
| **`loaderPosition`**  | `"left" \| "right" \| "center"`                                  | Loader position                                                | `"left"`        |
| **`leftIcon`**        | `React.ReactNode`                                                | Icon on the left side                                          | —               |
| **`rightIcon`**       | `React.ReactNode`                                                | Icon on the left side                                          | —               |
| **`shadow`**          | `"none" \| "sm" \| "md" \| "lg"\| "xl"`                          | Shadow size                                                    | `"none"`        |
| **`disabled`**        | `boolean`                                                        | Disables the button                                            | `false`         |
| **`borderColor`**     | `string`                                                         | Border color                                                   | —               |
| **`...rest`**         | `HTMLButtonElement`                                              | All native button attributes (`type`, `title`, `aria-*`, etc.) | —               |

## 🎨 Variants (variant)
| Variant     | Description                 |
| ----------- | --------------------------- |
| `solid`     | Filled background (default) | 
| `outline`   | Transparent with border     |
| `ghost`     | Transparent, no border      | 
| `link`      | Text-only, underlined       | 

## 🎯 Colors
| Color     | Usage                           |
| --------- | ------------------------------- |
| primary   | Primary actions (Blue)          |
| secondary | Secondary actions (Gray)        |
| success   | Success states (Green)          |
| warning   | Warning states (Orange)         |
| error     | Error/destructive actions (Red) |

## 📏 Sizes 
| Size | Height | Font Size | Padding   |
| ---- | ------ | --------- | --------- |
| xs   | 28px   | 12px      | 8px 12px  |
| sm   | 32px   | 14px      | 12px 16px |
| md   | 38px   | 16px      | 12px 24px |
| lg   | 44px   | 18px      | 16px 24px |
| xl   | 50px   | 20px      | 24px 32px |

## 📋 Basic Usage
```tsx
// Basic buttons
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Different sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Different colors
<Button color="primary">Primary</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="error">Error</Button>
```
## 🧩 Customization
```tsx
<Button
  bg="#111827"
  textColor="#fff"
  borderRadius={12}
  w={200}
  h={48}
>
  Custom Button
</Button>
```
## ⏳ Loading States
```tsx
// Basic loading
<Button isLoading>Loading...</Button>

// Different loader positions
<Button isLoading loaderPosition="left">
  Saving...
</Button>

<Button isLoading loaderPosition="center">
  Processing
</Button>

<Button isLoading loaderPosition="right">
  Submitting
</Button>

// Custom loader
<Button 
  isLoading 
  loader={<CustomSpinner />}
>
  Custom Loader
</Button>
```
## 🧱 Icons
```tsx
import { FaCheck, FaArrowRight, FaTrash } from "react-icons/fa";

// Left icon
<Button leftIcon={<FaCheck />}>
  Confirm
</Button>

// Right icon  
<Button rightIcon={<FaArrowRight />}>
  Continue
</Button>

// Both icons
<Button 
  leftIcon={<FaTrash />}
  rightIcon={<FaArrowRight />}
  color="error"
>
  Delete & Continue
</Button>
```
## 🎨 Shadows
```tsx
<Button shadow="sm">Small Shadow</Button>
<Button shadow="md">Medium Shadow</Button>
<Button shadow="lg">Large Shadow</Button>
<Button shadow="xl">Extra Large Shadow</Button>
```

## 🧠 Advanced Examples
```tsx
// Full width loading button
<Button
  isLoading
  loaderPosition="center"
  w="100%"
  color="success"
>
  Processing Payment
</Button>

// Icon button with custom styles
<Button
  leftIcon={<FaStar />}
  variant="outline"
  borderColor="#f59e0b"
  textColor="#f59e0b"
  borderRadius="50%"
  w={40}
  h={40}
/>

// Danger button with confirmation
<Button
  leftIcon={<FaTrash />}
  color="error"
  variant="outline"
  onClick={handleDelete}
>
  Delete Project
</Button>
```

## 🎨 Styling
```tsx
// With CSS classes
<Button className="custom-button-class">
  Styled Button
</Button>

// With inline styles
<Button style={{ fontWeight: 'bold' }}>
  Bold Button
</Button>
```

## 💡 Usage Tips
Use children for button text instead of label

Combine leftIcon and rightIcon for flexible icon placement

Use loaderPosition="center" for centered loading states

variant="link" is perfect for text-only buttons

All spacing props accept both numbers (px) and strings

## 🧾 Example Preview
```tsx
<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  <Button isLoading color="primary" size="sm">Loading</Button>
  <Button variant="outline" color="secondary">Outline</Button>
  <Button variant="ghost" color="success">Ghost</Button>
  <Button variant="link" color="error">Link</Button>
  <Button leftIcon={<FaCheck />} color="success">With Icon</Button>
  <Button isLoading loaderPosition="center" w="100%">Full Width</Button>
</div>
```
© 2025 — Kovax UI Components
Version: 1.0.0 (SOLID Architecture)



