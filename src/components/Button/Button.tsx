import React from "react";
import { cn } from "../../utils/classNames";
import { ButtonProps } from "./Button.types";
import { DefaultLoader } from "./Button.loader";
import { createButtonStyles } from "./Button.styles";
import { ButtonContent } from "./Button.content";
import { useInteractiveState } from "../../core/hooks/useInteractiveState";
import { extractStyleProps } from "../../utils/propUtils";

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    // Content props
    isLoading = false,
    loader,
    loaderPosition = "left",
    leftIcon,
    rightIcon,
    children,
    
    // Style props
    className,
    disabled,
    
    // Interactive props
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    
    // HTML attributes
    type = "button", // Добавляем значение по умолчанию
    'data-testid': dataTestId,
    
    // Rest props
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
      ? (baseStyles as any)["--active-bg"]
      : interactiveState.isHover
      ? (baseStyles as any)["--hover-bg"]
      : baseStyles.backgroundColor,
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    opacity: disabled || isLoading ? 0.6 : 1,
  };

  // Обработчики событий
  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseEnter();
    onMouseEnter?.(e);
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseLeave();
    onMouseLeave?.(e);
  };

  const handleButtonMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseDown();
  };

  const handleButtonMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
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
};