import { useState } from "react";
import {
  Alert,
  Button,
  HStack,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import type { AlertTone } from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

const TRIGGER_TONES: AlertTone[] = [
  "neutral",
  "info",
  "success",
  "warning",
  "error",
];

export function AlertSection() {
  const { t } = useTranslation();
  const [bannerOpen, setBannerOpen] = useState(true);
  const [triggeredTone, setTriggeredTone] = useState<AlertTone | null>(null);

  return (
    <>
      <h1>{t("alert.pageTitle")}</h1>
      <p>
        <Trans i18nKey="alert.intro" components={{ strong: <strong />, code: <code /> }} />
      </p>

      <h2>{t("alert.examplesTones")}</h2>
      <LiveExample
        code={`import { Alert, VStack, themeToken } from "kovax-react";

<VStack gap={themeToken("spacing.md")} align="stretch">
  <Alert tone="neutral">Neutral — inline note or placeholder state.</Alert>
  <Alert tone="info" heading="Did you know?">
    Keyboard shortcuts are listed under Help → Shortcuts.
  </Alert>
  <Alert tone="success" heading="Published">
    Changes are live on production.
  </Alert>
  <Alert tone="warning" heading="Cap nearly reached">
    You have used 90% of your monthly quota.
  </Alert>
  <Alert tone="error" heading="Action required">
    Two-factor authentication must be enabled by Friday.
  </Alert>
</VStack>`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          <Alert tone="neutral">Neutral — inline note or placeholder state.</Alert>
          <Alert tone="info" heading="Did you know?">
            Keyboard shortcuts are listed under Help → Shortcuts.
          </Alert>
          <Alert tone="success" heading="Published">
            Changes are live on production.
          </Alert>
          <Alert tone="warning" heading="Cap nearly reached">
            You have used 90% of your monthly quota.
          </Alert>
          <Alert tone="error" heading="Action required">
            Two-factor authentication must be enabled by Friday.
          </Alert>
        </VStack>
      </LiveExample>

      <h2>{t("alert.examplesTriggerButtons")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import {
  Alert,
  Button,
  HStack,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import type { AlertTone } from "kovax-react";

const tones: AlertTone[] = ["neutral", "info", "success", "warning", "error"];

export function AlertFromButtonsDemo() {
  const [tone, setTone] = useState<AlertTone | null>(null);

  return (
    <VStack gap={themeToken("spacing.md")} align="stretch">
      <HStack gap={themeToken("spacing.sm")} wrap="wrap">
        {tones.map((key) => (
          <Button
            key={key}
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setTone(key)}
          >
            {key}
          </Button>
        ))}
      </HStack>
      {tone ? (
        <Alert
          tone={tone}
          heading={"Shown: " + tone}
          onDismiss={() => setTone(null)}
          dismissLabel="Dismiss"
        >
          <Text size="sm">Update local state from any control (here: Button).</Text>
        </Alert>
      ) : (
        <Text size="sm" color={themeToken("secondary.600")}>
          Pick a tone…
        </Text>
      )}
    </VStack>
  );
}`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          <HStack gap={themeToken("spacing.sm")} wrap="wrap">
            {TRIGGER_TONES.map((toneKey) => (
              <Button
                key={toneKey}
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setTriggeredTone(toneKey)}
              >
                {t(`alert.triggerBtn.${toneKey}`)}
              </Button>
            ))}
          </HStack>
          {triggeredTone ? (
            <Alert
              tone={triggeredTone}
              heading={t(`alert.triggerHeading.${triggeredTone}`)}
              onDismiss={() => setTriggeredTone(null)}
              dismissLabel={t("alert.triggerDismissLabel")}
            >
              <Text size="sm">{t(`alert.triggerBody.${triggeredTone}`)}</Text>
            </Alert>
          ) : (
            <Text size="sm" color={themeToken("secondary.600")}>
              {t("alert.triggerHint")}
            </Text>
          )}
        </VStack>
      </LiveExample>

      <h2>{t("alert.examplesDismiss")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import { Alert } from "kovax-react";

const [open, setOpen] = useState(true);

{open ? (
  <Alert tone="info" heading="Reminders" onDismiss={() => setOpen(false)} dismissLabel="Dismiss reminder">
    You have 3 unread messages.
  </Alert>
) : null}`}
      >
        {bannerOpen ? (
          <Alert
            tone="info"
            heading="Reminders"
            onDismiss={() => setBannerOpen(false)}
            dismissLabel={t("alert.dismissDemoAria")}
          >
            <Text size="sm">You have 3 unread messages.</Text>
          </Alert>
        ) : (
          <Text size="sm" color={themeToken("secondary.600")}>
            {t("alert.dismissedHint")}
          </Text>
        )}
      </LiveExample>

      <h2>{t("alert.examplesAssertive")}</h2>
      <LiveExample
        code={`import { Alert } from "kovax-react";

<Alert tone="error" heading="Session expired" assertive>
  Refresh the page and sign in again.
</Alert>`}
      >
        <Alert tone="error" heading="Session expired" assertive>
          Refresh the page and sign in again.
        </Alert>
      </LiveExample>

      <Text size="xs" color={themeToken("secondary.600")} style={{ marginTop: themeToken("spacing.md") }}>
        <Trans i18nKey="alert.docsHint" components={{ strong: <strong /> }} />
      </Text>
    </>
  );
}
