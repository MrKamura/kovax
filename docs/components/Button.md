## 🚀 Button Component Documentation

## 📄 Overview

The **`<Button />`** component is a universal, customizable React button with support for multiple styles (`variant`), colors (`color`), sizes (`size`), loading states (`isLoading`), icons, polymorphic **`as`**, **`IconButton`**, **`ButtonGroup`**, and design-token-driven styling.

Built with SOLID principles and TypeScript.

---

## 📦 Import

```tsx
import { Button, IconButton, ButtonGroup } from "kovax-react";
```

`Button` forwards its `ref` to the underlying host element (`HTMLElement`). With `as="button"` (default), that host is a native `<button>`.

## Accessibility

- **Touch targets:** Aim for about **44×44 CSS px** minimum for primary tap targets (Apple HIG / Material guidance). Text-sized buttons may be smaller; use **`IconButton`** for icon-only actions so hit area is bumped to at least **44px**.
- **Contrast:** Pair **`variant`** / **`color`** so text and icons meet contrast expectations against your page background (solid buttons use theme **`white`** foreground on saturated fills).
- **Focus:** On keyboard focus, **`Button`** adds a visible **focus ring** (two-layer shadow using **`primary.500`**). Prefer not to remove `:focus` outlines via global CSS without replacing them.

## Icons (recommended)

