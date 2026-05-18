import {
  Box,
  HStack,
  Skeleton,
  Text,
  VStack,
  themeToken,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

export function SkeletonSection() {
  const { t } = useTranslation();
  const gapSm = themeToken("spacing.sm");
  const gapMd = themeToken("spacing.md");

  return (
    <>
      <h1>{t("skeleton.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="skeleton.intro"
          components={{ strong: <strong />, code: <span className="doc-code" /> }}
        />
      </p>

      <h2>{t("skeleton.examplesVariants")}</h2>
      <p>
        <Trans
          i18nKey="skeleton.variantsLead"
          components={{ code: <span className="doc-code" /> }}
        />
      </p>
      <LiveExample
        code={`import { HStack, Skeleton, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.md")} align="flex-end" wrap="wrap">
  <Skeleton variant="pulse" width={140} height={20} />
  <Skeleton variant="shimmer" width={140} height={20} />
  <Skeleton variant="none" width={140} height={20} />
</HStack>`}
      >
        <HStack gap={gapMd} align="flex-end" wrap="wrap">
          <Skeleton variant="pulse" width={140} height={20} />
          <Skeleton variant="shimmer" width={140} height={20} />
          <Skeleton variant="none" width={140} height={20} />
        </HStack>
      </LiveExample>

      <h2>{t("skeleton.examplesShapes")}</h2>
      <LiveExample
        code={`import { HStack, Skeleton, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.md")} align="center" wrap="wrap">
  <Skeleton shape="rectangle" width={120} height={16} />
  <Skeleton shape="rounded" width={120} height={40} />
  <Skeleton shape="circle" width={48} height={48} />
</HStack>`}
      >
        <HStack gap={gapMd} align="center" wrap="wrap">
          <Skeleton shape="rectangle" width={120} height={16} />
          <Skeleton shape="rounded" width={120} height={40} />
          <Skeleton shape="circle" width={48} height={48} />
        </HStack>
      </LiveExample>

      <h2>{t("skeleton.examplesText")}</h2>
      <p>{t("skeleton.textLead")}</p>
      <LiveExample
        code={`import { Skeleton, VStack, themeToken } from "kovax-react";

<VStack gap={themeToken("spacing.sm")} align="stretch" style={{ maxWidth: 320 }}>
  <Skeleton text variant="pulse" />
  <Skeleton text variant="shimmer" />
  <Skeleton text variant="pulse" style={{ width: "72%" }} />
</VStack>`}
      >
        <VStack gap={gapSm} align="stretch" style={{ maxWidth: 320 }}>
          <Skeleton text variant="pulse" />
          <Skeleton text variant="shimmer" />
          <Skeleton text variant="pulse" style={{ width: "72%" }} />
        </VStack>
      </LiveExample>

      <h2>{t("skeleton.examplesCard")}</h2>
      <LiveExample
        code={`import { Box, HStack, Skeleton, Text, VStack, themeToken } from "kovax-react";

<VStack gap={themeToken("spacing.md")} align="stretch" style={{ maxWidth: 360 }}>
  <Box
    style={{
      padding: themeToken("spacing.md"),
      borderRadius: themeToken("borderRadius.md"),
      border: \`1px solid \${themeToken("secondary.200")}\`,
      backgroundColor: themeToken("secondary.50"),
    }}
  >
    <HStack gap={themeToken("spacing.sm")} align="flex-start">
      <Skeleton shape="circle" width={44} height={44} variant="shimmer" />
      <VStack gap={themeToken("spacing.xs")} align="stretch" style={{ flex: 1, minWidth: 0 }}>
        <Skeleton height={14} variant="pulse" style={{ width: "55%" }} />
        <Skeleton text variant="shimmer" />
        <Skeleton text variant="pulse" style={{ width: "88%" }} />
      </VStack>
    </HStack>
  </Box>
</VStack>`}
      >
        <VStack gap={gapMd} align="stretch" style={{ maxWidth: 360 }}>
          <Box
            style={{
              padding: themeToken("spacing.md"),
              borderRadius: themeToken("borderRadius.md"),
              border: `1px solid ${themeToken("secondary.200")}`,
              backgroundColor: themeToken("secondary.50"),
            }}
          >
            <HStack gap={gapSm} align="flex-start">
              <Skeleton shape="circle" width={44} height={44} variant="shimmer" />
              <VStack
                gap={themeToken("spacing.xs")}
                align="stretch"
                style={{ flex: 1, minWidth: 0 }}
              >
                <Skeleton height={14} variant="pulse" style={{ width: "55%" }} />
                <Skeleton text variant="shimmer" />
                <Skeleton text variant="pulse" style={{ width: "88%" }} />
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </LiveExample>

      <p>
        <Trans
          i18nKey="skeleton.a11yNote"
          components={{ strong: <strong />, code: <span className="doc-code" /> }}
        />
      </p>
      <Text size="sm" style={{ marginTop: themeToken("spacing.sm"), opacity: 0.85 }}>
        {t("skeleton.motionNote")}
      </Text>
    </>
  );
}
