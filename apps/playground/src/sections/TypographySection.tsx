import {
  Blockquote,
  Code,
  Heading,
  Kbd,
  Link,
  List,
  ListItem,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

export function TypographySection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>Typography</h1>
      <p>
        <Trans
          i18nKey="typography.intro"
          components={{
            code: <span className="doc-code" />,
            strong: <strong />,
          }}
        />
      </p>

      <h2>{t("typography.examplesText")}</h2>
      <LiveExample
        code={`import { Text, VStack, themeToken } from "kovax-react";

<VStack align="stretch" gap={16} maxW={480}>
  <Text size="lg" fontWeight={600}>
    Large emphasized body
  </Text>
  <Text size="base" color={themeToken("secondary.700")}>
    Default paragraph copy.
  </Text>
  <Text as="span" size="sm" color={themeToken("secondary.500")}>
    Inline caption.
  </Text>
</VStack>`}
      >
        <VStack align="stretch" gap={16} maxW={480}>
          <Text size="lg" fontWeight={600}>
            Large emphasized body
          </Text>
          <Text size="base" color={themeToken("secondary.700")}>
            Default paragraph copy.
          </Text>
          <Text as="span" size="sm" color={themeToken("secondary.500")}>
            Inline caption.
          </Text>
        </VStack>
      </LiveExample>

      <h2>{t("typography.examplesHeading")}</h2>
      <LiveExample
        code={`import { Heading, VStack } from "kovax-react";

<VStack align="stretch" gap={12}>
  <Heading level={1}>Page title</Heading>
  <Heading level={3}>Section subtitle</Heading>
</VStack>`}
      >
        <VStack align="stretch" gap={12}>
          <Heading level={1}>Page title</Heading>
          <Heading level={3}>Section subtitle</Heading>
        </VStack>
      </LiveExample>

      <h2>{t("typography.examplesLink")}</h2>
      <LiveExample
        code={`import { Link, Text, themeToken } from "kovax-react";

<Text color={themeToken("secondary.800")}>
  Open the{" "}
  <Link href="#" onClick={(e) => e.preventDefault()}>
    demo link
  </Link>{" "}
  or{" "}
  <Link href="https://example.com" external>
    external site
  </Link>
  .
</Text>`}
      >
        <Text color={themeToken("secondary.800")}>
          Open the{" "}
          <Link href="#" onClick={(e) => e.preventDefault()}>
            demo link
          </Link>{" "}
          or{" "}
          <Link href="https://example.com" external>
            external site
          </Link>
          .
        </Text>
      </LiveExample>

      <h2>{t("typography.examplesCodeKbd")}</h2>
      <LiveExample
        code={`import { Code, Kbd, Text, VStack, themeToken } from "kovax-react";

<VStack align="stretch" gap={12} maxW={520}>
  <Text color={themeToken("secondary.800")}>
    Command: <Code>npm run build</Code>
  </Text>
  <Code variant="block" size="sm">{\`const x = 1;
return x + 2;\`}</Code>
  <Text color={themeToken("secondary.800")}>
    Save: <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
  </Text>
</VStack>`}
      >
        <VStack align="stretch" gap={12} maxW={520}>
          <Text color={themeToken("secondary.800")}>
            Command: <Code>npm run build</Code>
          </Text>
          <Code variant="block" size="sm">{`const x = 1;
return x + 2;`}</Code>
          <Text color={themeToken("secondary.800")}>
            Save: <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
          </Text>
        </VStack>
      </LiveExample>

      <h2>{t("typography.examplesBlockquote")}</h2>
      <LiveExample
        code={`import { Blockquote } from "kovax-react";

<Blockquote citation="Typography guide">
  Great interfaces start with readable text.
</Blockquote>`}
      >
        <Blockquote citation="Typography guide">
          Great interfaces start with readable text.
        </Blockquote>
      </LiveExample>

      <h2>{t("typography.examplesList")}</h2>
      <LiveExample
        code={`import { List, ListItem, VStack } from "kovax-react";

<VStack align="stretch" gap={20}>
  <List spacing="sm">
    <ListItem>Bulleted list item</ListItem>
    <ListItem>Second item</ListItem>
  </List>
  <List ordered spacing="sm">
    <ListItem>Step one</ListItem>
    <ListItem>Step two</ListItem>
  </List>
</VStack>`}
      >
        <VStack align="stretch" gap={20}>
          <List spacing="sm">
            <ListItem>Bulleted list item</ListItem>
            <ListItem>Second item</ListItem>
          </List>
          <List ordered spacing="sm">
            <ListItem>Step one</ListItem>
            <ListItem>Step two</ListItem>
          </List>
        </VStack>
      </LiveExample>
    </>
  );
}
