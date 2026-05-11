import React from 'react';
import { render } from '@testing-library/react';
import { getComputedStyleProperty as css } from '../../../test-utils/computedStyle';
import { Separator } from '../Separator';

describe('Separator', () => {
  describe('orientation and size', () => {
    it('renders horizontal separator by default', () => {
      const { container } = render(<Separator />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'width')).toBe('100%');
      expect(css(el, 'height')).toBe('1px');
      expect(css(el, 'background-color')).not.toBe('');
    });

    it('renders vertical separator', () => {
      const { container } = render(<Separator orientation="vertical" />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'width')).toBe('1px');
      expect(css(el, 'min-height')).toBe('1em');
      expect(css(el, 'height')).toBe('auto');
      expect(css(el, 'align-self')).toBe('stretch');
    });

    it('maps numeric size to thickness on horizontal axis', () => {
      const { container } = render(<Separator size={2} />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'height')).toBe('2px');
    });

    it('accepts string size', () => {
      const { container } = render(<Separator size="0.5rem" />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'height')).toBe('0.5rem');
    });

    it('applies size on vertical separator as width', () => {
      const { container } = render(
        <Separator orientation="vertical" size={4} />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'width')).toBe('4px');
      expect(css(el, 'align-self')).toBe('stretch');
      expect(css(el, 'min-height')).toBe('1em');
    });
  });

  describe('color and spacing', () => {
    it('applies background color', () => {
      const { container } = render(<Separator color="rgb(255, 0, 0)" />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'background-color')).toBe('rgb(255, 0, 0)');
    });

    it('maps numeric margin', () => {
      const { container } = render(<Separator margin={16} />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin')).toBe('16px');
    });

    it('accepts string margin', () => {
      const { container } = render(<Separator margin="2rem" />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin')).toBe('2rem');
    });
  });

  describe('style merging and Box props', () => {
    it('merges inline style without dropping layout', () => {
      const { container } = render(
        <Separator style={{ opacity: '0.5', borderRadius: '2px' }} />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'opacity')).toBe('0.5');
      expect(css(el, 'border-radius')).toBe('2px');
      expect(css(el, 'width')).toBe('100%');
    });

    it('accepts spacing props from Box', () => {
      const { container } = render(<Separator m={8} mt={4} />);
      const el = container.firstChild as HTMLElement;
      expect(el).toBeTruthy();
    });
  });
});
