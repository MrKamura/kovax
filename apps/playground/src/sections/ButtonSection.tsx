import { Button, ButtonGroup, HStack, IconButton, Text, VStack, themeToken } from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { FaArrowRight, FaCheck, FaTrash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
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
    <Button variant="solid" color="success">
      Success
    </Button>
    <Button variant="solid" color="warning">
      Warning
    </Button>
    <Button variant="solid" color="error">
      Error
    </Button>
    <Button variant="destructive">Destructive</Button>
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
            <Button variant="solid" color="success">
              Success
            </Button>
            <Button variant="solid" color="warning">
              Warning
            </Button>
            <Button variant="solid" color="error">
              Error
            </Button>
            <Button variant="destructive">Destructive</Button>
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
    <Button size="xs">XS</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">XL</Button>
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={12}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Button size uses spacing and typography tokens from the theme.
          </Text>
          <HStack gap={12} align="center" wrap="wrap">
            <Button size="xs">XS</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">XL</Button>
          </HStack>
        </VStack>
      </LiveExample>

      <h2>{t("button.examplesLinkVariant")}</h2>
      <LiveExample
        code={`import { Button, HStack, Text, themeToken } from "kovax-react";

<VStack align="stretch" gap={12}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Link variant: underline, inherits palette; use for low-emphasis actions.
  </Text>
  <HStack gap={16} wrap="wrap" align="center">
    <Button variant="link" color="primary">
      Primary link
    </Button>
    <Button variant="link" color="secondary">
      Secondary link
    </Button>
    <Button variant="link" color="error">
      Danger link
    </Button>
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={12}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Link variant: underline, inherits palette; use for low-emphasis actions.
          </Text>
          <HStack gap={16} wrap="wrap" align="center">
            <Button variant="link" color="primary">
              Primary link
            </Button>
            <Button variant="link" color="secondary">
              Secondary link
            </Button>
            <Button variant="link" color="error">
              Danger link
            </Button>
          </HStack>
        </VStack>
      </LiveExample>

      <h2>{t("button.examplesIcons")}</h2>
      <LiveExample
        code={`import { Button, IconButton, HStack, Text, VStack, themeToken } from "kovax-react";
import { FaArrowRight, FaCheck, FaTrash } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

<VStack align="stretch" gap={16}>
  <Text size="sm" color={themeToken("secondary.600")}>
    iconSize scales slots; IconButton requires aria-label (typed) and bumps hit area to ≥44px.
  </Text>
  <HStack gap={12} wrap="wrap" align="center">
    <Button variant="solid" color="primary" iconSize={18} leftIcon={<FaCheck aria-hidden />}>
      Confirm
    </Button>
    <Button variant="outline" color="primary" iconSize={18} rightIcon={<FaArrowRight aria-hidden />}>
      Continue
    </Button>
    <Button variant="outline" color="secondary" iconSize={20} leftIcon={<MdOutlineEmail aria-hidden />}>
      Email
    </Button>
    <IconButton aria-label="Delete item" variant="outline" color="error" icon={<FaTrash aria-hidden />} iconSize={18} />
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={16}>
          <Text size="sm" color={themeToken("secondary.600")}>
            iconSize scales slots; IconButton requires aria-label (typed) and bumps hit area to ≥44px.
          </Text>
          <HStack gap={12} wrap="wrap" align="center">
            <Button variant="solid" color="primary" iconSize={18} leftIcon={<FaCheck aria-hidden />}>
              Confirm
            </Button>
            <Button variant="outline" color="primary" iconSize={18} rightIcon={<FaArrowRight aria-hidden />}>
              Continue
            </Button>
            <Button variant="outline" color="secondary" iconSize={20} leftIcon={<MdOutlineEmail aria-hidden />}>
              Email
            </Button>
            <IconButton aria-label="Delete item" variant="outline" color="error" icon={<FaTrash aria-hidden />} iconSize={18} />
          </HStack>
        </VStack>
      </LiveExample>

      <h2>{t("button.examplesLoading")}</h2>
      <LiveExample
        code={`import { Button, HStack, Text, VStack, themeToken } from "kovax-react";

<VStack align="stretch" gap={16}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Default loader spins via injected keyframes (no Tailwind). loadingText sets polite aria-live + sr-only copy.
  </Text>
  <HStack gap={12} wrap="wrap" align="center">
    <Button isLoading loadingText="Saving your changes" loaderPosition="left" variant="solid" color="primary">
      Saving
    </Button>
    <Button isLoading loaderPosition="center" variant="outline" color="primary">
      Processing
    </Button>
    <Button isLoading loaderPosition="right" variant="ghost" color="secondary">
      Sending
    </Button>
  </HStack>
  <Button isLoading loaderPosition="center" variant="solid" color="success" fullWidth>
    Full-width centered loader (fullWidth prop)
  </Button>
</VStack>`}
      >
        <VStack align="stretch" gap={16}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Default loader spins via injected keyframes (no Tailwind). loadingText sets polite aria-live + sr-only copy.
          </Text>
          <HStack gap={12} wrap="wrap" align="center">
            <Button isLoading loadingText="Saving your changes" loaderPosition="left" variant="solid" color="primary">
              Saving
            </Button>
            <Button isLoading loaderPosition="center" variant="outline" color="primary">
              Processing
            </Button>
            <Button isLoading loaderPosition="right" variant="ghost" color="secondary">
              Sending
            </Button>
          </HStack>
          <Button isLoading loaderPosition="center" variant="solid" color="success" fullWidth>
            Full-width centered loader (fullWidth prop)
          </Button>
        </VStack>
      </LiveExample>

      <h2>{t("button.examplesStates")}</h2>
      <LiveExample
        code={`import { Button, HStack, Text, themeToken } from "kovax-react";

<VStack align="stretch" gap={12}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Disabled buttons ignore clicks and show reduced opacity.
  </Text>
  <HStack gap={12} wrap="wrap">
    <Button disabled>Disabled</Button>
    <Button disabled variant="outline" color="primary">
      Disabled outline
    </Button>
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={12}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Disabled buttons ignore clicks and show reduced opacity.
          </Text>
          <HStack gap={12} wrap="wrap">
            <Button disabled>Disabled</Button>
            <Button disabled variant="outline" color="primary">
              Disabled outline
            </Button>
          </HStack>
        </VStack>
      </LiveExample>

      <h2>{t("button.examplesExtras")}</h2>
      <LiveExample
        code={`import { Button, HStack, Text, VStack, themeToken } from "kovax-react";

<VStack align="stretch" gap={12}>
  <Text size="sm" color={themeToken("secondary.600")}>
    variant=&quot;destructive&quot;, fullWidth, pressed (aria-pressed).
  </Text>
  <Button variant="destructive">Delete account</Button>
  <Button variant="outline" color="primary" fullWidth>
    Block outline
  </Button>
  <Button pressed variant="solid" color="secondary">
    Toggle pressed
  </Button>
</VStack>`}
      >
        <VStack align="stretch" gap={12}>
          <Text size="sm" color={themeToken("secondary.600")}>
            variant=&quot;destructive&quot;, fullWidth, pressed (aria-pressed).
          </Text>
          <Button variant="destructive">Delete account</Button>
          <Button variant="outline" color="primary" fullWidth>
            Block outline
          </Button>
          <Button pressed variant="solid" color="secondary">
            Toggle pressed
          </Button>
        </VStack>
      </LiveExample>

      <h2>{t("button.examplesPolymorphic")}</h2>
      <LiveExample
        code={`import { Button, Text, VStack, themeToken } from "kovax-react";

<VStack align="stretch" gap={12}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Same styles as a native link — use with React Router Link and cast router props if needed.
  </Text>
  <Button as="a" href="#" variant="link" color="primary">
    Styled anchor
  </Button>
</VStack>`}
      >
        <VStack align="stretch" gap={12}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Same styles as a native link — use with React Router Link and cast router props if needed.
          </Text>
          <Button as="a" href="#" variant="link" color="primary">
            Styled anchor
          </Button>
        </VStack>
      </LiveExample>

      <h2>{t("button.examplesIconButtonGroup")}</h2>
      <LiveExample
        code={`import { Button, ButtonGroup, HStack, Text, VStack, themeToken } from "kovax-react";

<VStack align="stretch" gap={16}>
  <Text size="sm" color={themeToken("secondary.600")}>
    ButtonGroup uses role=&quot;group&quot;; attached merges corners for outline buttons.
  </Text>
  <ButtonGroup aria-label="Demo alignment group" attached>
    <Button variant="outline">Left</Button>
    <Button variant="outline">Center</Button>
    <Button variant="outline">Right</Button>
  </ButtonGroup>
  <HStack gap={12} wrap="wrap">
    <ButtonGroup aria-label="Spaced group">
      <Button size="sm">One</Button>
      <Button size="sm">Two</Button>
    </ButtonGroup>
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={16}>
          <Text size="sm" color={themeToken("secondary.600")}>
            ButtonGroup uses role=&quot;group&quot;; attached merges corners for outline buttons.
          </Text>
          <ButtonGroup aria-label="Demo alignment group" attached>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Center</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>
          <HStack gap={12} wrap="wrap">
            <ButtonGroup aria-label="Spaced group">
              <Button size="sm">One</Button>
              <Button size="sm">Two</Button>
            </ButtonGroup>
          </HStack>
        </VStack>
      </LiveExample>
    </>
  );
}
