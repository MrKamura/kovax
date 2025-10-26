## 🧩 Input Component
A flexible, customizable, and accessible text input component with full TypeScript support, input masking, validation states, and comprehensive spacing/layout control.

## 📦 Import
```tsx
import { Input } from "kovax-react";
```
## 🚀 Basic Usage
```tsx
// Simple text input
<Input placeholder="Enter your name" />

// Input with phone mask
<Input 
  mask="+7 (999) 999-99-99"
  placeholder="+7 (___) ___-__-__"
/>

// Email input
<Input type="email" placeholder="email@example.com" />
```
## 🎨 Variants
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
| Scheme      | Description |
| ----------- | ----------- |
| `primary`   | Blue        |
| `success`   | Green       |
| `warning`   | Yellow      |
| `error`     | Red         |
| `secondary` | Gray        |

```tsx
<Input colorScheme="success" placeholder="Success input" />
<Input colorScheme="error" placeholder="Error input" />
```

## 📏 Sizes
| Size | Description        |
| ---- | ------------------ |
| `sm` | Small (compact UI) |
| `md` | Default size       |
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

<Input
  isRequired
  placeholder="Required field *"
/>

<Input
  isDisabled
  placeholder="Disabled input"
/>

<Input
  isReadOnly
  value="Read-only content"
/>
```
## 🎭 Input Masks
* Phone Number Masks
```tsx
// Russian format
<Input 
  mask="+7 (999) 999-99-99"
  placeholder="+7 (___) ___-__-__"
/>

// International format
<Input 
  mask="+9 (999) 999-99-99"
  placeholder="International phone"
/>

// Simple format
<Input 
  mask="(999) 999-99-99"
  placeholder="(___) ___-__-__"
/>
```
* Date Masks
```tsx
// European format (DD.MM.YYYY)
<Input 
  mask="99.99.9999"
  placeholder="dd.mm.yyyy"
/>

// US format (MM/DD/YYYY)
<Input 
  mask="99/99/9999"
  placeholder="mm/dd/yyyy"
/>

// ISO format (YYYY-MM-DD)
<Input 
  mask="9999-99-99"
  placeholder="yyyy-mm-dd"
/>
```
* Financial Masks
```tsx
// Credit card
<Input 
  mask="9999 9999 9999 9999"
  placeholder="____ ____ ____ ____"
/>

// Expiry date
<Input 
  mask="99/99"
  placeholder="mm/yy"
/>

// CVV code
<Input 
  mask="999"
  placeholder="___"
/>
```
* Document Masks
```tsx
// Passport
<Input 
  mask="99 99 999999"
  placeholder="__ __ ______"
/>

// Social Security Number
<Input 
  mask="999-99-9999"
  placeholder="___-__-____"
/>

// ZIP code
<Input 
  mask="99999"
  placeholder="_____"
/>
```
* Custom Masks
```tsx
// Serial number (letters and digits)
<Input 
  mask="AAA-999-BB"
  placeholder="ABC-123-XY"
/>

// Promo code
<Input 
  mask="****-****-****"
  placeholder="____-____-____"
/>

// Time format
<Input 
  mask="99:99"
  placeholder="hh:mm"
/>

// HEX color
<Input 
  mask="#******"
  placeholder="#FFFFFF"
