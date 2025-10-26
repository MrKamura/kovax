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
import { Button } from "kovax-react";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <Button variant="primary" size="lg">
        Click Me
      </Button>
    </div>
  );
}
```
---

## 🧠 Features

* 🌈 Full TypeScript support

* 🎨 Easy theming and customization

* ⚙️ Minimal dependencies

* 🧱 Production-ready base UI components

* 🚀 Built with Vite + Tsup for speed

* 📘 Well-structured documentation in Markdown



## 🛠 Tech Stack

* React 18+

* TypeScript 5+

* Vite

* Tsup for builds

* TailwindCSS (for styles and examples)

## 📚 Documentation


| Component     | Description                                       | Link                                                                              |
| ------------- | ------------------------------------------------- | --------------------------------------------------------------------------------- |
| 🎨 **Tokens** | Base design tokens (colors, shadows, transitions) | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Tokens.md) |
| 🔘 **Button** | Configurable button component                     | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Button.md) |
| ⌨️ **Input**  | Themed input with mask & validation               | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Input.md)  |
| 🧾 **Form**   | Controlled form elements                          | [View →](https://github.com/MrKamura/kovax/blob/master/docs/components/Form.md)   |



## 🔗 Quick Links
- [📖 Full Documentation](./docs/)
- [🚀 Getting Started](./docs/GETTING_STARTED.md)
- [🎨 Design System](./docs/DESIGN_SYSTEM.md)
## 🤝 Contribution & Community

We welcome developers from all over the world to contribute to Kovax UI 💡
There are plenty of exciting ideas and upcoming features, including:

* Advanced animations

* Dark theme

* Composable components (Form, Modal, Dropdown)

* I*nteractive documentation & live playground

## If you’d like to contribute:

* Fork this repository

* Create a new branch

* Commit your changes

* Open a Pull Request

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

MIT License — free to use, modify, and distribute.

## 🌟 Stay tuned

Kovax UI is actively maintained and constantly evolving.
New components, better design systems, and advanced tools are coming soon!
