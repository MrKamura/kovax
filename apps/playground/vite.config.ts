import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { playgroundBaseFromEnv } from "./src/env/playgroundBase";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const libraryRoot = path.resolve(rootDir, "../..");

/** GitHub Pages project sites need `/<repo>/` (set via `VITE_BASE_PATH` in CI). */
const base = playgroundBaseFromEnv();

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
