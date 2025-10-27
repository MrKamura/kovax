import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input Basic Tests', () => {
  test('renders input element', () => {
    render(<Input placeholder="Test input" />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toBeTruthy();
  });

  test('handles value change', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    fireEvent.change(input, { target: { value: 'hello' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('is disabled when isDisabled is true', () => {
    render(<Input isDisabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText('Disabled') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  test('is not disabled by default', () => {
    render(<Input placeholder="Enabled" />);
    const input = screen.getByPlaceholderText('Enabled') as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });

  test('shows error message', () => {
    render(<Input isInvalid errorMessage="Error text" placeholder="Test" />);
    const errorElement = screen.getByText('Error text');
    expect(errorElement).toBeTruthy();
  });

  test('has readonly attribute when isReadOnly is true', () => {
    render(<Input isReadOnly placeholder="Readonly" />);
    const input = screen.getByPlaceholderText('Readonly') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test('has required attribute when isRequired is true', () => {
    render(<Input isRequired placeholder="Required" />);
    const input = screen.getByPlaceholderText('Required') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  test('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input.className).toContain('custom-class');
  });

  test('applies data-testid', () => {
    render(<Input data-testid="test-input" placeholder="Test" />);
    const input = screen.getByTestId('test-input');
    expect(input).toBeTruthy();
  });
});