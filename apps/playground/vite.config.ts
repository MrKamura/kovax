import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { playgroundBaseFromEnv } from "./src/env/playgroundBase";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const libraryRoot = path.resolve(rootDir, "../..");

const pkgJson = JSON.parse(
  readFileSync(path.join(libraryRoot, "package.json"), "utf-8"),
) as { version: string };

/** GitHub Pages project sites need `/<repo>/` (set via `VITE_BASE_PATH` in CI). */
const base = playgroundBaseFromEnv();

export default defineConfig({
  base,
  define: {
    "import.meta.env.VITE_KOVAX_VERSION": JSON.stringify(pkgJson.version),
  },
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
