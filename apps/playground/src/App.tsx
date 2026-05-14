import { useCallback, useEffect, useMemo, useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { DocFooter } from "./components/DocFooter";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { IntroSection } from "./sections/IntroSection";
import { DocumentationSection } from "./sections/DocumentationSection";
import { LayoutSection } from "./sections/LayoutSection";
import { ButtonSection } from "./sections/ButtonSection";
import { InputSection } from "./sections/InputSection";
import { ControlsSection } from "./sections/ControlsSection";
import { SelectSection } from "./sections/SelectSection";
import { OverlaysSection } from "./sections/OverlaysSection";
import { FormSection } from "./sections/FormSection";
import { TypographySection } from "./sections/TypographySection";
import { TabsSection } from "./sections/TabsSection";
import { AccordionSection } from "./sections/AccordionSection";
import { AlertSection } from "./sections/AlertSection";
import { ProgressSection } from "./sections/ProgressSection";
import { DatePickerSection } from "./sections/DatePickerSection";
import { TableSection } from "./sections/TableSection";
import { TokensSection } from "./sections/TokensSection";
import { ThemeSection } from "./sections/ThemeSection";
import { SiteNavContext } from "./routing/SiteNavContext";
import {
  pathnameForRoute,
  parsePathname,
  type ComponentPage,
  type SiteRoute,
} from "./routing/siteRoutes";
import {
  siteDescriptionForRoute,
  siteTitleForRoute,
  upsertLinkTag,
  upsertMetaTag,
} from "./seo/siteSeo";

export interface AppProps {
  /** When set (SSR prerender), skips parsing `window.location`. */
  initialRoute?: SiteRoute;
  /** Production base (`/<repo>/`); defaults to `import.meta.env.BASE_URL`. */
  baseUrl?: string;
}

const COMPONENT_NAV: { id: ComponentPage; labelKey: string }[] = [
  { id: "tokens", labelKey: "tokens.pageTitle" },
  { id: "theme", labelKey: "theme.pageTitle" },
  { id: "layout", labelKey: "documentation.topics.layout" },
  { id: "typography", labelKey: "documentation.topics.typography" },
  { id: "button", labelKey: "documentation.topics.button" },
  { id: "input", labelKey: "documentation.topics.input" },
  { id: "controls", labelKey: "documentation.topics.controls" },
  { id: "select", labelKey: "documentation.topics.select" },
  { id: "overlays", labelKey: "documentation.topics.overlays" },
  { id: "form", labelKey: "documentation.topics.form" },
  { id: "tabs", labelKey: "documentation.topics.tabs" },
  { id: "accordion", labelKey: "documentation.topics.accordion" },
  { id: "alert", labelKey: "documentation.topics.alert" },
  { id: "progress", labelKey: "documentation.topics.progress" },
  { id: "datePicker", labelKey: "documentation.topics.datePicker" },
  { id: "table", labelKey: "documentation.topics.table" },
];

function spaNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  navigate: (next: SiteRoute) => void,
  next: SiteRoute,
): void {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (event.button !== 0) return;
  event.preventDefault();
  navigate(next);
}

