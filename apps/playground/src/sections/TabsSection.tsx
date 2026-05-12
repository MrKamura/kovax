import { useState } from "react";
import {
  HStack,
  Tabs,
  Text,
  themeToken,
  VStack,
} from "kovax-react";
import { Trans, useTranslation } from "react-i18next";
import { LiveExample } from "../components/LiveExample";

function TabsControlledDemo() {
  const [tab, setTab] = useState("settings");
  return (
    <VStack align="stretch" gap={themeToken("spacing.sm")}>
      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="billing" disabled>
            Billing
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="profile">
          <Text size="sm">Profile panel (controlled).</Text>
        </Tabs.Content>
        <Tabs.Content value="settings">
          <Text size="sm">Settings panel.</Text>
        </Tabs.Content>
        <Tabs.Content value="billing">
          <Text size="sm">Billing panel.</Text>
        </Tabs.Content>
      </Tabs.Root>
      <Text size="xs" color={themeToken("secondary.600")}>
        Active: <strong>{tab}</strong>
      </Text>
    </VStack>
  );
}

function FiveTabsAnimatedDemo() {
  return (
    <Tabs.Root defaultValue="t1" indicatorTransitionMs={280} panelTransitionMs={160}>
      <Tabs.List>
        <Tabs.Trigger value="t1">First</Tabs.Trigger>
        <Tabs.Trigger value="t2">Second</Tabs.Trigger>
        <Tabs.Trigger value="t3">Third</Tabs.Trigger>
        <Tabs.Trigger value="t4">Fourth</Tabs.Trigger>
        <Tabs.Trigger value="t5">Fifth</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="t1">
        <Text size="sm">Choose Fourth or Fifth — the underline glides instead of jumping.</Text>
      </Tabs.Content>
      <Tabs.Content value="t2">
        <Text size="sm">Panel 2</Text>
      </Tabs.Content>
      <Tabs.Content value="t3">
        <Text size="sm">Panel 3</Text>
      </Tabs.Content>
      <Tabs.Content value="t4">
        <Text size="sm">Panel 4</Text>
      </Tabs.Content>
      <Tabs.Content value="t5">
        <Text size="sm">Panel 5</Text>
      </Tabs.Content>
    </Tabs.Root>
  );
}

function TopIndicatorTabsDemo() {
  return (
    <Tabs.Root defaultValue="one" indicatorPosition="top" indicatorTransitionMs={260}>
      <Tabs.List>
        <Tabs.Trigger value="one">Summary</Tabs.Trigger>
        <Tabs.Trigger value="two">Activity</Tabs.Trigger>
        <Tabs.Trigger value="three">Files</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="one">
        <Text size="sm">Indicator rail sits above the labels (<code>indicatorPosition=&quot;top&quot;</code>).</Text>
      </Tabs.Content>
      <Tabs.Content value="two">
        <Text size="sm">Activity stream.</Text>
      </Tabs.Content>
      <Tabs.Content value="three">
        <Text size="sm">Attachments.</Text>
      </Tabs.Content>
    </Tabs.Root>
  );
}

