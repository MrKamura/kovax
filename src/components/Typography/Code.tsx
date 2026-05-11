import React from "react";
import type { CodeProps } from "./Code.types";
import { themeToken } from "../theme/tokens";
import { getSpacingStyles } from "../../utils/styleUtils";
import { partitionSpacingProps } from "../../utils/partitionSpacingProps";

const mono: React.CSSProperties = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

function CodeInner(props: CodeProps, ref: React.Ref<HTMLElement>) {
  const {
    variant = "inline",
    size,
    children,
    className = "",
    style,
    ...rest
  } = props;

  const resolvedSize = size ?? (variant === "block" ? "sm" : "xs");

  const [spacingBag, domProps] = partitionSpacingProps(rest);
  const spacingStyles = getSpacingStyles(spacingBag);

  const sharedFont = {
    ...mono,
    fontSize: themeToken(`text.${resolvedSize}`),
    backgroundColor: themeToken("secondary.100"),
    color: themeToken("secondary.800"),
    borderRadius: themeToken("borderRadius.sm"),
  };

  if (variant === "block") {
    const codeInner: React.CSSProperties = {
      ...sharedFont,
      margin: 0,
      display: "block",
      padding: themeToken("spacing.md"),
      overflow: "auto",
      whiteSpace: "pre",
      wordBreak: "normal",
    };

    const preOuter: React.CSSProperties = {
      margin: 0,
      ...spacingStyles,
      ...style,
    };

    return (
      <pre
        {...domProps}
        ref={ref as React.Ref<HTMLPreElement>}
        className={className}
        style={preOuter}
      >
        <code style={codeInner}>{children}</code>
      </pre>
    );
  }

  const codeInline: React.CSSProperties = {
    ...sharedFont,
    margin: 0,
    padding: `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`,
    wordBreak: "break-word",
  };

  return (
    <code
      {...domProps}
      ref={ref}
      className={className}
      style={{ ...codeInline, ...spacingStyles, ...style }}
    >
      {children}
    </code>
  );
}

export const Code = React.forwardRef(CodeInner);
Code.displayName = "Code";
