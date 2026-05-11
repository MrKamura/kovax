import React from "react";
import type { TextProps } from "./Text.types";
import { themeToken } from "../theme/tokens";
import { getSpacingStyles } from "../../utils/styleUtils";
import { partitionSpacingProps } from "../../utils/partitionSpacingProps";

function TextInner(props: TextProps, ref: React.Ref<Element>) {
  const {
    as: Tag = "p",
    size = "base",
    fontWeight,
    lineHeight,
    truncate,
    balance,
    children,
    className = "",
    style,
    ...rest
  } = props;

  const [spacingBag, domProps] = partitionSpacingProps(rest);
  const spacingStyles = getSpacingStyles(spacingBag);

  const typoStyles: React.CSSProperties = {
    margin: 0,
    fontSize: themeToken(`text.${size}`),
    ...(fontWeight != null ? { fontWeight } : {}),
    ...(lineHeight != null ? { lineHeight } : {}),
    ...(truncate
      ? {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }
      : {}),
    ...(balance ? ({ textWrap: "balance" } as React.CSSProperties) : {}),
  };

  return React.createElement(Tag as React.ElementType, {
    ...domProps,
    ref,
    className,
    style: { ...typoStyles, ...spacingStyles, ...style },
  }, children);
}

export const Text = React.forwardRef(TextInner);
Text.displayName = "Text";
