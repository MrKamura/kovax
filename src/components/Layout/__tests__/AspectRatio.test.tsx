import React from 'react';
import { render, screen } from '@testing-library/react';
import { getComputedStyleProperty as css } from '../../../test-utils/computedStyle';
import { AspectRatio } from '../AspectRatio';

function innerWrapper(container: HTMLElement) {
  return (container.firstChild as HTMLElement).firstChild as HTMLElement;
}

describe('AspectRatio', () => {
  describe('ratio padding', () => {
    it('defaults to 16:9 (56.25% padding-bottom)', () => {
      const { container } = render(
        <AspectRatio>
          <div>Test content</div>
        </AspectRatio>
      );
      const wrapper = innerWrapper(container);
      expect(css(wrapper, 'padding-bottom')).toBe('56.25%');
    });

    it('maps 16/9 explicitly', () => {
      const { container } = render(
        <AspectRatio ratio={16 / 9}>
          <div />
        </AspectRatio>
      );
      expect(css(innerWrapper(container), 'padding-bottom')).toBe('56.25%');
    });

    it('maps 4:3 to 75%', () => {
      const { container } = render(
        <AspectRatio ratio={4 / 3}>
          <div>Test content</div>
        </AspectRatio>
      );
      expect(css(innerWrapper(container), 'padding-bottom')).toBe('75%');
    });

    it('maps 1:1 to 100%', () => {
      const { container } = render(
        <AspectRatio ratio={1}>
          <div>Test content</div>
        </AspectRatio>
      );
      expect(css(innerWrapper(container), 'padding-bottom')).toBe('100%');
    });

    it('handles float ratios (e.g. 3:4 portrait)', () => {
      const { container } = render(
        <AspectRatio ratio={3 / 4}>
          <div>Test content</div>
        </AspectRatio>
      );
      const paddingBottom = css(innerWrapper(container), 'padding-bottom');
      expect(paddingBottom).toMatch(/^133\.33\d*%$/);
    });
  });

  describe('sizing and content', () => {
    it('applies max width and height on the outer box', () => {
      const { container } = render(
        <AspectRatio maxW="500px" maxH="300px">
          <div>Test content</div>
        </AspectRatio>
      );
      const outer = container.firstChild as HTMLElement;
      expect(css(outer, 'max-width')).toBe('500px');
      expect(css(outer, 'max-height')).toBe('300px');
    });

    it('applies objectFit to image content', () => {
      const { container } = render(
        <AspectRatio objectFit="contain">
          <img src="test.jpg" alt="Test" />
        </AspectRatio>
      );
      const content = (container.firstChild as HTMLElement).querySelector(
        'img'
      ) as HTMLElement;
      expect(css(content, 'object-fit')).toBe('contain');
    });

    it('merges inline styles on the outer box', () => {
      const { container } = render(
        <AspectRatio
          style={{ backgroundColor: 'rgb(255, 0, 0)', border: '1px solid black' }}
        >
          <div>Test content</div>
        </AspectRatio>
      );
      const outer = container.firstChild as HTMLElement;
      expect(css(outer, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(css(outer, 'border')).toBe('1px solid black');
    });

    it('forwards spacing props and renders children', () => {
      render(
        <AspectRatio p={16} m={8} backgroundColor="blue">
          <div>Test content</div>
        </AspectRatio>
      );
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('positions the content layer absolutely with full size', () => {
      const { container } = render(
        <AspectRatio>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </AspectRatio>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();

      const contentWrapper = innerWrapper(container);
      const content = contentWrapper.firstChild as HTMLElement;
      expect(css(content, 'position')).toBe('absolute');
      expect(css(content, 'width')).toBe('100%');
      expect(css(content, 'height')).toBe('100%');
    });

    it('passes through styles on image children and sets default object-fit', () => {
      const { container } = render(
        <AspectRatio>
          <img
            src="test.jpg"
            alt="Test image"
            style={{ filter: 'brightness(0.8)' }}
          />
        </AspectRatio>
      );

      const image = container.querySelector('img') as HTMLImageElement;
      expect(image).toBeTruthy();
      expect(image.alt).toBe('Test image');
      expect(css(image, 'object-fit')).toBe('cover');
      expect(css(image, 'filter')).toBe('brightness(0.8)');
    });
  });

  describe('edge cases', () => {
    it('handles non-element children', () => {
      const { container } = render(<AspectRatio>Just text content</AspectRatio>);
      const outer = container.firstChild as HTMLElement;
      expect(outer.textContent).toBe('Just text content');
    });
  });
});
