import React from "react";
import { colors, themeToken } from "../theme/tokens";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  type DialogCloseProps,
  type DialogContentProps,
  type DialogDescriptionProps,
  type DialogRootProps,
  type DialogTitleProps,
  type DialogTriggerProps,
} from "../Dialog";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

function modalPanelWidth(size: ModalSize): string {
  switch (size) {
    case "sm":
      return "min(100% - 2rem, 24rem)";
    case "md":
      return "min(100% - 2rem, 28rem)";
    case "lg":
      return "min(100% - 2rem, 42rem)";
    case "xl":
      return "min(100% - 2rem, 56rem)";
    case "full":
      return "calc(100vw - 2rem)";
    default:
      return "min(100% - 2rem, 28rem)";
  }
}

export type ModalRootProps = DialogRootProps;

/** Same behavior as `Dialog.Root`; pairs with `Modal.Content` and layout sections. */
export function ModalRoot(props: ModalRootProps) {
  return <DialogRoot {...props} />;
}

export type ModalTriggerProps = DialogTriggerProps;

export function ModalTrigger(props: ModalTriggerProps) {
  return <DialogTrigger {...props} />;
}

export interface ModalContentProps extends DialogContentProps {
  /** Panel width preset; default `md`. */
  size?: ModalSize;
}

/**
 * Modal shell: column layout, scroll lives in `Modal.Body`. Uses `Dialog.Content` under the hood
 * (portal, trap, scroll lock, Escape / overlay).
 */
export function ModalContent({
  size = "md",
  style,
  className,
  ...rest
}: ModalContentProps) {
  return (
    <DialogContent
      className={className}
      {...rest}
      style={{
        width: modalPanelWidth(size),
        maxHeight: "min(90vh, 960px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: 0,
        ...style,
      }}
    />
  );
}

export type ModalTitleProps = DialogTitleProps;

/** Heading wired to `aria-labelledby`; use inside `Modal.Header` or at the top of `Modal.Body`. */
export function ModalTitle({ style, ...rest }: ModalTitleProps) {
  return <DialogTitle style={{ margin: 0, ...style }} {...rest} />;
}

export type ModalDescriptionProps = DialogDescriptionProps;

export function ModalDescription(props: ModalDescriptionProps) {
  return <DialogDescription {...props} />;
}

export type ModalCloseProps = DialogCloseProps;

export function ModalClose(props: ModalCloseProps) {
  return <DialogClose {...props} />;
}

export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function ModalHeader({ style, className, ...rest }: ModalHeaderProps) {
  return (
    <div
      className={className}
      {...rest}
      style={{
        flexShrink: 0,
        padding: `${themeToken("spacing.md")} ${themeToken("spacing.lg")}`,
        borderBottom: `1px solid ${colors.secondary[200]}`,
        ...style,
      }}
    />
  );
}

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove padding (e.g. edge-to-edge image or video). */
  flush?: boolean;
}

export function ModalBody({ flush, style, className, ...rest }: ModalBodyProps) {
  const pad = flush ? 0 : themeToken("spacing.lg");
  return (
    <div
      className={className}
      {...rest}
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: flush ? 0 : `${themeToken("spacing.md")} ${pad} ${themeToken("spacing.md")}`,
        ...style,
      }}
    />
  );
}

export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function ModalFooter({ style, className, ...rest }: ModalFooterProps) {
  return (
    <div
      className={className}
      {...rest}
      style={{
        flexShrink: 0,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: themeToken("spacing.sm"),
        padding: `${themeToken("spacing.md")} ${themeToken("spacing.lg")}`,
        borderTop: `1px solid ${colors.secondary[200]}`,
        ...style,
      }}
    />
  );
}

ModalRoot.displayName = "Modal.Root";
ModalTrigger.displayName = "Modal.Trigger";
ModalContent.displayName = "Modal.Content";
ModalTitle.displayName = "Modal.Title";
ModalDescription.displayName = "Modal.Description";
ModalClose.displayName = "Modal.Close";
ModalHeader.displayName = "Modal.Header";
ModalBody.displayName = "Modal.Body";
ModalFooter.displayName = "Modal.Footer";

/** Structured modal on top of `Dialog` — confirmations, forms, media (`flush` body). */
export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
};
