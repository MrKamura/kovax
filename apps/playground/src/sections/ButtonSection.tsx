import { Button, HStack, Text, VStack, themeToken } from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

export function ButtonSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>Button</h1>
      <p>
        <Trans
          i18nKey="button.intro"
          components={{ strong: <strong /> }}
        />
      </p>

      <h2>{t("button.examplesVariants")}</h2>
      <LiveExample
        code={`import { Button, HStack, Text, VStack, themeToken } from "kovax-react";

<VStack align="stretch" gap={16}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Solid / outline / ghost on primary plus secondary palettes.
  </Text>
  <HStack gap={12} wrap="wrap">
    <Button variant="solid" color="primary">
      Solid primary
    </Button>
    <Button variant="outline" color="primary">
      Outline
    </Button>
    <Button variant="ghost" color="primary">
      Ghost
    </Button>
  </HStack>
  <HStack gap={12} wrap="wrap">
    <Button variant="solid" color="secondary">
      Secondary
    </Button>
    <Button variant="solid" color="error">
      Error
    </Button>
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={16}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Solid / outline / ghost on primary plus secondary palettes.
          </Text>
          <HStack gap={12} wrap="wrap">
            <Button variant="solid" color="primary">
              Solid primary
            </Button>
            <Button variant="outline" color="primary">
              Outline
            </Button>
            <Button variant="ghost" color="primary">
              Ghost
            </Button>
          </HStack>
          <HStack gap={12} wrap="wrap">
            <Button variant="solid" color="secondary">
              Secondary
            </Button>
            <Button variant="solid" color="error">
              Error
            </Button>
          </HStack>
        </VStack>
      </LiveExample>

      <h2>{t("button.examplesSizes")}</h2>
      <LiveExample
        code={`import { Button, HStack, Text, themeToken } from "kovax-react";

<VStack align="stretch" gap={12}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Button size uses spacing and typography tokens from the theme.
  </Text>
  <HStack gap={12} align="center" wrap="wrap">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={12}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Button size uses spacing and typography tokens from the theme.
          </Text>
          <HStack gap={12} align="center" wrap="wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </HStack>
        </VStack>
      </LiveExample>

      <h2>{t("button.examplesStates")}</h2>
      <LiveExample
        code={`import { Button, HStack, Text, themeToken } from "kovax-react";

<VStack align="stretch" gap={12}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Disabled state and loading spinner.
  </Text>
  <HStack gap={12} wrap="wrap">
    <Button disabled>Disabled</Button>
    <Button isLoading>Loading</Button>
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={12}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Disabled state and loading spinner.
          </Text>
          <HStack gap={12} wrap="wrap">
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
          </HStack>
        </VStack>
      </LiveExample>
    </>
  );
}
