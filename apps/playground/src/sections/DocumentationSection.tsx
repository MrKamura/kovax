import { useId, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { DocMarkdownPanel } from "../components/DocMarkdownPanel";
import { SupportDonateLinks } from "../components/SupportDonateLinks";
import {
  buttonDocumentationMarkdown,
  controlsDocumentationMarkdown,
  formDocumentationMarkdown,
  inputDocumentationMarkdown,
  introDocumentationMarkdown,
  quickStartDocumentationMarkdown,
  releasesDocumentationMarkdown,
  layoutDocumentationMarkdown,
  selectDocumentationMarkdown,
  overlaysDocumentationMarkdown,
  menuDocumentationMarkdown,
  accordionDocumentationMarkdown,
  alertDocumentationMarkdown,
  avatarDocumentationMarkdown,
  badgeDocumentationMarkdown,
  skeletonDocumentationMarkdown,
  progressDocumentationMarkdown,
  datePickerDocumentationMarkdown,
  tableDocumentationMarkdown,
  paginationDocumentationMarkdown,
  tabsDocumentationMarkdown,
  typographyDocumentationMarkdown,
} from "../docContent/bundles";

type DocTopicId =
  | "foundation"
  | "quickStart"
  | "releases"
  | "layout"
  | "typography"
  | "avatar"
  | "badge"
  | "skeleton"
  | "button"
  | "input"
  | "controls"
  | "select"
  | "overlays"
  | "menu"
  | "form"
  | "tabs"
  | "accordion"
  | "alert"
  | "progress"
  | "datePicker"
  | "table"
  | "pagination";

const TOPICS: { id: DocTopicId; markdown: string }[] = [
  {
    id: "foundation",
    markdown: introDocumentationMarkdown,
  },
  {
    id: "quickStart",
    markdown: quickStartDocumentationMarkdown,
  },
  {
    id: "releases",
    markdown: releasesDocumentationMarkdown,
  },
  {
    id: "layout",
    markdown: layoutDocumentationMarkdown,
  },
  {
    id: "typography",
    markdown: typographyDocumentationMarkdown,
  },
  {
    id: "avatar",
    markdown: avatarDocumentationMarkdown,
  },
  {
    id: "badge",
    markdown: badgeDocumentationMarkdown,
  },
  {
    id: "skeleton",
    markdown: skeletonDocumentationMarkdown,
  },
  {
    id: "button",
    markdown: buttonDocumentationMarkdown,
  },
  {
    id: "input",
    markdown: inputDocumentationMarkdown,
  },
  {
    id: "controls",
    markdown: controlsDocumentationMarkdown,
  },
  {
    id: "select",
    markdown: selectDocumentationMarkdown,
  },
  {
    id: "overlays",
    markdown: overlaysDocumentationMarkdown,
  },
  {
    id: "menu",
    markdown: menuDocumentationMarkdown,
  },
  {
    id: "form",
    markdown: formDocumentationMarkdown,
  },
  {
    id: "tabs",
    markdown: tabsDocumentationMarkdown,
  },
  {
    id: "accordion",
    markdown: accordionDocumentationMarkdown,
  },
  {
    id: "alert",
    markdown: alertDocumentationMarkdown,
  },
  {
    id: "progress",
    markdown: progressDocumentationMarkdown,
  },
  {
    id: "datePicker",
    markdown: datePickerDocumentationMarkdown,
  },
  {
    id: "table",
    markdown: tableDocumentationMarkdown,
  },
  {
    id: "pagination",
    markdown: paginationDocumentationMarkdown,
  },
];

export function DocumentationSection() {
  const { t } = useTranslation();
  const [topic, setTopic] = useState<DocTopicId>("foundation");
  const uid = useId();
  const current = TOPICS.find((x) => x.id === topic)!;

  return (
    <>
      <h1>{t("documentation.title")}</h1>
      <p className="doc-docs-lead">
        <Trans
          i18nKey="documentation.lead"
          components={{ code: <span className="doc-code" /> }}
        />
      </p>

      <div className="doc-docs-support">
        <SupportDonateLinks variant="inline" />
      </div>

      <div
        className="doc-docs-topic-bar"
        role="tablist"
        aria-label={t("documentation.topicBarAria")}
      >
        {TOPICS.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={`${uid}-tab-${x.id}`}
            aria-selected={topic === x.id}
            tabIndex={topic === x.id ? 0 : -1}
            className="doc-docs-topic-tab"
            data-active={topic === x.id}
            onClick={() => setTopic(x.id)}
          >
            {t(`documentation.topics.${x.id}`)}
          </button>
        ))}
      </div>
      <p className="doc-docs-topic-meta">{t(`documentation.hints.${current.id}`)}</p>

      <DocMarkdownPanel markdown={current.markdown} />
    </>
  );
}
