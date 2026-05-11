import {
  FormControl,
  FormError,
  FormGroup,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

export function FormSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>Form</h1>
      <p>
        <Trans i18nKey="form.intro" components={{ strong: <strong /> }} />
      </p>

      <h2>{t("form.examplesFormControl")}</h2>
      <LiveExample
        code={`import {
  FormControl,
  FormError,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  themeToken,
  VStack,
} from "kovax-react";

<VStack align="stretch" gap={24} maxW={400}>
  <VStack align="stretch" gap={4}>
    <Heading level={5}>Contact details</Heading>
    <Text size="sm" color={themeToken("secondary.600")}>
      Fields with helper copy and error state (colors from the theme).
    </Text>
  </VStack>
  <FormControl>
    <FormLabel htmlFor="demo-email">Email</FormLabel>
    <Input id="demo-email" type="email" placeholder="you@example.com" />
    <FormHelperText>We never share your email with third parties.</FormHelperText>
  </FormControl>

  <FormControl isInvalid>
    <FormLabel htmlFor="demo-error">Name</FormLabel>
    <Input id="demo-error" placeholder="Required field" />
    <FormError>Please enter your name</FormError>
  </FormControl>
</VStack>`}
      >
        <VStack align="stretch" gap={24} maxW={400}>
          <VStack align="stretch" gap={4}>
            <Heading level={5}>Contact details</Heading>
            <Text size="sm" color={themeToken("secondary.600")}>
              Fields with helper copy and error state (colors from the theme).
            </Text>
          </VStack>
          <FormControl>
            <FormLabel htmlFor="demo-email">Email</FormLabel>
            <Input id="demo-email" type="email" placeholder="you@example.com" />
            <FormHelperText>We never share your email with third parties.</FormHelperText>
          </FormControl>

          <FormControl isInvalid>
            <FormLabel htmlFor="demo-error">Name</FormLabel>
            <Input id="demo-error" placeholder="Required field" />
            <FormError>Please enter your name</FormError>
          </FormControl>
        </VStack>
      </LiveExample>

      <h2>{t("form.examplesFormGroup")}</h2>
      <LiveExample
        code={`import {
  FormControl,
  FormGroup,
  FormLabel,
  Heading,
  Input,
  Text,
  themeToken,
  VStack,
} from "kovax-react";

<VStack align="stretch" gap={16}>
  <VStack align="stretch" gap={4}>
    <Heading level={4}>Profile</Heading>
    <Text size="sm" color={themeToken("secondary.600")}>
      Multiple fields in one group
    </Text>
  </VStack>
  <FormGroup>
    <FormControl>
      <FormLabel htmlFor="demo-fn">First name</FormLabel>
      <Input id="demo-fn" placeholder="Jane" />
    </FormControl>
    <FormControl>
      <FormLabel htmlFor="demo-ln">Last name</FormLabel>
      <Input id="demo-ln" placeholder="Doe" />
    </FormControl>
  </FormGroup>
</VStack>`}
      >
        <VStack align="stretch" gap={16}>
          <VStack align="stretch" gap={4}>
            <Heading level={4}>Profile</Heading>
            <Text size="sm" color={themeToken("secondary.600")}>
              Multiple fields in one group
            </Text>
          </VStack>
          <FormGroup>
            <FormControl>
              <FormLabel htmlFor="demo-fn">First name</FormLabel>
              <Input id="demo-fn" placeholder="Jane" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="demo-ln">Last name</FormLabel>
              <Input id="demo-ln" placeholder="Doe" />
            </FormControl>
          </FormGroup>
        </VStack>
      </LiveExample>
    </>
  );
}
