---
title: "kovax-react 0.6: Pagination + breakpoint hooks from design tokens"
published: false
description: "Pagination with kovax-react/pagination entry, useMediaQuery and useBreakpointUp aligned with breakpoint.* tokens. Playground docs EN/RU."
tags: react, typescript, opensource, ui, accessibility
canonical_url: https://github.com/MrKamura/kovax
cover_image:
---

**kovax-react 0.6** adds **`Pagination`** (optional **`kovax-react/pagination`** bundle), **`useMediaQuery`** / **`useBreakpointUp`**, and **`breakpointMinMediaQuery`** helpers — all aligned with the same **`breakpoint.*`** tokens you already use in **`themeToken`** and CSS.

- 📦 npm: [`kovax-react`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Repo: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Live docs: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)

---

## TL;DR

| Area | What shipped |
| --- | --- |
| **Pagination** | Accessible **`nav`**, prev/next, numbered pages, ellipsis gaps, **`aria-current`**, motion via theme **`duration.*` / `easing.*`**, respects **`prefers-reduced-motion`** |
| **Deep import** | **`kovax-react/pagination`** exports **`Pagination`** + **`getPaginationItems`** |
| **Responsive** | **`useMediaQuery`**, **`useBreakpointUp`**, **`breakpointMinMediaQuery`**, **`breakpointMinWidth`**, **`breakpointMinMediaQueryFromToken`** |
| **Docs / playground** | [Pagination.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Pagination.md), **Components → Pagination**, Documentation topic + EN/RU chrome |

## Pagination

```tsx
import { Pagination } from "kovax-react";
import { useState } from "react";

export function Pager() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      pageCount={40}
      onPageChange={setPage}
      variant="outline"
      size="sm"
      aria-label="Search results"
    />
  );
}
```

Need a fully custom layout but the same gap logic?

```tsx
import { getPaginationItems } from "kovax-react/pagination";

const items = getPaginationItems(page, pageCount, 1);
// (number | "ellipsis")[]
```

## Breakpoints in JS

```tsx
import {
  useBreakpointUp,
  useMediaQuery,
  breakpointMinMediaQuery,
  themeToken,
} from "kovax-react";

const isMdUp = useBreakpointUp("md");
const wide = useMediaQuery(`(min-width: ${themeToken("breakpoint.lg")})`);
```

**`useMediaQuery`** uses **`useSyncExternalStore`** so SSR/hydration can pick a sensible **`defaultMatches`** default.

## Changelog

Full notes (including Russian summary): [CHANGELOG.md](https://github.com/MrKamura/kovax/blob/master/CHANGELOG.md).

Thanks for reading — questions and PRs welcome on **[GitHub](https://github.com/MrKamura/kovax)**.
