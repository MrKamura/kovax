/**
 * Base path for GitHub Pages (`/<repo>/`) vs local dev (`/`).
 * Mirrors `vite.config.ts` — keep in sync when changing env vars.
 */
export function playgroundBaseFromEnv(): string {
  const raw = process.env.VITE_BASE_PATH;
  if (raw && raw.length > 0) {
    return raw.endsWith("/") ? raw : `${raw}/`;
  }
  return "/";
}
