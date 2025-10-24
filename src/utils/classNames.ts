import { colors, type ColorName, type ColorShade } from '../components/theme/tokens';


export const cn = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(' ').trim();
};


export const getColor = (color: ColorName, shade: ColorShade = 500): string => {
  return colors[color][shade];
};


export const createVariantStyles = (variant: string, color: ColorName) => {
  const colorMap = colors[color];

  return {
    variant,
    color,
    colorMap
  };
};