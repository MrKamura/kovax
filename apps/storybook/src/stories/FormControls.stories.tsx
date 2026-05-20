import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, Switch, VStack, Text } from "kovax-react";

const meta = {
  title: "Components/Form controls",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const CheckboxDefault: Story = {
  render: () => <Checkbox defaultChecked>Accept terms</Checkbox>,
};

export const SwitchDefault: Story = {
  render: () => (
    <VStack align="stretch" gap={8}>
      <Text size="sm">Enable notifications</Text>
      <Switch defaultChecked aria-label="Enable notifications" />
    </VStack>
  ),
};

export const CheckboxDisabled: Story = {
  render: () => (
    <Checkbox disabled defaultChecked>
      Disabled option
    </Checkbox>
  ),
};
