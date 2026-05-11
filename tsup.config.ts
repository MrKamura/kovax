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
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: process.env.KOVAX_SOURCEMAP === "1",
  clean: true,
  splitting: false,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
});
