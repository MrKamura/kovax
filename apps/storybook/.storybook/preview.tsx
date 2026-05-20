import React from "react";
import type { Preview } from "@storybook/react-vite";
import { ThemeProvider, ToastProvider } from "kovax-react";
import "react-day-picker/style.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Run axe in the Accessibility panel; fail CI only when wired explicitly.
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider storageKey={null} defaultColorMode="light">
        <ToastProvider>
          <Story />
        </ToastProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
