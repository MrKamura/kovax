// Flex.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Flex } from '../Flex';

describe('Flex Component', () => {
  // Хелпер функция для получения стилей
  const getStyle = (element: HTMLElement, property: string): string => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  test('renders with default flex styles', () => {
    const { container } = render(<Flex />);
    
    const flexElement = container.firstChild as HTMLElement;
    expect(flexElement).toBeTruthy();
    
    expect(getStyle(flexElement, 'display')).toBe('flex');
    expect(getStyle(flexElement, 'flex-direction')).toBe('row');
    expect(getStyle(flexElement, 'flex-wrap')).toBe('nowrap');
    expect(getStyle(flexElement, 'justify-content')).toBe('flex-start');
    expect(getStyle(flexElement, 'align-items')).toBe('stretch');
  });

  test('applies all flex props correctly', () => {
    const { container } = render(
      <Flex
        direction="column"
        wrap="wrap"
        justify="center"
        align="center"
        alignContent="space-between"
        gap="20px"
        grow={1}
        shrink={0}
        basis="100px"
      />
    );

    const flexElement = container.firstChild as HTMLElement;
    expect(flexElement).toBeTruthy();
    
    expect(getStyle(flexElement, 'display')).toBe('flex');
    expect(getStyle(flexElement, 'flex-direction')).toBe('column');
    expect(getStyle(flexElement, 'flex-wrap')).toBe('wrap');
    expect(getStyle(flexElement, 'justify-content')).toBe('center');
    expect(getStyle(flexElement, 'align-items')).toBe('center');
    expect(getStyle(flexElement, 'align-content')).toBe('space-between');
    expect(getStyle(flexElement, 'gap')).toBe('20px');
    expect(getStyle(flexElement, 'flex-grow')).toBe('1');
    expect(getStyle(flexElement, 'flex-shrink')).toBe('0');
    expect(getStyle(flexElement, 'flex-basis')).toBe('100px');
  });

  test('applies reverse direction correctly', () => {
    const { container } = render(<Flex direction="row" reverse />);
    
    const flexElement = container.firstChild as HTMLElement;
    expect(getStyle(flexElement, 'flex-direction')).toBe('row-reverse');
  });

  test('applies reverse direction for column', () => {
    const { container } = render(<Flex direction="column" reverse />);
    
    const flexElement = container.firstChild as HTMLElement;
    expect(getStyle(flexElement, 'flex-direction')).toBe('column-reverse');
  });

  test('merges custom styles correctly', () => {
    const { container } = render(
      <Flex style={{ backgroundColor: 'red', padding: '10px' }} />
    );
    
    const flexElement = container.firstChild as HTMLElement;
    
    // Для цветов используем RGB формат
    expect(getStyle(flexElement, 'background-color')).toBe('rgb(255, 0, 0)');
    expect(getStyle(flexElement, 'padding')).toBe('10px');
    expect(getStyle(flexElement, 'display')).toBe('flex');
  });

  test('merges custom styles with hex colors', () => {
    const { container } = render(
      <Flex style={{ backgroundColor: '#ff0000', margin: '20px' }} />
    );
    
    const flexElement = container.firstChild as HTMLElement;
    
    expect(getStyle(flexElement, 'background-color')).toBe('rgb(255, 0, 0)');
    expect(getStyle(flexElement, 'margin')).toBe('20px');
  });

  test('passes through other props to Box', () => {
    const { container } = render(
      <Flex className="test-class" id="test-id">
        <div>Test content</div>
      </Flex>
    );

    const flexElement = container.firstChild as HTMLElement;
    expect(flexElement.className).toContain('test-class');
    expect(flexElement.id).toBe('test-id');
    
    // Для проверки текста используем screen
    const textElement = screen.getByText('Test content');
    expect(textElement).toBeTruthy();
  });

  test('renders children correctly', () => {
    const { container } = render(
      <Flex>
        <div>Child 1</div>
        <div>Child 2</div>
      </Flex>
    );

    const flexElement = container.firstChild as HTMLElement;
    expect(flexElement.children.length).toBe(2);
    expect(flexElement.textContent).toContain('Child 1');
    expect(flexElement.textContent).toContain('Child 2');
  });

  test('is memoized', () => {
    // Проверяем что компонент обернут в React.memo
    const componentType = (Flex as any).type || (Flex as any)._reactInternals;
    expect(componentType).toBeDefined();
  });
});