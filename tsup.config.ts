import { writeFileSync } from "node:fs";
import { defineConfig } from "tsup";
import { addUseClientBanner } from "./scripts/add-use-client.mjs";
import { generateTailwindThemeCss } from "./src/tailwind/generateTailwindTheme";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    layout: "src/entries/layout.ts",
    button: "src/entries/button.ts",
    input: "src/entries/input.ts",
    form: "src/entries/form.ts",
    tokens: "src/entries/tokens.ts",
    typography: "src/entries/typography.ts",
    overlays: "src/entries/overlays.ts",
    menu: "src/entries/menu.ts",
    tabs: "src/entries/tabs.ts",
    accordion: "src/entries/accordion.ts",
    alert: "src/entries/alert.ts",
    progress: "src/entries/progress.ts",
    "date-picker": "src/entries/date-picker.ts",
    table: "src/entries/table.ts",
    avatar: "src/entries/avatar.ts",
    badge: "src/entries/badge.ts",
    skeleton: "src/entries/skeleton.ts",
    pagination: "src/entries/pagination.ts",
    server: "src/entries/server.ts",
    "react-hook-form": "src/entries/react-hook-form.ts",
    "tanstack-form": "src/entries/tanstack-form.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: process.env.KOVAX_SOURCEMAP === "1",
  clean: true,
  splitting: false,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react-day-picker",
    "react-hook-form",
    "@tanstack/react-form",
  ],
  async onSuccess() {
    const patched = addUseClientBanner();
    console.log(`use client: patched ${patched} bundle file(s)`);
    writeFileSync("dist/tailwind.css", generateTailwindThemeCss(), "utf8");
    console.log("tailwind: wrote dist/tailwind.css");
  },
});
