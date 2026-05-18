import { Trans, useTranslation } from "react-i18next";
import { VStack } from "kovax-react";
import { LiveExample } from "../components/LiveExample";
import {
  MenuBasicsDemo,
  MenuControlledDemo,
  MenuReducedMotionDemo,
  MenuSameWidthDemo,
} from "./overlays/MenuLiveDemos";
import {
  MENU_BASIC_CODE,
  MENU_CONTROLLED_CODE,
  MENU_NO_MOTION_CODE,
  MENU_SAME_WIDTH_CODE,
} from "./overlays/liveCodeStrings";

export function MenuSection() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("menu.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="menu.intro"
          components={{ strong: <strong />, code: <span className="doc-code" /> }}
        />
      </p>

      <h2>{t("menu.examplesBasics")}</h2>
      <LiveExample code={MENU_BASIC_CODE}>
        <MenuBasicsDemo />
      </LiveExample>

      <h2>{t("menu.examplesControlled")}</h2>
      <LiveExample code={MENU_CONTROLLED_CODE}>
        <VStack align="flex-start" gap={12}>
          <MenuControlledDemo />
        </VStack>
      </LiveExample>

      <h2>{t("menu.examplesSameWidth")}</h2>
      <LiveExample code={MENU_SAME_WIDTH_CODE}>
        <MenuSameWidthDemo />
      </LiveExample>

      <h2>{t("menu.examplesNoMotion")}</h2>
      <LiveExample code={MENU_NO_MOTION_CODE}>
        <MenuReducedMotionDemo />
      </LiveExample>

      <p>
        <Trans
          i18nKey="menu.docsCrossLink"
          components={{
            strong: <strong />,
            code: <span className="doc-code" />,
          }}
        />
      </p>
    </>
  );
}
