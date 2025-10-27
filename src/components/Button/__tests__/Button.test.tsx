import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

// Simple mock icons for testing
const MockIcon = () => <span data-testid="mock-icon">🔔</span>;
const MockCustomLoader = () => <span data-testid="custom-loader">🔄</span>;

describe('Button Component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    test('renders with children text', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    test('renders with React node children', () => {
      render(<Button><strong>Bold</strong> Text</Button>);
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    test('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not trigger click when disabled', () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('does not trigger click when loading', () => {
      const handleClick = jest.fn();
      render(<Button isLoading onClick={handleClick}>Loading</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Loading State Tests
  describe('Loading States', () => {
    test('shows default loader when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      // Ищем SVG элемент с классом animate-spin (наш лоадер)
      const loader = document.querySelector('.animate-spin');
      expect(loader).toBeInTheDocument();
    });

    test('shows custom loader when provided', () => {
      render(
        <Button isLoading loader={<MockCustomLoader />}>
          Loading
        </Button>
      );
      expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
    });

    test('button is disabled when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  // Icon Tests
  describe('Icons', () => {
    test('renders left icon', () => {
      render(<Button leftIcon={<MockIcon />}>With Icon</Button>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    test('renders right icon', () => {
      render(<Button rightIcon={<MockIcon />}>With Icon</Button>);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    test('renders both left and right icons', () => {
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
    test('renders different variants', () => {
      const variants = ['solid', 'outline', 'ghost', 'link'] as const;
      
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
    test('renders different colors', () => {
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
    test('renders different sizes', () => {
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
    test('applies className', () => {
      render(<Button className="custom-class">Styled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    test('applies data-testid', () => {
      render(<Button data-testid="submit-button">Submit</Button>);
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    test('applies type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    test('has default type="button"', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    test('applies disabled attribute', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});