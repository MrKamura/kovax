## 🧩 Input Component
A flexible and accessible text input field with full TypeScript support and advanced mask functionality.

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
## 🔧 Props
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
| `value`        | `string \| number \| readonly string[]`                         | `undefined` | Input value                        |
| `onChange`     | `(e: React.ChangeEvent<HTMLInputElement>) => void`              | —           | Change handler                     |
| `onFocus`      | `(e: React.FocusEvent<HTMLInputElement>) => void`               | —           | Focus handler                      |
| `onBlur`       | `(e: React.FocusEvent<HTMLInputElement>) => void`               | —           | Blur handler                       |
| `placeholder`  | `string`                                                        | —           | Input placeholder                  |
| `...rest`      | `HTMLInputElement`                                              | —           | All native input attributes        |


## 💡 Mask Patterns
| Character | Meaning                    |
| --------- | -------------------------- |
| `9`       | Digit (0–9)                |
| `a`       | Letter (A–Z, a–z)          |
| `*`       | Any character              |
| Other     | Static element in the mask |


## 🎯 Advanced Examples
* Contact Form
```tsx
function ContactForm() {
  const [contact, setContact] = useState({
    phone: '',
    email: '',
    passport: '',
    birthDate: ''
  });

  const handleChange = (field) => (e) => {
    setContact(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div>
      <Input
        mask="+7 (999) 999-99-99"
        value={contact.phone}
        onChange={handleChange('phone')}
        placeholder="Phone number"
        isRequired
      />
      <Input
        type="email"
        value={contact.email}
        onChange={handleChange('email')}
        placeholder="Email address"
      />
      <Input
        mask="99 99 999999"
        value={contact.passport}
        onChange={handleChange('passport')}
        placeholder="Passport number"
      />
      <Input
        mask="99.99.9999"
        value={contact.birthDate}
        onChange={handleChange('birthDate')}
        placeholder="Birth date"
      />
    </div>
  );
}
```

* Payment Form

```tsx
function PaymentForm() {
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Input
        mask="9999 9999 9999 9999"
        value={payment.cardNumber}
        onChange={(e) => setPayment(prev => ({ ...prev, cardNumber: e.target.value }))}
        placeholder="Card number"
        isRequired
      />
      <div style={{ display: 'flex', gap: '12px' }}>
        <Input
          mask="99/99"
          value={payment.expiry}
          onChange={(e) => setPayment(prev => ({ ...prev, expiry: e.target.value }))}
          placeholder="MM/YY"
          size="sm"
        />
        <Input
          mask="999"
          value={payment.cvv}
          onChange={(e) => setPayment(prev => ({ ...prev, cvv: e.target.value }))}
          placeholder="CVV"
          size="sm"
        />
      </div>
    </div>
  );
}
```
## 🎨 Customization
The Input component uses inline styles but supports external styling through the style prop:

```tsx
<Input
  placeholder="Custom styled input"
  style={{
    border: '2px dashed #ccc',
    borderRadius: '20px',
    padding: '16px'
  }}
/>
```
Version: 0.5.0
Features: TypeScript support, Mask functionality, Validation states, Multiple variants