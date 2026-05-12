import React from "react";
import { cn } from "../../utils/classNames";
import { themeToken } from "../theme/tokens";

export interface ButtonGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /** Single-row merged corners and overlapping borders (outline buttons). */
  attached?: boolean;
}

function applyAttachedChildStyles(children: React.ReactNode): React.ReactNode {
  const elements = React.Children.toArray(children).filter(React.isValidElement);
  const count = elements.length;
  let visualIndex = 0;
  const mdRadius = themeToken("borderRadius.md");

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const i = visualIndex;
    visualIndex += 1;
    const isFirst = i === 0;
    const isLast = i === count - 1;
    const attachStyle: React.CSSProperties = {
      borderTopLeftRadius: isFirst ? mdRadius : 0,
      borderBottomLeftRadius: isFirst ? mdRadius : 0,
      borderTopRightRadius: isLast ? mdRadius : 0,
      borderBottomRightRadius: isLast ? mdRadius : 0,
      marginLeft: isFirst ? 0 : -1,
      position: "relative",
      zIndex: count - i,
    };
    const prevStyle = (child.props as { style?: React.CSSProperties }).style;
    return React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
      style: { ...prevStyle, ...attachStyle },
    });
  });
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, style, children, attached = false, ...rest }, ref) => {
    const body = attached ? applyAttachedChildStyles(children) : children;
    return (
      <div
        ref={ref}
        role="group"
        className={cn("kv-button-group", className)}
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          gap: attached ? 0 : themeToken("spacing.xs"),
          ...style,
        }}
        {...rest}
      >
        {body}
      </div>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";
