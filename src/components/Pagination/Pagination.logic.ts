export type PaginationToken = number | "ellipsis";

/** Builds sorted page numbers plus ellipsis markers between gaps larger than one. */
export function getPaginationItems(
  page: number,
  pageCount: number,
  siblingCount: number,
): PaginationToken[] {
  if (pageCount < 1) return [];
  if (pageCount === 1) return [1];

  const clamped = Math.min(Math.max(page, 1), pageCount);
  const set = new Set<number>();
  set.add(1);
  set.add(pageCount);
  for (let i = clamped - siblingCount; i <= clamped + siblingCount; i++) {
    if (i >= 1 && i <= pageCount) set.add(i);
  }

  const sorted = [...set].sort((a, b) => a - b);
  const out: PaginationToken[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (prev > 0 && n - prev > 1) out.push("ellipsis");
    out.push(n);
    prev = n;
  }
  return out;
}
