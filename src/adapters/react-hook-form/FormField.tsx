import React, { useMemo } from "react";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  type ControllerRenderProps,
} from "react-hook-form";
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

export type ReactHookFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<FormControlProps, "children"> & {
  control: Control<TFieldValues>;
  name: TName;
  rules?: RegisterOptions<TFieldValues, TName>;
  defaultValue?: RegisterOptions<TFieldValues, TName>["value"];
  shouldUnregister?: boolean;
  disabled?: boolean;
  /** Prop receiving the field value (`checked` for Checkbox / Switch). */
  valuePropName?: string;
  /** Prop receiving change events (default `onChange`). */
  onChangePropName?: string;
  children:
    | React.ReactNode
    | ((field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode);
};

/**
 * Thin react-hook-form adapter: `useController` + `FormControl` context +
 * ref/value/onChange injection into Kovax field children.
 */
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  disabled,
  isRequired: isRequiredProp,
  valuePropName = "value",
  onChangePropName,
  children,
  isInvalid: isInvalidProp,
  isDisabled: isDisabledProp,
  ...formControlProps
}: ReactHookFormFieldProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
    disabled,
  });

  const invalidFromField = Boolean(fieldState.error);
  const isInvalid = isInvalidProp ?? invalidFromField;
  const isRequired = isRequiredProp ?? inferRequiredFromRules(rules);
  const isDisabled = isDisabledProp ?? Boolean(disabled ?? field.disabled);

  const meta = useMemo(
    (): FormFieldMeta => ({
      name: String(name),
      invalid: isInvalid,
      errorMessage: fieldState.error?.message,
    }),
    [name, isInvalid, fieldState.error?.message],
  );

  const injected = buildFieldInjection(
    {
      name: field.name,
      value: field.value,
      onChange: field.onChange,
      onBlur: field.onBlur,
      ref: field.ref,
      disabled: field.disabled,
    },
    valuePropName,
    onChangePropName,
  );

  const content =
    typeof children === "function"
      ? children(field)
      : injectFieldChildren(children, injected);

  return (
    <FormFieldMetaContext.Provider value={meta}>
      <FormControl
        isInvalid={isInvalid}
        isRequired={isRequired}
        isDisabled={isDisabled}
        {...formControlProps}
      >
        {content}
      </FormControl>
    </FormFieldMetaContext.Provider>
  );
}

FormField.displayName = "FormField";
