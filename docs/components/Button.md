# 🚀 Button Component Documentation

## 📄 Overview

The **`<Button />`** component is a universal, customizable React button with support for multiple styles (`variant`), sizes (`size`), loading states (`loading`), icons, and full design customization through props such as `bg`, `textColor`, `radius`, `w`, and `h`.

It’s designed for any modern React application, written in TypeScript, and dependency-free.

---

## 📦 Import

```tsx
import { Button } from "kovax";

⚙️ Props

| Prop                  | Type                                                             | Description                                                    | Default         |
| --------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- | --------------- |
| **`label`**           | `string`                                                         | Button text                                                    | `""`            |
| **`variant`**         | `"primary" \| "secondary" \| "success" \| "warning" \| "danger"` | Defines the color theme of the button                          | `"primary"`     |
| **`size`**            | `"sm" \| "md" \| "lg"`                                           | Sets button size (affects padding and font)                    | `"md"`          |
| **`bg`**              | `string`                                                         | Custom background color (e.g. `"#111827"`)                     | —               |
| **`textColor`**       | `string`                                                         | Custom text color                                              | —               |
| **`radius`**          | `string \| number`                                               | Border radius (e.g. `4`, `"10px"`)                             | `8px`           |
| **`w`**               | `string \| number`                                               | Width (e.g. `"100%"`, `200`)                                   | —               |
| **`h`**               | `string \| number`                                               | Height                                                         | —               |
| **`loading`**         | `boolean`                                                        | Enables loading state                                          | `false`         |
| **`loadingText`**     | `string`                                                         | Text to display while loading                                  | `"Loading..."`  |
| **`loadingPosition`** | `"left" \| "right" \| "center"`                                  | Loader position relative to the text                           | `"left"`        |
| **`loader`**          | `React.ReactNode`                                                | Custom loader component                                        | Default spinner |
| **`disabled`**        | `boolean`                                                        | Disables the button                                            | `false`         |
| **`icon`**            | `React.ReactNode`                                                | Icon element (rendered on the left)                            | —               |
| **`onClick`**         | `() => void`                                                     | Click event handler                                            | —               |
| **`...rest`**         | `HTMLButtonElement`                                              | All native button attributes (`type`, `title`, `aria-*`, etc.) | —               |

🎨 Variants (variant)
| Variant     | Color  | Example   |
| ----------- | ------ | --------- |
| `primary`   | Blue   | `#3b82f6` |
| `secondary` | Gray   | `#64748b` |
| `success`   | Green  | `#10b981` |
| `warning`   | Orange | `#f59e0b` |
| `danger`    | Red    | `#ef4444` |

📏 Sizes (size)
| Size | Padding     | Font size |
| ---- | ----------- | --------- |
| `sm` | `6px 12px`  | `14px`    |
| `md` | `8px 16px`  | `15px`    |
| `lg` | `10px 20px` | `16px`    |

Example:
<Button label="Small" size="sm" />
<Button label="Medium" size="md" />
<Button label="Large" size="lg" />
```

🧩 Customization

You can override default visuals using props:
<Button
  label="Custom Button"
  bg="#111827"
  textColor="#fff"
  radius={12}
  w={200}
  h={48}
/>

⏳ Loading State (loading)

When loading is true, the button shows a spinner and becomes disabled by default.
The loader position can be set via loadingPosition.
<Button
  label="Save"
  loading
  loadingText="Saving..."
  loadingPosition="left"
/>
💡 You can replace the default loader with your own spinner component via the loader prop.

🧱 Icons (icon)

You can insert any icon or JSX element before the text:

import { FaCheck, FaTrash } from "react-icons/fa";

<Button label="Confirm" icon={<FaCheck />} variant="success" />
<Button label="Delete" icon={<FaTrash />} variant="danger" />

🚫 Disabled State (disabled)

Disables interaction and dims the button.
<Button label="Disabled" disabled />


🧠 Combinations & Examples

🔹 Primary + icon + loader
<Button
  label="Done"
  variant="success"
  w="100%"
  h={42}
/>


🔹 Success + custom width
<Button
  label="Done"
  variant="success"
  w="100%"
  h={42}
/>

🔹 Danger + custom background
<Button
  label="Delete"
  bg="#991b1b"
  textColor="#fff"
  radius={6}
/>


🎨 Styling (with CSS or Tailwind)

The component uses inline styles but supports a className prop for external styling:
<Button
  label="Styled with Tailwind"
  className="shadow-md hover:shadow-lg transition-all"
/>
💡 Usage Tips

Prefer variant for consistent design system integration.

bg and textColor override default variant colors.

Use loadingText to avoid empty space when loading.

w and h accept both number (px) and string ("100%", "10rem").

For fully rounded buttons, set radius="50%" or a large numeric value.

🧰 Future Improvements (Recommended)

Planned or suggested enhancements:

✅ Additional variants (outline, ghost, link)

🌙 Dark mode support

🎨 Gradients & shadows via props

🔄 as prop for polymorphic rendering (<Link> or <a>)

♿️ Accessibility (aria-*, keyboard navigation)

🗂 File Placement

Place this documentation file in one of these locations:

/src/components/Button/BUTTON.md


or

/docs/BUTTON.md

🧾 Example Button Preview
<div style={{ display: "flex", gap: 16 }}>
  <Button loading color="primary" size="sm">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="success">Success</Button>
  <Button variant="warning">Warning</Button>
  <Button variant="danger" loading loadingPosition="center">Danger</Button>
</div>


© 2025 — Kovax UI Components
Version: 0.0.3



