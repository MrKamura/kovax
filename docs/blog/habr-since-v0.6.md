# kovax-react 0.6 → 0.8 — сводка всех минорных релизов

> **TL;DR:** три минора подряд — от «витринных» компонентов (**0.6**) через Next.js / RSC / a11y (**0.7**) к Tailwind v4, формам, FOUC и Storybook (**0.8**). Одна статья для тех, кто пропустил промежуточные анонсы.

**Ссылки:**

- 📦 npm: [`kovax-react@0.8.0`](https://www.npmjs.com/package/kovax-react)
- 🧪 Playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)
- 📖 Storybook: [mrkamura.github.io/kovax/storybook](https://mrkamura.github.io/kovax/storybook/)

---

## Хронология

| Версия | Дата (CHANGELOG) | Фокус |
| --- | --- | --- |
| **0.6.0** | 2026-05-18 | Avatar, Badge, Menu, Skeleton, Pagination, брейкпоинты |
| **0.7.0** | 2026-05-19 | Next.js / RSC, jest-axe, size-limit |
| **0.8.0** | 2026-05-19 | Tailwind v4, FormField, ColorModeScript, Storybook |

Подробные статьи: [habr-v0.6.md](./habr-v0.6.md) · [habr-v0.7.md](./habr-v0.7.md) · [habr-v0.8.md](./habr-v0.8.md).

---

## 0.6 — продуктовый UI-слой

Пять компонентов + адаптив из тех же токенов, что CSS:

- **`Avatar`**, **`Badge`**, **`Menu`**, **`Skeleton`**, **`Pagination`** — отдельные **`kovax-react/*`** entry.
- **`useMediaQuery`**, **`useBreakpointUp`**, **`breakpointMinMediaQuery`**.
- **`Popover`**: **`contentRole="menu"`**, клавиатура для **`menuitem`**.

```bash
npm install kovax-react@0.6.0
```

---

## 0.7 — продакшен и Next.js

- **`kovax-react/server`** — RSC-safe layout/typography.
- **`"use client"`** в client-бандлах после **`tsup`**.
- **`jest-axe`** + **`expectNoAxeViolations()`** в component-тестах.
- **size-limit**, бейджи bundlejs, **`NEXTJS_APP_ROUTER.md`**.

```bash
npm install kovax-react@0.7.0
```

---

## 0.8 — экосистема

- **`kovax-react/tailwind`** — Tailwind v4, **`@theme inline`**, `bg-kx-*`, `p-kx-*`.
- **`kovax-react/react-hook-form`**, **`kovax-react/tanstack-form`** — **`FormField`**.
- **`ColorModeScript`** — FOUC-snippet для **`data-kovax-theme`**.
- **Storybook** на **`/storybook`**: autoDocs, a11y, visual tests.

```bash
npm install kovax-react@0.8.0
```

---

## Карта entry points (актуально на 0.8)

| Import | Назначение |
| --- | --- |
| **`kovax-react`** | Полный API (client) |
| **`kovax-react/server`** | RSC + **ColorModeScript** |
| **`kovax-react/tokens`** | ThemeProvider, hooks, themeToken |
| **`kovax-react/tailwind`** | CSS preset Tailwind v4 |
| **`kovax-react/react-hook-form`** | FormField для RHF |
| **`kovax-react/tanstack-form`** | FormField для TanStack |
| **`kovax-react/avatar`** … **`/pagination`** | Узкие client bundles |

---

## Документация

- [CHANGELOG.md](https://github.com/MrKamura/kovax/blob/master/CHANGELOG.md)
- [TAILWIND.md](https://github.com/MrKamura/kovax/blob/master/docs/TAILWIND.md)
- [NEXTJS_APP_ROUTER.md](https://github.com/MrKamura/kovax/blob/master/docs/NEXTJS_APP_ROUTER.md)
- [Form.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Form.md)

Playground **Releases** — тот же CHANGELOG в UI (EN/RU chrome).

---

## Поддержать

**MIT** · [GitHub](https://github.com/MrKamura/kovax) · [Boosty](https://boosty.to/mrkamura)
