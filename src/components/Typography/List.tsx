import React from "react";
import type { ListProps } from "./List.types";
import type { ListItemProps } from "./ListItem.types";
import { ListItem } from "./ListItem";
import { themeToken } from "../theme/tokens";
import { getSpacingStyles } from "../../utils/styleUtils";
import { partitionSpacingProps } from "../../utils/partitionSpacingProps";

function ListInner(
  props: ListProps,
  ref: React.Ref<HTMLUListElement | HTMLOListElement>
) {
  const {
    ordered = false,
    spacing = "sm",
    children,
    className = "",
    style,
    ...rest
  } = props;

  const [spacingBag, domProps] = partitionSpacingProps(rest);
  const spacingStyles = getSpacingStyles(spacingBag);

  const gap = themeToken(`spacing.${spacing}`);
  const Tag = ordered ? "ol" : "ul";

  const childArray = React.Children.toArray(children);
  const lastIndex = childArray.length - 1;

  const items = childArray.map((child, index) => {
    if (!React.isValidElement<ListItemProps>(child)) return child;
    if (child.type !== ListItem) return child;

    const prevStyle = child.props.style;
    const mb = index === lastIndex ? undefined : gap;

    return React.cloneElement(child, {
      style: mb != null ? { marginBottom: mb, ...prevStyle } : prevStyle,
    });
  });

  const listStyles: React.CSSProperties = {
    margin: 0,
    paddingLeft: themeToken("spacing.lg"),
    listStylePosition: "outside",
    ...spacingStyles,
    ...style,
  };

  return React.createElement(
    Tag,
    { ...domProps, ref, className, style: listStyles },
    items
  );
}

export const List = React.forwardRef(ListInner);
List.displayName = "List";
