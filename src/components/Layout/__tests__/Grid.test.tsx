import { render, screen } from '@testing-library/react';
import { Grid } from '../Grid';

describe('Grid Component', () => {
  const getStyle = (element: HTMLElement, property: string): string => {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  test('renders with default grid styles', () => {
    const { container } = render(<Grid />);
    
    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement).toBeTruthy();
    
    expect(getStyle(gridElement, 'display')).toBe('grid');
    expect(getStyle(gridElement, 'justify-items')).toBe('stretch');
    expect(getStyle(gridElement, 'align-items')).toBe('stretch');
  });

  test('applies column number correctly', () => {
    const { container } = render(<Grid columns={3} />);
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'grid-template-columns')).toBe('repeat(3, 1fr)');
  });

  test('applies column template string correctly', () => {
    const { container } = render(<Grid columns="1fr 2fr 1fr" />);
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'grid-template-columns')).toBe('1fr 2fr 1fr');
  });

  test('applies row number correctly', () => {
    const { container } = render(<Grid rows={2} />);
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'grid-template-rows')).toBe('repeat(2, 1fr)');
  });

  test('applies gap correctly', () => {
    const { container } = render(<Grid gap={16} />);
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'gap')).toBe('16px');
  });

  test('applies separate row and column gaps', () => {
    const { container } = render(<Grid rowGap={8} columnGap={16} />);
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'row-gap')).toBe('8px');
    expect(getStyle(gridElement, 'column-gap')).toBe('16px');
  });

  test('applies grid areas correctly', () => {
    const { container } = render(
      <Grid areas={['header header', 'sidebar content', 'footer footer']} />
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'grid-template-areas')).toBe('"header header" "sidebar content" "footer footer"');
  });

  test('applies alignment props correctly', () => {
    const { container } = render(
      <Grid 
        justifyItems="center"
        alignItems="start"
        justifyContent="space-between"
        alignContent="center"
      />
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'justify-items')).toBe('center');
    expect(getStyle(gridElement, 'align-items')).toBe('start');
    expect(getStyle(gridElement, 'justify-content')).toBe('space-between');
    expect(getStyle(gridElement, 'align-content')).toBe('center');
  });

  test('applies auto flow correctly', () => {
    const { container } = render(<Grid autoFlow="column" />);
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'grid-auto-flow')).toBe('column');
  });

  test('applies auto columns and rows', () => {
    const { container } = render(
      <Grid autoColumns="100px" autoRows="minmax(100px, auto)" />
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'grid-auto-columns')).toBe('100px');
    expect(getStyle(gridElement, 'grid-auto-rows')).toBe('minmax(100px, auto)');
  });

  test('applies custom template correctly', () => {
    const { container } = render(
      <Grid
        template={{
          columns: '200px 1fr',
          rows: 'auto 1fr auto',
          areas: '"header header" "sidebar main" "footer footer"'
        }}
      />
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'grid-template-columns')).toBe('200px 1fr');
    expect(getStyle(gridElement, 'grid-template-rows')).toBe('auto 1fr auto');
    expect(getStyle(gridElement, 'grid-template-areas')).toBe('"header header" "sidebar main" "footer footer"');
  });

  test('merges custom styles correctly', () => {
    const { container } = render(
      <Grid style={{ backgroundColor: 'rgb(255, 0, 0)', padding: '20px' }} />
    );
    
    const gridElement = container.firstChild as HTMLElement;
    expect(getStyle(gridElement, 'background-color')).toBe('rgb(255, 0, 0)');
    expect(getStyle(gridElement, 'padding')).toBe('20px');
    expect(getStyle(gridElement, 'display')).toBe('grid');
  });

  test('passes through other props to Box', () => {
    const { container } = render(
      <Grid className="test-class" id="test-id">
        <div>Test content</div>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement.className).toContain('test-class');
    expect(gridElement.id).toBe('test-id');
    
    const textElement = screen.getByText('Test content');
    expect(textElement).toBeTruthy();
  });

  test('renders children correctly', () => {
    const { container } = render(
      <Grid>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Grid>
    );

    const gridElement = container.firstChild as HTMLElement;
    expect(gridElement.children.length).toBe(3);
    expect(gridElement.textContent).toContain('Child 1');
    expect(gridElement.textContent).toContain('Child 2');
    expect(gridElement.textContent).toContain('Child 3');
  });

  test('is memoized', () => {
    const componentType = (Grid as any).type || (Grid as any)._reactInternals;
    expect(componentType).toBeDefined();
  });
});