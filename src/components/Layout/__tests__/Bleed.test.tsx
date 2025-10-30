// Bleed.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Bleed } from '../Bleed';

describe('Bleed Component', () => {
  const getStyle = (element: HTMLElement, property: string): string => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  test('renders without bleed by default', () => {
    const { container } = render(<Bleed>Test content</Bleed>);
    
    const bleedElement = container.firstChild as HTMLElement;
    expect(bleedElement).toBeTruthy();
    expect(bleedElement.textContent).toBe('Test content');
  });

  test('applies all-sided bleed correctly', () => {
    const { container } = render(<Bleed all={16}>Content</Bleed>);
    
    const bleedElement = container.firstChild as HTMLElement;
    expect(getStyle(bleedElement, 'margin')).toBe('-16px');
  });

  test('applies string all-sided bleed correctly', () => {
    const { container } = render(<Bleed all="2rem">Content</Bleed>);
    
    const bleedElement = container.firstChild as HTMLElement;
    expect(getStyle(bleedElement, 'margin')).toBe('-2rem');
  });

  test('applies horizontal bleed correctly', () => {
    const { container } = render(<Bleed horizontal={24}>Content</Bleed>);
    
    const bleedElement = container.firstChild as HTMLElement;
    expect(getStyle(bleedElement, 'margin-left')).toBe('-24px');
    expect(getStyle(bleedElement, 'margin-right')).toBe('-24px');
  });

  test('applies vertical bleed correctly', () => {
    const { container } = render(<Bleed vertical={8}>Content</Bleed>);
    
    const bleedElement = container.firstChild as HTMLElement;
    expect(getStyle(bleedElement, 'margin-top')).toBe('-8px');
    expect(getStyle(bleedElement, 'margin-bottom')).toBe('-8px');
  });

  test('applies individual side bleeds correctly', () => {
    const { container } = render(
      <Bleed top={10} right={20} bottom={30} left={40}>
        Content
      </Bleed>
    );
    
    const bleedElement = container.firstChild as HTMLElement;
    expect(getStyle(bleedElement, 'margin-top')).toBe('-10px');
    expect(getStyle(bleedElement, 'margin-right')).toBe('-20px');
    expect(getStyle(bleedElement, 'margin-bottom')).toBe('-30px');
    expect(getStyle(bleedElement, 'margin-left')).toBe('-40px');
  });

  test('prioritizes individual sides over all/axis props', () => {
    const { container } = render(
      <Bleed all={16} top={8} left={12}>
        Content
      </Bleed>
    );
    
    const bleedElement = container.firstChild as HTMLElement;
    expect(getStyle(bleedElement, 'margin-top')).toBe('-8px');
    expect(getStyle(bleedElement, 'margin-left')).toBe('-12px');
  });

  test('merges custom styles correctly', () => {
    const { container } = render(
      <Bleed all={16} style={{ backgroundColor: 'rgb(255, 0, 0)', padding: '20px' }}>
        Content
      </Bleed>
    );
    
    const bleedElement = container.firstChild as HTMLElement;
    expect(getStyle(bleedElement, 'margin')).toBe('-16px');
    expect(getStyle(bleedElement, 'background-color')).toBe('rgb(255, 0, 0)');
    expect(getStyle(bleedElement, 'padding')).toBe('20px');
  });

  test('passes through spacing props to Box', () => {
    const { container } = render(
      <Bleed all={16} p={8} m={4} backgroundColor="blue">
        <div>Test content</div>
      </Bleed>
    );

    const bleedElement = container.firstChild as HTMLElement;
    expect(bleedElement).toBeTruthy();
    
    const textElement = screen.getByText('Test content');
    expect(textElement).toBeTruthy();
  });

  test('renders children correctly', () => {
    const { container } = render(
      <Bleed all={16}>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Bleed>
    );

    expect(screen.getByTestId('child-1')).toBeTruthy();
    expect(screen.getByTestId('child-2')).toBeTruthy();
  });

  test('applies width and height correctly', () => {
    const { container } = render(
      <Bleed horizontal={16} width="100%" height="200px" />
    );
    
    const bleedElement = container.firstChild as HTMLElement;
    expect(getStyle(bleedElement, 'width')).toBe('100%');
    expect(getStyle(bleedElement, 'height')).toBe('200px');
    expect(getStyle(bleedElement, 'margin-left')).toBe('-16px');
    expect(getStyle(bleedElement, 'margin-right')).toBe('-16px');
  });

  test('is memoized', () => {
    const componentType = (Bleed as any).type || (Bleed as any)._reactInternals;
    expect(componentType).toBeDefined();
  });
});