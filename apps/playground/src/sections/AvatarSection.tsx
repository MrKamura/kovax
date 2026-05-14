import {
  Avatar,
  HStack,
  Text,
  VStack,
  themeToken,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { MdPerson } from "react-icons/md";
import { LiveExample } from "../components/LiveExample";

const DEMO_IMG =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80";

export function AvatarSection() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("avatar.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="avatar.intro"
          components={{ strong: <strong />, code: <span className="doc-code" /> }}
        />
      </p>

      <h2>{t("avatar.examplesSizes")}</h2>
      <LiveExample
        code={`import { Avatar, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.md")} align="center" wrap="wrap">
  <Avatar name="Alex Chen" size="xs" />
  <Avatar name="Alex Chen" size="sm" />
  <Avatar name="Alex Chen" size="md" />
  <Avatar name="Alex Chen" size="lg" />
  <Avatar name="Alex Chen" size="xl" />
</HStack>`}
      >
        <HStack gap={themeToken("spacing.md")} align="center" wrap="wrap">
          <Avatar name="Alex Chen" size="xs" />
          <Avatar name="Alex Chen" size="sm" />
          <Avatar name="Alex Chen" size="md" />
          <Avatar name="Alex Chen" size="lg" />
          <Avatar name="Alex Chen" size="xl" />
        </HStack>
      </LiveExample>

      <h2>{t("avatar.examplesShapes")}</h2>
      <LiveExample
        code={`import { Avatar, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.lg")} align="center">
  <Avatar name="Circle" shape="circle" size="lg" colorScheme="primary" />
  <Avatar name="Rounded" shape="rounded" size="lg" colorScheme="secondary" />
</HStack>`}
      >
        <HStack gap={themeToken("spacing.lg")} align="center">
          <Avatar name="Circle" shape="circle" size="lg" colorScheme="primary" />
          <Avatar name="Rounded" shape="rounded" size="lg" colorScheme="secondary" />
        </HStack>
      </LiveExample>

      <h2>{t("avatar.examplesSchemes")}</h2>
      <LiveExample
        code={`import { Avatar, HStack, themeToken } from "kovax-react";

<HStack gap={themeToken("spacing.sm")} wrap="wrap">
  <Avatar name="Neutral Lane" colorScheme="neutral" />
  <Avatar name="Priya Singh" colorScheme="primary" />
  <Avatar name="Sam Doe" colorScheme="secondary" />
  <Avatar name="Ok Team" colorScheme="success" />
  <Avatar name="Watch" colorScheme="warning" />
  <Avatar name="Fail Safe" colorScheme="error" />
</HStack>`}
      >
        <HStack gap={themeToken("spacing.sm")} wrap="wrap">
          <Avatar name="Neutral Lane" colorScheme="neutral" />
          <Avatar name="Priya Singh" colorScheme="primary" />
          <Avatar name="Sam Doe" colorScheme="secondary" />
          <Avatar name="Ok Team" colorScheme="success" />
          <Avatar name="Watch" colorScheme="warning" />
          <Avatar name="Fail Safe" colorScheme="error" />
        </HStack>
      </LiveExample>

      <h2>{t("avatar.examplesPhoto")}</h2>
      <LiveExample
        code={`import { Avatar, HStack, Text, VStack, themeToken } from "kovax-react";

const photo =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80";

<VStack align="stretch" gap={themeToken("spacing.sm")}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Pass <code className="doc-code">src</code> + <code className="doc-code">alt</code>; initials are ignored while the image loads.
  </Text>
  <HStack gap={themeToken("spacing.md")} align="center">
    <Avatar src={photo} alt="Portrait sample" name="Alex Chen" size="lg" />
    <Text size="sm">Alex Chen</Text>
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={themeToken("spacing.sm")}>
          <Text size="sm" color={themeToken("secondary.600")}>
            <Trans
              i18nKey="avatar.photoLead"
              components={{ code: <span className="doc-code" /> }}
            />
          </Text>
          <HStack gap={themeToken("spacing.md")} align="center">
            <Avatar src={DEMO_IMG} alt={t("avatar.photoAlt")} name="Alex Chen" size="lg" />
            <Text size="sm">Alex Chen</Text>
          </HStack>
        </VStack>
      </LiveExample>

      <h2>{t("avatar.examplesFallback")}</h2>
      <LiveExample
        code={`import { Avatar, HStack, themeToken } from "kovax-react";
import { MdPerson } from "react-icons/md";

<HStack gap={themeToken("spacing.md")} align="center" wrap="wrap">
  <Avatar name="Custom icon" fallback={<MdPerson aria-hidden size={22} />} colorScheme="neutral" />
  <Avatar name="Broken URL" src="https://invalid.invalid/missing.jpg" alt="" />
</HStack>`}
      >
        <HStack gap={themeToken("spacing.md")} align="center" wrap="wrap">
          <Avatar
            name={t("avatar.customIconName")}
            fallback={<MdPerson aria-hidden size={22} />}
            colorScheme="neutral"
          />
          <Avatar
            name={t("avatar.brokenName")}
            src="https://invalid.invalid/missing.jpg"
            alt=""
          />
        </HStack>
      </LiveExample>

      <h2>{t("avatar.examplesStack")}</h2>
      <LiveExample
        code={`import { Avatar, HStack, themeToken } from "kovax-react";

<HStack
  gap={0}
  align="center"
  style={{ paddingLeft: themeToken("spacing.sm") }}
>
  {["May Wong", "Lee Park", "Bo Silva"].map((name, i) => (
    <Avatar
      key={name}
      name={name}
      size="md"
      style={{
        marginLeft: i === 0 ? 0 : "-0.65rem",
        boxShadow: \`0 0 0 2px \${themeToken("secondary.50")}\`,
      }}
    />
  ))}
</HStack>`}
      >
        <HStack gap={0} align="center" style={{ paddingLeft: themeToken("spacing.sm") }}>
          {["May Wong", "Lee Park", "Bo Silva"].map((name, i) => (
            <Avatar
              key={name}
              name={name}
              size="md"
              style={{
                marginLeft: i === 0 ? 0 : "-0.65rem",
                boxShadow: `0 0 0 2px ${themeToken("secondary.50")}`,
              }}
            />
          ))}
        </HStack>
      </LiveExample>

      <p>
        <Trans
          i18nKey="avatar.a11yNote"
          components={{ strong: <strong />, code: <span className="doc-code" /> }}
        />
      </p>
    </>
  );
}
