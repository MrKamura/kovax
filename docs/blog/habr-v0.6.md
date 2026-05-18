# kovax-react 0.6 — Pagination, хуки для медиазапросов и брейкпоинты из токенов

> TL;DR: выпустил **kovax-react 0.6** — к предыдущему набору компонентов добавлены **`Pagination`** (отдельный импорт **`kovax-react/pagination`**), **`useMediaQuery`** / **`useBreakpointUp`** и хелперы **`breakpointMinMediaQuery`**, завязанные на те же **`breakpoint.*`**, что и остальная дизайн-система. На playground — новый раздел и тема в документации (EN/RU). npm MIT, React 16+.

**Ссылки:**

- 📦 npm: [`kovax-react`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Репозиторий: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Живая документация и playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)

---

## Зачем ещё один минорный релиз

В **0.5** я описывал **`ThemeProvider`** и переход на **`var(--kx-…)`**. Для админок и каталогов не хватало двух вещей:

1. **Готового пейджера** с доступностью (`aria-current`, осмысленные `aria-label`, многоточие между «окнами» страниц).
2. **Одного источника правды для брейкпоинтов** — чтобы и CSS/media, и React-хуки смотрели на те же em-токены, что **`themeToken("breakpoint.md")`**.

**0.6** закрывает оба пункта без новых peer-зависимостей.

## Pagination

- Корень пакета: `import { Pagination, getPaginationItems } from "kovax-react"`.
- Узкий бандл: `import { Pagination, getPaginationItems } from "kovax-react/pagination"`.
- Варианты **`soft` / `outline`**, размеры **`sm` / `md`**, **`siblingCount`**, **`disabled`**, кастомные подписи для стрелок и страниц.
- Переходы по **`duration.*`** и **`easing.*`** из темы; при **`prefers-reduced-motion`** масштаб не анимируется.
- **`getPaginationItems(page, pageCount, siblingCount)`** возвращает `(number | "ellipsis")[]` — если нужна своя вёрстка кнопок.

Пример:

```tsx
import { Pagination } from "kovax-react";
import { useState } from "react";

export function ResultsPager() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      pageCount={48}
      onPageChange={setPage}
      aria-label="Страницы результатов"
    />
  );
}
```

Подробности — [Pagination.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Pagination.md) и playground **Components → Pagination**.

## useMediaQuery и брейкпоинты из токенов

Те же **`breakpoints`** (`sm`, `md`, `lg`, … в **`em`**) доступны в JS:

```tsx
import {
  useMediaQuery,
  useBreakpointUp,
  breakpointMinMediaQuery,
  themeToken,
} from "kovax-react";

const lgUp = useBreakpointUp("lg");
const custom = useMediaQuery(`(min-width: ${themeToken("breakpoint.md")})`);
const mq = breakpointMinMediaQuery("md"); // "(min-width: 48em)"
```

- **`useMediaQuery`** на **`useSyncExternalStore`** — предсказуемое поведение при SSR (опция **`defaultMatches`**).
- Документация по токенам — [Tokens.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Tokens.md).

## Прочее

- В графе зависимостей применён **`npm audit fix`** (прозрачные для потребителя обновления транзитивных пакетов).

## Что дальше

Из списка после **0.5** в работе/очереди остаются **`Menu`** (частично покрыт в текущем дереве), **`Breadcrumb`**, развитие **Toast** и т. д. Идеи и баги — **[issues](https://github.com/MrKamura/kovax/issues)**.

## Поддержать

Библиотека MIT. Звезда на **[GitHub](https://github.com/MrKamura/kovax)** или [Boosty](https://boosty.to/mrkamura) / [CloudTips](https://pay.cloudtips.ru/p/d79814b0) — спасибо.
