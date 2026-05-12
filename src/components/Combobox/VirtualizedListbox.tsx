import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { VirtualizedListboxHandle } from "./Combobox.types";

export interface VirtualizedListboxProps {
  /** Number of rows (options). */
  rowCount: number;
  rowHeight: number;
  /** Visible viewport height of the scroll container (px). */
  height: number;
  overscan?: number;
  children: (info: { index: number }) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Fixed-row-height virtual scroll container for combobox option lists.
 * Imperative {@link VirtualizedListboxHandle.scrollToIndex} aligns with `useCombobox` `scrollContainerRef`.
 */
export const VirtualizedListbox = React.forwardRef<
  VirtualizedListboxHandle,
  VirtualizedListboxProps
>(function VirtualizedListbox(
  {
    rowCount,
    rowHeight,
    height,
    overscan = 6,
    children,
    className,
    style,
  },
  ref,
) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = Math.max(0, rowCount * rowHeight);

  const start =
    rowCount === 0 ? 0 : Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const end =
    rowCount === 0 ?
      -1
    : Math.min(rowCount - 1, Math.ceil((scrollTop + height) / rowHeight) - 1 + overscan);

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = outerRef.current;
      if (!el || rowCount === 0) return;
      const i = Math.max(0, Math.min(index, rowCount - 1));
      const top = i * rowHeight;
      const bottom = top + rowHeight;
      const viewTop = el.scrollTop;
      const viewBottom = viewTop + height;
      if (top < viewTop) el.scrollTop = top;
      else if (bottom > viewBottom) el.scrollTop = bottom - height;
    },
    [height, rowCount, rowHeight],
  );

  useImperativeHandle(ref, () => ({ scrollToIndex }), [scrollToIndex]);

  const rows: React.ReactNode[] = [];
  if (rowCount > 0 && end >= start) {
    for (let i = start; i <= end; i++) {
      rows.push(
        <div
          key={i}
          style={{
            position: "absolute",
            top: i * rowHeight,
            left: 0,
            right: 0,
            height: rowHeight,
            boxSizing: "border-box",
          }}
        >
          {children({ index: i })}
        </div>,
      );
    }
  }

  return (
    <div
      ref={outerRef}
      className={className}
      style={{
        height,
        overflow: "auto",
        position: "relative",
        ...style,
      }}
      onScroll={onScroll}
    >
      <div style={{ height: totalHeight, position: "relative", width: "100%" }}>{rows}</div>
    </div>
  );
});

VirtualizedListbox.displayName = "VirtualizedListbox";
