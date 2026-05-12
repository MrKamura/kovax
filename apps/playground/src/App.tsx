import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DocFooter } from "./components/DocFooter";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { IntroSection } from "./sections/IntroSection";
import { DocumentationSection } from "./sections/DocumentationSection";
import { LayoutSection } from "./sections/LayoutSection";
import { ButtonSection } from "./sections/ButtonSection";
import { InputSection } from "./sections/InputSection";
import { FormSection } from "./sections/FormSection";
import { TypographySection } from "./sections/TypographySection";

type Area = "home" | "components" | "docs";

type ComponentPage = "layout" | "typography" | "button" | "input" | "form";

const COMPONENT_NAV: { id: ComponentPage; label: string }[] = [
  { id: "layout", label: "Layout" },
  { id: "typography", label: "Typography" },
  { id: "button", label: "Button" },
  { id: "input", label: "Input" },
  { id: "form", label: "Form" },
];

export default function App() {
  const { t } = useTranslation();
  const [area, setArea] = useState<Area>("home");
  const [component, setComponent] = useState<ComponentPage>("layout");

  const showSidebar = area === "components";

  const goComponents = () => {
    setArea("components");
  };

  return (
    <div className="doc-app">
      <header className="doc-header">
        <div className="doc-header-inner">
          <div className="doc-header-brand-wrap">
            <button
              type="button"
              className="doc-header-brand"
              onClick={() => setArea("home")}
              aria-label={t("brandAria")}
            >
              Kovax React
            </button>
            <span
              className="doc-header-version"
              title={`kovax-react@${import.meta.env.VITE_KOVAX_VERSION}`}
            >
              v{import.meta.env.VITE_KOVAX_VERSION}
            </span>
          </div>
          <div className="doc-header-actions">
            {showSidebar ? <LanguageSwitcher /> : null}
            <nav className="doc-header-nav" aria-label={t("nav.mainAria")}>
              <button
                type="button"
                className="doc-header-tab"
                data-active={area === "home"}
                aria-current={area === "home" ? "page" : undefined}
                onClick={() => setArea("home")}
              >
                {t("nav.home")}
              </button>
              <button
                type="button"
                className="doc-header-tab"
                data-active={area === "components"}
                aria-current={area === "components" ? "page" : undefined}
                onClick={goComponents}
              >
                {t("nav.components")}
              </button>
              <button
                type="button"
                className="doc-header-tab"
                data-active={area === "docs"}
                aria-current={area === "docs" ? "page" : undefined}
                onClick={() => setArea("docs")}
              >
                {t("nav.documentation")}
              </button>
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
              {COMPONENT_NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-active={component === item.id}
                  onClick={() => setComponent(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        ) : null}
        <main className="doc-main">
          {area === "home" && <IntroSection />}
          {area === "docs" && <DocumentationSection />}
          {area === "components" && component === "layout" && <LayoutSection />}
          {area === "components" && component === "typography" && (
            <TypographySection />
          )}
          {area === "components" && component === "button" && <ButtonSection />}
          {area === "components" && component === "input" && <InputSection />}
          {area === "components" && component === "form" && <FormSection />}
        </main>
      </div>

      <DocFooter />
    </div>
  );
}
