import React from "react";
import { ButtonContentProps, LoaderPosition } from "./Button.types";

interface ButtonContentComponentProps extends Omit<ButtonContentProps, "children"> {
  children: React.ReactNode;
  loaderPosition: LoaderPosition;
  finalLoader: React.ReactNode;
  iconSize?: number | string;
}

function iconSlotStyle(iconSize?: number | string): React.CSSProperties {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  };
  if (iconSize == null) return base;
  return {
    ...base,
    fontSize: typeof iconSize === "number" ? `${iconSize}px` : iconSize,
  };
}

function IconSlot({
  iconSize,
  children,
}: {
  iconSize?: number | string;
  children: React.ReactNode;
}) {
  if (children == null) return null;
  return <span style={iconSlotStyle(iconSize)}>{children}</span>;
}

export const ButtonContent: React.FC<ButtonContentComponentProps> = ({
  isLoading,
  loaderPosition,
  finalLoader,
  leftIcon,
  rightIcon,
  iconSize,
  children,
}) => {
  if (loaderPosition === "center") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {isLoading ? (
          <IconSlot iconSize={iconSize}>{finalLoader}</IconSlot>
        ) : (
          <span>{children}</span>
        )}
      </div>
    );
  }

  return (
    <>
      {isLoading && loaderPosition === "left" && (
        <IconSlot iconSize={iconSize}>{finalLoader}</IconSlot>
      )}
      {!isLoading && <IconSlot iconSize={iconSize}>{leftIcon}</IconSlot>}
      <span>{children}</span>
      {!isLoading && <IconSlot iconSize={iconSize}>{rightIcon}</IconSlot>}
      {isLoading && loaderPosition === "right" && (
        <IconSlot iconSize={iconSize}>{finalLoader}</IconSlot>
      )}
    </>
  );
};
