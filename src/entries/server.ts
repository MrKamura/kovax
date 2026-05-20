/**
 * RSC-safe primitives — no hooks, context, or browser-only APIs.
 * Safe to import from React Server Components (Next.js App Router, etc.).
 */
export { Box } from "../components/Layout/Box";
export type { BoxProps, BaseBoxProps, BoxAsProp } from "../components/Layout/Box";

export { Stack } from "../components/Layout/Stack";
export type { StackProps } from "../components/Layout/Stack.types";

export { Container } from "../components/Layout/Container";
export type { ContainerProps } from "../components/Layout/Container";

export { Text } from "../components/Typography/Text";
export type { TextProps, TextAsProp } from "../components/Typography/Text.types";

export { Heading } from "../components/Typography/Heading";
export type { HeadingProps, HeadingLevel } from "../components/Typography/Heading.types";

export { ColorModeScript } from "../components/theme/ColorModeScript";
export type { ColorModeScriptProps } from "../components/theme/ColorModeScript";
export {
  buildColorModeInitScript,
  buildColorModeScriptTag,
} from "../components/theme/colorModeScriptSnippet";
export {
  KOVAX_COLOR_MODE_STORAGE_KEY,
  KOVAX_THEME_ATTRIBUTE,
} from "../components/theme/themeConstants";
