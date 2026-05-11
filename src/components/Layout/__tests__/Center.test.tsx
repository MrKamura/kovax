import React from 'react';
import { render, screen } from '@testing-library/react';
import { getComputedStyleProperty as css } from '../../../test-utils/computedStyle';
import { Center } from '../Center';

describe('Center', () => {
  describe('layout', () => {
    it('uses flexbox centering by default', () => {
      const { container } = render(<Center />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'display')).toBe('flex');
      expect(css(el, 'justify-content')).toBe('center');
      expect(css(el, 'align-items')).toBe('center');
    });

    it('centers horizontally only when vertical is false', () => {
      const { container } = render(
        <Center horizontal vertical={false} center={false} />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'justify-content')).toBe('center');
      expect(css(el, 'align-items')).not.toBe('center');
    });

    it('centers vertically only when horizontal is false', () => {
      const { container } = render(
        <Center horizontal={false} vertical center={false} />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'justify-content')).not.toBe('center');
      expect(css(el, 'align-items')).toBe('center');
    });

    it('uses inline-flex when inline is true', () => {
      const { container } = render(<Center inline />);
      expect(css(container.firstChild as HTMLElement, 'display')).toBe('inline-flex');
    });

    it('applies min/max dimensions', () => {
      const { container } = render(
        <Center minW="100px" minH="200px" maxW="300px" maxH="400px" />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'min-width')).toBe('100px');
      expect(css(el, 'min-height')).toBe('200px');
      expect(css(el, 'max-width')).toBe('300px');
      expect(css(el, 'max-height')).toBe('400px');
    });

    it('merges custom styles', () => {
      const { container } = render(
        <Center style={{ backgroundColor: 'rgb(255, 0, 0)', padding: '20px' }} />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(css(el, 'padding')).toBe('20px');
      expect(css(el, 'display')).toBe('flex');
    });

    it('honors center prop over horizontal/vertical when center is true', () => {
      const { container } = render(
        <Center horizontal={false} vertical={false} center />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'justify-content')).toBe('center');
      expect(css(el, 'align-items')).toBe('center');
    });

    it('applies width and height aliases', () => {
      const { container } = render(<Center width="50%" height="100px" />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'width')).toBe('50%');
      expect(css(el, 'height')).toBe('100px');
    });
  });

  describe('composition', () => {
    it('forwards Box spacing props', () => {
      render(
        <Center p={16} m={8} backgroundColor="blue">
          <div>Test content</div>
        </Center>
      );
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders children', () => {
      render(
        <Center>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </Center>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });
});
