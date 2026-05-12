import { useTranslation } from "react-i18next";

const REPO_URL = "https://github.com/MrKamura/kovax";

export function DocFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      className="doc-footer"
      role="contentinfo"
      aria-label={t("footer.aria")}
    >
      <div className="doc-footer-inner">
        <div className="doc-footer-text">
          <p className="doc-footer-copy">{t("footer.copyright", { year })}</p>
          <p className="doc-footer-note">{t("footer.note")}</p>
        </div>
        <a
          className="doc-footer-link"
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footer.repoLabel")}
        </a>
      </div>
    </footer>
  );
}
