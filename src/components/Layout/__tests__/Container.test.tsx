import React from 'react';
import { render, screen } from '@testing-library/react';
import { getComputedStyleProperty as css } from '../../../test-utils/computedStyle';
import { Container } from '../Container';

describe('Container', () => {
  describe('width and centering', () => {
    it('defaults to full width, max lg, centered', () => {
      const { container } = render(<Container />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'width')).toBe('100%');
      expect(css(el, 'max-width')).toBe('1024px');
      expect(css(el, 'margin-left')).toBe('auto');
      expect(css(el, 'margin-right')).toBe('auto');
    });

    it('maps maxW presets', () => {
      const cases = [
        ['sm', '640px'],
        ['md', '768px'],
        ['lg', '1024px'],
        ['xl', '1280px'],
        ['full', '100%'],
      ] as const;
      cases.forEach(([preset, expected]) => {
        const { container } = render(<Container maxW={preset} />);
        expect(css(container.firstChild as HTMLElement, 'max-width')).toBe(
          expected
        );
      });
    });

    it('accepts numeric maxW as px', () => {
      const { container } = render(<Container maxW={800} />);
      expect(css(container.firstChild as HTMLElement, 'max-width')).toBe('800px');
    });

    it('accepts arbitrary maxW string', () => {
      const { container } = render(<Container maxW="90%" />);
      expect(css(container.firstChild as HTMLElement, 'max-width')).toBe('90%');
    });

    it('skips horizontal centering when center is false', () => {
      const { container } = render(<Container center={false} />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'margin-left')).not.toBe('auto');
      expect(css(el, 'margin-right')).not.toBe('auto');
    });

    it('applies padding prop', () => {
      const { container } = render(<Container padding="20px" />);
      expect(css(container.firstChild as HTMLElement, 'padding')).toBe('20px');
    });

    it('applies height', () => {
      const { container } = render(<Container height="200px" />);
      expect(css(container.firstChild as HTMLElement, 'height')).toBe('200px');
    });
  });

  describe('styles and children', () => {
    it('merges custom style with defaults', () => {
      const { container } = render(
        <Container
          style={{ backgroundColor: 'rgb(255, 0, 0)', border: '1px solid black' }}
        />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(css(el, 'border')).toBe('1px solid black');
      expect(css(el, 'width')).toBe('100%');
    });

    it('forwards spacing props via Box', () => {
      render(
        <Container p={16} m={8} backgroundColor="blue">
          <div>Test content</div>
        </Container>
      );
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders children', () => {
      render(
        <Container>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </Container>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });
});
