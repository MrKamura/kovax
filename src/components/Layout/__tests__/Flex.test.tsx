import React from 'react';
import { render, screen } from '@testing-library/react';
import { getComputedStyleProperty as css } from '../../../test-utils/computedStyle';
import { Flex } from '../Flex';

describe('Flex', () => {
  describe('layout styles', () => {
    it('applies default flex styles', () => {
      const { container } = render(<Flex />);
      const el = container.firstChild as HTMLElement;
      expect(el).toBeTruthy();

      expect(css(el, 'display')).toBe('flex');
      expect(css(el, 'flex-direction')).toBe('row');
      expect(css(el, 'flex-wrap')).toBe('nowrap');
      expect(css(el, 'justify-content')).toBe('flex-start');
      expect(css(el, 'align-items')).toBe('stretch');
    });

    it('maps shorthand props to CSS', () => {
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

      const el = container.firstChild as HTMLElement;
      expect(css(el, 'display')).toBe('flex');
      expect(css(el, 'flex-direction')).toBe('column');
      expect(css(el, 'flex-wrap')).toBe('wrap');
      expect(css(el, 'justify-content')).toBe('center');
      expect(css(el, 'align-items')).toBe('center');
      expect(css(el, 'align-content')).toBe('space-between');
      expect(css(el, 'gap')).toBe('20px');
      expect(css(el, 'flex-grow')).toBe('1');
      expect(css(el, 'flex-shrink')).toBe('0');
      expect(css(el, 'flex-basis')).toBe('100px');
    });

    it('supports reverse for row', () => {
      const { container } = render(<Flex direction="row" reverse />);
      expect(css(container.firstChild as HTMLElement, 'flex-direction')).toBe('row-reverse');
    });

    it('supports reverse for column', () => {
      const { container } = render(<Flex direction="column" reverse />);
      expect(css(container.firstChild as HTMLElement, 'flex-direction')).toBe('column-reverse');
    });

    it('merges inline styles (named colors resolve to rgb)', () => {
      const { container } = render(
        <Flex style={{ backgroundColor: 'red', padding: '10px' }} />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(css(el, 'padding')).toBe('10px');
      expect(css(el, 'display')).toBe('flex');
    });

    it('merges inline styles with hex colors', () => {
      const { container } = render(
        <Flex style={{ backgroundColor: '#ff0000', margin: '20px' }} />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(css(el, 'margin')).toBe('20px');
    });
  });

  describe('DOM passthrough', () => {
    it('forwards className and id', () => {
      const { container } = render(
        <Flex className="test-class" id="test-id">
          <div>Test content</div>
        </Flex>
      );

      const el = container.firstChild as HTMLElement;
      expect(el.className).toContain('test-class');
      expect(el.id).toBe('test-id');
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders children', () => {
      const { container } = render(
        <Flex>
          <div>Child 1</div>
          <div>Child 2</div>
        </Flex>
      );

      const el = container.firstChild as HTMLElement;
      expect(el.children.length).toBe(2);
      expect(el.textContent).toContain('Child 1');
      expect(el.textContent).toContain('Child 2');
    });
  });
});
