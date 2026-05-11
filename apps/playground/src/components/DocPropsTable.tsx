import { useTranslation } from "react-i18next";

export interface DocPropRow {
  name: string;
  type?: string;
  default?: string;
  description: string;
}

export interface DocPropsTableProps {
  /** Title above the table (e.g. component name) */
  title?: string;
  rows: DocPropRow[];
}

export function DocPropsTable({ title, rows }: DocPropsTableProps) {
  const { t } = useTranslation();
  return (
    <section className="layout-doc-props" aria-label={title ?? t("docProps.ariaProps")}>
      {title ? <h3 className="layout-doc-props-heading">{title}</h3> : null}
      <div className="layout-doc-props-scroll">
        <table className="layout-doc-props-table">
          <thead>
            <tr>
              <th>{t("docProps.prop")}</th>
              <th>{t("docProps.type")}</th>
              <th>{t("docProps.default")}</th>
              <th>{t("docProps.description")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>
                  <code className="layout-doc-props-code">{row.name}</code>
                </td>
                <td>{row.type ?? "—"}</td>
                <td>{row.default ?? "—"}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
