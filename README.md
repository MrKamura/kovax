# 🧩 Kovax UI — React Component Library

![npm](https://img.shields.io/npm/v/kovax-react?color=3b82f6&label=version)
![license](https://img.shields.io/npm/l/kovax-react?color=green)
![React](https://img.shields.io/badge/React-16+-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6)
![module](https://img.shields.io/badge/module-ESM-blue)

---

## ✨ Overview

**Kovax UI** is a modern, lightweight React component library designed for performance, scalability, and easy customization.  
Built with **TypeScript**, **React**, and **Vite**, it provides flexible UI primitives ready for production.

Currently includes:

- ✅ [**Button**](https://github.com/MrKamura/kovax/blob/master/docs/components/Button.md) — customizable, themeable, and fully typed.
- ✅ [**Input**](https://github.com/MrKamura/kovax/blob/master/docs/components/Input.md) — customizable, themeable, and fully typed.
- ✅ [**Design Tokens**](https://github.com/MrKamura/kovax/blob/master/docs/components/Tokens.md) — colors, sizes, shadows, transitions.
- ✅ [**Form**](https://github.com/MrKamura/kovax/blob/master/docs/components/Form.md) — unified color, size, shadow, and transition system.
- ✅ [**Box**](https://github.com/MrKamura/kovax/blob/master/docs/components/Layout/Box.md) — universal layout container for building flexible UI.
- ✅ [**Stack (HStack / VStack)**](https://github.com/MrKamura/kovax/blob/master/docs/components/Layout/Stack.md) — powerful flex layout primitives.

Form

> 🚀 Coming soon: `Datepicker`, `Select`, `Modal`, `Switch`, `Tabs`, and more!

---

## 📦 Installation

### 1️⃣ From npm

```bash
npm install kovax-react
# or
yarn add kovax-react
```

## ⚡ Usage Example

```tsx
import {
  Box,
  VStack,
  HStack,
  Button,
  Input,
  Form,
  FormLabel,
  Heading,
  Text,
} from "kovax-react";

export default function App() {
  return (
    <Box
      p={32}
      backgroundColor="#f8f9fa"
      borderRadius={16}
      maxW="480px"
      m="40px auto"
      shadow="md"
    >
      <VStack gap={24}>
        <Heading size="xl">Sign In</Heading>

        <Form>
          <VStack gap={16}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />

            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter password" />
          </VStack>

          <HStack justify="flex-end" gap={12} mt={24}>
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Login</Button>
          </HStack>
        </Form>

        <Text align="center" color="gray.600">
          Don’t have an account? <a href="#">Sign up</a>
        </Text>
      </VStack>
    </Box>
  );
}
```

---

## 🧠 Features

- 🌈 Full TypeScript support

- 🎨 Easy theming and customization

- ⚙️ Minimal dependencies

- 🧱 Production-ready base UI components

- 🚀 Built with Vite + Tsup for speed

- 📘 Well-structured documentation in Markdown

## 🛠 Tech Stack

- React 18+

- TypeScript 5+

- Vite

- Tsup for builds

## 📚 Documentation

| Component                      | Description                                           | Link                                                                                    |
| ------------------------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 🎨 **Tokens**                  | Base design tokens (colors, shadows, transitions)     | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Tokens.md)       |
| 🔘 **Button**                  | Configurable, themeable button                        | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Button.md)       |
| ⌨️ **Input**                   | Themed input field with masks and states              | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Input.md)        |
| 🧾 **Form**                    | Form container with consistent spacing and validation | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Form.md)         |
| 📦 **Box**                     | Universal layout container                            | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Layout/Box.md)   |
| 📐 **Stack (HStack / VStack)** | Flexible layout stacks with spacing & alignment       | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Layout/Stack.md) |

## 🔗 Quick Links

- [📖 Full Documentation](./docs/)
- [🚀 Getting Started](./docs/GETTING_STARTED.md)
- [🎨 Design System](./docs/DESIGN_SYSTEM.md)

## 🤝 Contribution & Community

We welcome developers from all over the world to contribute to Kovax UI 💡
There are plenty of exciting ideas and upcoming features, including:

- Advanced animations

- Dark theme

- Composable components (Form, Modal, Dropdown)

- I\*nteractive documentation & live playground

## If you’d like to contribute:

- Fork this repository

- Create a new branch

- Commit your changes

- Open a Pull Request

## Your contribution will be reviewed and merged after discussion.

All contributors will be featured in the Contributors list ❤️

## 🚀 Development

Run in development mode:

```bash
npm install
npm run dev
```

Build the library:

```bash
npm run build
```

Publish a new version:

```bash
npm run release
```

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute for personal and commercial purposes.  
By contributing to this repository, you agree that your contributions will be licensed under the same MIT License.

📘 **License file:** [LICENSE](./LICENSE)

## 🌟 Stay tuned

Kovax UI is actively maintained and constantly evolving.
New components, better design systems, and advanced tools are coming soon!
