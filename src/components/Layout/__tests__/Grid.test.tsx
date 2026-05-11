import React from 'react';
import { render, screen } from '@testing-library/react';
import { getComputedStyleProperty as css } from '../../../test-utils/computedStyle';
import { Grid } from '../Grid';

describe('Grid', () => {
  describe('layout styles', () => {
    it('applies default grid display and item alignment', () => {
      const { container } = render(<Grid />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'display')).toBe('grid');
      expect(css(el, 'justify-items')).toBe('stretch');
      expect(css(el, 'align-items')).toBe('stretch');
    });

    it('maps numeric columns to repeat()', () => {
      const { container } = render(<Grid columns={3} />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'grid-template-columns')).toBe('repeat(3, 1fr)');
    });

    it('passes through column template strings', () => {
      const { container } = render(<Grid columns="1fr 2fr 1fr" />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'grid-template-columns')).toBe('1fr 2fr 1fr');
    });

    it('maps numeric rows to repeat()', () => {
      const { container } = render(<Grid rows={2} />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'grid-template-rows')).toBe('repeat(2, 1fr)');
    });

    it('applies gap', () => {
      const { container } = render(<Grid gap={16} />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'gap')).toBe('16px');
    });

    it('applies row and column gap separately', () => {
      const { container } = render(<Grid rowGap={8} columnGap={16} />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'row-gap')).toBe('8px');
      expect(css(el, 'column-gap')).toBe('16px');
    });

    it('applies grid-template-areas from areas prop', () => {
      const { container } = render(
        <Grid areas={['header header', 'sidebar content', 'footer footer']} />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'grid-template-areas')).toBe(
        '"header header" "sidebar content" "footer footer"'
      );
    });

    it('maps alignment props to CSS', () => {
      const { container } = render(
        <Grid
          justifyItems="center"
          alignItems="start"
          justifyContent="space-between"
          alignContent="center"
        />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'justify-items')).toBe('center');
      expect(css(el, 'align-items')).toBe('start');
      expect(css(el, 'justify-content')).toBe('space-between');
      expect(css(el, 'align-content')).toBe('center');
    });

    it('applies grid-auto-flow', () => {
      const { container } = render(<Grid autoFlow="column" />);
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'grid-auto-flow')).toBe('column');
    });

    it('applies grid-auto-columns and grid-auto-rows', () => {
      const { container } = render(
        <Grid autoColumns="100px" autoRows="minmax(100px, auto)" />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'grid-auto-columns')).toBe('100px');
      expect(css(el, 'grid-auto-rows')).toBe('minmax(100px, auto)');
    });

    it('merges template object into grid properties', () => {
      const { container } = render(
        <Grid
          template={{
            columns: '200px 1fr',
            rows: 'auto 1fr auto',
            areas: '"header header" "sidebar main" "footer footer"',
          }}
        />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'grid-template-columns')).toBe('200px 1fr');
      expect(css(el, 'grid-template-rows')).toBe('auto 1fr auto');
      expect(css(el, 'grid-template-areas')).toBe(
        '"header header" "sidebar main" "footer footer"'
      );
    });
  });

  describe('style merging and DOM passthrough', () => {
    it('merges inline style over layout styles', () => {
      const { container } = render(
        <Grid style={{ backgroundColor: 'rgb(255, 0, 0)', padding: '20px' }} />
      );
      const el = container.firstChild as HTMLElement;
      expect(css(el, 'background-color')).toBe('rgb(255, 0, 0)');
      expect(css(el, 'padding')).toBe('20px');
      expect(css(el, 'display')).toBe('grid');
    });

    it('forwards className, id, and children', () => {
      const { container } = render(
        <Grid className="test-class" id="test-id">
          <div>Test content</div>
        </Grid>
      );

      const el = container.firstChild as HTMLElement;
      expect(el.className).toContain('test-class');
      expect(el.id).toBe('test-id');
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      const { container } = render(
        <Grid>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Grid>
      );

      const el = container.firstChild as HTMLElement;
      expect(el.children.length).toBe(3);
      expect(el.textContent).toContain('Child 1');
      expect(el.textContent).toContain('Child 2');
      expect(el.textContent).toContain('Child 3');
    });
  });
});
