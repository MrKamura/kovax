import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading, Text, VStack, Link } from "kovax-react";

const meta = {
  title: "Components/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const HeadingScale: Story = {
  render: () => (
    <VStack align="stretch" gap={8}>
      <Heading as="h1" size="2xl">
        Heading 2xl
      </Heading>
      <Heading as="h2" size="xl">
        Heading xl
      </Heading>
      <Heading as="h3" size="lg">
        Heading lg
      </Heading>
      <Heading as="h4" size="md">
        Heading md
      </Heading>
    </VStack>
  ),
};

export const TextSizes: Story = {
  render: () => (
    <VStack align="stretch" gap={6}>
      <Text size="lg">Large body text for intros.</Text>
      <Text size="md">Default body copy.</Text>
      <Text size="sm">Secondary or helper text.</Text>
      <Link href="https://github.com/MrKamura/kovax">Documentation link</Link>
    </VStack>
  ),
};
