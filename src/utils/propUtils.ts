import { ButtonStyleProps } from '../components/Button/Button.types';

export const extractStyleProps = (props: any): ButtonStyleProps & { disabled?: boolean } => {
  const {
    variant,
    color,
    size,
    shadow,
    w,
    h,
    bg,
    textColor,
    borderRadius,
    borderColor,
    disabled,
  } = props;

  return {
    variant,
    color,
    size,
    shadow,
    w,
    h,
    bg,
    textColor,
    borderRadius,
    borderColor,
    disabled,
  };
};