import { colors, type ColorName, type ColorShade } from '../tokens';

/**
 * Утилита для создания CSS классов с токенами
 */
export const cn = (...classes: (string | undefined | false | null)[]): string => {
  return classes.filter(Boolean).join(' ').trim();
};

/**
 * Получить цвет из токенов
 */
export const getColor = (color: ColorName, shade: ColorShade = 500): string => {
  return colors[color][shade];
};

/**
 * Создать стили для вариантов
 */
export const createVariantStyles = (variant: string, color: ColorName) => {
  const colorMap = colors[color];
  
  // Здесь можно добавить логику для генерации CSS-in-JS
  // или динамических классов
  return {
    variant,
    color,
    colorMap
  };
};