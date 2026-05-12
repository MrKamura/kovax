import React, { createContext, useContext } from "react";

export interface RadioGroupContextValue {
  name: string;
  value: string;
  setValue: (next: string) => void;
  isDisabled: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
