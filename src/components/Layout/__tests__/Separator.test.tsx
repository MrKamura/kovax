import React from 'react';
import { render } from '@testing-library/react';
import { Separator } from '../Separator';

describe('Separator Component', () => {
  const getStyle = (element: HTMLElement, property: string): string => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  test('renders with default horizontal styles', () => {
    const { container } = render(<Separator />);
    
    const separatorElement = container.firstChild as HTMLElement;
    expect(separatorElement).toBeTruthy();
    
    expect(getStyle(separatorElement, 'width')).toBe('100%');
    expect(getStyle(separatorElement, 'height')).toBe('1px');
    expect(getStyle(separatorElement, 'background-color')).toBeTruthy();
  });

  test('renders vertical separator correctly', () => {
    const { container } = render(<Separator orientation="vertical" />);
    
    const separatorElement = container.firstChild as HTMLElement;
    expect(getStyle(separatorElement, 'width')).toBe('1px');
    expect(getStyle(separatorElement, 'height')).toBe('100%');
  });

  test('applies custom size correctly', () => {
    const { container } = render(<Separator size={2} />);
    
    const separatorElement = container.firstChild as HTMLElement;
    expect(getStyle(separatorElement, 'height')).toBe('2px');
  });

  test('applies string size correctly', () => {
    const { container } = render(<Separator size="0.5rem" />);
    
    const separatorElement = container.firstChild as HTMLElement;
    expect(getStyle(separatorElement, 'height')).toBe('0.5rem');
  });

  test('applies custom color correctly', () => {
    const { container } = render(<Separator color="rgb(255, 0, 0)" />);
    
    const separatorElement = container.firstChild as HTMLElement;
    expect(getStyle(separatorElement, 'background-color')).toBe('rgb(255, 0, 0)');
  });

  test('applies margin correctly', () => {
    const { container } = render(<Separator margin={16} />);
    
    const separatorElement = container.firstChild as HTMLElement;
    expect(getStyle(separatorElement, 'margin')).toBe('16px');
  });

  test('applies string margin correctly', () => {
    const { container } = render(<Separator margin="2rem" />);
    
    const separatorElement = container.firstChild as HTMLElement;
    expect(getStyle(separatorElement, 'margin')).toBe('2rem');
  });

  test('merges custom styles correctly', () => {
    const { container } = render(
      <Separator style={{ opacity: '0.5', borderRadius: '2px' }} />
    );
    
    const separatorElement = container.firstChild as HTMLElement;
    expect(getStyle(separatorElement, 'opacity')).toBe('0.5');
    expect(getStyle(separatorElement, 'border-radius')).toBe('2px');
    expect(getStyle(separatorElement, 'width')).toBe('100%');
  });

  test('passes through spacing props to Box', () => {
    const { container } = render(
      <Separator m={8} mt={4} />
    );

    const separatorElement = container.firstChild as HTMLElement;
    expect(separatorElement).toBeTruthy();
  });

  test('applies vertical separator with custom size', () => {
    const { container } = render(
      <Separator orientation="vertical" size={4} />
    );
    
    const separatorElement = container.firstChild as HTMLElement;
    expect(getStyle(separatorElement, 'width')).toBe('4px');
    expect(getStyle(separatorElement, 'height')).toBe('100%');
  });

  test('is memoized', () => {
    const componentType = (Separator as any).type || (Separator as any)._reactInternals;
    expect(componentType).toBeDefined();
  });
});