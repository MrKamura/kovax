## 🧩 Form Components

The Form system provides a consistent, accessible, and type-safe way to build flexible forms in Kovax UI.
It integrates seamlessly with the Kovax React design tokens, color system, and input components — fully typed with built-in validation and accessibility support.

## 🚀 Import
```tsx
import {
  FormControl,
  FormLabel,
  FormError,
  FormHelperText,
  FormGroup
} from "kovax-react";
```

## ⚡ Quick Start
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

Container component that manages validation state, accessibility, and layout context for form fields.

* Basic Usage
```tsx
<FormControl>
  <FormLabel>Field Label</FormLabel>
  <Input placeholder="Enter value" />
</FormControl>
```

* Validation States
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

* Layout & Spacing
```tsx
<FormControl m={16} mb={24} p={12}>
  <FormLabel>With Spacing</FormLabel>
  <Input placeholder="Spacing example" />
</FormControl>

<FormControl w="400px" maxW="100%">
  <FormLabel>Fixed Width</FormLabel>
  <Input placeholder="Fixed width input" />
</FormControl>
```

## 🏷️ FormLabel

Accessible label component that automatically reflects required and invalid states.

* Usage
```tsx
<FormLabel htmlFor="username">Username</FormLabel>
<Input id="username" placeholder="Enter username" />
```

* With States
```tsx
<FormControl isRequired isInvalid>
  <FormLabel htmlFor="email" isRequired isInvalid>
    Email Address
  </FormLabel>
  <Input id="email" type="email" />
</FormControl>
```

* With Spacing
```tsx
<FormLabel m={8} p={4} htmlFor="custom">
  Custom Spacing
</FormLabel>
```

## ❌ FormError

Accessible error message with ARIA support and token-based theming.

* Basic Usage
```tsx
<FormControl isInvalid>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormError>Invalid email address</FormError>
</FormControl>
```

* Custom Styling
```tsx
<FormError m={8} p={4} className="custom-error">
  Custom styled error message
</FormError>
```

## 💡 FormHelperText

Provides contextual information or tips with automatic color theming.

* Basic Usage
```tsx
<FormControl>
  <FormLabel>Password</FormLabel>
  <Input type="password" />
  <FormHelperText>Password must be at least 8 characters long</FormHelperText>
</FormControl>
```

* With Error State
```tsx
<FormControl isInvalid>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormHelperText isInvalid>
    Please enter a valid email address
  </FormHelperText>
</FormControl>
```

## 👥 FormGroup

Groups related fields with consistent spacing and flexible layout.

* Vertical Layout (Default)
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

* Horizontal Layout
```tsx
<FormGroup direction="horizontal" spacing="lg">
  <FormControl flex={1}>
    <FormLabel>City</FormLabel>
    <Input placeholder="New York" />
  </FormControl>
  <FormControl flex={1}>
    <FormLabel>ZIP Code</FormLabel>
    <Input placeholder="10001" />
  </FormControl>
</FormGroup>
```

* Spacing Options
```tsx
<FormGroup spacing="sm" />
<FormGroup spacing="md" />  // default
<FormGroup spacing="lg" />
```

## 🎯 Complete Example — Registration Form

(Interactive example showing validation logic and state management)

```tsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    switch (name) {
      case 'email':
        newErrors.email = value.includes('@') ? '' : 'Invalid email address';
        break;
      case 'password':
        newErrors.password = value.length >= 8 ? '' : 'Password must be at least 8 characters';
        break;
      case 'firstName':
        newErrors.firstName = value ? '' : 'First name is required';
        break;
    }
    setErrors(newErrors);
  };

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  return (
    <FormGroup direction="vertical" spacing="lg" maxW="500px" m="0 auto" p={24}>
      <FormGroup direction="horizontal" spacing="md">
        <FormControl isInvalid={!!errors.firstName} flex={1}>
          <FormLabel isRequired>First Name</FormLabel>
          <Input
            value={formData.firstName}
            onChange={handleChange('firstName')}
            placeholder="John"
          />
          {errors.firstName && <FormError>{errors.firstName}</FormError>}
        </FormControl>

        <FormControl flex={1}>
          <FormLabel>Last Name</FormLabel>
          <Input
            value={formData.lastName}
            onChange={handleChange('lastName')}
            placeholder="Doe"
          />
        </FormControl>
      </FormGroup>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel isRequired>Email Address</FormLabel>
        <Input
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="john@example.com"
        />
        <FormHelperText>We'll never share your email with anyone else.</FormHelperText>
        {errors.email && <FormError>{errors.email}</FormError>}
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel isRequired>Password</FormLabel>
        <Input
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Enter your password"
        />
        <FormHelperText isInvalid={!!errors.password}>
          Password must be at least 8 characters long
        </FormHelperText>
        {errors.password && <FormError>{errors.password}</FormError>}
      </FormControl>
    </FormGroup>
  );
}
```

