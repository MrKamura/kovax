import { useTranslation } from "react-i18next";
import { SupportDonateLinks } from "./SupportDonateLinks";

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
        <div className="doc-footer-aside">
          <SupportDonateLinks variant="inline" />
        </div>
      </div>
    </footer>
  );
}
