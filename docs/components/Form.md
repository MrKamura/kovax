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

Container component that manages validation state and exposes **`FormControlContext`** so **`Input`**, **`Textarea`**, **`Select`**, **`Checkbox`**, **`Radio`**, **`Switch`**, **`FormLabel`**, and **`FormHelperText`** pick up **`isInvalid`**, **`isRequired`**, and **`isDisabled`** when you don’t repeat props on every child. Explicit props on a child still win over context.

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
import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  FormError,
  FormHelperText,
  Input,
} from "kovax-react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const validateField = (name: keyof typeof formData, value: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      switch (name) {
        case "email":
          next.email = value.includes("@") ? "" : "Invalid email address";
          break;
        case "password":
          next.password = value.length >= 8 ? "" : "Password must be at least 8 characters";
          break;
        case "firstName":
          next.firstName = value ? "" : "First name is required";
          break;
      }
      return next;
    });
  };

  const handleChange =
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      validateField(field, value);
    };

  return (
    <FormGroup direction="vertical" spacing="lg" maxW="500px" m="0 auto" p={24}>
      <FormGroup direction="horizontal" spacing="md">
        <FormControl isInvalid={!!errors.firstName} flex={1}>
          <FormLabel isRequired>First Name</FormLabel>
          <Input
            value={formData.firstName}
            onChange={handleChange("firstName")}
            placeholder="John"
          />
          {errors.firstName && <FormError>{errors.firstName}</FormError>}
        </FormControl>

        <FormControl flex={1}>
          <FormLabel>Last Name</FormLabel>
          <Input
            value={formData.lastName}
            onChange={handleChange("lastName")}
            placeholder="Doe"
          />
        </FormControl>
      </FormGroup>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel isRequired>Email Address</FormLabel>
        <Input
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
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
          onChange={handleChange("password")}
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

### react-hook-form

Optional adapter: **`kovax-react/react-hook-form`** (peer **`react-hook-form`**).

```tsx
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormLabel,
  FormHelperText,
  Input,
  VStack,
} from "kovax-react";
import { FormField, FormFieldError } from "kovax-react/react-hook-form";

type Values = { email: string };

function SignUp() {
  const { control, handleSubmit } = useForm<Values>({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  return (
    <Box as="form" onSubmit={handleSubmit(console.log)}>
      <VStack align="stretch" gap={16}>
        <FormField
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" />
          <FormFieldError />
        </FormField>
        <Button type="submit">Submit</Button>
      </VStack>
    </Box>
  );
}
```

**`FormField`** wraps **`useController`**, mounts **`FormControl`** (`isInvalid` / `isRequired` / `isDisabled`), and injects **`ref`**, **`value`**, **`onChange`**, **`onBlur`** into the first Kovax field child (**`Input`**, **`Textarea`**, **`Select`**, …) or a **`FieldControl`** wrapper.

For checkboxes: **`valuePropName="checked"`**. Custom layout: pass a render function as **`children`**.

### TanStack Form

Optional adapter: **`kovax-react/tanstack-form`** (peer **`@tanstack/react-form`**).

```tsx
import { useForm } from "@tanstack/react-form";
import { FormField, FormFieldError } from "kovax-react/tanstack-form";

const form = useForm({ defaultValues: { email: "" }, onSubmit: async () => {} });

<form.Field name="email">
  {(field) => (
    <FormField field={field} validators={{ onChange: ({ value }) => (!value ? "Required" : undefined) }}>
      <Input id="email" />
      <FormFieldError />
    </FormField>
  )}
</form.Field>
```

Or **`form`** + **`name`** directly on **`FormField`** (uses **`useField`** internally).

### Manual binding (any library)

`kovax-react` does not require either adapter. With **react-hook-form**, you can still bind fields using **`Controller`** and spread **`field`** onto **`Input`**, plus drive **`FormControl isInvalid`** from **`formState.errors`**.

## Props reference

### FormControl

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `isInvalid` | `boolean` | `false` | Error state styling and context for custom children |
| `isRequired` | `boolean` | `false` | Required state passed to custom children |
| `isDisabled` | `boolean` | `false` | Disabled styling on the wrapper |
| `children` | `ReactNode` | — | Label, input, helper text, error |
| — | — | — | Also accepts **SpacingProps** (`m`, `p`, `w`, …) |

Context API: **`useFormControlContext()`** / **`FormControlContext`** (exported from the **Form** entry) return **`null`** outside **`FormControl`**.

### FormLabel

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `htmlFor` | `string` | — | For attribute linking to control `id` |
| `isInvalid` | `boolean` | — | Error colors; when omitted, uses **`FormControl`** context (`false` if absent) |
| `isRequired` | `boolean` | — | Shows required asterisk; when omitted, uses **`FormControl`** context (`false` if absent) |
| `children` | `ReactNode` | — | Label text |
| — | — | — | Also accepts **SpacingProps** |

### FormError

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `children` | `ReactNode` | — | Message text |
| — | — | — | Also accepts **SpacingProps** |

### FormHelperText

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `isInvalid` | `boolean` | — | Uses error palette when true; when omitted, uses **`FormControl`** context (`false` if absent) |
| `children` | `ReactNode` | — | Helper copy |
| — | — | — | Also accepts **SpacingProps** |

### FormGroup

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `direction` | `"vertical"` \| `"horizontal"` | `"vertical"` | Stack direction |
| `spacing` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Gap between fields |
| `children` | `ReactNode` | — | Nested fields |
| — | — | — | Also accepts **SpacingProps** |

## Design tokens integration

All form components automatically inherit design system tokens:

```tsx
<FormError>Uses colors.error[500]</FormError>
<FormHelperText>Uses colors.secondary[500]</FormHelperText>
<FormGroup spacing="md">Uses themeToken(&quot;spacing.md&quot;)</FormGroup>
<FormLabel>Uses themeToken(&quot;text.sm&quot;)</FormLabel>
```

* Custom styling example

```tsx
import { FormControl, FormLabel, Input, themeToken } from "kovax-react";

<FormControl
  style={{
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  }}
  p={16}
  m={8}
>
  <FormLabel style={{ color: themeToken("primary.600") }}>Styled Field</FormLabel>
  <Input placeholder="Custom themed input" />
</FormControl>
```

## ♿ Accessibility

* **FormControl:** provides **`FormControlContext`**; **`Input`**, **`Textarea`**, **`Select`**, **`Checkbox`**, **`Radio`**, **`Switch`**, **`FormLabel`**, and **`FormHelperText`** read **`isInvalid`**, **`isRequired`**, and **`isDisabled`** from the nearest control when props are omitted. Native elements such as **`<label>`** are unchanged unless you wrap them yourself.

* **FormLabel:** associates controls via `htmlFor` / `id`.

* **FormError:** uses `role="alert"` and `aria-live="polite"`.

* Required fields show a visual asterisk and ARIA attributes.

* Error colors meet contrast requirements.

## 💡 Best Practices

### Do

* Always pair FormLabel with htmlFor.

* Use FormControl to manage states.

* Provide FormHelperText for guidance.

* Group fields with FormGroup.

### Don’t

* Use raw HTML labels.

* Skip FormControl wrappers.

* Show FormError without actual errors.

* Overuse inline styles — prefer spacing props.

## Testing

Automated tests live under `src/components/Form/__tests__`. Run `npm test` in the library repository.

## Meta

- Package version: see root `package.json`
- TypeScript types are exported next to each component
