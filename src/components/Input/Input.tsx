
import { colors, shadows, sizes, transitions } from "../theme/tokens";
import { InputProps } from "./Input.types";

/**
 * Kovax Input v0.1
 */
export const Input: React.FC<InputProps> = ({
  size = 'md',
  colorScheme = 'primary',
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
  ...props
}) => {
  const sizeStyles = {
    sm: { padding: `${sizes.spacing.xs} ${sizes.spacing.sm}`, fontSize: sizes.text.sm },
    md: { padding: `${sizes.spacing.sm} ${sizes.spacing.md}`, fontSize: sizes.text.base },
    lg: { padding: `${sizes.spacing.md} ${sizes.spacing.lg}`, fontSize: sizes.text.lg },
  };

  const baseColor = colors[colorScheme][500];
  const borderColor = isInvalid ? colors.error[500] : baseColor;
  const background = isDisabled ? colors.secondary[100] : 'white';
  const opacity = isDisabled ? 0.6 : 1;

  return (
    <input
      {...props}
      required={isRequired}
      readOnly={isReadOnly}
      disabled={isDisabled}
      style={{
        ...sizeStyles[size],
        borderRadius: sizes.borderRadius.md,
        border: `1px solid ${borderColor}`,
        background,
        boxShadow: shadows.sm,
        opacity,
        transition: transitions.default,
        outline: isInvalid ? `2px solid ${colors.error[300]}` : 'none',
      }}
    />
  );
};

Input.displayName = "Input";