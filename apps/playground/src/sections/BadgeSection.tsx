import {
  Badge,
  HStack,
  Text,
  VStack,
  themeToken,
} from "kovax-react";
import type { BadgeColor, BadgeVariant } from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

const VARIANTS: BadgeVariant[] = ["solid", "outline", "subtle"];
const COLORS: BadgeColor[] = [
  "neutral",
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
];

export function BadgeSection() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("badge.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="badge.intro"
          components={{ strong: <strong />, code: <span className="doc-code" /> }}
        />
      </p>

      <h2>{t("badge.examplesVariants")}</h2>
      <LiveExample
        code={`import { Badge, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.sm")} wrap="wrap">
  <Badge variant="solid" color="primary">Solid</Badge>
  <Badge variant="outline" color="primary">Outline</Badge>
  <Badge variant="subtle" color="primary">Subtle</Badge>
</HStack>`}
      >
        <HStack gap={themeToken("spacing.sm")} wrap="wrap">
          <Badge variant="solid" color="primary">
            Solid
          </Badge>
          <Badge variant="outline" color="primary">
            Outline
          </Badge>
          <Badge variant="subtle" color="primary">
            Subtle
          </Badge>
        </HStack>
      </LiveExample>

      <h2>{t("badge.examplesPalette")}</h2>
      <LiveExample
        code={`import { Badge, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.sm")} wrap="wrap">
  <Badge color="neutral">Neutral</Badge>
  <Badge color="primary">Primary</Badge>
  <Badge color="secondary">Secondary</Badge>
  <Badge color="success">Success</Badge>
  <Badge color="warning">Warning</Badge>
  <Badge color="error">Error</Badge>
</HStack>`}
      >
        <HStack gap={themeToken("spacing.sm")} wrap="wrap">
          <Badge color="neutral">Neutral</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
        </HStack>
      </LiveExample>

      <h2>{t("badge.examplesMatrix")}</h2>
      <p>
        <Trans
          i18nKey="badge.matrixLead"
          components={{ code: <span className="doc-code" /> }}
        />
      </p>
      <LiveExample
        code={`import { Badge, HStack, Text, VStack, themeToken } from "kovax-react";
import type { BadgeVariant, BadgeColor } from "kovax-react";

const variants: BadgeVariant[] = ["solid", "outline", "subtle"];
const colors: BadgeColor[] = ["neutral", "primary", "secondary", "success", "warning", "error"];

<VStack gap={themeToken("spacing.md")} align="stretch">
  {variants.map((v) => (
    <VStack key={v} gap={themeToken("spacing.xs")} align="stretch">
      <Text size="sm" fontWeight={600}>{v}</Text>
      <HStack gap={themeToken("spacing.sm")} wrap="wrap">
        {colors.map((c) => (
          <Badge key={c} variant={v} color={c}>{c}</Badge>
        ))}
      </HStack>
    </VStack>
  ))}
</VStack>`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          {VARIANTS.map((v) => (
            <VStack key={v} gap={themeToken("spacing.xs")} align="stretch">
              <Text size="sm" fontWeight={600}>
                {v}
              </Text>
              <HStack gap={themeToken("spacing.sm")} wrap="wrap">
                {COLORS.map((c) => (
                  <Badge key={c} variant={v} color={c}>
                    {c}
                  </Badge>
                ))}
              </HStack>
            </VStack>
          ))}
        </VStack>
      </LiveExample>

      <h2>{t("badge.examplesSizes")}</h2>
      <LiveExample
        code={`import { Badge, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.sm")} align="center" wrap="wrap">
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
</HStack>`}
      >
        <HStack gap={themeToken("spacing.sm")} align="center" wrap="wrap">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </HStack>
      </LiveExample>

      <h2>{t("badge.examplesDot")}</h2>
      <LiveExample
        code={`import { Badge, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.sm")} wrap="wrap">
  <Badge dot variant="subtle" color="success">Live</Badge>
  <Badge dot variant="outline" color="warning">Pending</Badge>
  <Badge dot variant="solid" color="neutral">Draft</Badge>
</HStack>`}
      >
        <HStack gap={themeToken("spacing.sm")} wrap="wrap">
          <Badge dot variant="subtle" color="success">
            Live
          </Badge>
          <Badge dot variant="outline" color="warning">
            Pending
          </Badge>
          <Badge dot variant="solid" color="neutral">
            Draft
          </Badge>
        </HStack>
      </LiveExample>

      <h2>{t("badge.examplesInline")}</h2>
      <LiveExample
        code={`import { Badge, Text, themeToken } from "kovax-react";

<Text size="base">
  Inbox{" "}
  <Badge color="primary" size="sm" style={{ verticalAlign: "middle" }}>
    12
  </Badge>
</Text>`}
      >
        <Text size="base">
          Inbox{" "}
          <Badge color="primary" size="sm" style={{ verticalAlign: "middle" }}>
            12
          </Badge>
        </Text>
      </LiveExample>

      <p>
        <Trans
          i18nKey="badge.a11yNote"
          components={{ strong: <strong />, code: <span className="doc-code" /> }}
        />
      </p>
    </>
  );
}
