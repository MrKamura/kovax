// Container.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from '../Container';

describe('Container Component', () => {
  const getStyle = (element: HTMLElement, property: string): string => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  test('renders with default container styles', () => {
    const { container } = render(<Container />);
    
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toBeTruthy();
    
    expect(getStyle(containerElement, 'width')).toBe('100%');
    expect(getStyle(containerElement, 'max-width')).toBe('1024px');
    expect(getStyle(containerElement, 'margin-left')).toBe('auto');
    expect(getStyle(containerElement, 'margin-right')).toBe('auto');
  });

  test('applies maxW presets correctly', () => {
    const { container: smContainer } = render(<Container maxW="sm" />);
    expect(getStyle(smContainer.firstChild as HTMLElement, 'max-width')).toBe('640px');

    const { container: mdContainer } = render(<Container maxW="md" />);
    expect(getStyle(mdContainer.firstChild as HTMLElement, 'max-width')).toBe('768px');

    const { container: lgContainer } = render(<Container maxW="lg" />);
    expect(getStyle(lgContainer.firstChild as HTMLElement, 'max-width')).toBe('1024px');

    const { container: xlContainer } = render(<Container maxW="xl" />);
    expect(getStyle(xlContainer.firstChild as HTMLElement, 'max-width')).toBe('1280px');

    const { container: fullContainer } = render(<Container maxW="full" />);
    expect(getStyle(fullContainer.firstChild as HTMLElement, 'max-width')).toBe('100%');
  });

  test('applies numeric maxW correctly', () => {
    const { container } = render(<Container maxW={800} />);
    
    const containerElement = container.firstChild as HTMLElement;
    expect(getStyle(containerElement, 'max-width')).toBe('800px');
  });

  test('applies string maxW correctly', () => {
    const { container } = render(<Container maxW="90%" />);
    
    const containerElement = container.firstChild as HTMLElement;
    expect(getStyle(containerElement, 'max-width')).toBe('90%');
  });

  test('disables centering when center is false', () => {
    const { container } = render(<Container center={false} />);
    
    const containerElement = container.firstChild as HTMLElement;
    expect(getStyle(containerElement, 'margin-left')).not.toBe('auto');
    expect(getStyle(containerElement, 'margin-right')).not.toBe('auto');
  });

  test('applies padding correctly', () => {
    const { container } = render(<Container padding="20px" />);
    
    const containerElement = container.firstChild as HTMLElement;
    expect(getStyle(containerElement, 'padding')).toBe('20px');
  });

  test('merges custom styles correctly', () => {
    const { container } = render(
      <Container style={{ backgroundColor: 'rgb(255, 0, 0)', border: '1px solid black' }} />
    );
    
    const containerElement = container.firstChild as HTMLElement;
    expect(getStyle(containerElement, 'background-color')).toBe('rgb(255, 0, 0)');
    expect(getStyle(containerElement, 'border')).toBe('1px solid black');
    expect(getStyle(containerElement, 'width')).toBe('100%');
  });

  test('passes through spacing props to Box', () => {
    const { container } = render(
      <Container p={16} m={8} backgroundColor="blue">
        <div>Test content</div>
      </Container>
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toBeTruthy();
    
    const textElement = screen.getByText('Test content');
    expect(textElement).toBeTruthy();
  });

  test('renders children correctly', () => {
    const { container } = render(
      <Container>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Container>
    );

    expect(screen.getByTestId('child-1')).toBeTruthy();
    expect(screen.getByTestId('child-2')).toBeTruthy();
  });

  test('applies height correctly', () => {
    const { container } = render(
      <Container height="200px" />
    );
    
    const containerElement = container.firstChild as HTMLElement;
    expect(getStyle(containerElement, 'height')).toBe('200px');
  });

  test('is memoized', () => {
    const componentType = (Container as any).type || (Container as any)._reactInternals;
    expect(componentType).toBeDefined();
  });
});