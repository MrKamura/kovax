import {
  Accordion,
  Box,
  Collapsible,
  DisclosureChevronIcon,
  HStack,
  List,
  ListItem,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

export function AccordionSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("accordion.pageTitle")}</h1>
      <p>
        <Trans i18nKey="accordion.intro" components={{ strong: <strong />, code: <code /> }} />
      </p>
      <p
        style={{
          fontSize: themeToken("text.sm"),
          color: themeToken("secondary.600"),
          marginTop: themeToken("spacing.xs"),
          marginBottom: themeToken("spacing.md"),
        }}
      >
        <Trans i18nKey="accordion.demoToggleHint" components={{ strong: <strong />, code: <code /> }} />
      </p>

      <h2>{t("accordion.examplesCollapsible")}</h2>
      <LiveExample
        code={`import { Collapsible, Text } from "kovax-react";

<Collapsible.Root>
  <Collapsible.Trigger>Show details</Collapsible.Trigger>
  <Collapsible.Content>
    <Text size="sm">One trigger and one panel — good for FAQs or filters.</Text>
  </Collapsible.Content>
</Collapsible.Root>`}
      >
        <Collapsible.Root>
          <Collapsible.Trigger>Show details</Collapsible.Trigger>
          <Collapsible.Content>
            <Text size="sm">One trigger and one panel — good for FAQs or filters.</Text>
          </Collapsible.Content>
        </Collapsible.Root>
      </LiveExample>

      <h2>{t("accordion.examplesAccordionSingle")}</h2>
      <LiveExample
        code={`import { Accordion, Text } from "kovax-react";

<Accordion.Root type="single" defaultValue="one">
  <Accordion.Item value="one">
    <Accordion.Header>
      <Accordion.Trigger>First section</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <Text size="sm">Only one section stays open.</Text>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="two">
    <Accordion.Header>
      <Accordion.Trigger>Second section</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <Text size="sm">Try ArrowDown when focus is on a trigger.</Text>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}
      >
        <Accordion.Root type="single" defaultValue="one">
          <Accordion.Item value="one">
            <Accordion.Header>
              <Accordion.Trigger>First section</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Text size="sm">Only one section stays open.</Text>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="two">
            <Accordion.Header>
              <Accordion.Trigger>Second section</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Text size="sm">Try ArrowDown when focus is on a trigger.</Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </LiveExample>

      <h2>{t("accordion.examplesAccordionCollapsible")}</h2>
      <LiveExample
        code={`import { Accordion, Text } from "kovax-react";

<Accordion.Root type="single" collapsible defaultValue="only">
  <Accordion.Item value="only">
    <Accordion.Header>
      <Accordion.Trigger>Can collapse entirely</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <Text size="sm">Click again to close — <code>collapsible</code> on single mode.</Text>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}
      >
        <Accordion.Root type="single" collapsible defaultValue="only">
          <Accordion.Item value="only">
            <Accordion.Header>
              <Accordion.Trigger>Can collapse entirely</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Text size="sm">
                Click again to close — <code>collapsible</code> on single mode.
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </LiveExample>

      <h2>{t("accordion.examplesAccordionMultiple")}</h2>
      <LiveExample
        code={`import { Accordion, Text } from "kovax-react";

<Accordion.Root type="multiple" defaultValue={["alpha"]}>
  <Accordion.Item value="alpha">
    <Accordion.Header>
      <Accordion.Trigger>Alpha</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <Text size="sm">Open Alpha and Beta at the same time.</Text>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="beta">
    <Accordion.Header>
      <Accordion.Trigger>Beta</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <Text size="sm">Independent toggles.</Text>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}
      >
        <Accordion.Root type="multiple" defaultValue={["alpha"]}>
          <Accordion.Item value="alpha">
            <Accordion.Header>
              <Accordion.Trigger>Alpha</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Text size="sm">Open Alpha and Beta at the same time.</Text>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="beta">
            <Accordion.Header>
              <Accordion.Trigger>Beta</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Text size="sm">Independent toggles.</Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </LiveExample>

      <h2>{t("accordion.examplesChevron")}</h2>
      <LiveExample
        code={`import { Collapsible, DisclosureChevronIcon, Text, themeToken, VStack } from "kovax-react";

<VStack gap={themeToken("spacing.md")} align="stretch">
  <Collapsible.Root defaultOpen>
    <Collapsible.Trigger>Default chevron</Collapsible.Trigger>
    <Collapsible.Content>
      <Text size="sm">Rotates smoothly when open.</Text>
    </Collapsible.Content>
  </Collapsible.Root>
  <Collapsible.Root>
    <Collapsible.Trigger chevron={null}>Without icon</Collapsible.Trigger>
    <Collapsible.Content>
      <Text size="sm">No trailing icon.</Text>
    </Collapsible.Content>
  </Collapsible.Root>
  <Collapsible.Root>
    <Collapsible.Trigger
      chevron={<DisclosureChevronIcon stroke={themeToken("primary.500")} width={18} height={18} />}
    >
      Custom color / size
    </Collapsible.Trigger>
    <Collapsible.Content>
      <Text size="sm">Same wrapper rotation as the default.</Text>
    </Collapsible.Content>
  </Collapsible.Root>
</VStack>`}
      >
        <VStack gap={themeToken("spacing.md")} align="stretch">
          <Collapsible.Root defaultOpen>
            <Collapsible.Trigger>Default chevron</Collapsible.Trigger>
            <Collapsible.Content>
              <Text size="sm">Rotates smoothly when open.</Text>
            </Collapsible.Content>
          </Collapsible.Root>
          <Collapsible.Root>
            <Collapsible.Trigger chevron={null}>Without icon</Collapsible.Trigger>
            <Collapsible.Content>
              <Text size="sm">No trailing icon.</Text>
            </Collapsible.Content>
          </Collapsible.Root>
          <Collapsible.Root>
            <Collapsible.Trigger
              chevron={
                <DisclosureChevronIcon stroke={themeToken("primary.500")} width={18} height={18} />
              }
            >
              Custom color / size
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Text size="sm">Same wrapper rotation as the default.</Text>
            </Collapsible.Content>
          </Collapsible.Root>
        </VStack>
      </LiveExample>

      <h2>{t("accordion.examplesWithList")}</h2>
      <LiveExample
        code={`import { Accordion, List, ListItem } from "kovax-react";

<Accordion.Root type="single" collapsible defaultValue="ship">
  <Accordion.Item value="ship">
    <Accordion.Header>
      <Accordion.Trigger>Shipping checklist</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <List spacing="sm">
        <ListItem>Pack items</ListItem>
        <ListItem>Print label</ListItem>
        <ListItem>Hand off to carrier</ListItem>
      </List>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}
      >
        <Accordion.Root type="single" collapsible defaultValue="ship">
          <Accordion.Item value="ship">
            <Accordion.Header>
              <Accordion.Trigger>Shipping checklist</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <List spacing="sm">
                <ListItem>Pack items</ListItem>
                <ListItem>Print label</ListItem>
                <ListItem>Hand off to carrier</ListItem>
              </List>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </LiveExample>

      <h2>{t("accordion.examplesNested")}</h2>
      <LiveExample
        code={`import { Accordion, Text } from "kovax-react";

<Accordion.Root type="single" collapsible defaultValue="outer">
  <Accordion.Item value="outer">
    <Accordion.Header>
      <Accordion.Trigger>Outer — nested accordion inside</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <Accordion.Root type="single" collapsible defaultValue="inner-b">
        <Accordion.Item value="inner-a">
          <Accordion.Header>
            <Accordion.Trigger>Inner topic A</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Text size="sm">Detail for A.</Text>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="inner-b">
          <Accordion.Header>
            <Accordion.Trigger>Inner topic B</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Text size="sm">Detail for B.</Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="flat">
    <Accordion.Header>
      <Accordion.Trigger>Flat sibling row</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>
      <Text size="sm">Only one outer row open at a time.</Text>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}
      >
        <Accordion.Root type="single" collapsible defaultValue="outer">
          <Accordion.Item value="outer">
            <Accordion.Header>
              <Accordion.Trigger>Outer — nested accordion inside</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Accordion.Root type="single" collapsible defaultValue="inner-b">
                <Accordion.Item value="inner-a">
                  <Accordion.Header>
                    <Accordion.Trigger>Inner topic A</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content>
                    <Text size="sm">Detail for A.</Text>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="inner-b">
                  <Accordion.Header>
                    <Accordion.Trigger>Inner topic B</Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content>
                    <Text size="sm">Detail for B.</Text>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="flat">
            <Accordion.Header>
              <Accordion.Trigger>Flat sibling row</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <Text size="sm">Only one outer row open at a time.</Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </LiveExample>

      <h2>{t("accordion.examplesVariants")}</h2>
      <LiveExample
        code={`import { Accordion, Text, themeToken, VStack } from "kovax-react";

<VStack gap={themeToken("spacing.lg")} align="stretch">
  <div>
    <Text size="xs" color={themeToken("secondary.600")}>variant="bordered" (default)</Text>
    <Accordion.Root type="single" collapsible defaultValue="a">
      <Accordion.Item value="a">
        <Accordion.Header><Accordion.Trigger>Row</Accordion.Trigger></Accordion.Header>
        <Accordion.Content><Text size="sm">Bordered chrome.</Text></Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>
  <div>
    <Text size="xs" color={themeToken("secondary.600")}>variant="flush"</Text>
    <Accordion.Root type="single" collapsible variant="flush" defaultValue="a">
      <Accordion.Item value="a">
        <Accordion.Header><Accordion.Trigger>Row</Accordion.Trigger></Accordion.Header>
        <Accordion.Content><Text size="sm">No outer border.</Text></Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>
  <div>
    <Text size="xs" color={themeToken("secondary.600")}>variant="soft"</Text>
    <Accordion.Root type="single" collapsible variant="soft" defaultValue="a">
      <Accordion.Item value="a">
        <Accordion.Header><Accordion.Trigger>Row</Accordion.Trigger></Accordion.Header>
        <Accordion.Content><Text size="sm">Soft tinted shell.</Text></Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>
  <div>
    <Text size="xs" color={themeToken("secondary.600")}>variant="elevated"</Text>
    <Accordion.Root type="single" collapsible variant="elevated" defaultValue="a">
      <Accordion.Item value="a">
        <Accordion.Header><Accordion.Trigger>Row</Accordion.Trigger></Accordion.Header>
        <Accordion.Content><Text size="sm">Card shadow.</Text></Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </div>
</VStack>`}
      >
        <VStack gap={themeToken("spacing.lg")} align="stretch">
          <div>
            <Text size="xs" color={themeToken("secondary.600")}>
              variant=&quot;bordered&quot; (default)
            </Text>
            <Accordion.Root type="single" collapsible defaultValue="a">
              <Accordion.Item value="a">
                <Accordion.Header>
                  <Accordion.Trigger>Row</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Text size="sm">Bordered chrome.</Text>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
          <div>
            <Text size="xs" color={themeToken("secondary.600")}>
              variant=&quot;flush&quot;
            </Text>
            <Accordion.Root type="single" collapsible variant="flush" defaultValue="a">
              <Accordion.Item value="a">
                <Accordion.Header>
                  <Accordion.Trigger>Row</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Text size="sm">No outer border.</Text>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
          <div>
            <Text size="xs" color={themeToken("secondary.600")}>
              variant=&quot;soft&quot;
            </Text>
            <Accordion.Root type="single" collapsible variant="soft" defaultValue="a">
              <Accordion.Item value="a">
                <Accordion.Header>
                  <Accordion.Trigger>Row</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Text size="sm">Soft tinted shell.</Text>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
          <div>
            <Text size="xs" color={themeToken("secondary.600")}>
              variant=&quot;elevated&quot;
            </Text>
            <Accordion.Root type="single" collapsible variant="elevated" defaultValue="a">
              <Accordion.Item value="a">
                <Accordion.Header>
                  <Accordion.Trigger>Row</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Text size="sm">Card shadow.</Text>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </VStack>
      </LiveExample>

      <h2>{t("accordion.examplesSizes")}</h2>
      <LiveExample
        code={`import { Accordion, HStack, Text, themeToken } from "kovax-react";

<HStack wrap="wrap" gap={themeToken("spacing.md")} align="flex-start">
  <Accordion.Root type="single" collapsible size="sm" defaultValue="a" style={{ flex: "1 1 220px", minWidth: 200 }}>
    <Accordion.Item value="a">
      <Accordion.Header><Accordion.Trigger>Small</Accordion.Trigger></Accordion.Header>
      <Accordion.Content><Text size="sm">size=&quot;sm&quot;</Text></Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
  <Accordion.Root type="single" collapsible size="md" defaultValue="a" style={{ flex: "1 1 220px", minWidth: 200 }}>
    <Accordion.Item value="a">
      <Accordion.Header><Accordion.Trigger>Medium</Accordion.Trigger></Accordion.Header>
      <Accordion.Content><Text size="sm">size=&quot;md&quot;</Text></Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
  <Accordion.Root type="single" collapsible size="lg" defaultValue="a" style={{ flex: "1 1 220px", minWidth: 200 }}>
    <Accordion.Item value="a">
      <Accordion.Header><Accordion.Trigger>Large</Accordion.Trigger></Accordion.Header>
      <Accordion.Content><Text size="sm">size=&quot;lg&quot;</Text></Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</HStack>`}
      >
        <HStack wrap="wrap" gap={themeToken("spacing.md")} align="flex-start">
          <Accordion.Root
            type="single"
            collapsible
            size="sm"
            defaultValue="a"
            style={{ flex: "1 1 220px", minWidth: 200 }}
          >
            <Accordion.Item value="a">
              <Accordion.Header>
                <Accordion.Trigger>Small</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <Text size="sm">size=&quot;sm&quot;</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
          <Accordion.Root
            type="single"
            collapsible
            size="md"
            defaultValue="a"
            style={{ flex: "1 1 220px", minWidth: 200 }}
          >
            <Accordion.Item value="a">
              <Accordion.Header>
                <Accordion.Trigger>Medium</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <Text size="sm">size=&quot;md&quot;</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
          <Accordion.Root
            type="single"
            collapsible
            size="lg"
            defaultValue="a"
            style={{ flex: "1 1 220px", minWidth: 200 }}
          >
            <Accordion.Item value="a">
              <Accordion.Header>
                <Accordion.Trigger>Large</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <Text size="sm">size=&quot;lg&quot;</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </HStack>
      </LiveExample>

      <h2>{t("accordion.examplesMotion")}</h2>
      <LiveExample
        code={`import { Accordion, HStack, Text, themeToken } from "kovax-react";

<HStack wrap="wrap" gap={themeToken("spacing.md")} align="flex-start">
  <Accordion.Root type="single" collapsible motionDurationMs={90} defaultValue="a" style={{ flex: "1 1 240px", minWidth: 200 }}>
    <Accordion.Item value="a">
      <Accordion.Header><Accordion.Trigger>Fast (90ms)</Accordion.Trigger></Accordion.Header>
      <Accordion.Content><Text size="sm">motionDurationMs={'{90}'}</Text></Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
  <Accordion.Root type="single" collapsible motionDurationMs={280} defaultValue="a" style={{ flex: "1 1 240px", minWidth: 200 }}>
    <Accordion.Item value="a">
      <Accordion.Header><Accordion.Trigger>Default (~200–280)</Accordion.Trigger></Accordion.Header>
      <Accordion.Content><Text size="sm">motionDurationMs={'{280}'}</Text></Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
  <Accordion.Root type="single" collapsible motionDurationMs={600} defaultValue="a" style={{ flex: "1 1 240px", minWidth: 200 }}>
    <Accordion.Item value="a">
      <Accordion.Header><Accordion.Trigger>Slow (600ms)</Accordion.Trigger></Accordion.Header>
      <Accordion.Content><Text size="sm">motionDurationMs={'{600}'}</Text></Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</HStack>`}
      >
        <HStack wrap="wrap" gap={themeToken("spacing.md")} align="flex-start">
          <Accordion.Root
            type="single"
            collapsible
            motionDurationMs={90}
            defaultValue="a"
            style={{ flex: "1 1 240px", minWidth: 200 }}
          >
            <Accordion.Item value="a">
              <Accordion.Header>
                <Accordion.Trigger>Fast (90ms)</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <Text size="sm">motionDurationMs=&#123;90&#125;</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
          <Accordion.Root
            type="single"
            collapsible
            motionDurationMs={280}
            defaultValue="a"
            style={{ flex: "1 1 240px", minWidth: 200 }}
          >
            <Accordion.Item value="a">
              <Accordion.Header>
                <Accordion.Trigger>Default (~200–280)</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <Text size="sm">motionDurationMs=&#123;280&#125;</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
          <Accordion.Root
            type="single"
            collapsible
            motionDurationMs={600}
            defaultValue="a"
            style={{ flex: "1 1 240px", minWidth: 200 }}
          >
            <Accordion.Item value="a">
              <Accordion.Header>
                <Accordion.Trigger>Slow (600ms)</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <Text size="sm">motionDurationMs=&#123;600&#125;</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </HStack>
      </LiveExample>

      <h2>{t("accordion.examplesSurfaces")}</h2>
      <LiveExample
        code={`import { Accordion, Box, Text, themeToken } from "kovax-react";

<Box
  p={themeToken("spacing.lg")}
  borderRadius={themeToken("borderRadius.md")}
  style={{ maxWidth: 520, backgroundColor: themeToken("primary.900") }}
>
  <Text size="sm" style={{ color: themeToken("primary.100"), marginBottom: themeToken("spacing.sm") }}>
    Elevated accordion on a dark band
  </Text>
  <Accordion.Root type="single" collapsible variant="elevated" motionDurationMs={300} defaultValue="one">
    <Accordion.Item value="one">
      <Accordion.Header><Accordion.Trigger>Shipping</Accordion.Trigger></Accordion.Header>
      <Accordion.Content><Text size="sm">Panels stay legible on tinted layouts.</Text></Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="two">
      <Accordion.Header><Accordion.Trigger>Returns</Accordion.Trigger></Accordion.Header>
      <Accordion.Content><Text size="sm">Adjust wrapper padding / radius as needed.</Text></Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</Box>`}
      >
        <Box
          p={themeToken("spacing.lg")}
          borderRadius={themeToken("borderRadius.md")}
          style={{
            maxWidth: 520,
            backgroundColor: themeToken("primary.900"),
          }}
        >
          <Text
            size="sm"
            style={{ color: themeToken("primary.100"), marginBottom: themeToken("spacing.sm") }}
          >
            Elevated accordion on a dark band
          </Text>
          <Accordion.Root
            type="single"
            collapsible
            variant="elevated"
            motionDurationMs={300}
            defaultValue="one"
          >
            <Accordion.Item value="one">
              <Accordion.Header>
                <Accordion.Trigger>Shipping</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <Text size="sm">Panels stay legible on tinted layouts.</Text>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="two">
              <Accordion.Header>
                <Accordion.Trigger>Returns</Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <Text size="sm">Adjust wrapper padding / radius as needed.</Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Box>
      </LiveExample>

      <Text size="xs" color={themeToken("secondary.600")} style={{ marginTop: themeToken("spacing.md") }}>
        <Trans i18nKey="accordion.docsHint" components={{ strong: <strong /> }} />
      </Text>
    </>
  );
}
