import React from 'react';
import { SpacingProps } from '../../types/spacing';
import { getSpacingStyles } from '../../utils/styleUtils';

// Базовые пропсы, общие для всех элементов
interface BaseBoxProps extends SpacingProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  id?: string;
  title?: string;
  role?: string;
  tabIndex?: number;
}

// Условные типы для разных HTML элементов
export type BoxProps = BaseBoxProps & {
  as?: 'div';
} | BaseBoxProps & {
  as: 'a';
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
} | BaseBoxProps & {
  as: 'button';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  form?: string;
} | BaseBoxProps & {
  as: 'input';
  type?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
} | BaseBoxProps & {
  as: 'form';
  action?: string;
  method?: string;
  encType?: string;
} | BaseBoxProps & {
  as: 'label';
  htmlFor?: string;
} | BaseBoxProps & {
  as: 'img';
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
} | BaseBoxProps & {
  as: 'textarea';
  rows?: number;
  cols?: number;
  placeholder?: string;
  value?: string;
} | BaseBoxProps & {
  as: 'select';
  value?: string;
  multiple?: boolean;
} | BaseBoxProps & {
  as: 'option';
  value?: string;
  selected?: boolean;
};

/**
 * Box - foundational layout component with full spacing control
 */
export const Box: React.FC<BoxProps> = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    id,
    title,
    role,
    tabIndex,
    ...spacingProps
  } = props;

  const spacingStyles = getSpacingStyles(spacingProps as SpacingProps);
  
  // Создаем элемент с правильными пропсами
  const elementProps: any = {
    className,
    style: spacingStyles,
    onClick,
    onMouseEnter,
    onMouseLeave,
    id,
    title,
    role,
    tabIndex,
  };

  // Добавляем специфичные атрибуты в зависимости от типа элемента
  if (as === 'a') {
    elementProps.href = (props as any).href;
    elementProps.target = (props as any).target;
    elementProps.rel = (props as any).rel;
    elementProps.download = (props as any).download;
  } else if (as === 'button') {
    elementProps.type = (props as any).type || 'button';
    elementProps.disabled = (props as any).disabled;
    elementProps.form = (props as any).form;
  } else if (as === 'input') {
    elementProps.type = (props as any).type;
    elementProps.value = (props as any).value;
    elementProps.placeholder = (props as any).placeholder;
    elementProps.required = (props as any).required;
    elementProps.readOnly = (props as any).readOnly;
  } else if (as === 'form') {
    elementProps.action = (props as any).action;
    elementProps.method = (props as any).method;
    elementProps.encType = (props as any).encType;
  } else if (as === 'label') {
    elementProps.htmlFor = (props as any).htmlFor;
  } else if (as === 'img') {
    elementProps.src = (props as any).src;
    elementProps.alt = (props as any).alt;
    elementProps.width = (props as any).width;
    elementProps.height = (props as any).height;
  } else if (as === 'textarea') {
    elementProps.rows = (props as any).rows;
    elementProps.cols = (props as any).cols;
    elementProps.placeholder = (props as any).placeholder;
    elementProps.value = (props as any).value;
  } else if (as === 'select') {
    elementProps.value = (props as any).value;
    elementProps.multiple = (props as any).multiple;
  } else if (as === 'option') {
    elementProps.value = (props as any).value;
    elementProps.selected = (props as any).selected;
  }

  const Component = as as React.ElementType;

  return React.createElement(Component, elementProps, children);
};

export default Box;