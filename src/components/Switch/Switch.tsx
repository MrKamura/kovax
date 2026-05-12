import React from "react";
import { colors, themeToken } from "../theme/tokens";
import type { SwitchProps } from "./Switch.types";
import { getSpacingStyles } from "../../utils/styleUtils";
import { useFormControlContext } from "../Form/FormControlContext";
import { useFocusVisible } from "../../core/hooks/useFocusVisible";

const TRACK = { sm: [36, 20], md: [42, 24], lg: [48, 28] } as const;
const THUMB = { sm: 14, md: 17, lg: 20 } as const;
const PAD = 3;

/**
 * Toggle styled as a switch; native `<input type="checkbox" role="switch">`.
 * `ref` attaches to the native input.
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(props, ref) {
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
    name,
    checked,
    defaultChecked,
    onChange,
    onFocus,
    onBlur,
    value,

    "aria-invalid": ariaInvalidProp,
    "aria-describedby": ariaDescribedBy,

    ...domRest
  } = props;

  const formCtrlCtx = useFormControlContext();
  const isInvalid = isInvalidProp ?? formCtrlCtx?.isInvalid ?? false;
  const isDisabled = Boolean(disabled ?? isDisabledProp ?? formCtrlCtx?.isDisabled ?? false);
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

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(Boolean(defaultChecked));

  React.useEffect(() => {
    if (!isControlled) setInternalChecked(Boolean(defaultChecked));
  }, [defaultChecked, isControlled]);

  const displayChecked = isControlled ? Boolean(checked) : internalChecked;

  const [tw, th] = TRACK[size] ?? TRACK.md;
  const thumb = THUMB[size] ?? THUMB.md;
  const padX = PAD;
  const padY = Math.max(0, (th - thumb) / 2);
  const thumbTravel = Math.max(0, tw - thumb - padX * 2);

  const accent = colors[colorScheme][500];
  const trackIdle = isInvalid ? colors.error[200] : colors.secondary[200];
  const trackOn = isInvalid ? colors.error[500] : accent;
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
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e);
  };

  const trackShadow =
    focusVisible && !isDisabled
      ? `0 0 0 2px ${themeToken("white")}, 0 0 0 4px ${ringOuter}`
      : undefined;

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
      <span
        style={{
          position: "relative",
          width: tw,
          height: th,
          flexShrink: 0,
          borderRadius: themeToken("borderRadius.full"),
          backgroundColor: displayChecked ? trackOn : trackIdle,
          transition: themeToken("transition.default"),
          boxShadow: trackShadow,
          opacity: isDisabled ? 0.55 : 1,
          overflow: "hidden",
        }}
      >
        <input
          ref={assignRef}
          {...domRest}
          id={id}
          type="checkbox"
          role="switch"
          name={name}
          value={value}
          checked={isControlled ? checked : displayChecked}
          disabled={isDisabled}
          required={isRequired}
          aria-checked={displayChecked}
          aria-invalid={ariaInvalidProp === true || isInvalid === true ? true : undefined}
          aria-required={isRequired ? true : undefined}
          aria-describedby={ariaDescribedBy}
          onChange={handleChange}
          onFocus={mergedFocus}
          onBlur={mergedBlur}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            margin: 0,
            opacity: 0,
            cursor: isDisabled ? "not-allowed" : "pointer",
            zIndex: 2,
          }}
        />
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: padY,
            left: padX,
            width: thumb,
            height: thumb,
            borderRadius: themeToken("borderRadius.full"),
            backgroundColor: themeToken("white"),
            boxShadow: themeToken("shadow.sm"),
            transform: `translateX(${displayChecked ? thumbTravel : 0}px)`,
            transition: themeToken("transition.default"),
            pointerEvents: "none",
          }}
        />
      </span>
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

Switch.displayName = "Switch";
