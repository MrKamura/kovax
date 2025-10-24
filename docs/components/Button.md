# Kovax React v0.2 — Button Component (Core)


## 📦 Описание
`@kovax/react` — минималистичный UI‑фреймворк, вдохновлённый Chakra UI. Основная цель — лёгкость, читаемость и гибкая кастомизация.


---


## 🚀 Установка
```bash
npm install @kovax/react
# или
yarn add @kovax/react
```


---


## ⚙️ Использование
```tsx
import { Button } from "@kovax/react";


export default function App() {
return (
<div style={{ display: "flex", gap: 12 }}>
<Button color="primary" size="sm">Primary</Button>
<Button variant="outline" color="secondary">Outline</Button>
<Button variant="ghost" color="success">Ghost</Button>
<Button variant="solid" color="error" shadow="md" w="140px">Error</Button>
<Button isLoading loaderPosition="left">Loading Left</Button>
</div>
);
}
```


---


## 🧱 Пропсы


| Имя | Тип | По умолчанию | Описание |
|-----|-----|---------------|-----------|
| **variant** | `'solid'` \| `'outline'` \| `'ghost'` \| `'link'` | `'solid'` | Вариант стиля кнопки |
| **color** | `'primary'` \| `'secondary'` \| `'success'` \| `'warning'` \| `'error'` | `'primary'` | Цветовая тема |
| **size** | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `string` | `'md'` | Размер шрифта и отступов (можно задать кастомный `px`, `rem`, `em`) |
| **shadow** | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` | `undefined` | Размер тени |
| **borderRadius** | `string` | `'0.5rem'` | Радиус скругления кнопки |
| **borderColor** | `string` | `undefined` | Цвет границы при `outline` варианте |
| **bg** | `string` | `undefined` | Задний фон, переопределяет цвет темы |
| **w** | `string` | `auto` | Ширина кнопки (например `'120px'`, `'100%'`) |
| **h** | `string` | `auto` | Высота кнопки |
| **isLoading** | `boolean` | `false` | Включает индикатор загрузки |
| **loaderPosition** | `'left'` \| `'right'` \| `'center'` | `'center'` | Позиция спиннера относительно текста |
| **loader** | `React.ReactNode` | встроенный Spinner | Кастомный компонент индикатора загрузки |
| **leftIcon / rightIcon** | `React.ReactNode` | — | Добавляет иконку слева / справа от текста |


---


## 🌀 Особенности реализации
- **Адаптивность размеров** — если `size` задан в `px`, `rem` или `em`, кнопка масштабируется пропорционально.
- **Пропорциональный спиннер** — размер спиннера не увеличивает саму кнопку.
- **Переопределяемый Loader** — можно передать свой компонент спиннера.
- **Поддержка кастомных стилей** — можно добавить `style` и `className` без конфликтов.
- **Управление layout** — `w` и `h` для точной настройки размеров.


---


## 📄 Пример расширенного использования
```tsx
<Button
color="success"
variant="solid"
w="200px"
h="48px"
borderRadius="8px"
borderColor="#10b981"
bg="#34d399"
loader={<div className="custom-spinner" />}
loaderPosition="right"
>
Custom Loader
</Button>
```


---


## 🧩 Что добавить в будущем
1. **Тема (ThemeProvider)** — централизованная кастомизация (цвета, размеры, шрифты).
2. **Состояния кнопки** (`disabled`, `focus`, `active`, `hover`) с токенами темы.
3. **Система токенов** (tokens.ts) для отступов, радиусов, теней, переходов.
4. **Variants API** — для создания своих видов кнопок без переписывания логики.
5. **Анимации через Framer Motion**.


---