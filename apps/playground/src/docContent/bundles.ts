/**
 * Raw markdown from the repo `docs/` directory (imported via Vite `?raw`).
 */
import aspectRatio from "../../../../docs/components/Layout/AspectRatio.md?raw";
import bleed from "../../../../docs/components/Layout/Bleed.md?raw";
import box from "../../../../docs/components/Layout/Box.md?raw";
import center from "../../../../docs/components/Layout/Center.md?raw";
import container from "../../../../docs/components/Layout/Container.md?raw";
import flex from "../../../../docs/components/Layout/Flex.md?raw";
import grid from "../../../../docs/components/Layout/Grid.md?raw";
import separator from "../../../../docs/components/Layout/Separator.md?raw";
import stack from "../../../../docs/components/Layout/Stack.md?raw";
import sticky from "../../../../docs/components/Layout/Sticky.md?raw";
import visuallyHidden from "../../../../docs/components/Layout/VisuallyHidden.md?raw";

import button from "../../../../docs/components/Button.md?raw";
import controls from "../../../../docs/components/Controls.md?raw";
import form from "../../../../docs/components/Form.md?raw";
import input from "../../../../docs/components/Input.md?raw";
import textareaDoc from "../../../../docs/components/Textarea.md?raw";
import select from "../../../../docs/components/Select.md?raw";
import overlays from "../../../../docs/components/Overlays.md?raw";
import tabs from "../../../../docs/components/Tabs.md?raw";
import accordion from "../../../../docs/components/Accordion.md?raw";
import alert from "../../../../docs/components/Alert.md?raw";
import progress from "../../../../docs/components/Progress.md?raw";
import datePicker from "../../../../docs/components/DatePicker.md?raw";
import tableDoc from "../../../../docs/components/Table.md?raw";
import typographyText from "../../../../docs/components/Typography/Text.md?raw";
import typographyHeading from "../../../../docs/components/Typography/Heading.md?raw";
import typographyLink from "../../../../docs/components/Typography/Link.md?raw";
import typographyCode from "../../../../docs/components/Typography/Code.md?raw";
import typographyBlockquote from "../../../../docs/components/Typography/Blockquote.md?raw";
import typographyList from "../../../../docs/components/Typography/List.md?raw";

import designSystem from "../../../../docs/DESIGN_SYSTEM.md?raw";
import gettingStarted from "../../../../docs/GETTING_STARTED.md?raw";
import docsReadme from "../../../../docs/README.md?raw";
import tokens from "../../../../docs/components/Tokens.md?raw";

const mdSep = "\n\n---\n\n";

/** Layout bundle order matches docs/README.md */
export const layoutDocumentationMarkdown = [
  box,
  flex,
  grid,
  stack,
  center,
  container,
  aspectRatio,
  separator,
  bleed,
  visuallyHidden,
  sticky,
].join(mdSep);

export const buttonDocumentationMarkdown = button;
export const inputDocumentationMarkdown = [input, textareaDoc].join(mdSep);
export const controlsDocumentationMarkdown = controls;
export const selectDocumentationMarkdown = select;
export const overlaysDocumentationMarkdown = overlays;
export const tabsDocumentationMarkdown = tabs;
export const accordionDocumentationMarkdown = accordion;
export const alertDocumentationMarkdown = alert;
export const progressDocumentationMarkdown = progress;
export const datePickerDocumentationMarkdown = datePicker;
export const tableDocumentationMarkdown = tableDoc;
export const formDocumentationMarkdown = form;
export const typographyDocumentationMarkdown = [
  typographyText,
  typographyHeading,
  typographyLink,
  typographyCode,
  typographyBlockquote,
  typographyList,
].join(mdSep);

/** Overview: index, getting started, tokens, design system */
export const introDocumentationMarkdown = [
  docsReadme,
  gettingStarted,
  tokens,
  designSystem,
].join(mdSep);
