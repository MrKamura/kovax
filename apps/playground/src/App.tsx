import { useState } from "react";
import { useTranslation } from "react-i18next";
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

type Area = "home" | "components" | "docs";

type ComponentPage =
  | "layout"
  | "typography"
  | "button"
  | "input"
  | "controls"
  | "select"
  | "overlays"
  | "form"
  | "tabs"
  | "accordion"
  | "alert"
  | "progress"
  | "datePicker"
  | "table";

const COMPONENT_NAV: { id: ComponentPage; label: string }[] = [
  { id: "layout", label: "Layout" },
  { id: "typography", label: "Typography" },
  { id: "button", label: "Button" },
  { id: "input", label: "Input" },
  { id: "controls", label: "Controls" },
  { id: "select", label: "Select" },
  { id: "overlays", label: "Overlays" },
  { id: "form", label: "Form" },
  { id: "tabs", label: "Tabs" },
  { id: "accordion", label: "Accordion" },
  { id: "alert", label: "Alert" },
  { id: "progress", label: "Progress" },
  { id: "datePicker", label: "Date picker" },
  { id: "table", label: "Table" },
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
            <LanguageSwitcher />
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
        <main
          className={[
            "doc-main",
            area === "home" ? "doc-main--home" : "",
            area === "docs" ? "doc-main--docs" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {area === "home" && (
            <IntroSection onOpenComponents={goComponents} onOpenDocs={() => setArea("docs")} />
          )}
          {area === "docs" && <DocumentationSection />}
          {area === "components" && component === "layout" && <LayoutSection />}
          {area === "components" && component === "typography" && (
            <TypographySection />
          )}
          {area === "components" && component === "button" && <ButtonSection />}
          {area === "components" && component === "input" && <InputSection />}
          {area === "components" && component === "controls" && <ControlsSection />}
          {area === "components" && component === "select" && <SelectSection />}
          {area === "components" && component === "overlays" && <OverlaysSection />}
          {area === "components" && component === "form" && <FormSection />}
          {area === "components" && component === "tabs" && <TabsSection />}
          {area === "components" && component === "accordion" && <AccordionSection />}
          {area === "components" && component === "alert" && <AlertSection />}
          {area === "components" && component === "progress" && <ProgressSection />}
          {area === "components" && component === "datePicker" && <DatePickerSection />}
          {area === "components" && component === "table" && <TableSection />}
        </main>
      </div>

      <DocFooter />
    </div>
  );
}
