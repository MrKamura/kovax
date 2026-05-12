import { Trans, useTranslation } from "react-i18next";
import { VStack } from "kovax-react";
import { LiveExample } from "../components/LiveExample";
import {
  DialogDemo,
  ModalConfirmDemo,
  ModalFormDemo,
  ModalFullDemo,
  ModalMediaDemo,
  ModalScrollDemo,
  PopoverAdvancedDemo,
  PopoverDemo,
  ToastSnackDemo,
  TooltipBasicDemo,
  TooltipPlacementsDemo,
} from "./overlays/OverlayLiveDemos";
import {
  DIALOG_CODE,
  MODAL_CONFIRM_CODE,
  MODAL_FORM_CODE,
  MODAL_FULL_CODE,
  MODAL_MEDIA_CODE,
  MODAL_SCROLL_CODE,
  POPOVER_ADVANCED_CODE,
  POPOVER_CODE,
  TOAST_CODE,
  TOOLTIP_BASIC_CODE,
  TOOLTIP_PLACEMENTS_CODE,
} from "./overlays/liveCodeStrings";

export function OverlaysSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("overlays.pageTitle")}</h1>
      <p>
        <Trans i18nKey="overlays.intro" components={{ strong: <strong />, code: <code /> }} />
      </p>

      <h2>{t("overlays.examplesTooltip")}</h2>
      <LiveExample code={TOOLTIP_BASIC_CODE}>
        <TooltipBasicDemo />
      </LiveExample>

      <h2>{t("overlays.examplesTooltipPlacements")}</h2>
      <LiveExample code={TOOLTIP_PLACEMENTS_CODE}>
        <TooltipPlacementsDemo />
      </LiveExample>

      <h2>{t("overlays.examplesPopover")}</h2>
      <LiveExample code={POPOVER_CODE}>
        <PopoverDemo />
      </LiveExample>

      <h2>{t("overlays.examplesPopoverAdvanced")}</h2>
      <LiveExample code={POPOVER_ADVANCED_CODE}>
        <PopoverAdvancedDemo />
      </LiveExample>

      <h2>{t("overlays.examplesToast")}</h2>
      <LiveExample code={TOAST_CODE}>
        <ToastSnackDemo />
      </LiveExample>

      <h2>{t("overlays.examplesModalConfirm")}</h2>
      <LiveExample code={MODAL_CONFIRM_CODE}>
        <ModalConfirmDemo />
      </LiveExample>

      <h2>{t("overlays.examplesModalForm")}</h2>
      <LiveExample code={MODAL_FORM_CODE}>
        <ModalFormDemo />
      </LiveExample>

      <h2>{t("overlays.examplesModalMedia")}</h2>
      <LiveExample code={MODAL_MEDIA_CODE}>
        <ModalMediaDemo />
      </LiveExample>

      <h2>{t("overlays.examplesModalFull")}</h2>
      <LiveExample code={MODAL_FULL_CODE}>
        <ModalFullDemo />
      </LiveExample>

      <h2>{t("overlays.examplesModalScroll")}</h2>
      <LiveExample code={MODAL_SCROLL_CODE}>
        <ModalScrollDemo />
      </LiveExample>

      <h2>{t("overlays.examplesDialog")}</h2>
      <LiveExample code={DIALOG_CODE}>
        <VStack align="flex-start" gap={12}>
          <DialogDemo />
        </VStack>
      </LiveExample>
    </>
  );
}
