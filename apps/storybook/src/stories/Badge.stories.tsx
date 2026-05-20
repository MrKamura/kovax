import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, HStack } from "kovax-react";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "New",
  },
};

export const SemanticColors: Story = {
  render: () => (
    <HStack gap={8} wrap="wrap">
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
    </HStack>
  ),
};

export const Variants: Story = {
  render: () => (
    <HStack gap={8} wrap="wrap">
      <Badge variant="solid" color="primary">
        Solid
      </Badge>
      <Badge variant="outline" color="primary">
        Outline
      </Badge>
      <Badge variant="subtle" color="primary">
        Subtle
      </Badge>
    </HStack>
  ),
};
