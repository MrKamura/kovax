import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, HStack, VStack, Text, themeToken } from "kovax-react";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SolidPrimary: Story = {
  args: {
    children: "Solid primary",
    variant: "solid",
    color: "primary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
    color: "primary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
    color: "primary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const Loading: Story = {
  args: {
    children: "Saving",
    isLoading: true,
    loadingText: "Saving…",
  },
};

export const Palette: Story = {
  render: () => (
    <VStack align="stretch" gap={16}>
      <Text size="sm" color={themeToken("secondary.600")}>
        Solid variants across semantic palettes.
      </Text>
      <HStack gap={12} wrap="wrap">
        <Button variant="solid" color="primary">
          Primary
        </Button>
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
      </HStack>
    </VStack>
  ),
};
