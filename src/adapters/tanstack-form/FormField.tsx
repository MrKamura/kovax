import React, { useMemo } from "react";
import { useField } from "@tanstack/react-form";
import {
  FormControl,
  type FormControlProps,
} from "../../components/Form/FormControl";
import {
  FormFieldMetaContext,
  type FormFieldMeta,
} from "../shared/FormFieldMetaContext";
import {
  buildFieldInjection,
  injectFieldChildren,
} from "../shared/injectFieldProps";
import { inferRequiredFromRules } from "../shared/inferRequired";

/** Minimal TanStack field surface used by the adapter (keeps DTS stable across minor releases). */
export interface TanStackFieldLike {
  name: string;
  state: {
    value: unknown;
    meta: {
      isValid: boolean;
      isTouched: boolean;
      isDirty: boolean;
      errors?: unknown;
      isDisabled?: boolean;
    };
  };
  handleChange: (value: unknown) => void;
  handleBlur: () => void;
}

/** Minimal TanStack form surface for the `form` + `name` variant. */
export interface TanStackFormLike {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type TanStackFormFieldProps = Omit<FormControlProps, "children"> & {
  /** Prop receiving the field value (`checked` for Checkbox / Switch). */
  valuePropName?: string;
  /** Prop receiving change events (default `onChange`). */
  onChangePropName?: string;
  /** Passed to `useField({ validators })` when using `form` + `name`. */
  validators?: unknown;
  children: React.ReactNode;
} & (
  | { form: TanStackFormLike; name: string; field?: never }
  | { field: TanStackFieldLike; form?: never; name?: never }
);

function resolveTanStackErrorMessage(errors: unknown): string | undefined {
  if (errors == null) return undefined;
  if (typeof errors === "string") return errors;
  if (Array.isArray(errors)) {
    const first = errors[0];
    if (typeof first === "string") return first;
    if (first && typeof first === "object" && "message" in first) {
      return String((first as { message?: unknown }).message ?? "");
    }
    return undefined;
  }
  if (typeof errors === "object" && "message" in errors) {
    return String((errors as { message?: unknown }).message ?? "");
  }
  return undefined;
}

function createTanStackHandlers(
  field: TanStackFieldLike,
  valuePropName: string,
  onChangePropName?: string,
) {
  const changeKey = onChangePropName ?? "onChange";
  const handleChange = (event: unknown) => {
    if (event && typeof event === "object" && "target" in event) {
      const target = event.target as HTMLInputElement;
      if (valuePropName === "checked") {
        field.handleChange(target.checked);
        return;
      }
      field.handleChange(target.value);
      return;
    }
    field.handleChange(event);
  };

  return {
    name: field.name,
    [valuePropName]: field.state.value,
    [changeKey]: handleChange,
    onBlur: () => {
      field.handleBlur();
    },
  };
}

function TanStackFormFieldInner({
  field,
  isRequired: isRequiredProp,
  validators,
  valuePropName = "value",
  onChangePropName,
  children,
  isInvalid: isInvalidProp,
  isDisabled: isDisabledProp,
  ...formControlProps
}: Omit<TanStackFormFieldProps, "form" | "name" | "field"> & {
  field: TanStackFieldLike;
}) {
  const touched = field.state.meta.isTouched || field.state.meta.isDirty;
  const invalidFromField = !field.state.meta.isValid && touched;
  const isInvalid = isInvalidProp ?? invalidFromField;
  const isRequired =
    isRequiredProp ?? inferRequiredFromRules(validators);
  const isDisabled = isDisabledProp ?? Boolean(field.state.meta.isDisabled);
  const errorMessage = resolveTanStackErrorMessage(field.state.meta.errors);

  const meta = useMemo(
    (): FormFieldMeta => ({
      name: String(field.name),
      invalid: isInvalid,
      errorMessage,
    }),
    [field.name, isInvalid, errorMessage],
  );

  const handlers = createTanStackHandlers(field, valuePropName, onChangePropName);
  const injected = buildFieldInjection(
    {
      name: handlers.name,
      value: handlers[valuePropName],
      onChange: handlers[onChangePropName ?? "onChange"] as (
        ...args: unknown[]
      ) => void,
      onBlur: handlers.onBlur as () => void,
      ref: () => {},
    },
    valuePropName,
    onChangePropName,
  );

  return (
    <FormFieldMetaContext.Provider value={meta}>
      <FormControl
        isInvalid={isInvalid}
        isRequired={isRequired}
        isDisabled={isDisabled}
        {...formControlProps}
      >
        {injectFieldChildren(children, injected)}
      </FormControl>
    </FormFieldMetaContext.Provider>
  );
}

function TanStackFormFieldWithName({
  form,
  name,
  validators,
  ...rest
}: TanStackFormFieldProps & { form: TanStackFormLike; name: string }) {
  const field = useField({
    form: form as never,
    name,
    validators: validators as never,
  }) as unknown as TanStackFieldLike;

  return (
    <TanStackFormFieldInner field={field} validators={validators} {...rest} />
  );
}

/** TanStack Form adapter — `form` + `name`, or a `field` from `form.Field` render props. */
export function FormField(props: TanStackFormFieldProps) {
  if ("field" in props && props.field) {
    const { field, ...rest } = props;
    return <TanStackFormFieldInner field={field} {...rest} />;
  }

  const { form, name, ...rest } = props;
  return (
    <TanStackFormFieldWithName
      form={form!}
      name={name!}
      {...rest}
    />
  );
}

FormField.displayName = "FormField";
