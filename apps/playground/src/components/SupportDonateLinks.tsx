import { useTranslation } from "react-i18next";
import { DONATION_LINKS } from "../supportLinks";

export type SupportDonateLinksVariant = "hero" | "inline";

export interface SupportDonateLinksProps {
  variant: SupportDonateLinksVariant;
}

export function SupportDonateLinks({ variant }: SupportDonateLinksProps) {
  const { t } = useTranslation();

  if (variant === "hero") {
    return (
      <section
        className="intro-support"
        aria-labelledby="intro-support-title"
      >
        <h2 id="intro-support-title" className="intro-support-heading">
          {t("support.title")}
        </h2>
        <p className="intro-support-lead">{t("support.lead")}</p>
        <div className="intro-support-actions">
          {DONATION_LINKS.map((link) => (
            <a
              key={link.href}
              className="intro-donate-btn"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(link.labelKey)}
            </a>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="support-donate-inline">
      <span className="support-donate-inline-label">{t("support.inlineLabel")}</span>
      <nav
        className="support-donate-nav"
        aria-label={t("support.sectionAria")}
      >
        <ul className="support-donate-list">
          {DONATION_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(link.labelKey)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
