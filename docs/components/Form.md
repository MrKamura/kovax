## 🧩 Form Components

A comprehensive and accessible form system for building consistent, flexible, and type-safe forms.
Designed to work seamlessly with the Kovax React design tokens, color system, and input components — with full TypeScript and mask/validation support.

## 📦 Import
```tsx
import {
  FormControl,
  FormLabel,
  FormError,
  FormHelperText,
  FormGroup,
  Input
} from "kovax-react";
```

## 🚀 Quick Start
* Basic Field
```tsx
<FormControl>
  <FormLabel htmlFor="email">Email address</FormLabel>
  <Input id="email" type="email" placeholder="Enter your email" />
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>
```

* Field with Validation
```tsx
<FormControl isInvalid isRequired>
  <FormLabel htmlFor="password">Password</FormLabel>
  <Input id="password" type="password" placeholder="Enter password" />
  <FormError>Password must be at least 8 characters long</FormError>
</FormControl>
```

## 🏗️ FormControl

Container component that manages the state of form fields and provides validation, accessibility, and layout context.

* Basic Usage
```tsx
<FormControl>
  <FormLabel>Field Label</FormLabel>
  <Input placeholder="Enter value" />
</FormControl>
```

* With Validation States
```tsx
// Required field
<FormControl isRequired>
  <FormLabel>Required Field</FormLabel>
  <Input placeholder="This field is required" />
</FormControl>

// Invalid state
<FormControl isInvalid>
  <FormLabel>Invalid Field</FormLabel>
  <Input placeholder="This field has errors" />
  <FormError>This field is invalid</FormError>
</FormControl>

// Disabled state
<FormControl isDisabled>
  <FormLabel>Disabled Field</FormLabel>
  <Input placeholder="This field is disabled" />
</FormControl>
```

* Layout Examples
```tsx
<FormControl m={16} mb={24}>
  <FormLabel>With Margin</FormLabel>
  <Input placeholder="Spacing example" />
</FormControl>

<FormControl w="400px" maxW="100%">
  <FormLabel>Fixed Width</FormLabel>
  <Input placeholder="Fixed width input" />
</FormControl>
```

## 🏷️ FormLabel

* Accessible label component that automatically handles required and invalid states when nested inside FormControl.

```tsx
<FormLabel htmlFor="username">Username</FormLabel>
<Input id="username" placeholder="Enter username" />
```

* Integrated Example
```tsx
<FormControl isRequired isInvalid>
  <FormLabel htmlFor="email">Email</FormLabel>
  <Input id="email" type="email" />
</FormControl>
```

## ❌ FormError

Accessible error message component with built-in ARIA attributes and error color integration from the design tokens.

```tsx
<FormControl isInvalid>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormError>Invalid email address</FormError>
</FormControl>
```

## 💡 FormHelperText

Provides contextual information or tips for input fields.

```tsx
<FormControl>
  <FormLabel>Password</FormLabel>
  <Input type="password" />
  <FormHelperText>Password must be at least 8 characters long</FormHelperText>
</FormControl>
```

## 👥 FormGroup

Used to group related form fields with consistent spacing and alignment.

* Vertical Example
```tsx
<FormGroup direction="vertical" spacing="md">
  <FormControl>
    <FormLabel>First Name</FormLabel>
    <Input placeholder="John" />
  </FormControl>
  <FormControl>
    <FormLabel>Last Name</FormLabel>
    <Input placeholder="Doe" />
  </FormControl>
</FormGroup>
```

* Horizontal Example
```tsx
<FormGroup direction="horizontal" spacing="lg">
  <FormControl flex={1}>
    <FormLabel>City</FormLabel>
    <Input placeholder="New York" />
  </FormControl>
  <FormControl flex={1}>
    <FormLabel>ZIP</FormLabel>
    <Input mask="99999" placeholder="10001" />
  </FormControl>
</FormGroup>
```

## 🎯 Full Example — Login Form with Validation
```tsx
function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email: string) =>
    email.includes('@') ? '' : 'Please enter a valid email address';

  const validatePassword = (password: string) =>
    password.length >= 8 ? '' : 'Password must be at least 8 characters';

  return (
    <FormGroup direction="vertical" spacing="lg" maxW="400px" m="0 auto">
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={credentials.email}
          onChange={(e) => {
            const val = e.target.value;
            setCredentials({ ...credentials, email: val });
            setErrors({ ...errors, email: validateEmail(val) });
          }}
          placeholder="Enter your email"
        />
        {errors.email && <FormError>{errors.email}</FormError>}
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={credentials.password}
          onChange={(e) => {
            const val = e.target.value;
            setCredentials({ ...credentials, password: val });
            setErrors({ ...errors, password: validatePassword(val) });
          }}
          placeholder="Enter your password"
        />
        {errors.password && <FormError>{errors.password}</FormError>}
      </FormControl>
    </FormGroup>
  );
}
```

## 🔧 Props Reference
| Component          | Prop       | Type                          | Default      | Description                   |
| ------------------ | ---------- | ----------------------------- | ------------ | ----------------------------- |
| **FormControl**    | isInvalid  | boolean                       | false        | Shows validation error state  |
|                    | isRequired | boolean                       | false        | Marks the field as required   |
|                    | isDisabled | boolean                       | false        | Disables input interactions   |
| **FormLabel**      | htmlFor    | string                        | -            | ID of associated input        |
|                    | isInvalid  | boolean                       | false        | Error state styling           |
|                    | isRequired | boolean                       | false        | Required indicator            |
| **FormError**      | children   | ReactNode                     | -            | Error message text            |
| **FormHelperText** | isInvalid  | boolean                       | false        | Reduces emphasis when invalid |
| **FormGroup**      | direction  | `"horizontal"` | `"vertical"` | `"vertical"` | Layout orientation            |
|                    | spacing    | `"sm"` | `"md"` | `"lg"`      | `"md"`       | Spacing between fields        |


## 🎨 Design Tokens Integration

* All form components automatically adapt to the global design system via:

```tsx
export { ColorName, ColorShade, colors, shadows, sizes, transitions } from './components/theme/tokens.js';
```

* Example — Custom Styling
```tsx
<FormControl style={{
  boxShadow: shadows.md,
  transition: transitions.default,
  fontSize: sizes.md
}}>
  <FormLabel color={colors.primary[600]}>Styled Field</FormLabel>
  <Input placeholder="Custom themed input" />
</FormControl>
```

* Shades Example

* Colors support tokenized shades (e.g., colors.primary[100] → colors.primary[900]), allowing dynamic adaptation for dark/light themes.

## 💡 Best Practices

* Always use FormLabel with htmlFor for accessibility.

* Group related fields in FormGroup for visual hierarchy.

* Wrap each field in FormControl to manage states consistently.

* Provide FormHelperText for contextual guidance.

* Use FormError only when validation fails.

* Leverage design tokens for consistent theming across all components.

## Version: 1.0.0
Features: TypeScript, Accessibility, Mask & Validation Support, Flexible Layout, Design Tokens Integration