import React from "react";
import { FormError, type FormErrorProps } from "../../components/Form/FormError";
import { useFormFieldMeta } from "./FormFieldMetaContext";

export type AdapterFormFieldErrorProps = Omit<FormErrorProps, "children"> & {
  children?: React.ReactNode;
};

/** Renders `FormError` when the nearest adapter `FormField` reports a validation error. */
export function FormFieldError({
  children,
  ...props
}: AdapterFormFieldErrorProps) {
  const meta = useFormFieldMeta();
  const message = children ?? meta?.errorMessage;
  if (message == null || message === "") return null;
  return <FormError {...props}>{message}</FormError>;
}

FormFieldError.displayName = "FormFieldError";