export default function App({
  initialRoute,
  baseUrl: baseUrlProp,
}: AppProps = {}) {
  const { i18n, t } = useTranslation();
  const viteBase = import.meta.env.BASE_URL;
  const baseUrl =
    baseUrlProp ??
    (typeof viteBase === "string" && viteBase.length > 0 ? viteBase : "/");

  const [route, setRoute] = useState<SiteRoute>(() => {
    if (initialRoute) return initialRoute;
    if (typeof window !== "undefined") {
      return parsePathname(window.location.pathname, baseUrl);
    }
    return { lang: "en", area: "home", component: "tokens" };
  });

  const navigate = useCallback(
    (next: SiteRoute, replace = false) => {
      const url = pathnameForRoute(next, baseUrl);
      if (typeof window !== "undefined") {
        if (replace) window.history.replaceState(null, "", url);
        else window.history.pushState(null, "", url);
      }
      setRoute(next);
      void i18n.changeLanguage(next.lang);
    },
    [baseUrl, i18n],
  );

  useEffect(() => {
    const onPop = () => {
      setRoute(parsePathname(window.location.pathname, baseUrl));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [baseUrl]);

  useEffect(() => {
    void i18n.changeLanguage(route.lang);
  }, [route.lang, i18n]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.lang = route.lang;
    document.title = siteTitleForRoute(route, t);
    const desc = siteDescriptionForRoute(route, t);
    const pathname = pathnameForRoute(route, baseUrl);
    const canonical = `${window.location.origin}${pathname}`;
    upsertMetaTag(document.head, { name: "description", content: desc });
    upsertMetaTag(document.head, {
      property: "og:title",
      content: document.title,
    });
    upsertMetaTag(document.head, {
      property: "og:description",
      content: desc,
    });
    upsertMetaTag(document.head, { property: "og:url", content: canonical });
    upsertLinkTag(document.head, "canonical", canonical);
  }, [route, baseUrl, t]);

  const area = route.area;
  const component = route.component;
  const showSidebar = area === "components";

  const homeHref = pathnameForRoute(
    { lang: route.lang, area: "home", component: route.component },
    baseUrl,
  );
  const componentsHref = pathnameForRoute(
    { lang: route.lang, area: "components", component: "tokens" },
    baseUrl,
  );
  const docsHref = pathnameForRoute(
    { lang: route.lang, area: "docs", component: route.component },
    baseUrl,
  );

  const navValue = useMemo(
    () => ({
      baseUrl,
      route,
      navigate,
    }),
    [baseUrl, route, navigate],
  );

  return (
    <SiteNavContext.Provider value={navValue}>
      <div className="doc-app">
        <header className="doc-header">
          <div className="doc-header-inner">
            <div className="doc-header-brand-wrap">
              <a
                href={homeHref}
                className="doc-header-brand"
                aria-label={t("brandAria")}
                onClick={(e) =>
                  spaNavClick(e, navigate, {
                    lang: route.lang,
                    area: "home",
                    component: route.component,
                  })
                }
              >
                Kovax React
              </a>
              <span
                className="doc-header-version"
                title={`kovax-react@${import.meta.env.VITE_KOVAX_VERSION}`}
              >
                v{import.meta.env.VITE_KOVAX_VERSION}
              </span>
            </div>
            <div className="doc-header-actions">
              <ColorModeSwitcher />
              <LanguageSwitcher />
              <nav className="doc-header-nav" aria-label={t("nav.mainAria")}>
                <a
                  href={homeHref}
                  className="doc-header-tab"
                  data-active={area === "home"}
                  aria-current={area === "home" ? "page" : undefined}
                  onClick={(e) =>
                    spaNavClick(e, navigate, {
                      lang: route.lang,
                      area: "home",
                      component: route.component,
                    })
                  }
                >
                  {t("nav.home")}
                </a>
                <a
                  href={componentsHref}
                  className="doc-header-tab"
                  data-active={area === "components"}
                  aria-current={area === "components" ? "page" : undefined}
                  onClick={(e) =>
                    spaNavClick(e, navigate, {
                      lang: route.lang,
                      area: "components",
                      component: "tokens",
                    })
                  }
                >
                  {t("nav.components")}
                </a>
                <a
                  href={docsHref}
                  className="doc-header-tab"
                  data-active={area === "docs"}
                  aria-current={area === "docs" ? "page" : undefined}
                  onClick={(e) =>
                    spaNavClick(e, navigate, {
                      lang: route.lang,
                      area: "docs",
                      component: route.component,
                    })
                  }
                >
                  {t("nav.documentation")}
                </a>
              </nav>
            </div>
          </div>
        </header>

        <div
          className={
            showSidebar ? "doc-shell" : "doc-shell doc-shell--no-sidebar"
          }
        >
          {showSidebar ? (
            <aside className="doc-sidebar">
              <p className="doc-sidebar-heading">{t("sidebar.heading")}</p>
              <p className="doc-sidebar-meta">{t("sidebar.meta")}</p>
              <nav className="doc-nav" aria-label={t("sidebar.navAria")}>
                {COMPONENT_NAV.map((item) => {
                  const href = pathnameForRoute(
                    {
                      lang: route.lang,
                      area: "components",
                      component: item.id,
                    },
                    baseUrl,
                  );
                  const target: SiteRoute = {
                    lang: route.lang,
                    area: "components",
                    component: item.id,
                  };
                  return (
                    <a
                      key={item.id}
                      href={href}
                      data-active={component === item.id}
                      aria-current={component === item.id ? "page" : undefined}
                      onClick={(e) => spaNavClick(e, navigate, target)}
                    >
                      {t(item.labelKey)}
                    </a>
                  );
                })}
              </nav>
            </aside>
          ) : null}
          <main
            className={[
              "doc-main",
              area === "home" ? "doc-main--home" : "",
              area === "docs" ? "doc-main--docs" : "",
              area === "components" && component === "tokens"
                ? "doc-main--tokens"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {area === "home" && <IntroSection />}
            {area === "docs" && <DocumentationSection />}
            {area === "components" && component === "tokens" && <TokensSection />}
            {area === "components" && component === "theme" && <ThemeSection />}
            {area === "components" && component === "layout" && <LayoutSection />}
            {area === "components" && component === "typography" && (
              <TypographySection />
            )}
            {area === "components" && component === "button" && <ButtonSection />}
            {area === "components" && component === "input" && <InputSection />}
            {area === "components" && component === "controls" && (
              <ControlsSection />
            )}
            {area === "components" && component === "select" && <SelectSection />}
            {area === "components" && component === "overlays" && (
              <OverlaysSection />
            )}
            {area === "components" && component === "form" && <FormSection />}
            {area === "components" && component === "tabs" && <TabsSection />}
            {area === "components" && component === "accordion" && (
              <AccordionSection />
            )}
            {area === "components" && component === "alert" && <AlertSection />}
            {area === "components" && component === "progress" && (
              <ProgressSection />
            )}
            {area === "components" && component === "datePicker" && (
              <DatePickerSection />
            )}
            {area === "components" && component === "table" && <TableSection />}
          </main>
        </div>

        <DocFooter />
      </div>
    </SiteNavContext.Provider>
  );
}
