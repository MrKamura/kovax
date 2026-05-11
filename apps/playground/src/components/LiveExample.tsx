import { useId, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

type TabId = "preview" | "code";

export interface LiveExampleProps {
  /** Usage sample shown on the Code tab */
  code: string;
  children: ReactNode;
}

export function LiveExample({ code, children }: LiveExampleProps) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabId>("preview");
  const uid = useId();
  const previewId = `${uid}-preview`;
  const codeId = `${uid}-code`;

  return (
    <section className="live-example" aria-label={t("liveExample.ariaExample")}>
      <div className="live-example-tabs" role="tablist" aria-label={t("liveExample.ariaViewMode")}>
        <button
          type="button"
          role="tab"
          id={`${uid}-tab-preview`}
          aria-controls={previewId}
          aria-selected={tab === "preview"}
          tabIndex={tab === "preview" ? 0 : -1}
          className="live-example-tab"
          data-active={tab === "preview"}
          onClick={() => setTab("preview")}
        >
          {t("liveExample.preview")}
        </button>
        <button
          type="button"
          role="tab"
          id={`${uid}-tab-code`}
          aria-controls={codeId}
          aria-selected={tab === "code"}
          tabIndex={tab === "code" ? 0 : -1}
          className="live-example-tab"
          data-active={tab === "code"}
          onClick={() => setTab("code")}
        >
          {t("liveExample.code")}
        </button>
      </div>

      {tab === "preview" ? (
        <div
          id={previewId}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-preview`}
          className="live-example-preview"
        >
          {children}
        </div>
      ) : (
        <pre
          id={codeId}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-code`}
          className="live-example-code-block"
        >
          <code>{code.trim()}</code>
        </pre>
      )}
    </section>
  );
}
