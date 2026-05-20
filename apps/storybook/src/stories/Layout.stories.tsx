import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, HStack, VStack, Text, themeToken } from "kovax-react";

const meta = {
  title: "Layout/Stack",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const VerticalStack: Story = {
  render: () => (
    <VStack
      align="stretch"
      gap={12}
      p={16}
      style={{
        minWidth: 280,
        background: themeToken("secondary.50"),
        borderRadius: 8,
      }}
    >
      <Text size="sm" fontWeight={600}>
        VStack
      </Text>
      <Box
        p={12}
        style={{ background: themeToken("primary.100"), borderRadius: 6 }}
      >
        Item one
      </Box>
      <Box
        p={12}
        style={{ background: themeToken("primary.100"), borderRadius: 6 }}
      >
        Item two
      </Box>
    </VStack>
  ),
};

export const HorizontalStack: Story = {
  render: () => (
    <HStack gap={12} wrap="wrap">
      <Box
        p={12}
        style={{ background: themeToken("success.100"), borderRadius: 6 }}
      >
        Alpha
      </Box>
      <Box
        p={12}
        style={{ background: themeToken("success.100"), borderRadius: 6 }}
      >
        Beta
      </Box>
      <Box
        p={12}
        style={{ background: themeToken("success.100"), borderRadius: 6 }}
      >
        Gamma
      </Box>
    </HStack>
  ),
};
