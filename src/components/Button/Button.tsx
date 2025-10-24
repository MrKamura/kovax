import React, { useState } from "react";
import { cn } from "../../utils/classNames";
import { ButtonProps } from "./Button.types";
import { DefaultLoader } from "./Button.loader";
import { createButtonStyles } from "./Button.styles";

/**
 * Kovax Button v0.4
 */
export const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  loader,
  loaderPosition,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}) => {
  const loaderPos = loaderPosition ?? "left";
  const finalLoader = loader ?? <DefaultLoader />;

  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const styles = createButtonStyles(props);

  const hoverBg = (styles as any)["--hover-bg"];
  const activeBg = (styles as any)["--active-bg"];

  const dynamicStyle: React.CSSProperties = {
    ...styles,
    backgroundColor: isActive
      ? activeBg
      : isHover
        ? hoverBg
        : styles.backgroundColor,
  };

  return (
    <button
      className={cn("kv-button", className)}
      style={dynamicStyle}
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      {...props}
    >
      {/* left loader or icon */}
      {isLoading && loaderPos === "left" && finalLoader}
      {!isLoading && leftIcon}

      {/* text or centered loader */}
      {loaderPos !== "center" ? (
        <span>{children}</span>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {isLoading ? finalLoader : <span>{children}</span>}
        </div>
      )}

      {/* right loader or icon */}
      {!isLoading && rightIcon}
      {isLoading && loaderPos === "right" && finalLoader}
    </button>
  );
};