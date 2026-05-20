import React from "react";

/** Marks the control child when multiple siblings sit inside `FormField`. */
export function FieldControl(props: { children: React.ReactElement }) {
  return props.children;
}

FieldControl.displayName = "KovaxFieldControl";

const KOVAX_FIELD_DISPLAY_NAMES = new Set([
  "Input",
  "Textarea",
  "Select",
  "Checkbox",
  "Switch",
  "Radio",
  "DatePicker",
  "DateRangePicker",
]);

function elementDisplayName(type: unknown): string | undefined {
  if (typeof type === "string") return undefined;
  const t = type as { displayName?: string; name?: string };
  return t.displayName ?? t.name;
}

export function isKovaxFieldElement(element: React.ReactElement): boolean {
  if (element.type === FieldControl) return true;
  const name = elementDisplayName(element.type);
  return name != null && KOVAX_FIELD_DISPLAY_NAMES.has(name);
}