/>
```

## 🎯 Spacing & Layout
* Width & Height Control
```tsx
<Input w="300px" placeholder="Fixed width" />
<Input w="100%" maxW="500px" placeholder="Responsive" />
<Input h="50px" placeholder="Tall input" />
<Input minW="200px" minH="40px" placeholder="Minimum size" />
```

* Margin & Padding
```tsx
<Input m={16} placeholder="With margin" />
<Input mt={8} mb={16} ml={4} mr={4} placeholder="Individual margins" />
<Input p={12} placeholder="With padding" />
<Input pt={8} pb={8} pl={12} pr={12} placeholder="Custom padding" />
```

* Flexbox Layout
```tsx
<Input flex={1} placeholder="Takes available space" />
<Input flex="0 1 200px" mr={8} placeholder="Flexible width" />
<Input flexGrow={1} flexShrink={0} placeholder="Flex controlled" />
```

* Positioning
```tsx
<Input position="absolute" top="10px" right="10px" w="200px" placeholder="Floating input" />
<Input position="relative" left="20px" placeholder="Offset input" />
<Input position="fixed" bottom="20px" right="20px" w="300px" placeholder="Fixed input" />
```

* Text Alignment
```tsx
<Input textAlign="center" placeholder="Centered text" />
<Input textAlign="right" placeholder="Right aligned" />
<Input textAlign="left" placeholder="Left aligned" />
```

## 🔧 Props
* Core Props

| Prop           | Type                                                            | Default     | Description                        |
| -------------- | --------------------------------------------------------------- | ----------- | ---------------------------------- |
| `variant`      | `"default" \| "outline" \| "filled"`                            | `"default"` | Visual variant                     |
| `size`         | `"sm" \| "md" \| "lg"`                                          | `"md"`      | Input size                         |
| `colorScheme`  | `"primary" \| "secondary" \| "success" \| "warning" \| "error"` | `"primary"` | Theme color                        |
| `isInvalid`    | `boolean`                                                       | `false`     | Validation error state             |
| `errorMessage` | `string`                                                        | `undefined` | Error text below input             |
| `isDisabled`   | `boolean`                                                       | `false`     | Disable the input                  |
| `isReadOnly`   | `boolean`                                                       | `false`     | Make input read-only               |
| `isRequired`   | `boolean`                                                       | `false`     | Mark as required                   |
| `mask`         | `string`                                                        | `undefined` | Input mask pattern                 |
| `maskChar`     | `string`                                                        | `"_"`       | Character for empty mask positions |

## 🧱 Spacing Props

| Prop                                          | Type                                                                 | Description            |
| --------------------------------------------- | -------------------------------------------------------------------- | ---------------------- |
| `w`, `h`, `minW`, `maxW`, `minH`, `maxH`      | `string \| number`                                                   | Width & height control |
| `m`, `mt`, `mr`, `mb`, `ml`                   | `string \| number`                                                   | Margin control         |
| `p`, `pt`, `pr`, `pb`, `pl`                   | `string \| number`                                                   | Padding control        |
| `flex`, `flexGrow`, `flexShrink`, `flexBasis` | `string \| number`                                                   | Flexbox layout         |
| `display`                                     | `"block" \| "inline" \| "flex" \| "inline-flex" \| "grid" \| "none"` | Display mode           |
| `position`                                    | `"static" \| "relative" \| "absolute" \| "fixed" \| "sticky"`        | Position control       |
| `top`, `right`, `bottom`, `left`              | `string \| number`                                                   | Position offsets       |
| `textAlign`                                   | `"left" \| "center" \| "right" \| "justify"`                         | Text alignment         |


## 🧩 Native Props

| Prop          | Type                                               | Default  | Description      |
| ------------- | -------------------------------------------------- | -------- | ---------------- |
| `value`       | `string \| number \| readonly string[]`            | —        | Input value      |
| `onChange`    | `(e: React.ChangeEvent<HTMLInputElement>) => void` | —        | Change handler   |
| `onFocus`     | `(e: React.FocusEvent<HTMLInputElement>) => void`  | —        | Focus handler    |
| `onBlur`      | `(e: React.FocusEvent<HTMLInputElement>) => void`  | —        | Blur handler     |
| `placeholder` | `string`                                           | —        | Placeholder text |
| `type`        | `string`                                           | `"text"` | Input type       |
| `className`   | `string`                                           | —        | Custom CSS class |
| `style`       | `React.CSSProperties`                              | —        | Inline styles    |


## 💡 Mask Patterns
| Symbol | Meaning                 |
| ------ | ----------------------- |
| `9`    | Only digits (0–9)       |
| `a`    | Only letters (A–Z, a–z) |
| `*`    | Any character           |
| Other  | Static characters       |


## 🎯 Advanced Examples
* Search Header with Spacing
```tsx
function SearchHeader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '16px', gap: '12px' }}>
      <Input 
        placeholder="Search products..."
        flex={1}
        h="40px"
        mr={8}
        p={12}
      />
      <Button size="sm">Search</Button>
    </div>
  );
}
```

* Responsive Form Layout
```tsx
function ResponsiveForm() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Input w="100%" mb={16} p={12} placeholder="Full width input" />
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Input placeholder="First name" flex={1} />
        <Input placeholder="Last name" flex={1} />
      </div>
      
      <Input 
        mask="+7 (999) 999-99-99"
        placeholder="Phone number"
        w="100%"
        textAlign="center"
        p={16}
        style={{ fontSize: '18px' }}
      />
    </div>
  );
}
```

* Floating Search Input
```tsx
function FloatingSearch() {
  return (
    <div style={{ position: 'relative', height: '100px' }}>
      <Input 
        placeholder="Quick search..."
        position="absolute"
        top="20px"
        right="20px"
        w="300px"
        p={12}
        style={{
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}
      />
    </div>
  );
}
```

## 🎨 Customization
```tsx
// Using built-in spacing props
<Input 
  placeholder="Custom styled"
  w="100%"
  h="50px"
  p={16}
  m={8}
  style={{ 
    border: '2px dashed #ccc',
    borderRadius: '25px',
    backgroundColor: '#f9f9f9'
  }}
/>

// Using CSS class
<Input 
  placeholder="With custom class"
  className="custom-input-class"
/>

// Using inline styles
<Input 
  placeholder="Inline styles"
  style={{
    border: 'none',
    borderBottom: '2px solid blue',
    borderRadius: '0',
    padding: '8px 0'
  }}
/>
```

Version: 0.6.0
Features: TypeScript support • Mask functionality • Validation states • Multiple variants • Comprehensive spacing & layout control