import React from "react";
import type { BlockquoteProps } from "./Blockquote.types";
import { themeToken } from "../theme/tokens";
import { getSpacingStyles } from "../../utils/styleUtils";
import { partitionSpacingProps } from "../../utils/partitionSpacingProps";

function BlockquoteInner(props: BlockquoteProps, ref: React.Ref<HTMLQuoteElement>) {
  const {
    citation,
    cite,
    children,
    className = "",
    style,
    ...rest
  } = props;

  const [spacingBag, domProps] = partitionSpacingProps(rest);
  const spacingStyles = getSpacingStyles(spacingBag);

  const quoteStyles: React.CSSProperties = {
    margin: 0,
    paddingLeft: themeToken("spacing.md"),
    borderLeft: `4px solid ${themeToken("primary.400")}`,
    color: themeToken("secondary.700"),
    fontSize: themeToken("text.lg"),
    lineHeight: 1.6,
  };

  const footerStyles: React.CSSProperties = {
    marginTop: themeToken("spacing.sm"),
    fontSize: themeToken("text.sm"),
    color: themeToken("secondary.500"),
  };

  return (
    <blockquote
      {...domProps}
      ref={ref}
      cite={cite}
      className={className}
      style={{ ...quoteStyles, ...spacingStyles, ...style }}
    >
      {children}
      {citation ? (
        <footer style={footerStyles}>
          — <cite style={{ fontStyle: "normal" }}>{citation}</cite>
        </footer>
      ) : null}
    </blockquote>
  );
}

export const Blockquote = React.forwardRef(BlockquoteInner);
Blockquote.displayName = "Blockquote";
