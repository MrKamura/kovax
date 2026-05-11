import React from "react";
import type { ListItemProps } from "./ListItem.types";
import { themeToken } from "../theme/tokens";
import { getSpacingStyles } from "../../utils/styleUtils";
import { partitionSpacingProps } from "../../utils/partitionSpacingProps";

function ListItemInner(props: ListItemProps, ref: React.Ref<HTMLLIElement>) {
  const { children, className = "", style, ...rest } = props;

  const [spacingBag, domProps] = partitionSpacingProps(rest);
  const spacingStyles = getSpacingStyles(spacingBag);

  const liStyles: React.CSSProperties = {
    margin: 0,
    lineHeight: 1.5,
    fontSize: themeToken("text.base"),
    color: themeToken("secondary.800"),
  };

  return (
    <li
      {...domProps}
      ref={ref}
      className={className}
      style={{ ...liStyles, ...spacingStyles, ...style }}
    >
      {children}
    </li>
  );
}

export const ListItem = React.forwardRef(ListItemInner);
ListItem.displayName = "ListItem";
