import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

// Simple mock icons for testing
const MockIcon = () => <span data-testid="mock-icon">🔔</span>;
const MockCustomLoader = () => <span data-testid="custom-loader">🔄</span>;

describe('Button', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('renders with React node children', () => {
      render(<Button><strong>Bold</strong> Text</Button>);
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click when disabled', () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not trigger click when loading', () => {
      const handleClick = jest.fn();
      render(<Button isLoading onClick={handleClick}>Loading</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Loading State Tests
  describe('Loading States', () => {
    it('shows default loader when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByTestId('kv-default-button-loader')).toBeInTheDocument();
    });

    it('shows custom loader when provided', () => {
      render(
        <Button isLoading loader={<MockCustomLoader />}>
          Loading
        </Button>
      );
      expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
    });

    it('button is disabled when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  // Icon Tests
  describe('Icons', () => {
    it('renders left icon', () => {
      render(<Button leftIcon={<MockIcon />}>With Icon</Button>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders right icon', () => {
      render(<Button rightIcon={<MockIcon />}>With Icon</Button>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders both left and right icons', () => {
      render(
        <Button 
          leftIcon={<MockIcon />} 
          rightIcon={<MockIcon />}
        >
          Both Icons
        </Button>
      );
      const icons = screen.getAllByTestId('mock-icon');
      expect(icons).toHaveLength(2);
    });
  });

  // Variant Tests
  describe('Variants', () => {
    it('renders different variants', () => {
      const variants = ['solid', 'outline', 'ghost', 'link', 'destructive'] as const;
      
      variants.forEach(variant => {
        const { unmount } = render(
          <Button variant={variant}>{variant} Button</Button>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
        unmount();
      });
    });
  });

  // Color Tests
  describe('Colors', () => {
    it('renders different colors', () => {
      const colors = ['primary', 'secondary', 'success', 'warning', 'error'] as const;
      
      colors.forEach(color => {
        const { unmount } = render(
          <Button color={color}>{color} Button</Button>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
        unmount();
      });
    });
  });

  // Size Tests
  describe('Sizes', () => {
    it('renders different sizes', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      
      sizes.forEach(size => {
        const { unmount } = render(
          <Button size={size}>{size} Button</Button>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
        unmount();
      });
    });
  });

  // HTML Attributes Tests
  describe('HTML Attributes', () => {
    it('applies className', () => {
      render(<Button className="custom-class">Styled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies data-testid', () => {
      render(<Button data-testid="submit-button">Submit</Button>);
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    it('applies type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('has default type="button"', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('applies disabled attribute', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders as link when as="a"', () => {
      render(
        <Button as="a" href="https://example.com">
          Go
        </Button>,
      );
      const link = screen.getByRole('link', { name: /go/i });
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('sets aria-busy when loading', () => {
      render(<Button isLoading>Saving</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('sets aria-live polite when loading with loadingText', () => {
      render(
        <Button isLoading loadingText="Saving your changes">
          Save
        </Button>,
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-live', 'polite');
      expect(screen.getByText('Saving your changes')).toBeInTheDocument();
    });

    it('sets aria-pressed when pressed prop is set', () => {
      render(<Button pressed={false}>Toggle</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('applies fullWidth via width 100%', () => {
      render(<Button fullWidth>Wide</Button>);
      expect(screen.getByRole('button')).toHaveStyle({ width: '100%' });
    });
  });
});