/** Merge calendar day with `HH:mm` (24h). */
export function applyTimeToDate(base: Date, hhmm: string): Date {
  const [hs, ms] = hhmm.split(":");
  const h = parseInt(hs ?? "0", 10);
  const m = parseInt(ms ?? "0", 10);
  const out = new Date(base);
  out.setHours(
    Number.isFinite(h) ? h : 0,
    Number.isFinite(m) ? m : 0,
    0,
    0,
  );
  return out;
}

export function extractHHMM(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
