import type { Meta, StoryObj } from "@storybook/react-vite";
import { LinearProgress, CircularProgress, VStack, Text } from "kovax-react";

const meta = {
  title: "Components/Progress",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const LinearDeterminate: Story = {
  render: () => (
    <LinearProgress value={65} aria-label="Upload progress" style={{ width: 320 }} />
  ),
};

export const LinearIndeterminate: Story = {
  render: () => (
    <LinearProgress indeterminate aria-label="Loading" style={{ width: 320 }} />
  ),
};

export const CircularDeterminate: Story = {
  render: () => <CircularProgress value={72} aria-label="Sync progress" />,
};

export const WithLabel: Story = {
  render: () => (
    <VStack align="stretch" gap={8} style={{ width: 320 }}>
      <Text size="sm">Syncing files…</Text>
      <LinearProgress value={42} aria-label="Sync progress" />
    </VStack>
  ),
};
