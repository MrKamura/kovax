import { useCallback, useState } from "react";

/**
 * Tracks `:focus-visible` on a native control after focus for keyboard-style rings.
 */
export function useFocusVisible<E extends HTMLElement>(isDisabled?: boolean) {
  const [focusVisible, setFocusVisible] = useState(false);

  const onFocus = useCallback(
    (e: React.FocusEvent<E>) => {
      if (isDisabled) return;
      const el = e.currentTarget;
      queueMicrotask(() => {
        if (document.activeElement === el && el.matches(":focus-visible")) {
          setFocusVisible(true);
        } else {
          setFocusVisible(false);
        }
      });
    },
    [isDisabled],
  );

  const onBlur = useCallback(() => {
    setFocusVisible(false);
  }, []);

  return { focusVisible, onFocus, onBlur };
}
