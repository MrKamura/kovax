import React, { useRef, useEffect, useState } from 'react';

export interface StickyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to stick */
  children?: React.ReactNode;
  /** Offset from top of viewport */
  top?: number | string;
  /** Offset from bottom of viewport */
  bottom?: number | string;
  /** Offset from left edge */
  left?: number | string;
  /** Offset from right edge */
  right?: number | string;
  /** Z-index for stacking */
  zIndex?: number;
  /** Enable/disable sticky behavior */
  enabled?: boolean;
  /** Shadow when sticky */
  shadow?: string;
}

export const Sticky: React.FC<StickyProps> = React.memo(({
  children,
  top = 0,
  bottom,
  left,
  right,
  zIndex = 1000,
  enabled = true,
  shadow,
  style,
  className,
  id,
  ...rest
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const element = elementRef.current;
    const placeholder = placeholderRef.current;
    if (!element || !placeholder) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: `-${top}px 0px 0px 0px`,
        threshold: 0,
      }
    );

    observer.observe(placeholder);

    return () => {
      observer.disconnect();
    };
  }, [enabled, top]);

  const stickyStyle: React.CSSProperties = {
    position: isSticky ? 'fixed' : 'relative',
    ...(isSticky && {
      top: top ?? undefined,
      bottom: bottom ?? undefined,
      left: left ?? undefined,
      right: right ?? undefined,
      zIndex,
      boxShadow: shadow || (isSticky ? '0 2px 8px rgba(0, 0, 0, 0.1)' : undefined),
    }),
    width: isSticky ? (placeholderRef.current?.offsetWidth || 'auto') : '100%',
    ...style,
  };

  const placeholderStyle: React.CSSProperties = {
    height: isSticky ? elementRef.current?.offsetHeight : 0,
    visibility: 'hidden',
  };

  return (
    <>
      <div
        ref={placeholderRef}
        style={placeholderStyle}
        aria-hidden="true"
      />
      <div
        ref={elementRef}
        className={className}
        id={id}
        style={stickyStyle}
        {...rest}
      >
        {children}
      </div>
    </>
  );
});

Sticky.displayName = 'Sticky';