Use **[react-icons](https://www.npmjs.com/package/react-icons)** for SVG icons in your app:

```bash
npm install react-icons
```

Import named icons from icon packs (Font Awesome, Material Design, Heroicons, etc.) and pass them to **`leftIcon`** / **`rightIcon`**, or use them inside a custom **`loader`**. Kovax does **not** ship an icon set so you keep bundle size under control and stay consistent with one ecosystem.

Browse sets: [react-icons.github.io/react-icons](https://react-icons.github.io/react-icons/).

For icon-only buttons, prefer **`IconButton`** ( **`aria-label`** is required in its TypeScript contract ) or set **`aria-label`** on **`Button`** and hide decorative icons with **`aria-hidden`**.

## ⚙️ Props

| Prop                  | Type                                                             | Description                                                    | Default         |
| --------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- | --------------- |
| **`children`**        | `React.ReactNode`                                                | Button content                                                 | `—`             |
| **`variant`**         | `"solid" \| "outline" \| "ghost" \| "link" \| "destructive"`     | Style variant; **`destructive`** maps to solid **`error`**      | `"solid"`       |
| **`size`**            | `"xs" \| "sm" \| "md" \| "lg"\| "xl"`                            | Button size                                                    | `"md"`          |
| **`as`**              | `React.ElementType`                                              | Host element (`"button"`, `"a"`, **`Link`**, etc.)             | `"button"`      |
| **`fullWidth`**       | `boolean`                                                        | Shortcut for **`w="100%"`**                                     | `false`         |
| **`loadingText`**     | `string`                                                         | Screen-reader text while loading; enables polite **`aria-live`** when set | `—` |
| **`pressed`**         | `boolean`                                                        | Sets **`aria-pressed`** (toggle / toolbar semantics)           | `—`             |
| **`iconSize`**        | `number \| string`                                               | **`font-size`** on icon / loader slots (helps **`react-icons`**) | `—`             |
| **`bg`**              | `string`                                                         | Custom background color (e.g. `"#111827"`)                   | —               |
| **`textColor`**       | `string`                                                         | Custom text color                                              | —               |
| **`borderRadius`**    | `string \| number`                                               | Border radius (e.g. `4`, `"10px"`)                             | `8px`           |
| **`w`**               | `string \| number`                                               | Width (e.g. `"100%"`, `200`)                                   | —               |
| **`h`**               | `string \| number`                                               | Height                                                         | —               |
| **`isLoading`**       | `boolean`                                                        | Enables loading state (**`aria-busy`** when true)               | `false`         |
| **`color`**           | `"primary" \| "secondary" \| "success" \| "warning" \| "error"` | Color theme                                                    | `"primary"`     |
| **`loader`**          | `React.ReactNode`                                                | Custom loader component                                        | Default spinner |
| **`loaderPosition`**  | `"left" \| "right" \| "center"`                                  | Loader position                                                | `"left"`        |
| **`leftIcon`**        | `React.ReactNode`                                                | Icon on the left side                                          | —               |
| **`rightIcon`**       | `React.ReactNode`                                                | Icon on the right side                                         | —               |
| **`shadow`**          | `"none" \| "sm" \| "md" \| "lg"\| "xl"`                          | Shadow size                                                    | `"none"`        |
| **`disabled`**        | `boolean`                                                        | Disables the button                                            | `false`         |
| **`borderColor`**     | `string`                                                         | Border color                                                   | —               |
| **`href`**, **`target`**, … | Anchor passthrough                                          | Common `<a>` props when using **`as="a"`**                      | —               |
| **`...rest`**         | `HTMLButtonElement` + anchor picks                               | Native props (**`type`**, **`title`**, **`aria-*`**, etc.)      | —               |

## 🎨 Variants (variant)
| Variant       | Description                                         |
| ------------- | --------------------------------------------------- |
| `solid`       | Filled background (default)                         |
| `outline`     | Transparent with border                             |
| `ghost`       | Transparent, no border                              |
| `link`        | Text-only, underlined                               |
| `destructive` | Preset solid **`error`** (destructive actions)       |

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
<Button variant="destructive">Destructive preset</Button>
<Button variant="destructive">Delete project</Button>
```
## 🔗 Polymorphic `as`

Use **`as`** to render the same visuals on another element. With **`as="a"`**, pass **`href`** / **`target`** / **`rel`** as usual. For **React Router** **`Link`**, router-specific props (**`to`**, etc.) are not on the base types—cast once or extend locally:

```tsx
import { Link } from "react-router-dom";
import { Button } from "kovax-react";

<Button as={Link} to="/profile" variant="ghost">
  Profile
</Button>;
```

Non-**`<button>`** hosts use **`aria-disabled`** and **`tabIndex={-1}`** when **`disabled`** or **`isLoading`** instead of the **`disabled`** attribute.

## 🧩 IconButton & ButtonGroup

**`IconButton`** wraps **`Button`** with **`aria-label`** required and a square minimum touch target (**≥ 44px**).

```tsx
<IconButton aria-label="Close dialog" icon={<MdClose aria-hidden />} variant="ghost" />
```

**`ButtonGroup`** renders **`role="group"`**. Pass **`aria-label`** (or **`aria-labelledby`**) to name the group. Use **`attached`** for merged corners and overlapping borders (outline buttons).

```tsx
<ButtonGroup aria-label="Alignment" attached>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>
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

The default spinner (**`DefaultLoader`**) applies rotation with a small **`@keyframes`** stylesheet injected once in the document (it does **not** rely on Tailwind’s `animate-spin`), so it rotates correctly in any app.

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

// Loading + screen reader status
<Button isLoading loadingText="Saving your changes">
  Save
</Button>
```

## 🧱 Icons (react-icons examples)

```tsx
import { FaArrowRight, FaCheck, FaTrash } from "react-icons/fa";

// Left / right icons
<Button leftIcon={<FaCheck aria-hidden size={16} />} color="primary">
  Confirm
</Button>

<Button variant="outline" rightIcon={<FaArrowRight aria-hidden size={16} />}>
  Continue
</Button>

// Both sides
<Button leftIcon={<FaTrash aria-hidden />} rightIcon={<FaArrowRight aria-hidden />} color="error">
  Delete & continue
</Button>

// Icon-only — prefer IconButton (aria-label required by types)
<IconButton
  aria-label="Delete item"
  variant="outline"
  color="error"
  icon={<FaTrash aria-hidden />}
  iconSize={18}
/>
```

Shared **`iconSize`** avoids repeating **`size`** on every **`react-icons`** node:

```tsx
<Button leftIcon={<FaCheck aria-hidden />} iconSize={18} color="primary">
  OK
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
Use **`children`** for visible button text instead of a separate label prop.

Combine **`leftIcon`** and **`rightIcon`** for flexible icon placement.

Use **`loaderPosition="center"`** for centered loading states.

**`variant="link"`** is suited to low-emphasis, text-like actions.

## 🧭 Migration notes

- **`variant="destructive"`** is a convenience preset equivalent to **`variant="solid"`** **`color="error"`** (still respects **`bg`** overrides).
- **`fullWidth`** replaces repetitive **`w="100%"`** for block-level buttons.
- Prefer **`IconButton`** over **`Button`** with **`{null}`** **`children`** for icon-only actions.

## 🧾 Example Preview
```tsx
<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  <Button isLoading color="primary" size="sm">Loading</Button>
  <Button variant="outline" color="secondary">Outline</Button>
  <Button variant="ghost" color="success">Ghost</Button>
  <Button variant="link" color="error">Link</Button>
  <Button leftIcon={<span aria-hidden>✓</span>} color="success">With Icon</Button>
  <Button isLoading loaderPosition="center" w="100%">Full Width</Button>
</div>
```
## Meta

- Package name: `kovax-react` (see repository `package.json` for version).
