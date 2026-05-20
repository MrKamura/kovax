---
title: "kovax-react 0.7: Next.js App Router, kovax-react/server, and jest-axe in every test"
published: false
description: "kovax-react 0.7 on npm — explicit use client on client bundles, RSC-safe kovax-react/server entry, jest-axe helper in component tests, size-limit badges, NEXTJS_APP_ROUTER.md guide."
tags: react, nextjs, typescript, opensource, accessibility, rsc
canonical_url: https://github.com/MrKamura/kovax
cover_image:
---

**kovax-react 0.7.0** is on npm. After **0.6** shipped product UI (Avatar, Menu, Pagination, breakpoint hooks), **0.7** focuses on **production ergonomics**: clear **Server vs Client** boundaries for the App Router, **automated a11y checks** in Jest, and **bundle size transparency** per entry point.

- 📦 npm: [`kovax-react@0.7.0`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Repo: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Live docs: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)

---

## TL;DR — everything since 0.6.0

| Area | What shipped |
| --- | --- |
| **RSC / Next.js** | **`kovax-react/server`** — RSC-safe **`Box`**, **`Stack`**, **`Container`**, **`Text`**, **`Heading`** |
| **Client bundles** | **`"use client"`** prepended to client-only **`tsup`** outputs after build |
| **Deep imports** | Unchanged RSC-safe entries: **`kovax-react/typography`**, **`/badge`**, **`/progress`** |
| **Testing** | **`jest-axe`**, **`expectNoAxeViolations()`**, automatic axe pass in **`setupTests.ts`** |
| **DatePicker** | **`aria-label`** on popover panel and datetime **`type="time"`** fields |
| **Tooling** | **`.size-limit.json`**, **`npm run size`**, README **size-limit** + **bundlejs** badges |
| **npm** | Expanded **keywords** (`nextjs`, `rsc`, `a11y`, `server-components`, …) |
| **Docs** | **`docs/NEXTJS_APP_ROUTER.md`** — ThemeProvider placement, FOUC, import matrix |

No new runtime peer dependencies.

```bash
npm install kovax-react@0.7.0
```

---

## Why this release exists

Three recurring questions after **0.6**:

1. **Which imports work in Server Components?**
2. **How do we keep accessibility from regressing?**
3. **How big is each deep import really?**

**0.7** answers all three without adding runtime deps.

---

## `"use client"` boundaries

After **`npm run build`**, client bundles include **`"use client"`** so Next.js (and similar RSC stacks) treat them correctly.

| Import | `"use client"` | Use in |
| --- | --- | --- |
| **`kovax-react`** | yes | Client Components |
| **`kovax-react/server`** | no | Server Components |
| **`kovax-react/typography`**, **`/badge`**, **`/progress`** | no | Server Components |
| **`kovax-react/tokens`**, **`/form`**, **`/overlays`**, … | yes | Client only |

Rule of thumb: hooks, context, effects → client entry. Static markup → server entry.

---

## kovax-react/server

```tsx
// app/page.tsx — Server Component
import { Container, Heading, Text } from "kovax-react/server";
import { SignInForm } from "./sign-in-form";

export default function Page() {
  return (
    <Container maxW="lg">
      <Heading level={1}>Welcome</Heading>
      <Text size="lg">Sign in to continue.</Text>
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
        Sign in
      </Button>
    </VStack>
  );
}
```

Mount **`ThemeProvider`** in a client **`providers.tsx`** wrapper — full walkthrough: [NEXTJS_APP_ROUTER.md](https://github.com/MrKamura/kovax/blob/master/docs/NEXTJS_APP_ROUTER.md).

---

## FOUC and data-kovax-theme

**0.7** documents an inline script pattern for **`data-kovax-theme`** before first paint (system / stored color mode).

**0.8** ships **`ColorModeScript`** as a drop-in (Chakra-style). On **0.7**, follow the doc; upgrade to **0.8** when you want the component API.

---

## jest-axe in component tests

```tsx
import { render } from "@testing-library/react";
import { expectNoAxeViolations } from "../test-utils";
import { Button } from "./Button";

it("has no axe violations", async () => {
  const { container } = render(<Button>Solid</Button>);
  await expectNoAxeViolations(container);
});
```

**`setupTests.ts`** wires axe globally — **`npm test`** catches many a11y regressions early.

---

## size-limit and README badges

**`.size-limit.json`** enforces gzip budgets per entry; **`npm run size`** fails CI on bundle bloat.

README tables link **size-limit** badges and **bundlejs.com** analysis for **`kovax-react`**, **`/server`**, **`/form`**, **`/overlays`**, etc. — useful when picking deep imports in App Router apps.

---

## DatePicker accessibility

- Labeled popover panel (**`aria-label`**).
- Datetime variant (**`variant="datetime"`**) labels time inputs.

Small but important for calendar + time pickers in forms.

---

## Documentation

- **`docs/NEXTJS_APP_ROUTER.md`** — RSC import matrix, providers layout, FOUC notes.
- Playground **Foundation** topic links to the guide.
- Cross-links in README and Getting started.

Try live: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/) (EN/RU UI).

---

## Changelog & upgrade path

Full list: [CHANGELOG.md](https://github.com/MrKamura/kovax/blob/master/CHANGELOG.md).

**0.8** adds Tailwind v4 preset, form library adapters, **`ColorModeScript`**, and Storybook — see [dev-to-v0.8.md](./dev-to-v0.8.md).

Issues and PRs welcome on **[GitHub](https://github.com/MrKamura/kovax)**.

Thanks for reading.
