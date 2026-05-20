import React from "react";
import type { Ref } from "react";
import { mergeRefs } from "../../utils/mergeRefs";
import { FieldControl, isKovaxFieldElement } from "./fieldControl";

export interface FieldBinding {
  name: string;
  value: unknown;
  onChange: (...args: unknown[]) => void;
  onBlur: () => void;
  ref: Ref<unknown>;
  disabled?: boolean;
}

export function buildFieldInjection(
  field: FieldBinding,
  valuePropName: string,
  onChangePropName?: string,
): Record<string, unknown> {
  const changeKey = onChangePropName ?? "onChange";
  return {
    name: field.name,
    [valuePropName]: field.value,
    [changeKey]: field.onChange,
    onBlur: field.onBlur,
    ref: field.ref,
    ...(field.disabled !== undefined ? { disabled: field.disabled } : {}),
  };
}

function cloneWithFieldProps(
  child: React.ReactElement,
  injected: Record<string, unknown>,
): React.ReactElement {
  const childProps = child.props as Record<string, unknown>;
  const childRef = childProps.ref as Ref<unknown> | undefined;
  const injectedRef = injected.ref as Ref<unknown> | undefined;

  return React.cloneElement(child, {
    ...injected,
    ...childProps,
    ref:
      injectedRef != null || childRef != null
        ? mergeRefs(injectedRef, childRef)
        : undefined,
  } as Record<string, unknown>);
}

/**
 * Injects field bindings into the first Kovax field control (or `FieldControl` wrapper).
 */
export function injectFieldChildren(
  children: React.ReactNode,
  injected: Record<string, unknown>,
): React.ReactNode {
  let bound = false;

  return React.Children.map(children, (child) => {
    if (bound || !React.isValidElement(child)) return child;

    if (child.type === FieldControl) {
      bound = true;
      const inner = React.Children.only(
        (child.props as { children: React.ReactElement }).children,
      );
      return cloneWithFieldProps(inner, injected);
    }

    if (isKovaxFieldElement(child)) {
      bound = true;
      return cloneWithFieldProps(child, injected);
    }

    return child;
  });
}
