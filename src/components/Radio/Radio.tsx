import React from "react";
import { colors, themeToken } from "../theme/tokens";
import type { RadioProps } from "./Radio.types";
import { getSpacingStyles } from "../../utils/styleUtils";
import { useFormControlContext } from "../Form/FormControlContext";
import { useRadioGroupContext } from "./RadioGroupContext";
import { useFocusVisible } from "../../core/hooks/useFocusVisible";

const DIM = { sm: 16, md: 18, lg: 22 } as const;

/**
 * Radio button; use inside `RadioGroup` for shared name/state, or standalone with `name` + `checked`/`onChange`.
 * `ref` attaches to the native `<input type="radio">`.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const {
    w, h, minW, maxW, minH, maxH,
    m, mt, mr, mb, ml,
    p, pt, pr, pb, pl,
    flex, flexGrow, flexShrink, flexBasis,
    display, position, top, right, bottom, left,
    textAlign,
    className,
    style,

    size = "md",
    colorScheme = "primary",
    isInvalid: isInvalidProp,
    isDisabled: isDisabledProp,
    isRequired: isRequiredProp,
    children,

    disabled,
    required,
    id,
    name: nameProp,
    value,
    checked,
    defaultChecked,
    onChange,
    onFocus,
    onBlur,

    "aria-invalid": ariaInvalidProp,
    "aria-describedby": ariaDescribedBy,

    ...domRest
  } = props;

  const ctx = useRadioGroupContext();
  const formCtrlCtx = useFormControlContext();

  const isInvalid = isInvalidProp ?? formCtrlCtx?.isInvalid ?? false;
  const isDisabled = Boolean(
    disabled ?? isDisabledProp ?? ctx?.isDisabled ?? formCtrlCtx?.isDisabled ?? false,
  );
  const isRequired = Boolean(required ?? isRequiredProp ?? formCtrlCtx?.isRequired ?? false);

  const spacingStyles = getSpacingStyles({
    w, h, minW, maxW, minH, maxH,
    m, mt, mr, mb, ml,
    p, pt, pr, pb, pl,
    flex, flexGrow, flexShrink, flexBasis,
    display, position, top, right, bottom, left,
    textAlign,
    style,
  });

  const name = ctx?.name ?? nameProp ?? "";

  const inGroup = ctx !== null;
  const isControlledStandalone = !inGroup && checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(Boolean(defaultChecked));

  React.useEffect(() => {
    if (!inGroup && !isControlledStandalone) setInternalChecked(Boolean(defaultChecked));
  }, [defaultChecked, inGroup, isControlledStandalone]);

  const displayChecked = inGroup
    ? ctx.value === value
    : isControlledStandalone
      ? Boolean(checked)
      : internalChecked;

  const dim = DIM[size] ?? DIM.md;
  const accent = colors[colorScheme][500];
  const idleBorder = isInvalid ? colors.error[500] : colors.secondary[300];

  const ringOuter = isInvalid ? colors.error[500] : accent;

  const { focusVisible, onFocus: fvFocus, onBlur: fvBlur } = useFocusVisible<HTMLInputElement>(isDisabled);

  const assignRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [ref],
  );

  const mergedFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    fvFocus(e);
    onFocus?.(e);
  };

  const mergedBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    fvBlur();
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inGroup) ctx.setValue(value);
    else if (!isControlledStandalone) setInternalChecked(e.target.checked);
    onChange?.(e);
  };

  const boxShadowRing =
    focusVisible && !isDisabled
      ? `0 0 0 2px ${themeToken("white")}, 0 0 0 4px ${ringOuter}`
      : undefined;

  const inputStyle: React.CSSProperties = {
    appearance: "none",
    WebkitAppearance: "none",
    margin: 0,
    width: dim,
    height: dim,
    flexShrink: 0,
    borderRadius: themeToken("borderRadius.full"),
    border: `2px solid ${displayChecked ? accent : idleBorder}`,
    backgroundColor: themeToken("white"),
    backgroundImage: displayChecked
      ? `radial-gradient(circle, ${accent} 45%, transparent 46%)`
      : undefined,
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.55 : 1,
    transition: themeToken("transition.default"),
    outline: "none",
    boxShadow: boxShadowRing,
  };

  return (
    <label
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: themeToken("spacing.sm"),
        cursor: isDisabled ? "not-allowed" : "pointer",
        ...spacingStyles,
      }}
    >
      <input
        ref={assignRef}
        {...domRest}
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={displayChecked}
        disabled={isDisabled}
        required={isRequired}
        aria-invalid={ariaInvalidProp === true || isInvalid === true ? true : undefined}
        aria-required={isRequired ? true : undefined}
        aria-describedby={ariaDescribedBy}
        onChange={handleChange}
        onFocus={mergedFocus}
        onBlur={mergedBlur}
        style={inputStyle}
      />
      {children ?
        <span
          style={{
            fontSize: themeToken("text.sm"),
            color: isInvalid ? colors.error[700] : colors.secondary[800],
            userSelect: "none",
          }}
        >
          {children}
        </span>
      : null}
    </label>
  );
});

Radio.displayName = "Radio";
