import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <div className="doc-header-lang" role="group" aria-label={t("langSwitcher.aria")}>
      <button
        type="button"
        className="doc-header-lang-btn"
        data-active={i18n.language === "en"}
        aria-pressed={i18n.language === "en"}
        onClick={() => void i18n.changeLanguage("en")}
      >
        {t("langSwitcher.en")}
      </button>
      <button
        type="button"
        className="doc-header-lang-btn"
        data-active={i18n.language === "ru"}
        aria-pressed={i18n.language === "ru"}
        onClick={() => void i18n.changeLanguage("ru")}
      >
        {t("langSwitcher.ru")}
      </button>
    </div>
  );
}
