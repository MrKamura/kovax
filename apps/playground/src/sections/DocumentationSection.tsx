import { useId, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { DocMarkdownPanel } from "../components/DocMarkdownPanel";
import {
  buttonDocumentationMarkdown,
  formDocumentationMarkdown,
  inputDocumentationMarkdown,
  introDocumentationMarkdown,
  layoutDocumentationMarkdown,
  typographyDocumentationMarkdown,
} from "../docContent/bundles";

type DocTopicId = "foundation" | "layout" | "typography" | "button" | "input" | "form";

const TOPICS: { id: DocTopicId; markdown: string }[] = [
  {
    id: "foundation",
    markdown: introDocumentationMarkdown,
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
    id: "button",
    markdown: buttonDocumentationMarkdown,
  },
  {
    id: "input",
    markdown: inputDocumentationMarkdown,
  },
  {
    id: "form",
    markdown: formDocumentationMarkdown,
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
