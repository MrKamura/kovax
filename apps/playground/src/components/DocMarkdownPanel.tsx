import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const docMarkdownComponents: Components = {
  table: ({ children, ...props }) => (
    <div className="doc-md-table-scroll">
      <table {...props}>{children}</table>
    </div>
  ),
};

export interface DocMarkdownPanelProps {
  markdown: string;
  /** Optional heading above docs/*.md content */
  title?: string;
}

export function DocMarkdownPanel({ markdown, title }: DocMarkdownPanelProps) {
  const { t } = useTranslation();
  if (!markdown.trim()) return null;

  return (
    <section className="doc-md-panel" aria-label={title ?? t("docMarkdown.ariaDocumentation")}>
      {title ? <h2 className="doc-md-panel-title">{title}</h2> : null}
      <div className="doc-md-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={docMarkdownComponents}>
          {markdown}
        </ReactMarkdown>
      </div>
    </section>
  );
}
