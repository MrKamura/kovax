import type { DocPropRow } from "../../components/DocPropsTable";

/** Rows aligned with docs/components/Layout/*.md */
export const layoutPropRows = {
  box: [
    {
      name: "as",
      type: "BoxAsProp",
      default: "`div`",
      description: "Host tag; for `a`, `button`, `label`, etc. — typed attributes.",
    },
    {
      name: "SpacingProps",
      type: "see type",
      default: "—",
      description:
        "w, h, minW, maxW, p, m, gap, display, flex*, grid*, position, backgroundColor, borderRadius, etc.",
    },
    {
      name: "…DOM",
      type: "HTML attrs",
      default: "—",
      description:
        "Other native props (`id`, `aria-*`, `onClick`, `href` for `as=\"a\"`) pass through to the element.",
    },
  ] satisfies DocPropRow[],

  container: [
    {
      name: "maxW",
      type: "preset | number | string",
      default: "`lg`",
      description: "sm | md | lg | xl | 2xl | full or a length.",
    },
    {
      name: "center",
      type: "boolean",
      default: "`true`",
      description: "Horizontal centering via margin auto.",
    },
    {
      name: "padding",
      type: "number | string",
      default: "—",
      description: "Shorthand padding for the container.",
    },
    {
      name: "+ Box",
      type: "SpacingProps",
      default: "—",
      description: "height / h; otherwise same as Box.",
    },
  ] satisfies DocPropRow[],

  stack: [
    {
      name: "direction",
      type: "row | column | …",
      default: "`row`",
      description: "For Stack — flex-direction.",
    },
    {
      name: "align",
      type: "align-items",
      default: "`center` (`stretch` on VStack)",
      description: "Cross axis.",
    },
    {
      name: "justify",
      type: "justify-content",
      default: "`flex-start`",
      description: "Main axis.",
    },
    {
      name: "wrap",
      type: "nowrap | wrap | …",
      default: "`nowrap`",
      description: "Flex line wrapping.",
    },
    {
      name: "reverse",
      type: "boolean",
      default: "`false`",
      description: "HStack / VStack only — switches to *-reverse.",
    },
    {
      name: "+ Box",
      type: "SpacingProps",
      default: "—",
      description: "gap, p, w, and other Box props.",
    },
  ] satisfies DocPropRow[],

  flex: [
    {
      name: "direction",
      type: "FlexDirection",
      default: "`row`",
      description: "Main axis direction.",
    },
    {
      name: "wrap",
      type: "FlexWrap",
      default: "`nowrap`",
      description: "flex-wrap.",
    },
    {
      name: "justify",
      type: "FlexJustify",
      default: "`flex-start`",
      description: "justify-content.",
    },
    {
      name: "align",
      type: "FlexAlign",
      default: "`stretch`",
      description: "align-items.",
    },
    {
      name: "alignContent",
      type: "FlexAlignContent",
      default: "`stretch`",
      description: "Alignment when there are multiple flex lines.",
    },
    {
      name: "gap",
      type: "number | string",
      default: "—",
      description: "Gap between items.",
    },
    {
      name: "grow / shrink / basis",
      type: "number | string",
      default: "—",
      description: "Shorthands for flex-grow / shrink / basis.",
    },
    {
      name: "reverse",
      type: "boolean",
      default: "`false`",
      description: "Reverse direction.",
    },
    {
      name: "+ Box",
      type: "SpacingProps",
      default: "—",
      description: "No display/flexDirection from Box (Flex sets those).",
    },
  ] satisfies DocPropRow[],

  grid: [
    {
      name: "columns",
      type: "number | string",
      default: "—",
      description: "Number → repeat(n, 1fr); otherwise a CSS track list string.",
    },
    {
      name: "rows",
      type: "number | string",
      default: "—",
      description: "Same idea for rows.",
    },
    {
      name: "gap / rowGap / columnGap",
      type: "number | string",
      default: "—",
      description: "Grid gutters.",
    },
    {
      name: "areas",
      type: "string[]",
      default: "—",
      description: "grid-template-areas.",
    },
    {
      name: "justifyItems / alignItems",
      type: "…",
      default: "`stretch`",
      description: "Cell alignment.",
    },
    {
      name: "justifyContent / alignContent",
      type: "…",
      default: "`start` / `stretch`",
      description: "Grid tracks within the container.",
    },
    {
      name: "autoFlow / autoColumns / autoRows",
      type: "string",
      default: "—",
      description: "Implicit grid placement.",
    },
    {
      name: "template",
      type: "{ columns?, rows?, areas? }",
      default: "—",
      description: "Takes precedence over separate columns/rows/areas.",
    },
    {
      name: "+ Box",
      type: "SpacingProps",
      default: "—",
      description: "w, h, padding, layout — same as Box.",
    },
  ] satisfies DocPropRow[],

  center: [
    {
      name: "horizontal",
      type: "boolean",
      default: "`true`",
      description: "Center on the horizontal axis.",
    },
    {
      name: "vertical",
      type: "boolean",
      default: "`true`",
      description: "Center on the vertical axis.",
    },
    {
      name: "center",
      type: "boolean",
      default: "`true`",
      description: "If true — both axes.",
    },
    {
      name: "inline",
      type: "boolean",
      default: "`false`",
      description: "inline-flex.",
    },
    {
      name: "width / height",
      type: "number | string",
      default: "—",
      description: "Aliases; prefer w / h.",
    },
    {
      name: "+ LayoutBoxProps",
      type: "SpacingProps",
      default: "—",
      description: "gap, padding, background, etc.",
    },
  ] satisfies DocPropRow[],

  separator: [
    {
      name: "orientation",
      type: `"horizontal" | "vertical"`,
      default: "`horizontal`",
      description: "Line direction.",
    },
    {
      name: "size",
      type: "number | string",
      default: "`1`",
      description: "Thickness (number → px).",
    },
    {
      name: "color",
      type: "string",
      default: "`gray.200`",
      description: "Line fill (background-color).",
    },
    {
      name: "margin",
      type: "number | string",
      default: "—",
      description: "Outer margin.",
    },
    {
      name: "+ Box",
      type: "SpacingProps",
      default: "—",
      description: "Excludes spacing color as text color.",
    },
  ] satisfies DocPropRow[],

  bleed: [
    {
      name: "all",
      type: "number | string",
      default: "—",
      description: "Negative margin on all sides.",
    },
    {
      name: "horizontal / vertical",
      type: "number | string",
      default: "—",
      description: "Two-axis shorthands.",
    },
    {
      name: "top / right / bottom / left",
      type: "number | string",
      default: "—",
      description: "Per side; overrides axis/all when both apply.",
    },
    {
      name: "width / height",
      type: "number | string",
      default: "—",
      description: "Aliases for w / h.",
    },
    {
      name: "+ Box",
      type: "SpacingProps",
      default: "—",
      description: "Remaining Box props.",
    },
  ] satisfies DocPropRow[],

  aspectRatio: [
    {
      name: "ratio",
      type: "number",
      default: "`16/9`",
      description: "Width ÷ height.",
    },
    {
      name: "maxW / maxH",
      type: "number | string",
      default: "—",
      description: "Via Box.",
    },
    {
      name: "objectFit",
      type: "CSS object-fit",
      default: "`cover`",
      description: "When there is a single DOM child element.",
    },
    {
      name: "+ Box",
      type: "SpacingProps",
      default: "—",
      description: "padding, borderRadius, etc.",
    },
  ] satisfies DocPropRow[],

  visuallyHidden: [
    {
      name: "showOnFocus",
      type: "boolean",
      default: "`false`",
      description: "`span` for skip links; visibility via :focus in CSS.",
    },
    {
      name: "+ HTML attrs",
      type: "HTMLAttributes",
      default: "—",
      description: "className, id, aria-*, data-*.",
    },
  ] satisfies DocPropRow[],

  sticky: [
    {
      name: "top",
      type: "number | string",
      default: "`0`",
      description: "Offset when stuck; used in rootMargin for the observer.",
    },
    {
      name: "bottom / left / right",
      type: "number | string",
      default: "—",
      description: "Position in fixed state.",
    },
    {
      name: "zIndex",
      type: "number",
      default: "`1000`",
      description: "Layer while sticky.",
    },
    {
      name: "enabled",
      type: "boolean",
      default: "`true`",
      description: "Disable observer and sticking.",
    },
    {
      name: "shadow",
      type: "string",
      default: "—",
      description: "box-shadow while sticky.",
    },
    {
      name: "+ HTML attrs",
      type: "HTMLAttributes",
      default: "—",
      description: "className, style on the wrapper (not Box).",
    },
  ] satisfies DocPropRow[],
} as const;
