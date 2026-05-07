import React from 'react';
import type { BoxProps } from './Box.types';
import { getSpacingStyles } from '../../utils/styleUtils';
import { partitionSpacingProps } from '../../utils/partitionSpacingProps';

/**
 * Box — polymorphic layout primitive: spacing props become CSS; everything else is passed to the host element.
 */
function BoxInner(props: BoxProps, ref: React.Ref<Element>) {
  const {
    as: Tag = 'div',
    children,
    className = '',
    style,
    ...rest
  } = props;

  const [spacingBag, domProps] = partitionSpacingProps(rest);
  const spacingStyles = getSpacingStyles(spacingBag);

  const elementProps: Record<string, unknown> = {
    ...domProps,
    ref,
    className,
    style: { ...spacingStyles, ...style },
  };

  if (Tag === 'button' && elementProps.type === undefined) {
    elementProps.type = 'button';
  }

  return React.createElement(Tag as React.ElementType, elementProps, children);
}

export const Box = React.forwardRef(BoxInner);
Box.displayName = 'Box';

export default Box;

export type { BoxProps, BaseBoxProps, BoxAsProp } from './Box.types';
