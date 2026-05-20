import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, VStack } from "kovax-react";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    tone: "info",
    heading: "Heads up",
    children: "You can adjust theme tokens in ThemeProvider.",
  },
};

export const Success: Story = {
  args: {
    tone: "success",
    heading: "Saved",
    children: "Your preferences were updated.",
  },
};

export const Warning: Story = {
  args: {
    tone: "warning",
    heading: "Check input",
    children: "Some fields need attention before submit.",
  },
};

export const Error: Story = {
  args: {
    tone: "error",
    heading: "Request failed",
    children: "Try again in a moment.",
  },
};

export const AllStatuses: Story = {
  render: () => (
    <VStack align="stretch" gap={12} style={{ maxWidth: 420 }}>
      <Alert tone="info" heading="Info">
        Informational message.
      </Alert>
      <Alert tone="success" heading="Success">
        Operation completed.
      </Alert>
      <Alert tone="warning" heading="Warning">
        Proceed with caution.
      </Alert>
      <Alert tone="error" heading="Error">
        Something went wrong.
      </Alert>
    </VStack>
  ),
};
