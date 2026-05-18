export type Lang = "en" | "ru";

export type Area = "home" | "components" | "docs";

export type ComponentPage =
  | "tokens"
  | "theme"
  | "layout"
  | "typography"
  | "avatar"
  | "badge"
  | "button"
  | "input"
  | "controls"
  | "select"
  | "overlays"
  | "menu"
  | "form"
  | "tabs"
  | "accordion"
  | "alert"
  | "progress"
  | "skeleton"
  | "datePicker"
  | "table"
  | "pagination";

export interface SiteRoute {
  lang: Lang;
  area: Area;
  component: ComponentPage;
}

const COMPONENT_TO_SLUG: Record<ComponentPage, string> = {
  tokens: "tokens",
  theme: "theme",
  layout: "layout",
  typography: "typography",
  avatar: "avatar",
  badge: "badge",
  button: "button",
  input: "input",
  controls: "controls",
  select: "select",
  overlays: "overlays",
  menu: "menu",
  form: "form",
  tabs: "tabs",
  accordion: "accordion",
  alert: "alert",
  progress: "progress",
  skeleton: "skeleton",
  datePicker: "date-picker",
  table: "table",
  pagination: "pagination",
};

const SLUG_TO_COMPONENT = Object.fromEntries(
  Object.entries(COMPONENT_TO_SLUG).map(([k, v]) => [v, k as ComponentPage]),
) as Record<string, ComponentPage>;

export function componentSlug(component: ComponentPage): string {
  return COMPONENT_TO_SLUG[component];
}

/** Trailing slashes stripped; empty string means site root (no repo prefix). */
export function normalizeBase(base: string): string {
  const b = base === "/" ? "" : base.replace(/\/+$/, "");
  return b;
}

/**
 * Full pathname beginning with `/`, ending with `/` (except bare `/` when base is `/`).
 */
export function pathnameForRoute(route: SiteRoute, base: string): string {
  const b = normalizeBase(base);
  const parts: string[] = [];
  if (route.lang === "ru") parts.push("ru");
  if (route.area === "docs") parts.push("docs");
  else if (route.area === "components") {
    parts.push("components", COMPONENT_TO_SLUG[route.component]);
  }
  const tail = parts.length ? `${parts.join("/")}/` : "";

  if (!b) {
    return tail ? `/${tail}` : "/";
  }

  return tail ? `${b}/${tail}` : `${b}/`;
}

export function parsePathname(pathname: string, base: string): SiteRoute {
  const b = normalizeBase(base);

  let p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p.length > 1 && p.endsWith("/")) {
    p = p.slice(0, -1);
  }

  let rest = p;
  if (b) {
    if (rest === b || rest.startsWith(`${b}/`)) {
      rest = rest.slice(b.length) || "/";
    }
  }

  if (!rest.startsWith("/")) rest = `/${rest}`;
  const segments = rest.split("/").filter(Boolean);

  let lang: Lang = "en";
  let i = 0;
  if (segments[i] === "ru") {
    lang = "ru";
    i++;
  } else if (segments[i] === "en") {
    i++;
  }

  const pathSegs = segments.slice(i);

  if (pathSegs.length === 0) {
    return { lang, area: "home", component: "tokens" };
  }

  if (pathSegs[0] === "docs" && pathSegs.length === 1) {
    return { lang, area: "docs", component: "tokens" };
  }

  if (
    pathSegs[0] === "components" &&
    pathSegs.length === 2 &&
    SLUG_TO_COMPONENT[pathSegs[1]]
  ) {
    return {
      lang,
      area: "components",
      component: SLUG_TO_COMPONENT[pathSegs[1]],
    };
  }

  return { lang: "en", area: "home", component: "tokens" };
}

export function allStaticRoutes(): SiteRoute[] {
  const components = Object.keys(COMPONENT_TO_SLUG) as ComponentPage[];
  const routes: SiteRoute[] = [];
  for (const lang of ["en", "ru"] as const) {
    routes.push({ lang, area: "home", component: "tokens" });
    routes.push({ lang, area: "docs", component: "tokens" });
    for (const component of components) {
      routes.push({ lang, area: "components", component });
    }
  }
  return routes;
}

/** Path relative to `dist/` for the prerendered HTML file. */
export function htmlOutputPath(route: SiteRoute): string {
  const parts: string[] = [];
  if (route.lang === "ru") parts.push("ru");
  if (route.area === "docs") parts.push("docs");
  else if (route.area === "components") {
    parts.push("components", COMPONENT_TO_SLUG[route.component]);
  }
  if (parts.length === 0) return "index.html";
  return `${parts.join("/")}/index.html`;
}
