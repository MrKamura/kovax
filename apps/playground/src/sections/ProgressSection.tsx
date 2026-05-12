import {
  CircularProgress,
  HStack,
  LinearProgress,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

export function ProgressSection() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("progress.pageTitle")}</h1>
      <p>
        <Trans i18nKey="progress.intro" components={{ strong: <strong />, code: <code /> }} />
      </p>

      <h2>{t("progress.examplesLinear")}</h2>
      <LiveExample
        code={`import { LinearProgress, VStack, themeToken } from "kovax-react";

<VStack gap={themeToken("spacing.md")} align="stretch">
  <LinearProgress value={35} aria-label="Primary task" />
  <LinearProgress value={72} colorScheme="success" aria-label="Completed portion" />
  <LinearProgress value={90} colorScheme="warning" aria-label="Quota usage" />
</VStack>`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          <LinearProgress value={35} aria-label={t("progress.ariaPrimaryTask")} />
          <LinearProgress
            value={72}
            colorScheme="success"
            aria-label={t("progress.ariaCompleted")}
          />
          <LinearProgress
            value={90}
            colorScheme="warning"
            aria-label={t("progress.ariaQuota")}
          />
        </VStack>
      </LiveExample>

      <h2>{t("progress.examplesLinearIndeterminate")}</h2>
      <LiveExample
        code={`import { LinearProgress } from "kovax-react";

<LinearProgress indeterminate aria-label="Connecting" />`}
      >
        <LinearProgress indeterminate aria-label={t("progress.ariaConnecting")} />
      </LiveExample>

      <h2>{t("progress.examplesCircular")}</h2>
      <LiveExample
        code={`import { CircularProgress, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.lg")} align="center">
  <CircularProgress value={40} aria-label="Score" />
  <CircularProgress value={65} colorScheme="success" size="md" aria-label="Health" />
  <CircularProgress value={82} colorScheme="error" aria-label="Risk" />
</HStack>`}
      >
        <HStack gap={themeToken("spacing.lg")} align="center" wrap="wrap">
          <CircularProgress value={40} aria-label={t("progress.ariaScore")} />
          <CircularProgress
            value={65}
            colorScheme="success"
            size="md"
            aria-label={t("progress.ariaHealth")}
          />
          <CircularProgress
            value={82}
            colorScheme="error"
            aria-label={t("progress.ariaRisk")}
          />
        </HStack>
      </LiveExample>

      <h2>{t("progress.examplesCircularIndeterminate")}</h2>
      <LiveExample
        code={`import { CircularProgress } from "kovax-react";

<CircularProgress indeterminate aria-label="Saving" />`}
      >
        <CircularProgress indeterminate aria-label={t("progress.ariaSaving")} />
      </LiveExample>

      <h2>{t("progress.examplesSizes")}</h2>
      <LiveExample
        code={`import { CircularProgress, HStack, LinearProgress, VStack, themeToken } from "kovax-react";

<VStack gap={themeToken("spacing.md")} align="stretch">
  <LinearProgress value={55} size="sm" aria-label="Compact bar" />
  <LinearProgress value={55} size="md" aria-label="Default bar" />
  <LinearProgress value={55} size="lg" aria-label="Large bar" />
  <HStack gap={themeToken("spacing.md")} align="center">
    <CircularProgress value={50} size="sm" aria-label="Small ring" />
    <CircularProgress value={50} size="md" aria-label="Medium ring" />
    <CircularProgress value={50} size="lg" aria-label="Large ring" />
  </HStack>
</VStack>`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          <LinearProgress value={55} size="sm" aria-label={t("progress.ariaBarSm")} />
          <LinearProgress value={55} size="md" aria-label={t("progress.ariaBarMd")} />
          <LinearProgress value={55} size="lg" aria-label={t("progress.ariaBarLg")} />
          <HStack gap={themeToken("spacing.md")} align="center" wrap="wrap">
            <CircularProgress value={50} size="sm" aria-label={t("progress.ariaRingSm")} />
            <CircularProgress value={50} size="md" aria-label={t("progress.ariaRingMd")} />
            <CircularProgress value={50} size="lg" aria-label={t("progress.ariaRingLg")} />
          </HStack>
        </VStack>
      </LiveExample>

      <h2>{t("progress.examplesScale")}</h2>
      <LiveExample
        code={`import { LinearProgress } from "kovax-react";

<LinearProgress value={3} min={0} max={12} aria-label="Step 3 of 12" />`}
      >
        <LinearProgress
          value={3}
          min={0}
          max={12}
          aria-label={t("progress.ariaSteps")}
        />
      </LiveExample>

      <Text size="xs" color={themeToken("secondary.600")} style={{ marginTop: themeToken("spacing.md") }}>
        <Trans i18nKey="progress.docsHint" components={{ strong: <strong /> }} />
      </Text>
    </>
  );
}
