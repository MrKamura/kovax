import { useTranslation } from "react-i18next";

const SPONSOR_TIERS = [
  { labelKey: "sponsors.tier50Label", detailKey: "sponsors.tier50Detail" },
  { labelKey: "sponsors.tier200Label", detailKey: "sponsors.tier200Detail" },
  { labelKey: "sponsors.tier500Label", detailKey: "sponsors.tier500Detail" },
] as const;

export function SponsorsSection() {
  const { t } = useTranslation();

  return (
    <section
      className="intro-sponsors"
      aria-labelledby="intro-sponsors-heading"
    >
      <h2 id="intro-sponsors-heading" className="intro-sponsors-heading">
        {t("sponsors.title")}
      </h2>
      <p className="intro-sponsors-lead">{t("sponsors.lead")}</p>
      <div className="intro-sponsors-grid">
        {SPONSOR_TIERS.map((tier) => (
          <article key={tier.labelKey} className="intro-sponsors-tier">
            <h3 className="intro-sponsors-tier-label">{t(tier.labelKey)}</h3>
            <p className="intro-sponsors-tier-detail">{t(tier.detailKey)}</p>
            <div
              className="intro-sponsors-slot"
              aria-label={t("sponsors.slotAria")}
            >
              <span className="intro-sponsors-slot-text">
                {t("sponsors.slotPlaceholder")}
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="intro-sponsors-cta">{t("sponsors.cta")}</p>
    </section>
  );
}
