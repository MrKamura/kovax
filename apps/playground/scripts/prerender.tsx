/**
 * Post-process `vite build`: inject SSR HTML per route, sitemap, robots, 404 fallback.
 * Run from app package: `npm run prerender` (after `vite build`).
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToString } from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { ToastProvider } from "kovax-react";
import App from "../src/App";
import { playgroundBaseFromEnv } from "../src/env/playgroundBase";
import en from "../src/locales/en.json";
import ru from "../src/locales/ru.json";
import {
  allStaticRoutes,
  htmlOutputPath,
  pathnameForRoute,
} from "../src/routing/siteRoutes";
import {
  absoluteSiteUrl,
  siteDescriptionForRoute,
  siteTitleForRoute,
} from "../src/seo/siteSeo";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, "../dist");

async function createPrerenderI18n(lng: "en" | "ru") {
  const instance = i18n.createInstance();
  await instance.init({
    lng,
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    interpolation: { escapeValue: false },
  });
  return instance;
}

function defaultSiteOrigin(): string {
  const explicit = process.env.VITE_SITE_ORIGIN?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const repo = process.env.GITHUB_REPOSITORY;
  if (repo) {
    const owner = process.env.GITHUB_REPOSITORY_OWNER ?? repo.split("/")[0];
    return `https://${owner}.github.io`;
  }
  return "http://localhost:5173";
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function injectHead(
  template: string,
  opts: {
    title: string;
    description: string;
    canonicalUrl: string;
    htmlLang: string;
  },
): string {
  let html = template.replace(/<html lang="[^"]*"/, `<html lang="${opts.htmlLang}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(opts.title)}</title>`);
  html = html.replace(/\s*<meta\s+name="description"[^>]*>\s*/gi, "");

  const block = `    <meta name="description" content="${escapeHtml(opts.description)}" />
    <link rel="canonical" href="${escapeHtml(opts.canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(opts.title)}" />
    <meta property="og:description" content="${escapeHtml(opts.description)}" />
    <meta property="og:url" content="${escapeHtml(opts.canonicalUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(opts.title)}" />
    <meta name="twitter:description" content="${escapeHtml(opts.description)}" />`;

  html = html.replace("</head>", `${block}\n  </head>`);
  return html;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function writeSitemap(baseUrl: string, siteOrigin: string): void {
  const routes = allStaticRoutes();
  const urls = routes.map((route) => {
    const pathname = pathnameForRoute(route, baseUrl);
    const loc = absoluteSiteUrl(pathname, siteOrigin);
    return `  <url><loc>${escapeXml(loc)}</loc></url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
  writeFileSync(path.join(distDir, "sitemap.xml"), xml, "utf-8");
}

function robotsSitemapHref(siteOrigin: string, baseUrl: string): string {
  const trimmed = baseUrl.replace(/^\/+|\/+$/g, "");
  const path = trimmed ? `/${trimmed}/sitemap.xml` : "/sitemap.xml";
  return absoluteSiteUrl(path, siteOrigin);
}

function writeRobots(siteOrigin: string, baseUrl: string): void {
  const body = `User-agent: *
Allow: /

Sitemap: ${robotsSitemapHref(siteOrigin, baseUrl)}
`;
  writeFileSync(path.join(distDir, "robots.txt"), body, "utf-8");
}

async function main(): Promise<void> {
  const templatePath = path.join(distDir, "index.html");
  const template = readFileSync(templatePath, "utf-8");
  const baseUrl = playgroundBaseFromEnv();
  const siteOrigin = defaultSiteOrigin();
  const routes = allStaticRoutes();

  for (const route of routes) {
    const i18nInst = await createPrerenderI18n(route.lang);
    const title = siteTitleForRoute(route, i18nInst.t.bind(i18nInst));
    const description = siteDescriptionForRoute(route, i18nInst.t.bind(i18nInst));
    const pathname = pathnameForRoute(route, baseUrl);
    const canonicalUrl = absoluteSiteUrl(pathname, siteOrigin);

    const body = renderToString(
      <I18nextProvider i18n={i18nInst}>
        <ToastProvider>
          <App initialRoute={route} baseUrl={baseUrl} />
        </ToastProvider>
      </I18nextProvider>,
    );

    let html = injectHead(template, {
      title,
      description,
      canonicalUrl,
      htmlLang: route.lang,
    });

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`,
    );

    const relPath = htmlOutputPath(route);
    const outFile = path.join(distDir, relPath);
    mkdirSync(path.dirname(outFile), { recursive: true });
    writeFileSync(outFile, html, "utf-8");
  }

  copyFileSync(path.join(distDir, "index.html"), path.join(distDir, "404.html"));

  writeSitemap(baseUrl, siteOrigin);
  writeRobots(siteOrigin, baseUrl);

  console.log(
    `Prerendered ${routes.length} routes into ${distDir} (sitemap + robots + 404.html).`,
  );
}

void main();
