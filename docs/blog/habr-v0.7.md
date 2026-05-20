# kovax-react 0.7 — Next.js App Router, RSC и a11y в тестах

> **TL;DR:** на npm вышел **kovax-react 0.7.0** — **`"use client"`** в client-бандлах, новый entry **`kovax-react/server`** для Server Components, **`jest-axe`** во всех component-тестах, **size-limit** + бейджи **bundlejs** в README, гайд **`NEXTJS_APP_ROUTER.md`**, улучшения **DatePicker** по a11y. MIT, React 18+.

**Ссылки:**

- 📦 npm: [`kovax-react@0.7.0`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Репозиторий: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)

---

## Зачем этот релиз

После **0.6** (Avatar, Menu, Pagination, брейкпоинты) библиотека закрывала «витринный» слой UI, но в продакшене всё чаще нужны три вещи:

1. **Next.js App Router** — где можно рендерить на сервере, а где обязателен client boundary.
2. **Предсказуемый a11y** — не «на глаз», а проверка в CI.
3. **Прозрачный размер бандлов** — особенно при deep imports **`kovax-react/*`**.

**0.7** — инфраструктурный минор: меньше сюрпризов в RSC, больше уверенности в доступности и весах entry points.

---

## Сводная таблица

| Область | Что появилось |
| --- | --- |
| **RSC / Next.js** | **`kovax-react/server`** — **`Box`**, **`Stack`**, **`Container`**, **`Text`**, **`Heading`** без hooks |
| **Client bundles** | **`"use client"`** автоматически в client-only выходах **`tsup`** |
| **Deep imports** | RSC-safe без изменений: **`kovax-react/typography`**, **`/badge`**, **`/progress`** |
| **A11y в тестах** | **`jest-axe`**, хелпер **`expectNoAxeViolations()`**, axe после каждого component-теста |
| **DatePicker** | **`aria-label`** на popover-панели и полях **`type="time"`** (datetime) |
| **Tooling** | **`.size-limit.json`**, **`npm run size`**, бейджи **size-limit** + **bundlejs** в README |
| **npm metadata** | Расширены **keywords** (`nextjs`, `rsc`, `a11y`, `design-system`, …) |
| **Документация** | **`docs/NEXTJS_APP_ROUTER.md`** — ThemeProvider, FOUC, RSC vs client |

Новых runtime peer-зависимостей нет.

```bash
npm install kovax-react@0.7.0
```

---

## `"use client"` и границы Server / Client

После сборки **`tsup`** client-бандлы получают директиву **`"use client"`** — Next.js и другие RSC-фреймворки сразу видят, что entry требует клиентского рантайма.

| Import | `"use client"` | Где использовать |
| --- | --- | --- |
| **`kovax-react`** | да | Client Components |
| **`kovax-react/server`** | нет | Server Components |
| **`kovax-react/typography`**, **`/badge`**, **`/progress`** | нет | Server Components |
| **`kovax-react/tokens`**, **`/form`**, **`/overlays`**, … | да | только Client |

**Правило:** всё с hooks, context, effects — client. Статическая вёрстка — server entry.

---

## kovax-react/server

Новый узкий entry для App Router — без **`ThemeProvider`** hooks, без overlay state:

```tsx
// app/page.tsx — Server Component
import { Container, Heading, Text } from "kovax-react/server";
import { SignInForm } from "./sign-in-form";

export default function Page() {
  return (
    <Container maxW="lg">
      <Heading level={1}>Добро пожаловать</Heading>
      <Text size="lg">Войдите, чтобы продолжить.</Text>
      <SignInForm />
    </Container>
  );
}
```

```tsx
// app/sign-in-form.tsx
"use client";

import { Button, FormControl, FormLabel, Input, VStack } from "kovax-react";

export function SignInForm() {
  return (
    <VStack gap={16} align="stretch">
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" type="email" />
      </FormControl>
      <Button type="submit" variant="solid" color="primary">
        Войти
      </Button>
    </VStack>
  );
}
```

**`ThemeProvider`** по-прежнему монтируется в client **`providers.tsx`** — см. [NEXTJS_APP_ROUTER.md](https://github.com/MrKamura/kovax/blob/master/docs/NEXTJS_APP_ROUTER.md).

---

## FOUC и data-kovax-theme

В **0.7** в доке описан inline-скрипт для **`data-kovax-theme`** до первой отрисовки (чтобы не мигала светлая тема при **`defaultColorMode="system"`**).

В **0.8** это оформлено как готовый **`ColorModeScript`** — если вы на **0.7**, используйте паттерн из **`NEXTJS_APP_ROUTER.md`**; при апгрейде на **0.8** можно заменить на компонент из **`kovax-react/server`**.

---

## jest-axe в каждом component-тесте

```tsx
// src/test-utils — expectNoAxeViolations()
import { render } from "@testing-library/react";
import { expectNoAxeViolations } from "../test-utils";
import { Button } from "./Button";

it("renders without a11y violations", async () => {
  const { container } = render(<Button>Solid</Button>);
  await expectNoAxeViolations(container);
});
```

**`setupTests.ts`** подключает axe автоматически — регрессии по WCAG ловятся в **`npm test`**, не только ручным аудитом.

---

## size-limit и бейджи в README

**`.size-limit.json`** задаёт gzip-лимиты per entry; **`npm run size`** падает в CI при раздувании бандла.

В README — бейджи **size-limit** и ссылки на **bundlejs.com** для **`kovax-react`**, **`/server`**, **`/form`**, **`/overlays`** и др. Удобно сравнивать deep import vs root при выборе entry в Next.js / Vite.

---

## DatePicker: a11y

- **`aria-label`** на popover-панели календаря.
- В режиме **`variant="datetime"`** — подписи на полях времени (**`type="time"`**).

Screen reader и keyboard UX ближе к ожиданиям для date/time picker.

---

## Документация и playground

- **`docs/NEXTJS_APP_ROUTER.md`** — размещение **`ThemeProvider`**, RSC vs client imports, FOUC.
- В playground раздел **Foundation** ссылается на Next.js-гайд.
- **README** / **Getting started** — перекрёстные ссылки.

Playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/) (EN/RU).

---

## Changelog и что дальше

Полный список: [CHANGELOG.md](https://github.com/MrKamura/kovax/blob/master/CHANGELOG.md).

Следующий минор **0.8** — Tailwind v4 preset, адаптеры форм, **`ColorModeScript`**, Storybook. Если вы на **0.7**, имеет смысл прочитать [habr-v0.8.md](./habr-v0.8.md).

Баги и идеи — **[issues](https://github.com/MrKamura/kovax/issues)** и PR.

---

## Поддержать

Библиотека **MIT**. Звезда на **[GitHub](https://github.com/MrKamura/kovax)** или [Boosty](https://boosty.to/mrkamura) / [CloudTips](https://pay.cloudtips.ru/p/d79814b0) — спасибо.