export function TabsSection() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("tabs.pageTitle")}</h1>
      <p>
        <Trans i18nKey="tabs.intro" components={{ strong: <strong />, code: <code /> }} />
      </p>

      <h2>{t("tabs.examplesBasic")}</h2>
      <LiveExample
        code={`import { Tabs, Text, VStack } from "kovax-react";

<VStack align="stretch" gap={16}>
  <Tabs.Root defaultValue="overview">
    <Tabs.List>
      <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
      <Tabs.Trigger value="details">Details</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="overview">
      <Text size="sm">High-level summary.</Text>
    </Tabs.Content>
    <Tabs.Content value="details">
      <Text size="sm">Extended content stays mounted when hidden.</Text>
    </Tabs.Content>
  </Tabs.Root>
</VStack>`}
      >
        <VStack align="stretch" gap={16}>
          <Tabs.Root defaultValue="overview">
            <Tabs.List>
              <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
              <Tabs.Trigger value="details">Details</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="overview">
              <Text size="sm">High-level summary.</Text>
            </Tabs.Content>
            <Tabs.Content value="details">
              <Text size="sm">Extended content stays mounted when hidden.</Text>
            </Tabs.Content>
          </Tabs.Root>
        </VStack>
      </LiveExample>

      <h2>{t("tabs.examplesAnimated")}</h2>
      <LiveExample
        code={`import { Tabs, Text } from "kovax-react";

<Tabs.Root defaultValue="t1" indicatorTransitionMs={280} panelTransitionMs={160}>
  <Tabs.List>
    <Tabs.Trigger value="t1">First</Tabs.Trigger>
    <Tabs.Trigger value="t2">Second</Tabs.Trigger>
    <Tabs.Trigger value="t3">Third</Tabs.Trigger>
    <Tabs.Trigger value="t4">Fourth</Tabs.Trigger>
    <Tabs.Trigger value="t5">Fifth</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="t1">
    <Text size="sm">Jump from First to Fifth — underline slides.</Text>
  </Tabs.Content>
  <Tabs.Content value="t2">
    <Text size="sm">Panel 2</Text>
  </Tabs.Content>
  <Tabs.Content value="t3">
    <Text size="sm">Panel 3</Text>
  </Tabs.Content>
  <Tabs.Content value="t4">
    <Text size="sm">Panel 4</Text>
  </Tabs.Content>
  <Tabs.Content value="t5">
    <Text size="sm">Panel 5</Text>
  </Tabs.Content>
</Tabs.Root>`}
      >
        <FiveTabsAnimatedDemo />
      </LiveExample>

      <h2>{t("tabs.examplesTopIndicator")}</h2>
      <LiveExample
        code={`import { Tabs, Text } from "kovax-react";

<Tabs.Root defaultValue="one" indicatorPosition="top" indicatorTransitionMs={260}>
  <Tabs.List>
    <Tabs.Trigger value="one">Summary</Tabs.Trigger>
    <Tabs.Trigger value="two">Activity</Tabs.Trigger>
    <Tabs.Trigger value="three">Files</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="one">
    <Text size="sm">Bar above labels.</Text>
  </Tabs.Content>
  <Tabs.Content value="two">
    <Text size="sm">Activity stream.</Text>
  </Tabs.Content>
  <Tabs.Content value="three">
    <Text size="sm">Attachments.</Text>
  </Tabs.Content>
</Tabs.Root>`}
      >
        <TopIndicatorTabsDemo />
      </LiveExample>

      <h2>{t("tabs.examplesClassic")}</h2>
      <LiveExample
        code={`import { Tabs, Text } from "kovax-react";

<Tabs.Root defaultValue="a" indicator="none">
  <Tabs.List>
    <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
    <Tabs.Trigger value="b">Bravo</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="a">
    <Text size="sm">Each trigger draws its own underline (no shared slider).</Text>
  </Tabs.Content>
  <Tabs.Content value="b">
    <Text size="sm">Panel B</Text>
  </Tabs.Content>
</Tabs.Root>`}
      >
        <Tabs.Root defaultValue="a" indicator="none">
          <Tabs.List>
            <Tabs.Trigger value="a">Alpha</Tabs.Trigger>
            <Tabs.Trigger value="b">Bravo</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">
            <Text size="sm">Each trigger draws its own underline (no shared slider).</Text>
          </Tabs.Content>
          <Tabs.Content value="b">
            <Text size="sm">Panel B</Text>
          </Tabs.Content>
        </Tabs.Root>
      </LiveExample>

      <h2>{t("tabs.examplesControlled")}</h2>
      <LiveExample
        code={`import { useState } from "react";
import { Tabs, Text, themeToken, VStack } from "kovax-react";

function Demo() {
  const [tab, setTab] = useState("settings");
  return (
    <VStack align="stretch" gap={themeToken("spacing.sm")}>
      <Tabs.Root value={tab} onValueChange={setTab}>
        <Tabs.List>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          <Tabs.Trigger value="billing" disabled>
            Billing
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="profile">
          <Text size="sm">Profile panel.</Text>
        </Tabs.Content>
        <Tabs.Content value="settings">
          <Text size="sm">Settings panel.</Text>
        </Tabs.Content>
        <Tabs.Content value="billing">
          <Text size="sm">Billing panel.</Text>
        </Tabs.Content>
      </Tabs.Root>
      <Text size="xs" color={themeToken("secondary.600")}>
        Active: <strong>{tab}</strong>
      </Text>
    </VStack>
  );
}`}
      >
        <TabsControlledDemo />
      </LiveExample>

      <h2>{t("tabs.examplesVertical")}</h2>
      <LiveExample
        code={`import { HStack, Tabs, Text, VStack } from "kovax-react";

<Tabs.Root defaultValue="inbox" orientation="vertical" indicatorPosition="inline-end">
  <HStack align="flex-start" gap={24}>
    <Tabs.List>
      <Tabs.Trigger value="inbox">Inbox</Tabs.Trigger>
      <Tabs.Trigger value="sent">Sent</Tabs.Trigger>
    </Tabs.List>
    <VStack align="stretch" style={{ flex: 1, minWidth: 0 }}>
      <Tabs.Content value="inbox">
        <Text size="sm">Vertical strip — ArrowUp / ArrowDown. Sliding rail on the outer edge (<code>indicatorPosition=&quot;inline-end&quot;</code>).</Text>
      </Tabs.Content>
      <Tabs.Content value="sent">
        <Text size="sm">Sent mail.</Text>
      </Tabs.Content>
    </VStack>
  </HStack>
</Tabs.Root>`}
      >
        <Tabs.Root defaultValue="inbox" orientation="vertical" indicatorPosition="inline-end">
          <HStack align="flex-start" gap={24}>
            <Tabs.List>
              <Tabs.Trigger value="inbox">Inbox</Tabs.Trigger>
              <Tabs.Trigger value="sent">Sent</Tabs.Trigger>
            </Tabs.List>
            <VStack align="stretch" style={{ flex: 1, minWidth: 0 }}>
              <Tabs.Content value="inbox">
                <Text size="sm">Vertical strip — ArrowUp / ArrowDown. Sliding rail on the outer edge (<code>indicatorPosition=&quot;inline-end&quot;</code>).</Text>
              </Tabs.Content>
              <Tabs.Content value="sent">
                <Text size="sm">Sent mail.</Text>
              </Tabs.Content>
            </VStack>
          </HStack>
        </Tabs.Root>
      </LiveExample>
    </>
  );
}
