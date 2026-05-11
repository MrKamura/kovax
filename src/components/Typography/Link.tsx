import React from "react";
import type { LinkProps } from "./Link.types";
import { themeToken } from "../theme/tokens";
import { getSpacingStyles } from "../../utils/styleUtils";
import { partitionSpacingProps } from "../../utils/partitionSpacingProps";

function mergeRel(external: boolean, rel: string | undefined): string | undefined {
  const parts = new Set<string>();
  if (rel) {
    for (const p of rel.split(/\s+/)) {
      if (p) parts.add(p);
    }
  }
  if (external) {
    parts.add("noopener");
    parts.add("noreferrer");
  }
  return parts.size ? [...parts].join(" ") : undefined;
}

function LinkInner(props: LinkProps, ref: React.Ref<HTMLAnchorElement>) {
  const {
    href,
    external = false,
    underline = true,
    children,
    className = "",
    style,
    target,
    rel,
    ...rest
  } = props;

  const [spacingBag, domProps] = partitionSpacingProps(rest);
  const spacingStyles = getSpacingStyles(spacingBag);

  const mergedTarget = external ? "_blank" : target;
  const mergedRel = mergeRel(external, rel);

  const linkStyles: React.CSSProperties = {
    margin: 0,
    color: themeToken("primary.600"),
    textDecoration: underline ? "underline" : "none",
    cursor: "pointer",
  };

  return (
    <a
      {...domProps}
      ref={ref}
      href={href}
      className={className}
      target={mergedTarget}
      rel={mergedRel}
      style={{ ...linkStyles, ...spacingStyles, ...style }}
    >
      {children}
    </a>
  );
}

export const Link = React.forwardRef(LinkInner);
Link.displayName = "Link";
