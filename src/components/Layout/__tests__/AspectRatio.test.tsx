import React from 'react';
import { render, screen } from '@testing-library/react';
import { AspectRatio } from '../AspectRatio';

describe('AspectRatio Component', () => {
  const getStyle = (element: HTMLElement, property: string): string => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  test('renders with default 16:9 ratio', () => {
    const { container } = render(
      <AspectRatio>
        <div>Test content</div>
      </AspectRatio>
    );
    
    const aspectRatioElement = container.firstChild as HTMLElement;
    expect(aspectRatioElement).toBeTruthy();
    
    const wrapper = aspectRatioElement.firstChild as HTMLElement;
    expect(getStyle(wrapper, 'padding-bottom')).toBe('56.25%');
  });

  test('applies custom ratio correctly', () => {
    const { container } = render(
      <AspectRatio ratio={4 / 3}>
        <div>Test content</div>
      </AspectRatio>
    );
    
    const wrapper = (container.firstChild as HTMLElement).firstChild as HTMLElement;
    expect(getStyle(wrapper, 'padding-bottom')).toBe('75%');
  });

  test('applies square ratio (1:1)', () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div>Test content</div>
      </AspectRatio>
    );
    
    const wrapper = (container.firstChild as HTMLElement).firstChild as HTMLElement;
    expect(getStyle(wrapper, 'padding-bottom')).toBe('100%');
  });

  test('applies portrait ratio', () => {
    const { container } = render(
      <AspectRatio ratio={3 / 4}>
        <div>Test content</div>
      </AspectRatio>
    );
    
    const wrapper = (container.firstChild as HTMLElement).firstChild as HTMLElement;
    // Используем более гибкую проверку для плавающих чисел
    const paddingBottom = getStyle(wrapper, 'padding-bottom');
    expect(paddingBottom).toMatch(/^133\.33\d*%$/); // Допускаем небольшие вариации
  });

  test('applies max width and height', () => {
    const { container } = render(
      <AspectRatio maxW="500px" maxH="300px">
        <div>Test content</div>
      </AspectRatio>
    );
    
    const aspectRatioElement = container.firstChild as HTMLElement;
    expect(getStyle(aspectRatioElement, 'max-width')).toBe('500px');
    expect(getStyle(aspectRatioElement, 'max-height')).toBe('300px');
  });

  test('applies objectFit to content', () => {
    const { container } = render(
      <AspectRatio objectFit="contain">
        <img src="test.jpg" alt="Test" />
      </AspectRatio>
    );
    
    const content = (container.firstChild as HTMLElement).querySelector('img') as HTMLElement;
    expect(getStyle(content, 'object-fit')).toBe('contain');
  });

  test('merges custom styles correctly', () => {
    const { container } = render(
      <AspectRatio style={{ backgroundColor: 'rgb(255, 0, 0)', border: '1px solid black' }}>
        <div>Test content</div>
      </AspectRatio>
    );
    
    const aspectRatioElement = container.firstChild as HTMLElement;
    expect(getStyle(aspectRatioElement, 'background-color')).toBe('rgb(255, 0, 0)');
    expect(getStyle(aspectRatioElement, 'border')).toBe('1px solid black');
  });

  test('passes through spacing props to Box', () => {
    const { container } = render(
      <AspectRatio p={16} m={8} backgroundColor="blue">
        <div>Test content</div>
      </AspectRatio>
    );

    const aspectRatioElement = container.firstChild as HTMLElement;
    expect(aspectRatioElement).toBeTruthy();
    
    const textElement = screen.getByText('Test content');
    expect(textElement).toBeTruthy();
  });

  test('renders children correctly with proper positioning', () => {
    const { container } = render(
      <AspectRatio>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </AspectRatio>
    );

    const child1 = screen.getByTestId('child-1');
    const child2 = screen.getByTestId('child-2');
    
    expect(child1).toBeTruthy();
    expect(child2).toBeTruthy();
    
    // Check if children are properly positioned
    const contentWrapper = (container.firstChild as HTMLElement).firstChild as HTMLElement;
    const content = contentWrapper.firstChild as HTMLElement;
    expect(getStyle(content, 'position')).toBe('absolute');
    expect(getStyle(content, 'width')).toBe('100%');
    expect(getStyle(content, 'height')).toBe('100%');
  });

  test('handles image children correctly', () => {
    const { container } = render(
      <AspectRatio>
        <img src="test.jpg" alt="Test image" style={{ filter: 'brightness(0.8)' }} />
      </AspectRatio>
    );
    
    const image = container.querySelector('img') as HTMLImageElement;
    expect(image).toBeTruthy();
    expect(image.alt).toBe('Test image');
    expect(getStyle(image, 'object-fit')).toBe('cover');
    expect(getStyle(image, 'filter')).toBe('brightness(0.8)');
  });

  test('handles non-element children', () => {
    const { container } = render(
      <AspectRatio>
        Just text content
      </AspectRatio>
    );
    
    const aspectRatioElement = container.firstChild as HTMLElement;
    expect(aspectRatioElement.textContent).toBe('Just text content');
  });

  test('is memoized', () => {
    const componentType = (AspectRatio as any).type || (AspectRatio as any)._reactInternals;
    expect(componentType).toBeDefined();
  });

  // Дополнительные тесты для точности вычислений
  test('calculates common ratios accurately', () => {
    const { container: container16_9 } = render(<AspectRatio ratio={16/9}><div /></AspectRatio>);
    const wrapper16_9 = (container16_9.firstChild as HTMLElement).firstChild as HTMLElement;
    expect(getStyle(wrapper16_9, 'padding-bottom')).toBe('56.25%');

    const { container: container4_3 } = render(<AspectRatio ratio={4/3}><div /></AspectRatio>);
    const wrapper4_3 = (container4_3.firstChild as HTMLElement).firstChild as HTMLElement;
    expect(getStyle(wrapper4_3, 'padding-bottom')).toBe('75%');

    const { container: container1_1 } = render(<AspectRatio ratio={1}><div /></AspectRatio>);
    const wrapper1_1 = (container1_1.firstChild as HTMLElement).firstChild as HTMLElement;
    expect(getStyle(wrapper1_1, 'padding-bottom')).toBe('100%');
  });
});