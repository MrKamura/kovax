import { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormError,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Switch,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

function RadioTierDemo() {
  const [tier, setTier] = useState("pro");
  return (
    <VStack align="stretch" gap={themeToken("spacing.sm")}>
      <RadioGroup name="pg-tier" value={tier} onValueChange={setTier}>
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
        <Radio value="team">Team</Radio>
      </RadioGroup>
      <Text size="xs" color={themeToken("secondary.600")}>
        Selected: <strong>{tier}</strong>
      </Text>
    </VStack>
  );
}

export function ControlsSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("controls.pageTitle")}</h1>
      <p>
        <Trans
          i18nKey="controls.intro"
          components={{ strong: <strong /> }}
        />
      </p>

      <h2>{t("controls.examplesCheckbox")}</h2>
      <LiveExample
        code={`import { Checkbox, Heading, HStack, Text, themeToken, VStack } from "kovax-react";

<VStack align="stretch" gap={16} maxW={420}>
  <Heading level={5}>Checkbox</Heading>
  <Text size="sm" color={themeToken("secondary.600")}>
    Sizes and colorScheme; children provide an implicit label.
  </Text>
  <HStack gap={16} wrap="wrap" align="center">
    <Checkbox size="sm" colorScheme="primary">
      Small
    </Checkbox>
    <Checkbox size="md" colorScheme="success" defaultChecked>
      Medium · success
    </Checkbox>
    <Checkbox size="lg" colorScheme="warning">
      Large
    </Checkbox>
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={16} maxW={420}>
          <Heading level={5}>Checkbox</Heading>
          <Text size="sm" color={themeToken("secondary.600")}>
            Sizes and colorScheme; children provide an implicit label.
          </Text>
          <HStack gap={16} wrap="wrap" align="center">
            <Checkbox size="sm" colorScheme="primary">
              Small
            </Checkbox>
            <Checkbox size="md" colorScheme="success" defaultChecked>
              Medium · success
            </Checkbox>
            <Checkbox size="lg" colorScheme="warning">
              Large
            </Checkbox>
          </HStack>
        </VStack>
      </LiveExample>

      <h2>{t("controls.examplesFormControl")}</h2>
      <LiveExample
        code={`import {
  Checkbox,
  FormControl,
  FormError,
  FormHelperText,
  FormLabel,
  Switch,
  VStack,
} from "kovax-react";

<VStack align="stretch" gap={16} maxW={440}>
  <FormControl isRequired isInvalid>
    <FormLabel htmlFor="pg-agree">Agreement</FormLabel>
    <Checkbox id="pg-agree">I agree</Checkbox>
    <FormHelperText>FormControl drives invalid / required on the control.</FormHelperText>
    <FormError>Please confirm to continue.</FormError>
  </FormControl>
  <FormControl isDisabled>
    <FormLabel htmlFor="pg-push">Push</FormLabel>
    <Switch id="pg-push" defaultChecked>
      Notifications (disabled)
    </Switch>
  </FormControl>
</VStack>`}
      >
        <VStack align="stretch" gap={16} maxW={440}>
          <FormControl isRequired isInvalid>
            <FormLabel htmlFor="pg-agree">Agreement</FormLabel>
            <Checkbox id="pg-agree">I agree</Checkbox>
            <FormHelperText>FormControl drives invalid / required on the control.</FormHelperText>
            <FormError>Please confirm to continue.</FormError>
          </FormControl>
          <FormControl isDisabled>
            <FormLabel htmlFor="pg-push">Push</FormLabel>
            <Switch id="pg-push" defaultChecked>
              Notifications (disabled)
            </Switch>
          </FormControl>
        </VStack>
      </LiveExample>

      <h2>{t("controls.examplesRadio")}</h2>
      <LiveExample
        code={`import { Heading, Radio, RadioGroup, Text, themeToken, VStack } from "kovax-react";
import { useState } from "react";

function Demo() {
  const [tier, setTier] = useState("pro");
  return (
    <VStack align="stretch" gap={8}>
      <RadioGroup name="tier" value={tier} onValueChange={setTier}>
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
        <Radio value="team">Team</Radio>
      </RadioGroup>
      <Text size="xs" color={themeToken("secondary.600")}>
        Selected: <strong>{tier}</strong>
      </Text>
    </VStack>
  );
}`}
      >
        <VStack align="stretch" gap={8}>
          <Heading level={5}>RadioGroup</Heading>
          <RadioTierDemo />
        </VStack>
      </LiveExample>

      <h2>{t("controls.examplesSwitch")}</h2>
      <LiveExample
        code={`import { HStack, Switch, Text, themeToken, VStack } from "kovax-react";

<VStack align="stretch" gap={12}>
  <Text size="sm" color={themeToken("secondary.600")}>
    Switch uses role=&quot;switch&quot; on a checkbox input.
  </Text>
  <HStack gap={16} wrap="wrap" align="center">
    <Switch size="sm" colorScheme="primary">
      Compact
    </Switch>
    <Switch size="md" colorScheme="secondary" defaultChecked>
      Default on
    </Switch>
    <Switch size="lg" colorScheme="success" aria-label="Large toggle" />
  </HStack>
</VStack>`}
      >
        <VStack align="stretch" gap={12}>
          <Text size="sm" color={themeToken("secondary.600")}>
            Switch uses role=&quot;switch&quot; on a checkbox input.
          </Text>
          <HStack gap={16} wrap="wrap" align="center">
            <Switch size="sm" colorScheme="primary">
              Compact
            </Switch>
            <Switch size="md" colorScheme="secondary" defaultChecked>
              Default on
            </Switch>
            <Switch size="lg" colorScheme="success" aria-label="Large toggle" />
          </HStack>
        </VStack>
      </LiveExample>
    </>
  );
}
