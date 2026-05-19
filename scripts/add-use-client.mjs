import fs from "node:fs";
import path from "node:path";

/** Entry bundles that stay RSC-safe (no hooks / context in the public API). */
export const RSC_SAFE_ENTRIES = new Set([
  "server",
  "typography",
  "badge",
  "progress",
]);

const USE_CLIENT = '"use client";\n';

/**
 * Prepend `"use client"` to client-only bundle outputs after tsup.
 * Skips RSC-safe entry points so they remain importable from Server Components.
 */
export function addUseClientBanner(distDir = path.join(process.cwd(), "dist")) {
  if (!fs.existsSync(distDir)) {
    throw new Error(`dist directory not found: ${distDir}`);
  }

  const bundleFiles = fs
    .readdirSync(distDir)
    .filter((file) => file.endsWith(".js") || file.endsWith(".cjs"));

  let patched = 0;

  for (const file of bundleFiles) {
    const entryName = file.replace(/\.(js|cjs)$/, "");
    if (RSC_SAFE_ENTRIES.has(entryName)) continue;

    const filePath = path.join(distDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    if (content.startsWith('"use client"')) continue;

    fs.writeFileSync(filePath, USE_CLIENT + content, "utf8");
    patched += 1;
  }

  return patched;
}

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  const count = addUseClientBanner();
  console.log(`add-use-client: patched ${count} bundle file(s)`);
}
