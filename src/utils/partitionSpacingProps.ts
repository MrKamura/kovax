import type { SpacingProps } from '../types/spacing';
import { SPACING_STYLE_PROP_KEYS } from '../types/spacingKeys';

/**
 * Splits props into style-system (SpacingProps subset) vs everything else for the DOM.
 */
export function partitionSpacingProps(props: object): [Partial<SpacingProps>, Record<string, unknown>] {
  const spacing: Record<string, unknown> = {};
  const dom: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (SPACING_STYLE_PROP_KEYS.has(key)) {
      spacing[key] = value;
    } else {
      dom[key] = value;
    }
  }

  return [spacing as Partial<SpacingProps>, dom];
}
