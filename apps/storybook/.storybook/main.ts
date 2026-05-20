import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { storybookBaseFromEnv } from "../src/env/storybookBase.ts";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const libraryRoot = path.resolve(configDir, "../../..");

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(configDir, "../tsconfig.docgen.json"),
      include: [
        "src/**/*.tsx",
        "src/**/*.ts",
        ".storybook/**/*.tsx",
        "../../src/**/*.tsx",
        "../../src/**/*.ts",
      ],
      exclude: [
        "**/*.stories.tsx",
        "../../src/**/__tests__/**",
        "../../src/**/*.test.ts",
        "../../src/**/*.test.tsx",
      ],
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !prop.parent.fileName.includes("node_modules") : true,
    },
  },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      base: storybookBaseFromEnv(),
      resolve: {
        alias: {
          "kovax-react/react-hook-form": path.resolve(
            libraryRoot,
            "src/entries/react-hook-form.ts",
          ),
          "kovax-react/tanstack-form": path.resolve(
            libraryRoot,
            "src/entries/tanstack-form.ts",
          ),
          "kovax-react": path.resolve(libraryRoot, "src/index.ts"),
        },
      },
      server: {
        fs: {
          allow: [libraryRoot],
        },
      },
    });
  },
};

export default config;
