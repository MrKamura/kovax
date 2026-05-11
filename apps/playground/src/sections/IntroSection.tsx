import { Trans, useTranslation } from "react-i18next";

export function IntroSection() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("intro.title")}</h1>
      <p>
        <Trans
          i18nKey="intro.import"
          components={{ code: <span className="doc-code" /> }}
        />
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
        <Trans
          i18nKey="intro.runBody"
          components={{ code: <span className="doc-code" /> }}
        />
      </p>
    </>
  );
}
