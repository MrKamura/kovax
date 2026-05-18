import { useCallback, useSyncExternalStore } from "react";
import type { BreakpointKey } from "./tokens";
import { breakpointMinMediaQuery } from "./mediaQuery";

export type UseMediaQueryOptions = {
  /**
   * Value during SSR and before the client reads `matchMedia`
   * (`getServerSnapshot`). Use `true` for desktop-first layouts to reduce
   * hydration mismatch warnings when the viewport is wide.
   */
  defaultMatches?: boolean;
};

export function useMediaQuery(query: string, options?: UseMediaQueryOptions): boolean {
  const defaultMatches = options?.defaultMatches ?? false;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return () => undefined;
      }
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => {
        mql.removeEventListener("change", onStoreChange);
      };
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return defaultMatches;
    }
    return window.matchMedia(query).matches;
  }, [query, defaultMatches]);

  const getServerSnapshot = useCallback(() => defaultMatches, [defaultMatches]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** `true` when the viewport is at least the given token breakpoint (`min-width`). */
export function useBreakpointUp(key: BreakpointKey, options?: UseMediaQueryOptions): boolean {
  return useMediaQuery(breakpointMinMediaQuery(key), options);
}
