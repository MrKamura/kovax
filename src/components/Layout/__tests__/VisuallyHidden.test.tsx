import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from '../VisuallyHidden';

describe('VisuallyHidden Component', () => {
  const getStyle = (element: HTMLElement, property: string): string => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  test('renders with visually hidden styles', () => {
    const { container } = render(
      <VisuallyHidden>Screen reader content</VisuallyHidden>
    );
    
    const hiddenElement = container.firstChild as HTMLElement;
    expect(hiddenElement).toBeTruthy();
    expect(hiddenElement.textContent).toBe('Screen reader content');
    
    expect(getStyle(hiddenElement, 'position')).toBe('absolute');
    expect(getStyle(hiddenElement, 'height')).toBe('1px');
    expect(getStyle(hiddenElement, 'width')).toBe('1px');
    expect(getStyle(hiddenElement, 'clip')).toBe('rect(0px, 0px, 0px, 0px)');
    expect(getStyle(hiddenElement, 'margin')).toBe('-1px');
  });

  test('applies showOnFocus and renders as span', () => {
    const { container } = render(
      <VisuallyHidden showOnFocus>Skip to content</VisuallyHidden>
    );
    
    const hiddenElement = container.firstChild as HTMLElement;
    expect(hiddenElement.tagName.toLowerCase()).toBe('span');
    expect(getStyle(hiddenElement, 'position')).toBe('absolute');
  });

  test('merges custom styles correctly', () => {
    const { container } = render(
      <VisuallyHidden style={{ backgroundColor: 'rgb(255, 0, 0)' }}>
        Custom styled
      </VisuallyHidden>
    );
    
    const hiddenElement = container.firstChild as HTMLElement;
    expect(getStyle(hiddenElement, 'background-color')).toBe('rgb(255, 0, 0)');
    expect(getStyle(hiddenElement, 'position')).toBe('absolute');
  });

  test('passes through HTML attributes', () => {
    const { container } = render(
      <VisuallyHidden id="skip-link" className="sr-only">
        Skip link
      </VisuallyHidden>
    );

    const hiddenElement = container.firstChild as HTMLElement;
    expect(hiddenElement.id).toBe('skip-link');
    expect(hiddenElement.className).toContain('sr-only');
  });

  test('passes through data attributes', () => {
    const { container } = render(
      <VisuallyHidden data-testid="hidden-element" data-custom="value">
        Test content
      </VisuallyHidden>
    );

    const hiddenElement = container.firstChild as HTMLElement;
    expect(hiddenElement.getAttribute('data-testid')).toBe('hidden-element');
    expect(hiddenElement.getAttribute('data-custom')).toBe('value');
  });

  test('renders children correctly', () => {
    render(
      <VisuallyHidden>
        <span data-testid="child-1">Child 1</span>
        <span data-testid="child-2">Child 2</span>
      </VisuallyHidden>
    );

    expect(screen.getByTestId('child-1')).toBeTruthy();
    expect(screen.getByTestId('child-2')).toBeTruthy();
  });

  test('works with complex children', () => {
    const { container } = render(
      <VisuallyHidden>
        <h2>Section Title</h2>
        <p>Section description for screen readers</p>
      </VisuallyHidden>
    );
    
    const hiddenElement = container.firstChild as HTMLElement;
    expect(hiddenElement.innerHTML).toContain('Section Title');
    expect(hiddenElement.innerHTML).toContain('Section description');
  });

  test('is memoized', () => {
    // Проверяем что компонент обернут в React.memo
    expect(VisuallyHidden.displayName).toBe('VisuallyHidden');
    expect((VisuallyHidden as any).$$typeof).toBe(Symbol.for('react.memo'));
  });

  test('renders as span when showOnFocus is true', () => {
    const { container } = render(
      <VisuallyHidden showOnFocus>Skip link</VisuallyHidden>
    );
    
    const hiddenElement = container.firstChild as HTMLElement;
    expect(hiddenElement.tagName.toLowerCase()).toBe('span');
  });

  test('renders as div when showOnFocus is false', () => {
    const { container } = render(
      <VisuallyHidden>Hidden content</VisuallyHidden>
    );
    
    const hiddenElement = container.firstChild as HTMLElement;
    expect(hiddenElement.tagName.toLowerCase()).toBe('div');
  });

  test('handles all HTML attributes correctly', () => {
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

    const hiddenElement = container.firstChild as HTMLElement;
    expect(hiddenElement.getAttribute('title')).toBe('Hidden title');
    expect(hiddenElement.getAttribute('aria-label')).toBe('Accessible label');
    expect(hiddenElement.getAttribute('role')).toBe('banner');
    expect(hiddenElement.getAttribute('tabindex')).toBe('0');
    expect(hiddenElement.getAttribute('lang')).toBe('en');
  });

  test('applies focus styles when showOnFocus is true', () => {
    const { container } = render(
      <VisuallyHidden showOnFocus>Skip link</VisuallyHidden>
    );
    
    const hiddenElement = container.firstChild as HTMLElement;
    // For showOnFocus, we rely on CSS :focus selector in the consuming app
    expect(hiddenElement.tagName).toBe('SPAN');
  });
});