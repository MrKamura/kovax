import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const libraryRoot = path.resolve(rootDir, "../..");

/** GitHub Pages project sites need `/<repo>/` (set via `VITE_BASE_PATH` in CI). */
const base =
  process.env.VITE_BASE_PATH && process.env.VITE_BASE_PATH.length > 0
    ? process.env.VITE_BASE_PATH.endsWith("/")
      ? process.env.VITE_BASE_PATH
      : `${process.env.VITE_BASE_PATH}/`
    : "/";

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      // Library sources — no root `npm run build` required beforehand
      "kovax-react": path.resolve(libraryRoot, "src/index.ts"),
    },
  },
  server: {
    fs: {
      allow: [libraryRoot],
    },
  },
});
