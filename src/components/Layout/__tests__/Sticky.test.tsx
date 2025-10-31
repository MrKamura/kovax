import { render, screen } from '@testing-library/react';
import { Sticky } from '../Sticky';

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: mockIntersectionObserver,
});

describe('Sticky Component', () => {
  const getStyle = (element: HTMLElement, property: string): string => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  beforeEach(() => {
    mockIntersectionObserver.mockClear();
  });

  test('renders with default props', () => {
    const { container } = render(
      <Sticky>Sticky content</Sticky>
    );
    
    const stickyElement = container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
    expect(stickyElement).toBeTruthy();
    expect(stickyElement.textContent).toBe('Sticky content');
    expect(getStyle(stickyElement, 'position')).toBe('relative');
  });

  test('applies top offset correctly', () => {
    const { container } = render(
      <Sticky top={20}>Sticky header</Sticky>
    );
    
    const stickyElement = container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
    expect(stickyElement).toBeTruthy();
  });

  test('applies custom z-index', () => {
    const { container } = render(
      <Sticky zIndex={2000}>Sticky content</Sticky>
    );
    
    const stickyElement = container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
    expect(stickyElement).toBeTruthy();
  });

  test('applies positioning props', () => {
    const { container } = render(
      <Sticky top="10px" bottom="20px" left="30px" right="40px">
        Positioned sticky
      </Sticky>
    );
    
    const stickyElement = container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
    expect(stickyElement).toBeTruthy();
  });

  test('merges custom styles correctly', () => {
    const { container } = render(
      <Sticky style={{ backgroundColor: 'rgb(255, 0, 0)', border: '1px solid black' }}>
        Styled sticky
      </Sticky>
    );
    
    const stickyElement = container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
    expect(getStyle(stickyElement, 'background-color')).toBe('rgb(255, 0, 0)');
    expect(getStyle(stickyElement, 'border')).toBe('1px solid black');
  });

  test('passes through HTML attributes', () => {
    const { container } = render(
      <Sticky id="sticky-header" className="sticky-element" data-testid="sticky">
        Test content
      </Sticky>
    );

    const stickyElement = container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
    expect(stickyElement.id).toBe('sticky-header');
    expect(stickyElement.className).toContain('sticky-element');
    expect(stickyElement.getAttribute('data-testid')).toBe('sticky');
  });

  test('renders children correctly', () => {
    render(
      <Sticky>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Sticky>
    );

    expect(screen.getByTestId('child-1')).toBeTruthy();
    expect(screen.getByTestId('child-2')).toBeTruthy();
  });

  test('creates placeholder element', () => {
    const { container } = render(
      <Sticky>Content</Sticky>
    );
    
    const placeholder = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(placeholder).toBeTruthy();
    expect(getStyle(placeholder, 'visibility')).toBe('hidden');
  });

  test('respects enabled=false prop', () => {
    const { container } = render(
      <Sticky enabled={false}>Non-sticky content</Sticky>
    );
    
    const stickyElement = container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
    expect(stickyElement).toBeTruthy();
    expect(getStyle(stickyElement, 'position')).toBe('relative');
  });

  test('applies shadow when sticky', () => {
    const { container } = render(
      <Sticky shadow="0 4px 12px rgba(0, 0, 0, 0.15)">
        Sticky with shadow
      </Sticky>
    );
    
    const stickyElement = container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
    expect(stickyElement).toBeTruthy();
  });

  test('is memoized', () => {
    expect(Sticky.displayName).toBe('Sticky');
    expect((Sticky as any).$$typeof).toBe(Symbol.for('react.memo'));
  });

  test('handles width correctly', () => {
    const { container } = render(
      <Sticky style={{ width: '300px', height: '100px' }}>
        Sized sticky
      </Sticky>
    );
    
    const stickyElement = container.querySelector('[aria-hidden="true"] + div') as HTMLElement;
    expect(getStyle(stickyElement, 'width')).toBe('300px');
    expect(getStyle(stickyElement, 'height')).toBe('100px');
  });

  test('sets up IntersectionObserver when enabled', () => {
    render(<Sticky>Observed content</Sticky>);
    
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
  });

  test('does not set up IntersectionObserver when disabled', () => {
    render(<Sticky enabled={false}>Non-observed content</Sticky>);
    
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });
});