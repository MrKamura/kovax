import { Heading, Input, Text, themeToken, VStack } from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

export function InputSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>Input</h1>
      <p>
        <Trans
          i18nKey="input.intro"
          components={{ strong: <strong /> }}
        />
      </p>

      <h2>{t("input.examplesBasics")}</h2>
      <LiveExample
        code={`import { Heading, Input, Text, themeToken, VStack } from "kovax-react";

<VStack align="stretch" gap={16} maxW={360}>
  <VStack align="stretch" gap={4}>
    <Heading level={5}>Field demo</Heading>
    <Text size="sm" color={themeToken("secondary.600")}>
      colorScheme and size come from library presets; labels use Typography.
    </Text>
  </VStack>
  <Input placeholder="Primary md" colorScheme="primary" />
  <Input placeholder="Secondary sm" size="sm" colorScheme="secondary" />
  <Input placeholder="Invalid" isInvalid aria-invalid />
  <Input placeholder="Disabled" isDisabled />
</VStack>`}
      >
        <VStack align="stretch" gap={16} maxW={360}>
          <VStack align="stretch" gap={4}>
            <Heading level={5}>Field demo</Heading>
            <Text size="sm" color={themeToken("secondary.600")}>
              colorScheme and size come from library presets; labels use Typography.
            </Text>
          </VStack>
          <Input placeholder="Primary md" colorScheme="primary" />
          <Input placeholder="Secondary sm" size="sm" colorScheme="secondary" />
          <Input placeholder="Invalid" isInvalid aria-invalid />
          <Input placeholder="Disabled" isDisabled />
        </VStack>
      </LiveExample>
    </>
  );
}
