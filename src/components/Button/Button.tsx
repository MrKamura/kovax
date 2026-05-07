import React from "react";
import { cn } from "../../utils/classNames";
import { ButtonProps } from "./Button.types";
import { DefaultLoader } from "./Button.loader";
import { createButtonStyles } from "./Button.styles";
import { ButtonContent } from "./Button.content";
import { useInteractiveState } from "../../core/hooks/useInteractiveState";
import { extractStyleProps } from "../../utils/propUtils";

function ButtonInner(props: ButtonProps, ref: React.Ref<HTMLButtonElement>) {
  const {
    isLoading = false,
    loader,
    loaderPosition = "left",
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    type = "button",
    'data-testid': dataTestId,
    ...restProps
  } = props;

  const finalLoader = loader ?? <DefaultLoader />;
  const styleProps = extractStyleProps(props);

  const [interactiveState, {
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleFocus,
    handleBlur
  }] = useInteractiveState();

  const baseStyles = createButtonStyles(styleProps);

  const dynamicStyles: React.CSSProperties = {
    ...baseStyles,
    backgroundColor: interactiveState.isActive
      ? (baseStyles as Record<string, string | undefined>)["--active-bg"]
      : interactiveState.isHover
      ? (baseStyles as Record<string, string | undefined>)["--hover-bg"]
      : baseStyles.backgroundColor,
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    opacity: disabled || isLoading ? 0.6 : 1,
  };

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseEnter();
    onMouseEnter?.(e);
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseLeave();
    onMouseLeave?.(e);
  };

  const handleButtonMouseDown = (_e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseDown();
  };

  const handleButtonMouseUp = (_e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseUp();
  };

  const handleButtonFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    handleFocus();
    onFocus?.(e);
  };

  const handleButtonBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    handleBlur();
    onBlur?.(e);
  };

  return (
    <button
      ref={ref}
      className={cn("kv-button", className)}
      style={dynamicStyles}
      disabled={disabled || isLoading}
      onClick={onClick}
      onMouseEnter={handleButtonMouseEnter}
      onMouseLeave={handleButtonMouseLeave}
      onMouseDown={handleButtonMouseDown}
      onMouseUp={handleButtonMouseUp}
      onFocus={handleButtonFocus}
      onBlur={handleButtonBlur}
      type={type}
      data-testid={dataTestId}
      {...restProps}
    >
      <ButtonContent
        isLoading={isLoading}
        loaderPosition={loaderPosition}
        finalLoader={finalLoader}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      >
        {children}
      </ButtonContent>
    </button>
  );
}

export const Button = React.forwardRef(ButtonInner);
Button.displayName = "Button";
