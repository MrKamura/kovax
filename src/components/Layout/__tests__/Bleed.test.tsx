import React from 'react';
import { render, screen } from '@testing-library/react';
import { getComputedStyleProperty as css } from '../../../test-utils/computedStyle';
import { Bleed } from '../Bleed';

describe('Bleed', () => {
  describe('negative margin (bleed)', () => {
    it('renders children without bleed by default', () => {
      const { container } = render(<Bleed>Test content</Bleed>);
      const el = container.firstChild as HTMLElement;
      expect(el).toBeTruthy();
      expect(el.textContent).toBe('Test content');
    });

    it('applies all sides via numeric all', () => {
      const { container } = render(<Bleed all={16}>Content</Bleed>);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin')).toBe('-16px');
    });

    it('applies all sides via string all', () => {
      const { container } = render(<Bleed all="2rem">Content</Bleed>);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin')).toBe('-2rem');
    });

    it('applies horizontal axis', () => {
      const { container } = render(<Bleed horizontal={24}>Content</Bleed>);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin-left')).toBe('-24px');
      expect(css(el, 'margin-right')).toBe('-24px');
    });

    it('applies vertical axis', () => {
      const { container } = render(<Bleed vertical={8}>Content</Bleed>);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin-top')).toBe('-8px');
      expect(css(el, 'margin-bottom')).toBe('-8px');
    });

    it('applies per-side values', () => {
      const { container } = render(
        <Bleed top={10} right={20} bottom={30} left={40}>
          Content
        </Bleed>
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin-top')).toBe('-10px');
      expect(css(el, 'margin-right')).toBe('-20px');
      expect(css(el, 'margin-bottom')).toBe('-30px');
      expect(css(el, 'margin-left')).toBe('-40px');
    });

    it('prefers explicit sides over all/axis shorthands', () => {
      const { container } = render(
        <Bleed all={16} top={8} left={12}>
          Content
        </Bleed>
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin-top')).toBe('-8px');
      expect(css(el, 'margin-left')).toBe('-12px');
    });
  });

  describe('style merging and layout', () => {
    it('merges inline styles', () => {
      const { container } = render(
        <Bleed
          all={16}
          style={{ backgroundColor: 'rgb(255, 0, 0)', padding: '20px' }}
        >
          Content
        </Bleed>
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin')).toBe('-16px');
      expect(css(el, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(css(el, 'padding')).toBe('20px');
    });

    it('forwards Box spacing props and renders children', () => {
      render(
        <Bleed all={16} p={8} m={4} backgroundColor="blue">
          <div>Test content</div>
        </Bleed>
      );
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      render(
        <Bleed all={16}>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </Bleed>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });

    it('applies width and height with horizontal bleed', () => {
      const { container } = render(
        <Bleed horizontal={16} width="100%" height="200px" />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'width')).toBe('100%');
      expect(css(el, 'height')).toBe('200px');
      expect(css(el, 'margin-left')).toBe('-16px');
      expect(css(el, 'margin-right')).toBe('-16px');
    });
  });
});