## 🔧 Props Reference

# 🏗️ FormControl

| Prop             | Type      | Default | Description                             |
| ---------------- | --------- | ------- | --------------------------------------- |
| isInvalid        | boolean   | false   | Shows validation error state            |
| isRequired       | boolean   | false   | Marks field as required                 |
| isDisabled       | boolean   | false   | Disables input interactions             |
| children         | ReactNode | –       | Nested form elements                    |
| All SpacingProps | –         | –       | Supports margin, padding, width, height |

# 🏷️ FormLabel

| Prop             | Type      | Default | Description              |
| ---------------- | --------- | ------- | ------------------------ |
| htmlFor          | string    | –       | Associates with input ID |
| isInvalid        | boolean   | false   | Error styling            |
| isRequired       | boolean   | false   | Adds required indicator  |
| children         | ReactNode | –       | Label text               |
| All SpacingProps | –         | –       | Supports margin/padding  |

# ❌ FormError

| Prop             | Type      | Default | Description             |
| ---------------- | --------- | ------- | ----------------------- |
| children         | ReactNode | –       | Error message text      |
| All SpacingProps | –         | –       | Supports margin/padding |

# 💡 FormHelperText

| Prop             | Type      | Default | Description             |
| ---------------- | --------- | ------- | ----------------------- |
| isInvalid        | boolean   | false   | Error color styling     |
| children         | ReactNode | –       | Helper text content     |
| All SpacingProps | –         | –       | Supports margin/padding |

# 👥 FormGroup

| Prop             | Type                          | Default      | Description                   |
| ---------------- | ----------------------------- | ------------ | ----------------------------- |
| direction        | `"horizontal"` | `"vertical"` | `"vertical"` | Layout orientation            |
| spacing          | `"sm"` | `"md"` | `"lg"`      | `"md"`       | Field spacing                 |
| children         | ReactNode                     | –            | Nested controls               |
| All SpacingProps | –                             | –            | Supports margin/padding/width |

# 🎨 Design Tokens Integration

All form components automatically inherit design system tokens:

```tsx
<FormError>Uses colors.error[500]</FormError>
<FormHelperText>Uses colors.secondary[500]</FormHelperText>
<FormGroup spacing="md">Uses sizes.spacing.md</FormGroup>
<FormLabel>Uses sizes.text.sm</FormLabel>
```

* Custom Styling Example
```tsx
<FormControl
  style={{
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px'
  }}
  p={16}
  m={8}
>
  <FormLabel color={colors.primary[600]}>Styled Field</FormLabel>
  <Input placeholder="Custom themed input" />
</FormControl>
```

## ♿ Accessibility

* FormControl: passes state props (isInvalid, isRequired, isDisabled) to children.

* FormLabel: properly associates with inputs via htmlFor.

* *ormError: uses role="alert" and aria-live="polite".

* Required fields show a visual asterisk and ARIA attributes.

* Error colors meet contrast requirements.

## 💡 Best Practices

# ✅ Do

* Always pair FormLabel with htmlFor.

* Use FormControl to manage states.

* Provide FormHelperText for guidance.

* Group fields with FormGroup.

# ❌ Don’t

* Use raw HTML labels.

* Skip FormControl wrappers.

* Show FormError without actual errors.

* Overuse inline styles — prefer spacing props.

## 🧪 Testing

# ✅ 100% test coverage

* Accessibility attributes

* Validation state propagation

* Spacing props consistency

# 📊 Status

| Field        | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| **Version**  | 1.0.0                                                        |
| **Features** | TypeScript, Accessibility, Validation, Layout, Design Tokens |
| **Coverage** | ✅ 100%                                                       |
| **Status**   | ✅ Production Ready                                           |
