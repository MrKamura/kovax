import React, { useEffect, useState } from "react";
import { themeToken } from "../theme/tokens";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  usePopoverRootContext,
} from "../Popover/Popover";
import { ensureMenuKeyframes, menuPanelMotionAnimation } from "./menuKeyframes";
import type {
  MenuContentProps,
  MenuItemProps,
  MenuRootProps,
  MenuSeparatorProps,
  MenuTriggerProps,
} from "./Menu.types";

export function MenuRoot(props: MenuRootProps) {
  return <PopoverRoot {...props} />;
}

export function MenuTrigger(props: MenuTriggerProps) {
  return <PopoverTrigger ariaHasPopup="menu" {...props} />;
}

export function MenuContent({
  style,
  placement = "bottom-start",
  motion = true,
  ...props
}: MenuContentProps) {
  useEffect(() => {
    if (motion) ensureMenuKeyframes();
  }, [motion]);

  const motionStyle: React.CSSProperties | undefined = motion
    ? {
        animation: menuPanelMotionAnimation(
          themeToken("duration.fast"),
          themeToken("easing.decelerate"),
        ),
      }
    : undefined;

  return (
    <PopoverContent
      contentRole="menu"
      placement={placement}
      style={{
        padding: themeToken("spacing.xs"),
        minWidth: "10rem",
        ...motionStyle,
        ...style,
      }}
      {...props}
    />
  );
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  {
    disabled,
    children,
    onSelect,
    className,
    style,
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const ctx = usePopoverRootContext("Menu.Item");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const activate = () => {
    if (disabled) return;
    onSelect?.();
    ctx.setOpen(false);
  };

  const transit = `background-color ${themeToken("duration.fast")} ${themeToken("easing.standard")}`;

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      className={className}
      style={{
        padding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
        borderRadius: themeToken("borderRadius.sm"),
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.48 : 1,
        outline: "none",
        backgroundColor:
          !disabled && hovered ? themeToken("secondary.100") : "transparent",
        transition: transit,
        boxShadow:
          focused && !disabled
            ? `0 0 0 2px ${themeToken("primary.200")}`
            : undefined,
        ...style,
      }}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        setHovered(false);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        setFocused(true);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        setFocused(false);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) activate();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

MenuItem.displayName = "Menu.Item";

export function MenuSeparator({ className, style, ...rest }: MenuSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={className}
      style={{
        height: 1,
        margin: `${themeToken("spacing.xs")} ${themeToken("spacing.sm")}`,
        backgroundColor: themeToken("secondary.200"),
        ...style,
      }}
      {...rest}
    />
  );
}

MenuRoot.displayName = "Menu.Root";
MenuTrigger.displayName = "Menu.Trigger";
MenuContent.displayName = "Menu.Content";
MenuSeparator.displayName = "Menu.Separator";

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  Separator: MenuSeparator,
};

/** Same compound API as **`Menu`** — naming preference only. */
export const DropdownMenu = Menu;
