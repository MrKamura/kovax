import { useTranslation } from "react-i18next";
import { useColorMode, type ColorMode } from "kovax-react";

const MODES: ColorMode[] = ["light", "dark", "system"];

export function ColorModeSwitcher() {
  const { t } = useTranslation();
  const { colorMode, setColorMode } = useColorMode();

  return (
    <div
      className="doc-header-mode"
      role="group"
      aria-label={t("colorMode.aria")}
    >
      {MODES.map((m) => (
        <button
          key={m}
          type="button"
          className="doc-header-mode-btn"
          data-active={colorMode === m}
          aria-pressed={colorMode === m}
          onClick={() => setColorMode(m)}
        >
          {t(`colorMode.${m}`)}
        </button>
      ))}
    </div>
  );
}
