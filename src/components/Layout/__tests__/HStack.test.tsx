import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HStack } from '../HStack';

describe('HStack', () => {
  it('renders children correctly', () => {
    render(
      <HStack>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
      </HStack>
    );
    
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  it('applies horizontal flex layout by default', () => {
    const { container } = render(<HStack>Test</HStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.display).toBe('flex');
    expect(stack.style.flexDirection).toBe('row');
  });

  it('applies reverse direction when reverse is true', () => {
    const { container } = render(<HStack reverse>Test</HStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.flexDirection).toBe('row-reverse');
  });

  it('applies alignment props', () => {
    const { container } = render(
      <HStack align="flex-end" justify="center">
        Test
      </HStack>
    );
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.alignItems).toBe('flex-end');
    expect(stack.style.justifyContent).toBe('center');
  });

  it('applies gap correctly', () => {
    const { container, rerender } = render(<HStack gap={16}>Test</HStack>);
    
    let stack = container.firstChild as HTMLElement;
    expect(stack.style.gap).toBe('16px');

    rerender(<HStack gap="2rem">Test</HStack>);
    stack = container.firstChild as HTMLElement;
    expect(stack.style.gap).toBe('2rem');
  });

  it('applies wrap property', () => {
    const { container } = render(<HStack wrap="wrap">Test</HStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.flexWrap).toBe('wrap');
  });

  it('applies spacing props', () => {
    const { container } = render(<HStack m={16} p={8}>Test</HStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.margin).toBe('16px');
    expect(stack.style.padding).toBe('8px');
  });

  it('applies custom className', () => {
    const { container } = render(<HStack className="custom-hstack">Test</HStack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.className).toContain('custom-hstack');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { container } = render(<HStack onClick={handleClick}>Clickable</HStack>);
    
    const stack = container.firstChild as HTMLElement;
    fireEvent.click(stack);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct display name', () => {
    expect(HStack.displayName).toBe('HStack');
  });
});