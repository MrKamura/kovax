import React from "react";
import type { CSSProperties, FocusEvent, MouseEvent } from "react";
import { cn } from "../../utils/classNames";
import { themeToken } from "../theme/tokens";
import { ButtonProps } from "./Button.types";
import { DefaultLoader } from "./Button.loader";
import { createButtonStyles } from "./Button.styles";
import { ButtonContent } from "./Button.content";
import { useInteractiveState } from "../../core/hooks/useInteractiveState";
import { extractStyleProps } from "../../utils/propUtils";

function ButtonInner(props: ButtonProps, ref: React.Ref<HTMLElement>) {
  const {
    as: Component = "button",
    isLoading = false,
    loader,
    loaderPosition = "left",
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    type = "button",
    tabIndex,
    fullWidth: _fullWidth,
    loadingText,
    pressed,
    iconSize,
    variant: _variant,
    color: _color,
    size: _size,
    shadow: _shadow,
    w: _w,
    h: _h,
    bg: _bg,
    textColor: _textColor,
    borderRadius: _borderRadius,
    borderColor: _borderColor,
    "data-testid": dataTestId,
    ...restDomProps
  } = props;

  const isNativeButton = Component === "button";
  const finalLoader = loader ?? <DefaultLoader />;
  const styleProps = extractStyleProps(props);

  const [
    interactiveState,
    {
      handleMouseEnter,
      handleMouseLeave,
      handleMouseDown,
      handleMouseUp,
      handleFocus,
      handleBlur,
    },
  ] = useInteractiveState();

  const baseStyles = createButtonStyles(styleProps);

  const focusRing =
    interactiveState.isFocused && !(disabled || isLoading)
      ? `0 0 0 2px ${themeToken("white")}, 0 0 0 4px ${themeToken("primary.500")}`
      : undefined;

  const shadowParts = [
    focusRing,
    baseStyles.boxShadow && baseStyles.boxShadow !== "none" ? baseStyles.boxShadow : null,
  ].filter(Boolean) as string[];

  const dynamicStyles: CSSProperties = {
    ...baseStyles,
    ...(shadowParts.length ? { boxShadow: shadowParts.join(", ") } : {}),
    backgroundColor: interactiveState.isActive
      ? (baseStyles as Record<string, string | undefined>)["--active-bg"]
      : interactiveState.isHover
        ? (baseStyles as Record<string, string | undefined>)["--hover-bg"]
        : baseStyles.backgroundColor,
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    opacity: disabled || isLoading ? 0.6 : 1,
    ...(!isNativeButton && (disabled || isLoading)
      ? { pointerEvents: "none" as const }
      : {}),
    ...style,
  };

  const mergedOnClick = (e: MouseEvent<HTMLElement>) => {
    if (disabled || isLoading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const handleButtonMouseEnter = (e: MouseEvent<HTMLElement>) => {
    handleMouseEnter();
    onMouseEnter?.(e);
  };

  const handleButtonMouseLeave = (e: MouseEvent<HTMLElement>) => {
    handleMouseLeave();
    onMouseLeave?.(e);
  };

  const handleButtonMouseDown = (_e: MouseEvent<HTMLElement>) => {
    handleMouseDown();
  };

  const handleButtonMouseUp = (_e: MouseEvent<HTMLElement>) => {
    handleMouseUp();
  };

  const handleButtonFocus = (e: FocusEvent<HTMLElement>) => {
    handleFocus();
    onFocus?.(e);
  };

  const handleButtonBlur = (e: FocusEvent<HTMLElement>) => {
    handleBlur();
    onBlur?.(e);
  };

  const busyProps =
    isLoading ?
      {
        "aria-busy": true as const,
        ...(loadingText ? { "aria-live": "polite" as const } : {}),
      }
    : {};

  const pressedProps = pressed !== undefined ? { "aria-pressed": pressed } : {};

  const nativeButtonProps =
    isNativeButton ?
      {
        type,
        disabled: disabled || isLoading,
      }
    : {
        "aria-disabled": disabled || isLoading ? true : undefined,
        tabIndex: disabled || isLoading ? -1 : tabIndex,
      };

  return (
    <Component
      ref={ref}
      className={cn("kv-button", className)}
      style={dynamicStyles}
      onClick={mergedOnClick}
      onMouseEnter={handleButtonMouseEnter}
      onMouseLeave={handleButtonMouseLeave}
      onMouseDown={handleButtonMouseDown}
      onMouseUp={handleButtonMouseUp}
      onFocus={handleButtonFocus}
      onBlur={handleButtonBlur}
      data-testid={dataTestId}
      {...busyProps}
      {...pressedProps}
      {...nativeButtonProps}
      {...restDomProps}
    >
      {isLoading && loadingText ?
        <span
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            clipPath: "inset(50%)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {loadingText}
        </span>
      : null}
      <ButtonContent
        isLoading={isLoading}
        loaderPosition={loaderPosition}
        finalLoader={finalLoader}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        iconSize={iconSize}
      >
        {children}
      </ButtonContent>
    </Component>
  );
}

export const Button = React.forwardRef(ButtonInner);
Button.displayName = "Button";
