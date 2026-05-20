import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, VStack, FormControl, FormLabel } from "kovax-react";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your name",
  },
};

export const WithLabel: Story = {
  render: () => (
    <VStack align="stretch" gap={8} style={{ minWidth: 280 }}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="you@example.com" />
      </FormControl>
    </VStack>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    defaultValue: "Read only",
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid",
    "aria-invalid": true,
    defaultValue: "bad@",
  },
};
