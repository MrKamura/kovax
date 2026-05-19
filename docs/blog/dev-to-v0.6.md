---
title: "kovax-react 0.6: Avatar, Badge, Menu, Skeleton, Pagination, and breakpoint hooks"
published: false
description: "kovax-react 0.6 on npm — five new components (Avatar, Badge, Menu, Skeleton, Pagination), Popover menu keyboard support, useMediaQuery/useBreakpointUp from design tokens, deep imports per bundle, EN/RU playground."
tags: react, typescript, opensource, ui, accessibility
canonical_url: https://github.com/MrKamura/kovax
cover_image:
---

**kovax-react 0.6.0** is on npm. If you’re on **0.5** with **ThemeProvider** and CSS-variable theming, this release is a full “product UI” drop: **five new components**, **responsive hooks** tied to **`breakpoint.*` tokens**, and **Popover** upgrades that power accessible **menus** — still **MIT**, still **no new runtime peers**.

- 📦 npm: [`kovax-react@0.6.0`](https://www.npmjs.com/package/kovax-react)
- 🧑‍💻 Repo: [github.com/MrKamura/kovax](https://github.com/MrKamura/kovax)
- 🧪 Live docs & playground: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/)

---

## TL;DR — everything since 0.5.0

| Area | What shipped |
| --- | --- |
| **`Avatar`** | Photo, initials from **`name`**, custom **`fallback`**; sizes **`xs`–`xl`**, **`circle` / `rounded`**; auto-fallback on broken **`src`** — **`kovax-react/avatar`** |
| **`Badge`** | Status / count pill; **`solid` / `outline` / `subtle`**, semantic colors, optional **dot** — **`kovax-react/badge`** |
| **`Menu`** / **`DropdownMenu`** | Compound menu on **Popover**; **`role="menu"`**, ↑↓ / Home / End / Enter / Space; enter animation — **`kovax-react/menu`** |
| **`Skeleton`** | Loading placeholders; **`pulse` / `shimmer` / `none`**, shapes, **`text`** lines — **`kovax-react/skeleton`** |
| **`Pagination`** | Accessible pager + **`getPaginationItems`** — **`kovax-react/pagination`** |
| **Responsive** | **`useMediaQuery`**, **`useBreakpointUp`**, **`breakpointMinMediaQuery`**, **`breakpointMinWidth`**, **`breakpointMinMediaQueryFromToken`** (also on **`kovax-react/tokens`**) |
| **`Popover`** | **`contentRole="menu"`**, **`ariaHasPopup`**, **`usePopoverRootContext`**, roving focus for **`menuitem`** |
| **Maintenance** | **`npm audit fix`** (transitive dependency updates) |
| **Docs / playground** | New Markdown for all components above; **Components →** live sections; **EN/RU** strings; **`docs/blog/`** drafts |

No new runtime peer dependencies beyond **React 18+** (and optional **`react-day-picker`** for date pickers, unchanged).

## Install

```bash
npm install kovax-react@0.6.0
```

Optional deep imports (same APIs, smaller parse surface):

```text
kovax-react/avatar | /badge | /menu | /skeleton | /pagination | /tokens
```

---

## Avatar

Profile image, initials, or any **`fallback`** node inside a fixed frame.

```tsx
import { Avatar, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.sm")} align="center">
  <Avatar name="Jane Doe" />
  <Avatar src="/jane.jpg" alt="Jane Doe" name="Jane Doe" size="lg" />
  <Avatar name="Live" colorScheme="success" size="sm" />
</HStack>
```

- **`name`** → initials (multi-word: first + last initial; single word: first two letters).
- **`size`**: `xs` | `sm` | `md` | `lg` | `xl`.
- **`shape`**: `circle` | `rounded`.
- Broken **`src`** → **`fallback`** / initials via **`onError`**.

Docs: [Avatar.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Avatar.md) · Playground **Components → Avatar**.

---

## Badge

Non-interactive pill for statuses, counts, channels.

```tsx
import { Badge, HStack } from "kovax-react";

<HStack gap={8}>
  <Badge dot color="success">Live</Badge>
  <Badge color="primary" variant="outline">Pro</Badge>
  <Badge color="neutral" size="sm">12</Badge>
</HStack>
```

- **`variant`**: `solid` | `outline` | `subtle` (default `subtle`).
- **`color`**: semantic palette keys.
- **`dot`**: leading indicator.

Docs: [Badge.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Badge.md) · Playground **Components → Badge**.

---

## Menu (dropdown)

Compound API on the same **Popover** positioning/dismiss stack:

```tsx
import { Button, Menu, Text, themeToken } from "kovax-react";

<Menu.Root>
  <Menu.Trigger>
    <Button type="button" variant="outline">Account</Button>
  </Menu.Trigger>
  <Menu.Content placement="bottom-start">
    <Menu.Item onSelect={() => {}}>
      <Text size="sm">Profile</Text>
    </Menu.Item>
    <Menu.Separator />
    <Menu.Item onSelect={() => {}}>
      <Text size="sm" style={{ color: themeToken("error.600") }}>
        Sign out
      </Text>
    </Menu.Item>
  </Menu.Content>
</Menu.Root>
```

- **`DropdownMenu`** is an alias of **`Menu`**.
- **Keyboard**: ↑ / ↓, Home / End, Enter / Space; Escape closes (via Popover).
- **`motion`**: default enter animation (`kv-menu-enter`); set **`false`** for reduced-motion or tests.
- **`sameWidth`**, controlled **`open` / `onOpenChange`**, **`disabled`** items skipped by arrow keys.

Advanced: build with raw **`Popover.Content contentRole="menu"`** + **`Popover.Trigger ariaHasPopup="menu"`**; **`Menu.Item`** uses **`usePopoverRootContext`** to close on select.

Docs: [Menu.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Menu.md) · [Overlays.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Overlays.md) · Playground **Components → Menu**.

---

## Skeleton

Layout-preserving placeholders while data loads.

```tsx
import { Skeleton, VStack, themeToken } from "kovax-react";

<VStack gap={themeToken("spacing.sm")} align="stretch" style={{ maxWidth: 280 }}>
  <Skeleton variant="pulse" width={200} height={16} />
  <Skeleton variant="shimmer" shape="rounded" width="100%" height={36} />
  <Skeleton shape="circle" width={40} height={40} />
  <Skeleton text />
  <Skeleton text style={{ width: "70%" }} />
</VStack>
```

- **`variant`**: `pulse` | `shimmer` | `none`.
- **`shape`**: `rectangle` | `rounded` | `circle`.
- **`text`**: height follows **`text.sm`** token.
- **`ensureSkeletonKeyframes()`** for custom wrappers (auto-injected for animated variants).

Docs: [Skeleton.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Skeleton.md) · Playground **Components → Skeleton**.

---

## Pagination

Controlled pager for tables and search — parent owns **`page` / `pageCount`**.

```tsx
import { Pagination } from "kovax-react";
import { useState } from "react";

export function SearchResultsPager() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      page={page}
      pageCount={40}
      onPageChange={setPage}
      variant="outline"
      size="sm"
      siblingCount={2}
      aria-label="Search results"
    />
  );
}
```

- Semantic **`nav`**, **`aria-current="page"`**, ellipsis **`aria-hidden`**.
- **`variant`**: `soft` | `outline`; **`size`**: `sm` | `md`; **`disabled`**; i18n labels.
- Motion from **`duration.*` / `easing.*`**; no scale animation when **`prefers-reduced-motion`**.
- **`getPaginationItems(page, pageCount, siblingCount)`** → `(number | "ellipsis")[]` for fully custom UI.

```tsx
import { getPaginationItems } from "kovax-react/pagination";
```

Docs: [Pagination.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Pagination.md) · Playground **Components → Pagination**.

---

## Breakpoints in JavaScript

Same **`em`** scale as CSS (`sm` 30em, `md` 48em, `lg` 62em, …):

| API | Role |
| --- | --- |
| **`useBreakpointUp("md")`** | `true` when viewport ≥ token |
| **`useMediaQuery(query, options?)`** | Generic `matchMedia` |
| **`breakpointMinMediaQuery("md")`** | `"(min-width: 48em)"` |
| **`breakpointMinWidth("md")`** | `48em` |
| **`breakpointMinMediaQueryFromToken("breakpoint.md")`** | Via token path |

```tsx
import { useBreakpointUp, useMediaQuery, themeToken, Grid } from "kovax-react";

const threeCols = useBreakpointUp("lg", { defaultMatches: true }); // desktop-first SSR

return <Grid columns={threeCols ? 3 : 1} gap={16}>{children}</Grid>;
```

**`useMediaQuery`** uses **`useSyncExternalStore`**; **`defaultMatches`** controls server / first paint.

Docs: [Tokens.md](https://github.com/MrKamura/kovax/blob/master/docs/components/Tokens.md) · Playground **Components → Design tokens**.

---

## Popover changes (shared foundation)

Low-level additions used by **Menu** and custom overlays:

- **`Popover.Content`**: **`contentRole="dialog"`** (default) or **`"menu"`**.
- **`Popover.Trigger`**: **`ariaHasPopup="dialog"`** | **`"menu"`**.
- **`usePopoverRootContext()`** exported for primitives that close the layer on activate.
- When **`contentRole="menu"`**: first **`menuitem`** focused on open; arrow / Home / End move focus among enabled items.

---

## Documentation, playground, repo

- **Markdown**: new component pages listed above; **Tokens** + **Overlays** updated.
- **Playground**: live **Preview / Code** for Avatar, Badge, Menu, Skeleton, Pagination; Documentation topics; **EN/RU** UI chrome.
- **Blog drafts** in **`docs/blog/`** (Habr / DEV.to); local-only **`/blog/`** at repo root (gitignored).
- **README**: cover image, **What’s new (v0.6.0)** section.

Try without installing: [mrkamura.github.io/kovax](https://mrkamura.github.io/kovax/).

---

## Changelog & what’s next

Full list: [CHANGELOG.md](https://github.com/MrKamura/kovax/blob/master/CHANGELOG.md).

Still on the radar: **`Breadcrumb`**, richer **Toast** patterns, more overlay polish. Issues and PRs welcome on **[GitHub](https://github.com/MrKamura/kovax)** — comments here too.

Thanks for reading.
