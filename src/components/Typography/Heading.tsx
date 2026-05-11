import React from "react";
import type { HeadingLevel, HeadingProps } from "./Heading.types";
import type { TextSizeKey } from "../theme/tokens";
import { themeToken } from "../theme/tokens";
import { getSpacingStyles } from "../../utils/styleUtils";
import { partitionSpacingProps } from "../../utils/partitionSpacingProps";

const LEVEL_PRESET: Record<
  HeadingLevel,
  { size: TextSizeKey; fontWeight: number }
> = {
  1: { size: "xl", fontWeight: 700 },
  2: { size: "lg", fontWeight: 700 },
  3: { size: "lg", fontWeight: 600 },
  4: { size: "base", fontWeight: 600 },
  5: { size: "sm", fontWeight: 600 },
  6: { size: "xs", fontWeight: 600 },
};

function HeadingInner(props: HeadingProps, ref: React.Ref<HTMLHeadingElement>) {
  const {
    level = 2,
    size,
    fontWeight,
    lineHeight,
    children,
    className = "",
    style,
    ...rest
  } = props;

  const preset = LEVEL_PRESET[level];
  const resolvedSize = size ?? preset.size;
  const resolvedWeight = fontWeight ?? preset.fontWeight;

  const [spacingBag, domProps] = partitionSpacingProps(rest);
  const spacingStyles = getSpacingStyles(spacingBag);

  const TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
  const Tag = TAGS[level - 1];

  const typoStyles: React.CSSProperties = {
    margin: 0,
    fontSize: themeToken(`text.${resolvedSize}`),
    fontWeight: resolvedWeight,
    color: themeToken("secondary.900"),
    ...(lineHeight != null ? { lineHeight } : {}),
  };

  return React.createElement(Tag, {
    ...domProps,
    ref,
    className,
    style: { ...typoStyles, ...spacingStyles, ...style },
  }, children);
}

export const Heading = React.forwardRef(HeadingInner);
Heading.displayName = "Heading";
