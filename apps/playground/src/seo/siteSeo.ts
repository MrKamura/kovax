import type { TFunction } from "i18next";
import type { ComponentPage, SiteRoute } from "../routing/siteRoutes";

const COMPONENT_KEYS: Record<ComponentPage, string> = {
  tokens: "tokens.pageTitle",
  layout: "documentation.topics.layout",
  typography: "documentation.topics.typography",
  button: "documentation.topics.button",
  input: "documentation.topics.input",
  controls: "documentation.topics.controls",
  select: "documentation.topics.select",
  overlays: "documentation.topics.overlays",
  form: "documentation.topics.form",
  tabs: "documentation.topics.tabs",
  accordion: "documentation.topics.accordion",
  alert: "documentation.topics.alert",
  progress: "documentation.topics.progress",
  datePicker: "documentation.topics.datePicker",
  table: "documentation.topics.table",
};

export function siteTitleForRoute(route: SiteRoute, t: TFunction): string {
  const brand = t("seo.brandSuffix");
  if (route.area === "home") return t("seo.homeTitle", { brand });
  if (route.area === "docs") return t("seo.docsTitle", { brand });
  const labelKey = COMPONENT_KEYS[route.component];
  const label = t(labelKey);
  return t("seo.componentTitle", { label, brand });
}

export function siteDescriptionForRoute(route: SiteRoute, t: TFunction): string {
  if (route.area === "home") return t("seo.homeDescription");
  if (route.area === "docs") return t("seo.docsDescription");
  const labelKey = COMPONENT_KEYS[route.component];
  const label = t(labelKey);
  return t("seo.componentDescription", { label });
}

export function absoluteSiteUrl(
  pathname: string,
  siteOrigin: string,
): string {
  const origin = siteOrigin.replace(/\/+$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${origin}${path}`;
}

export function upsertMetaTag(
  head: HTMLHeadElement | undefined,
  attrs: { name?: string; property?: string; content: string },
): void {
  if (!head || typeof document === "undefined") return;
  const selector = attrs.name
    ? `meta[name="${attrs.name}"]`
    : `meta[property="${attrs.property}"]`;
  let el = head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    if (attrs.name) el.setAttribute("name", attrs.name);
    if (attrs.property) el.setAttribute("property", attrs.property);
    head.appendChild(el);
  }
  el.setAttribute("content", attrs.content);
}

export function upsertLinkTag(
  head: HTMLHeadElement | undefined,
  rel: string,
  href: string,
): void {
  if (!head || typeof document === "undefined") return;
  const selector = `link[rel="${rel}"]`;
  let el = head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    head.appendChild(el);
  }
  el.setAttribute("href", href);
}
