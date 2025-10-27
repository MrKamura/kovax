## 🧩 Input Component

A flexible, customizable, and accessible text input component with full TypeScript support, input masking, validation states, comprehensive spacing/layout control, shadows, transitions, and ARIA accessibility.

Version: 1.0.0 — SOLID Architecture
Tags: #React #UI #DesignSystem #Input #Accessibility #TypeScript #Masking #KovaxReact #Frontend #ComponentLibrary

## 📦 Import
```tsx
import { Input } from "kovax-react";
```

## 🚀 Basic Usage
```tsx
<Input placeholder="Enter your name" />
<Input value={value} onChange={handleChange} placeholder="Controlled" />

<Input 
  mask="+7 (999) 999-99-99"
  placeholder="+7 (___) ___-__-__"
/>

<Input 
  type="email" 
  placeholder="email@example.com"
  isRequired
/>
```

## ⚙️ Props Reference
# 🧱 Core Props
| Prop         | Type                                                                | Default     | Description                             |
| ------------ | ------------------------------------------------------------------- | ----------- | --------------------------------------- |
| variant      | `"default"` | `"outline"` | `"filled"`                              | `"default"` | Visual variant                          |
| size         | `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"`                          | `"md"`      | Input size                              |
| colorScheme  | `"primary"` | `"secondary"` | `"success"` | `"warning"` | `"error"` | `"primary"` | Theme color                             |
| isInvalid    | `boolean`                                                           | `false`     | Validation error state                  |
| errorMessage | `string`                                                            | `undefined` | Error text below input                  |
| isDisabled   | `boolean`                                                           | `false`     | Disable the input                       |
| isReadOnly   | `boolean`                                                           | `false`     | Make input read-only                    |
| isRequired   | `boolean`                                                           | `false`     | Mark as required                        |
| mask         | `string`                                                            | `undefined` | Input mask pattern (`react-input-mask`) |
| maskChar     | `string`                                                            | `"_"`       | Character for empty mask positions      |

# 📏 Spacing & Layout Props
| Prop                                  | Type            | Description        |
| ------------------------------------- | --------------- | ------------------ |
| w, h                                  | string | number | Width and height   |
| minW, maxW, minH, maxH                | string | number | Min/max dimensions |
| m, mt, mr, mb, ml                     | string | number | Margin control     |
| p, pt, pr, pb, pl                     | string | number | Padding control    |
| flex, flexGrow, flexShrink, flexBasis | string | number | Flexbox properties |
| display                               | string          | Display mode       |
| position                              | string          | Position type      |
| top, right, bottom, left              | string | number | Position offsets   |
| textAlign                             | string          | Text alignment     |

# 🌈 Colors
| Color     | Usage                           |
| --------- | ------------------------------- |
| primary   | Primary actions (Blue)          |
| secondary | Secondary actions (Gray)        |
| success   | Success states (Green)          |
| warning   | Warning states (Orange)         |
| error     | Error/destructive actions (Red) |

# 📐 Sizes
| Size | Height | Font Size | Padding   | Usage             |
| ---- | ------ | --------- | --------- | ----------------- |
| xs   | 28px   | 12px      | 8px 12px  | Compact UI        |
| sm   | 32px   | 14px      | 12px 16px | Small forms       |
| md   | 38px   | 16px      | 12px 24px | Default           |
| lg   | 44px   | 18px      | 16px 24px | Large             |
| xl   | 50px   | 20px      | 24px 32px | Extra large forms |

# ☁️ Shadows
| Shadow | Example                        | Description         |
| ------ | ------------------------------ | ------------------- |
| `sm`   | `0 1px 2px rgba(0,0,0,0.05)`   | Light elevation     |
| `md`   | `0 4px 6px rgba(0,0,0,0.1)`    | Default depth       |
| `lg`   | `0 10px 15px rgba(0,0,0,0.15)` | Prominent elevation |

# ⚡ Transitions
| Property        | Default                   | Description                    |
| --------------- | ------------------------- | ------------------------------ |
| transition      | `all 0.2s ease`           | Smooth hover/focus transitions |
| focusTransition | `border-color 0.15s ease` | Border and glow transition     |

## 📦 Box Integration

The Input fully supports all Box props for layout and responsiveness.
This enables seamless composition in UI structures.

```tsx
import { Box, Input } from "kovax-react";

<Box w="400px" p={16} shadow="md" rounded="lg">
  <Input placeholder="Inside Box" w="100%" />
</Box>
```

## 💡 Extended Description

The Input component in kovax-react is built following the SOLID principles and Atomic Design methodology.
It serves as a foundation for form interactions, supporting accessibility, masking, and theme consistency across projects.
All size, spacing, and visual parameters align with the Kovax Design System, ensuring visual harmony and scalability in large applications.

Key highlights:

* Fully typed with TypeScript

* Built on React and react-input-mask

* ARIA-compliant by default

* Modular and composable via Box system

* Theme-aware color, shadow, and spacing tokens

* Optimized for performance and reuse

## 🆕 What's New in v1.0.0

✅ SOLID Architecture — modular, maintainable structure
✅ Integrated react-input-mask for robust masking
✅ Added shadow, size, and transition tokens
✅ Enhanced ARIA accessibility
✅ TypeScript-first implementation
✅ Improved layout control with Box
✅ 50+ unit tests ensuring reliability