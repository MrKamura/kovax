import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VStack } from '../VStack';

describe('VStack Component', () => {
  test('renders children correctly', () => {
    render(
      <VStack>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
      </VStack>
    );
    
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  test('applies vertical flex layout by default', () => {
    const { container } = render(<VStack>Test</VStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.display).toBe('flex');
    expect(stack.style.flexDirection).toBe('column');
  });

  test('applies reverse direction when reverse is true', () => {
    const { container } = render(<VStack reverse>Test</VStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.flexDirection).toBe('column-reverse');
  });

  test('applies alignment props', () => {
    const { container } = render(
      <VStack align="center" justify="space-between">
        Test
      </VStack>
    );
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.alignItems).toBe('center');
    expect(stack.style.justifyContent).toBe('space-between');
  });

  test('applies gap correctly', () => {
    const { container, rerender } = render(<VStack gap={24}>Test</VStack>);
    
    let stack = container.firstChild as HTMLElement;
    expect(stack.style.gap).toBe('24px');

    rerender(<VStack gap="1rem">Test</VStack>);
    stack = container.firstChild as HTMLElement;
    expect(stack.style.gap).toBe('1rem');
  });

  test('applies wrap property', () => {
    const { container } = render(<VStack wrap="wrap">Test</VStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.flexWrap).toBe('wrap');
  });

  test('applies spacing props', () => {
    const { container } = render(<VStack m={20} p={12}>Test</VStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.margin).toBe('20px');
    expect(stack.style.padding).toBe('12px');
  });

  test('applies custom className', () => {
    const { container } = render(<VStack className="custom-vstack">Test</VStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.className).toContain('custom-vstack');
  });

  test('handles mouse events', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    
    const { container } = render(
      <VStack 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        Hoverable
      </VStack>
    );
    
    const stack = container.firstChild as HTMLElement;
    fireEvent.mouseEnter(stack);
    fireEvent.mouseLeave(stack);
    
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });

  test('has correct display name', () => {
    expect(VStack.displayName).toBe('VStack');
  });
});