import { render, screen } from '@testing-library/react';
import { getComputedStyleProperty as css } from '../../../test-utils/computedStyle';
import { VisuallyHidden } from '../VisuallyHidden';

describe('VisuallyHidden', () => {
  describe('visibility styles', () => {
    it('hides content visually while keeping it in the tree', () => {
      const { container } = render(
        <VisuallyHidden>Screen reader content</VisuallyHidden>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.textContent).toBe('Screen reader content');
      expect(css(el, 'position')).toBe('absolute');
      expect(css(el, 'height')).toBe('1px');
      expect(css(el, 'width')).toBe('1px');
      expect(css(el, 'clip')).toBe('rect(0px, 0px, 0px, 0px)');
      expect(css(el, 'margin')).toBe('-1px');
    });

    it('merges inline styles', () => {
      const { container } = render(
        <VisuallyHidden style={{ backgroundColor: 'rgb(255, 0, 0)' }}>
          Custom styled
        </VisuallyHidden>
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(css(el, 'position')).toBe('absolute');
    });
  });

  describe('showOnFocus', () => {
    it('renders a span with absolute positioning', () => {
      const { container } = render(
        <VisuallyHidden showOnFocus>Skip to content</VisuallyHidden>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.tagName.toLowerCase()).toBe('span');
      expect(css(el, 'position')).toBe('absolute');
    });
  });

  describe('default element', () => {
    it('renders a div when showOnFocus is false', () => {
      const { container } = render(
        <VisuallyHidden>Hidden content</VisuallyHidden>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('attributes and children', () => {
    it('forwards id and className', () => {
      const { container } = render(
        <VisuallyHidden id="skip-link" className="sr-only">
          Skip link
        </VisuallyHidden>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.id).toBe('skip-link');
      expect(el.className).toContain('sr-only');
    });

    it('forwards data attributes', () => {
      const { container } = render(
        <VisuallyHidden data-testid="hidden-element" data-custom="value">
          Test content
        </VisuallyHidden>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.getAttribute('data-testid')).toBe('hidden-element');
      expect(el.getAttribute('data-custom')).toBe('value');
    });

    it('renders nested children', () => {
      render(
        <VisuallyHidden>
          <span data-testid="child-1">Child 1</span>
          <span data-testid="child-2">Child 2</span>
        </VisuallyHidden>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });

    it('supports richer child markup', () => {
      const { container } = render(
        <VisuallyHidden>
          <h2>Section Title</h2>
          <p>Section description for screen readers</p>
        </VisuallyHidden>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.innerHTML).toContain('Section Title');
      expect(el.innerHTML).toContain('Section description');
    });

    it('forwards common global HTML attributes', () => {
      const { container } = render(
        <VisuallyHidden
          title="Hidden title"
          aria-label="Accessible label"
          role="banner"
          tabIndex={0}
          lang="en"
        >
          Content with HTML attributes
        </VisuallyHidden>
      );
      const el = container.firstChild as HTMLElement;
      expect(el.getAttribute('title')).toBe('Hidden title');
      expect(el.getAttribute('aria-label')).toBe('Accessible label');
      expect(el.getAttribute('role')).toBe('banner');
      expect(el.getAttribute('tabindex')).toBe('0');
      expect(el.getAttribute('lang')).toBe('en');
    });
  });

  describe('component metadata', () => {
    it('is wrapped in React.memo with displayName', () => {
      expect(VisuallyHidden.displayName).toBe('VisuallyHidden');
      expect(
        (VisuallyHidden as typeof VisuallyHidden & { $$typeof?: symbol }).$$typeof
      ).toBe(Symbol.for('react.memo'));
    });
  });
});
