import React from 'react';
import { render, screen } from '@testing-library/react';
import { getComputedStyleProperty as css } from '../../../test-utils/computedStyle';
import { Sticky } from '../Sticky';

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: mockIntersectionObserver,
});

function getStickySurface(container: HTMLElement) {
  return container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
}

describe('Sticky', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear();
  });

  describe('rendering', () => {
    it('renders children with relative positioning initially', () => {
      const { container } = render(<Sticky>Sticky content</Sticky>);
      const stickyElement = getStickySurface(container);
      expect(stickyElement.textContent).toBe('Sticky content');
      expect(css(stickyElement, 'position')).toBe('relative');
    });

    it('passes top offset into IntersectionObserver rootMargin', () => {
      render(<Sticky top={20}>Sticky header</Sticky>);
      expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
      const options = mockIntersectionObserver.mock.calls[0][1];
      expect(options.rootMargin).toBe('-20px 0px 0px 0px');
    });

    it('merges inline styles on the sticky surface', () => {
      const { container } = render(
        <Sticky style={{ backgroundColor: 'rgb(255, 0, 0)', border: '1px solid black' }}>
          Styled sticky
        </Sticky>
      );
      const stickyElement = getStickySurface(container);
      expect(css(stickyElement, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(css(stickyElement, 'border')).toBe('1px solid black');
    });

    it('forwards HTML attributes to the sticky surface', () => {
      const { container } = render(
        <Sticky id="sticky-header" className="sticky-element" data-testid="sticky">
          Test content
        </Sticky>
      );
      const stickyElement = getStickySurface(container);
      expect(stickyElement.id).toBe('sticky-header');
      expect(stickyElement.className).toContain('sticky-element');
      expect(stickyElement.getAttribute('data-testid')).toBe('sticky');
    });

    it('renders multiple children', () => {
      render(
        <Sticky>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </Sticky>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });

    it('renders a hidden placeholder for layout measurement', () => {
      const { container } = render(<Sticky>Content</Sticky>);
      const placeholder = container.querySelector('[aria-hidden="true"]') as HTMLElement;
      expect(placeholder).toBeTruthy();
      expect(css(placeholder, 'visibility')).toBe('hidden');
    });

    it('stays relative when enabled is false', () => {
      const { container } = render(
        <Sticky enabled={false}>Non-sticky content</Sticky>
      );
      const stickyElement = getStickySurface(container);
      expect(css(stickyElement, 'position')).toBe('relative');
    });

    it('applies width and height from inline styles', () => {
      const { container } = render(
        <Sticky style={{ width: '300px', height: '100px' }}>Sized sticky</Sticky>
      );
      const stickyElement = getStickySurface(container);
      expect(css(stickyElement, 'width')).toBe('300px');
      expect(css(stickyElement, 'height')).toBe('100px');
    });
  });

  describe('IntersectionObserver', () => {
    it('registers an observer when enabled', () => {
      render(<Sticky>Observed content</Sticky>);
      expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    });

    it('does not register an observer when disabled', () => {
      render(<Sticky enabled={false}>Non-observed content</Sticky>);
      expect(mockIntersectionObserver).not.toHaveBeenCalled();
    });
  });

  describe('component metadata', () => {
    it('is wrapped in React.memo with displayName', () => {
      expect(Sticky.displayName).toBe('Sticky');
      expect((Sticky as typeof Sticky & { $$typeof?: symbol }).$$typeof).toBe(
        Symbol.for('react.memo')
      );
    });
  });
});
