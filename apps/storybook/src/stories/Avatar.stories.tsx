import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, HStack } from "kovax-react";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: {
    name: "Aleksei Alekseev",
  },
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={12} align="center">
      <Avatar name="Kovax" size="sm" />
      <Avatar name="Kovax" size="md" />
      <Avatar name="Kovax" size="lg" />
    </HStack>
  ),
};

export const Image: Story = {
  args: {
    name: "Kovax",
    src: "https://avatars.githubusercontent.com/u/583231?v=4",
  },
};
