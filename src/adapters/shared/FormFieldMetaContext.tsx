import React, { createContext, useContext } from "react";

export interface FormFieldMeta {
  name: string;
  invalid: boolean;
  errorMessage?: string;
}

export const FormFieldMetaContext = createContext<FormFieldMeta | null>(null);

/** Field meta from the nearest `FormField` adapter; `null` outside. */
export function useFormFieldMeta(): FormFieldMeta | null {
  return useContext(FormFieldMetaContext);
}
