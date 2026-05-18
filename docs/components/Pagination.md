# Pagination

Numeric **pagination** navigation with previous/next controls, page triggers, and ellipsis gaps. Uses **`nav`** with an accessible name, **`aria-current="page"`** on the active trigger, and **`themeToken`**-aligned transitions (transform / colors respect **`prefers-reduced-motion`**).

Pair with tables or lists: keep **`page` / `pageCount` controlled** in parent state and persist offsets server-side as needed.

## Import

```tsx
import { Pagination, getPaginationItems } from "kovax-react";
// Optional bundle:
import { Pagination, getPaginationItems } from "kovax-react/pagination";
```

## Usage

Basic controlled pager:

```tsx
const [page, setPage] = useState(1);

<Pagination page={page} pageCount={24} onPageChange={setPage} aria-label="Search results" />
```

Outlined variant and compact size:

```tsx
<Pagination
  page={page}
  pageCount={50}
  onPageChange={setPage}
  variant="outline"
  size="sm"
/>
```

Wider sibling window (more numbered buttons around the current page):

```tsx
<Pagination page={page} pageCount={100} onPageChange={setPage} siblingCount={2} />
```

Disabled state (e.g. loading):

```tsx
<Pagination page={page} pageCount={10} onPageChange={setPage} disabled />
```

Internationalised labels:

```tsx
<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  previousAriaLabel="Назад"
  nextAriaLabel="Вперёд"
  getPageAriaLabel={(p) => `Страница ${p}`}
/>
```

## Helpers

**`getPaginationItems(page, pageCount, siblingCount)`** returns `(number | "ellipsis")[]` — useful if you render a fully custom layout but want the same gap logic as **`Pagination`**.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | `number` | — | Current page (**1-based**) |
| `pageCount` | `number` | — | Total pages; renders nothing if `< 1` |
| `onPageChange` | `(page: number) => void` | — | Called when the user selects another page |
| `siblingCount` | `number` | `1` | Pages adjacent to the current page (plus first / last) |
| `disabled` | `boolean` | `false` | Disables all controls |
| `size` | `"sm"` \| `"md"` | `"md"` | Control dimensions |
| `variant` | `"soft"` \| `"outline"` | `"soft"` | Surface style |
| `previousLabel` / `nextLabel` | `ReactNode` | chevrons | Optional visible labels |
| `previousAriaLabel` / `nextAriaLabel` | `string` | `"Previous page"` / `"Next page"` | Arrow button names |
| `getPageAriaLabel` | `(page: number) => string` | `` `Page ${p}` `` | Per-page button name |
| `ellipsisLabel` | `ReactNode` | `…` | Ellipsis glyph (`aria-hidden`) |
| … | `HTMLAttributes<HTMLElement>` | — | Passed to the root **`nav`** (`aria-label`, `className`, …) |

## Motion & theming

Interactive surfaces animate **background**, **color**, **border**, **box-shadow** (focus ring), and **transform** (subtle scale on hover / active). When **`prefers-reduced-motion: reduce`** is set, **transform** is omitted so only colors transition.

## Notes

- **Playground**: **Components → Pagination**.
- Does **not** fetch data — wire **`onPageChange`** to your data layer (offset / cursor).
