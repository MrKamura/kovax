import { type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSiteNav } from "../routing/SiteNavContext";
import { pathnameForRoute } from "../routing/siteRoutes";

function spaNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  navigate: ReturnType<typeof useSiteNav>["navigate"],
  next: Parameters<typeof navigate>[0],
): void {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (event.button !== 0) return;
  event.preventDefault();
  navigate(next);
}

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const { route, baseUrl, navigate } = useSiteNav();

  const enHref = pathnameForRoute({ ...route, lang: "en" }, baseUrl);
  const ruHref = pathnameForRoute({ ...route, lang: "ru" }, baseUrl);

  return (
    <div className="doc-header-lang" role="group" aria-label={t("langSwitcher.aria")}>
      <a
        href={enHref}
        className="doc-header-lang-btn"
        data-active={i18n.language === "en"}
        aria-pressed={i18n.language === "en"}
        hrefLang="en"
        onClick={(e) =>
          spaNavClick(e, navigate, { ...route, lang: "en" })
        }
      >
        {t("langSwitcher.en")}
      </a>
      <a
        href={ruHref}
        className="doc-header-lang-btn"
        data-active={i18n.language === "ru"}
        aria-pressed={i18n.language === "ru"}
        hrefLang="ru"
        onClick={(e) =>
          spaNavClick(e, navigate, { ...route, lang: "ru" })
        }
      >
        {t("langSwitcher.ru")}
      </a>
    </div>
  );
}
