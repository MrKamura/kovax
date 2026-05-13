import { Trans, useTranslation } from "react-i18next";
import { SponsorsSection } from "../components/SponsorsSection";
import { SupportDonateLinks } from "../components/SupportDonateLinks";

export interface IntroSectionProps {
  onOpenComponents: () => void;
  onOpenDocs: () => void;
}

export function IntroSection({ onOpenComponents, onOpenDocs }: IntroSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="intro-page">
      <section className="intro-hero" aria-labelledby="intro-hero-title">
        <div className="intro-hero-badge">{t("intro.heroBadge")}</div>
        <h1 id="intro-hero-title" className="intro-hero-title">
          {t("intro.title")}
        </h1>
        <p className="intro-hero-lead">{t("intro.heroLead")}</p>
        <div className="intro-hero-actions">
          <button type="button" className="intro-cta intro-cta--primary" onClick={onOpenComponents}>
            {t("intro.ctaComponents")}
          </button>
          <button type="button" className="intro-cta intro-cta--secondary" onClick={onOpenDocs}>
            {t("intro.ctaDocs")}
          </button>
        </div>
        <SupportDonateLinks variant="hero" />
      </section>

      <section className="intro-cards" aria-label={t("intro.cardsAria")}>
        <article className="intro-card">
          <h2 className="intro-card-title">{t("intro.cardDemosTitle")}</h2>
          <p className="intro-card-body">{t("intro.cardDemosBody")}</p>
        </article>
        <article className="intro-card">
          <h2 className="intro-card-title">{t("intro.cardDocsTitle")}</h2>
          <p className="intro-card-body">
            <Trans
              i18nKey="intro.cardDocsBody"
              components={{ strong: <strong />, code: <span className="doc-code" /> }}
            />
          </p>
        </article>
        <article className="intro-card">
          <h2 className="intro-card-title">{t("intro.cardLiveTitle")}</h2>
          <p className="intro-card-body">{t("intro.cardLiveBody")}</p>
        </article>
      </section>

      <SponsorsSection />

      <section className="intro-detail">
        <h2>{t("intro.detailTitle")}</h2>
        <p>
          <Trans i18nKey="intro.import" components={{ code: <span className="doc-code" /> }} />
        </p>
        <p>
          <Trans
            i18nKey="intro.docs"
            components={{
              code: <span className="doc-code" />,
              strong: <strong />,
            }}
          />
        </p>
        <p>{t("intro.tabs")}</p>

        <h2>{t("intro.runTitle")}</h2>
        <p>
          <Trans i18nKey="intro.runBody" components={{ code: <span className="doc-code" /> }} />
        </p>
      </section>
    </div>
  );
}
