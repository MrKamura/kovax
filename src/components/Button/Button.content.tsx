import React from "react";
import { ButtonContentProps, LoaderPosition } from "./Button.types";

interface ButtonContentComponentProps extends Omit<ButtonContentProps, 'children'> {
  children: React.ReactNode;
  loaderPosition: LoaderPosition;
  finalLoader: React.ReactNode;
}

export const ButtonContent: React.FC<ButtonContentComponentProps> = ({
  isLoading,
  loaderPosition,
  finalLoader,
  leftIcon,
  rightIcon,
  children,
}) => {
  if (loaderPosition === "center") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        {isLoading ? finalLoader : <span>{children}</span>}
      </div>
    );
  }

  return (
    <>
      {isLoading && loaderPosition === "left" && finalLoader}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
      {isLoading && loaderPosition === "right" && finalLoader}
    </>
  );
};