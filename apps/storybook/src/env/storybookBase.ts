/**
 * Base path for GitHub Pages (`/<repo>/storybook/`) vs local dev (`/`).
 * Set `STORYBOOK_BASE_PATH` in CI — mirrors playground `VITE_BASE_PATH`.
 */
export function storybookBaseFromEnv(): string {
  const raw = process.env.STORYBOOK_BASE_PATH;
  if (raw && raw.length > 0) {
    return raw.endsWith("/") ? raw : `${raw}/`;
  }
  return "/";
}
