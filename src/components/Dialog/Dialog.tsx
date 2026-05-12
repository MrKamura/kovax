import React, {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { colors, themeToken } from "../theme/tokens";
import { useBodyScrollLock } from "../../core/hooks/useBodyScrollLock";
import { useFocusTrap } from "../../core/hooks/useFocusTrap";
import { mergeRefs } from "../../utils/mergeRefs";

export interface DialogRootProps {
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled initial open */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  titleId: string;
  descriptionId: string;
  descriptionMounted: boolean;
  setDescriptionMounted: (v: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogCtx(component: string): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error(`${component} must be used within Dialog.Root`);
  return ctx;
}

export function DialogRoot({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
}: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [descriptionMounted, setDescriptionLive] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const setDescriptionMounted = useCallback((v: boolean) => {
    setDescriptionLive(v);
  }, []);

  const uidTitle = useId().replace(/:/g, "");
  const uidDesc = useId().replace(/:/g, "");

  const value = useMemo(
    (): DialogContextValue => ({
      open,
      setOpen,
      titleId: uidTitle,
      descriptionId: uidDesc,
      descriptionMounted,
      setDescriptionMounted,
    }),
    [descriptionMounted, open, setDescriptionMounted, setOpen, uidDesc, uidTitle],
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

export interface DialogTriggerProps {
  children: React.ReactElement<
    { ref?: React.Ref<HTMLElement>; onClick?: React.MouseEventHandler<HTMLElement> },
    string | React.JSXElementConstructor<unknown>
  >;
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  const ctx = useDialogCtx("Dialog.Trigger");
  const childProps = children.props as {
    ref?: React.Ref<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLElement>;
  };

  return cloneElement(children, {
    ref: mergeRefs(childProps.ref),
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      childProps.onClick?.(e);
      if (!e.defaultPrevented) ctx.setOpen(true);
    },
  });
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

/** Above typical sticky app headers (~1000–1100); tooltips use a higher layer (~11000). */
const overlayZ = 10040;
const contentZ = 10050;

export function DialogContent({
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  style,
  className,
  ...rest
}: DialogContentProps) {
  const ctx = useDialogCtx("Dialog.Content");
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useBodyScrollLock(ctx.open);
  useFocusTrap(ctx.open, panelRef);

  useEffect(() => {
    if (!ctx.open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeOnEscape, ctx]);

  if (!mounted || typeof document === "undefined" || !ctx.open) return null;

  const describedBy = ctx.descriptionMounted ? ctx.descriptionId : undefined;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: overlayZ,
        pointerEvents: "auto",
      }}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "default",
          background: "rgba(15, 23, 42, 0.45)",
        }}
        onClick={() => {
          if (closeOnOverlayClick) ctx.setOpen(false);
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={ctx.titleId}
        aria-describedby={describedBy}
        ref={panelRef}
        tabIndex={-1}
        className={className}
        {...rest}
        style={{
          position: "relative",
          zIndex: contentZ,
          boxSizing: "border-box",
          width: "min(100% - 2rem, 28rem)",
          margin: `${themeToken("spacing.xl")} auto`,
          padding: themeToken("spacing.lg"),
          borderRadius: themeToken("borderRadius.md"),
          background: themeToken("white"),
          border: `1px solid ${colors.secondary[200]}`,
          boxShadow: themeToken("shadow.xl"),
          outline: "none",
          maxHeight: "min(90vh, 640px)",
          overflow: "auto",
          ...style,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function DialogTitle({ style, className, ...rest }: DialogTitleProps) {
  const ctx = useDialogCtx("Dialog.Title");
  return (
    <h2
      id={ctx.titleId}
      className={className}
      style={{
        margin: `0 0 ${themeToken("spacing.sm")}`,
        fontSize: themeToken("text.xl"),
        fontWeight: 600,
        color: colors.secondary[900],
        lineHeight: 1.25,
        ...style,
      }}
      {...rest}
    />
  );
}

export type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function DialogDescription({ style, className, ...rest }: DialogDescriptionProps) {
  const ctx = useDialogCtx("Dialog.Description");

  useEffect(() => {
    ctx.setDescriptionMounted(true);
    return () => ctx.setDescriptionMounted(false);
  }, [ctx.setDescriptionMounted]);

  return (
    <p
      id={ctx.descriptionId}
      className={className}
      style={{
        margin: `0 0 ${themeToken("spacing.md")}`,
        fontSize: themeToken("text.sm"),
        color: colors.secondary[600],
        lineHeight: 1.45,
        ...style,
      }}
      {...rest}
    />
  );
}

export interface DialogCloseProps {
  children?: React.ReactElement<
    { ref?: React.Ref<HTMLElement>; onClick?: React.MouseEventHandler<HTMLElement> },
    string | React.JSXElementConstructor<unknown>
  >;
}

export function DialogClose({ children }: DialogCloseProps) {
  const ctx = useDialogCtx("Dialog.Close");

  if (children) {
    const childProps = children.props as {
      ref?: React.Ref<HTMLElement>;
      onClick?: React.MouseEventHandler<HTMLElement>;
    };
    return cloneElement(children, {
      ref: mergeRefs(childProps.ref),
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        childProps.onClick?.(e);
        if (!e.defaultPrevented) ctx.setOpen(false);
      },
    });
  }

  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(false)}
      style={{
        marginTop: themeToken("spacing.md"),
        padding: `${themeToken("spacing.sm")} ${themeToken("spacing.md")}`,
        borderRadius: themeToken("borderRadius.md"),
        border: `1px solid ${colors.secondary[300]}`,
        background: themeToken("white"),
        cursor: "pointer",
        fontSize: themeToken("text.sm"),
      }}
    >
      Close
    </button>
  );
}

DialogRoot.displayName = "Dialog.Root";
DialogTrigger.displayName = "Dialog.Trigger";
DialogContent.displayName = "Dialog.Content";
DialogTitle.displayName = "Dialog.Title";
DialogDescription.displayName = "Dialog.Description";
DialogClose.displayName = "Dialog.Close";

/** Namespaced dialog primitives (`Dialog.Root`, `Dialog.Content`, …). */
export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};