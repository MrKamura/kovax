import { defineConfig } from "tsup";

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
    tabs: "src/entries/tabs.ts",
    accordion: "src/entries/accordion.ts",
    alert: "src/entries/alert.ts",
    progress: "src/entries/progress.ts",
    "date-picker": "src/entries/date-picker.ts",
    table: "src/entries/table.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: process.env.KOVAX_SOURCEMAP === "1",
  clean: true,
  splitting: false,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime", "react-day-picker"],
});
