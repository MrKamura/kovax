/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** `kovax-react` version from repo root package.json (injected at build time). */
  readonly VITE_KOVAX_VERSION: string;
}

declare module "*.md?raw" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const value: Record<string, unknown>;
  export default value;
}
