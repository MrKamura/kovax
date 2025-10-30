// Center.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Center } from '../Center';

describe('Center Component', () => {
  const getStyle = (element: HTMLElement, property: string): string => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  test('renders with default center styles', () => {
    const { container } = render(<Center />);
    
    const centerElement = container.firstChild as HTMLElement;
    expect(centerElement).toBeTruthy();
    
    expect(getStyle(centerElement, 'display')).toBe('flex');
    expect(getStyle(centerElement, 'justify-content')).toBe('center');
    expect(getStyle(centerElement, 'align-items')).toBe('center');
  });

  test('centers horizontally only', () => {
    const { container } = render(<Center horizontal vertical={false} center={false} />);
    
    const centerElement = container.firstChild as HTMLElement;
    expect(getStyle(centerElement, 'justify-content')).toBe('center');
    expect(getStyle(centerElement, 'align-items')).not.toBe('center');
  });

  test('centers vertically only', () => {
    const { container } = render(<Center horizontal={false} vertical center={false} />);
    
    const centerElement = container.firstChild as HTMLElement;
    expect(getStyle(centerElement, 'justify-content')).not.toBe('center');
    expect(getStyle(centerElement, 'align-items')).toBe('center');
  });

  test('renders as inline flex when inline prop is true', () => {
    const { container } = render(<Center inline />);
    
    const centerElement = container.firstChild as HTMLElement;
    expect(getStyle(centerElement, 'display')).toBe('inline-flex');
  });

  test('applies min and max dimensions correctly', () => {
    const { container } = render(
      <Center minW="100px" minH="200px" maxW="300px" maxH="400px" />
    );
    
    const centerElement = container.firstChild as HTMLElement;
    expect(getStyle(centerElement, 'min-width')).toBe('100px');
    expect(getStyle(centerElement, 'min-height')).toBe('200px');
    expect(getStyle(centerElement, 'max-width')).toBe('300px');
    expect(getStyle(centerElement, 'max-height')).toBe('400px');
  });

  test('merges custom styles correctly', () => {
    const { container } = render(
      <Center style={{ backgroundColor: 'rgb(255, 0, 0)', padding: '20px' }} />
    );
    
    const centerElement = container.firstChild as HTMLElement;
    expect(getStyle(centerElement, 'background-color')).toBe('rgb(255, 0, 0)');
    expect(getStyle(centerElement, 'padding')).toBe('20px');
    expect(getStyle(centerElement, 'display')).toBe('flex');
  });

  test('passes through spacing props to Box', () => {
    const { container } = render(
      <Center p={16} m={8} backgroundColor="blue">
        <div>Test content</div>
      </Center>
    );

    const centerElement = container.firstChild as HTMLElement;
    expect(centerElement).toBeTruthy();
    
    const textElement = screen.getByText('Test content');
    expect(textElement).toBeTruthy();
  });

  test('renders children correctly', () => {
    const { container } = render(
      <Center>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Center>
    );

    expect(screen.getByTestId('child-1')).toBeTruthy();
    expect(screen.getByTestId('child-2')).toBeTruthy();
  });

  test('respects center prop over individual horizontal/vertical props', () => {
    const { container } = render(
      <Center horizontal={false} vertical={false} center />
    );
    
    const centerElement = container.firstChild as HTMLElement;
    expect(getStyle(centerElement, 'justify-content')).toBe('center');
    expect(getStyle(centerElement, 'align-items')).toBe('center');
  });

  test('applies width and height correctly', () => {
    const { container } = render(
      <Center width="50%" height="100px" />
    );
    
    const centerElement = container.firstChild as HTMLElement;
    expect(getStyle(centerElement, 'width')).toBe('50%');
    expect(getStyle(centerElement, 'height')).toBe('100px');
  });

  test('is memoized', () => {
    const componentType = (Center as any).type || (Center as any)._reactInternals;
    expect(componentType).toBeDefined();
  });
});