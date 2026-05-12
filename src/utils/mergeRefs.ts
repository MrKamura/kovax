import type { MutableRefObject, Ref, RefCallback } from "react";

/** Merges multiple refs into one callback ref (common for triggers / composed components). */
export function mergeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): RefCallback<T | null> {
  return (node) => {
    refs.forEach((r) => {
      if (r == null) return;
      if (typeof r === "function") (r as RefCallback<T | null>)(node);
      else (r as MutableRefObject<T | null>).current = node;
    });
  };
}
