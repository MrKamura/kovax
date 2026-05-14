import React from "react";
import type { KbdProps } from "./Kbd.types";
import { themeToken } from "../theme/tokens";
import { getSpacingStyles } from "../../utils/styleUtils";
import { partitionSpacingProps } from "../../utils/partitionSpacingProps";

const mono: React.CSSProperties = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

function KbdInner(props: KbdProps, ref: React.Ref<HTMLElement>) {
  const { size = "xs", children, className = "", style, ...rest } = props;

  const [spacingBag, domProps] = partitionSpacingProps(rest);
  const spacingStyles = getSpacingStyles(spacingBag);

  const kbdStyles: React.CSSProperties = {
    ...mono,
    margin: 0,
    display: "inline-flex",
    alignItems: "center",
    boxSizing: "border-box",
    fontSize: themeToken(`text.${size}`),
    lineHeight: 1.25,
    padding: `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`,
    borderRadius: themeToken("borderRadius.sm"),
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: themeToken("secondary.300"),
    backgroundColor: themeToken("secondary.50"),
    color: themeToken("secondary.800"),
    boxShadow: themeToken("shadow.sm"),
  };

  return React.createElement("kbd", {
    ...domProps,
    ref,
    className,
    style: { ...kbdStyles, ...spacingStyles, ...style },
  }, children);
}

export const Kbd = React.forwardRef(KbdInner);
Kbd.displayName = "Kbd";
