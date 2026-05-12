import React, { createContext, useContext } from "react";

export interface FormControlContextValue {
  isInvalid: boolean;
  isRequired: boolean;
  isDisabled: boolean;
}

export const FormControlContext = createContext<FormControlContextValue | null>(null);

/** Reads the nearest `FormControl` state; `null` outside a control. */
export function useFormControlContext(): FormControlContextValue | null {
  return useContext(FormControlContext);
}
