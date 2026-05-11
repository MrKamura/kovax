import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stack } from '../Stack';

describe('Stack', () => {
  it('renders children correctly', () => {
    render(
      <Stack>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
      </Stack>
    );
    
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
  });

  it('applies row direction by default', () => {
    const { container } = render(<Stack>Test</Stack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.display).toBe('flex');
    expect(stack.style.flexDirection).toBe('row');
  });

  it('applies custom direction', () => {
    const { container } = render(<Stack direction="column">Test</Stack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.flexDirection).toBe('column');
  });

  it('applies all direction variants', () => {
    const directions = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
    
    directions.forEach(direction => {
      const { container, unmount } = render(
        <Stack direction={direction}>Test</Stack>
      );
      
      const stack = container.firstChild as HTMLElement;
      expect(stack.style.flexDirection).toBe(direction);
      unmount();
    });
  });

  it('applies alignment props', () => {
    const { container } = render(
      <Stack align="flex-end" justify="center">
        Test
      </Stack>
    );
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.alignItems).toBe('flex-end');
    expect(stack.style.justifyContent).toBe('center');
  });

  it('applies wrap property', () => {
    const { container } = render(<Stack wrap="wrap">Test</Stack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.flexWrap).toBe('wrap');
  });

  it('applies spacing props including gap', () => {
    const { container } = render(<Stack m={16} p={8} gap={12}>Test</Stack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.style.margin).toBe('16px');
    expect(stack.style.padding).toBe('8px');
    expect(stack.style.gap).toBe('12px');
  });

  it('applies custom className', () => {
    const { container } = render(<Stack className="custom-stack">Test</Stack>);
    
    const stack = container.firstChild as HTMLElement;
    expect(stack.className).toContain('custom-stack');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { container } = render(<Stack onClick={handleClick}>Clickable</Stack>);
    
    const stack = container.firstChild as HTMLElement;
    fireEvent.click(stack);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct display name', () => {
    expect(Stack.displayName).toBe('Stack');
  });
});