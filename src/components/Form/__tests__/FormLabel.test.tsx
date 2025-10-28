import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormLabel } from '../FormLabel';

describe('FormLabel Component', () => {
  test('renders label with children', () => {
    render(<FormLabel>Test Label</FormLabel>);
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  test('associates with input using htmlFor', () => {
    render(
      <>
        <FormLabel htmlFor="test-input">Test Label</FormLabel>
        <input id="test-input" type="text" />
      </>
    );
    
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    
    expect(label.getAttribute('for')).toBe('test-input');
    expect(input.getAttribute('id')).toBe('test-input');
  });

  test('shows required indicator when isRequired is true', () => {
    render(<FormLabel isRequired>Test Label</FormLabel>);
    
    expect(screen.getByText('*')).toBeTruthy();
    const asterisk = screen.getByText('*');
    expect(asterisk.style.color).toBeTruthy();
  });

  test('does not show required indicator when isRequired is false', () => {
    render(<FormLabel isRequired={false}>Test Label</FormLabel>);
    
    expect(screen.queryByText('*')).toBeNull();
  });

  test('applies invalid styles when isInvalid is true', () => {
    render(<FormLabel isInvalid>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.color).toBeTruthy();
  });

  test('applies normal styles when isInvalid is false', () => {
    render(<FormLabel isInvalid={false}>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.color).toBeTruthy();
  });

  test('applies spacing props', () => {
    render(<FormLabel m={8} p={4}>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.margin).toBe('8px');
    expect(label.style.padding).toBe('4px');
  });

  test('applies custom className', () => {
    render(<FormLabel className="custom-label">Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.className).toContain('custom-label');
  });

  test('has pointer cursor', () => {
    render(<FormLabel>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.cursor).toBe('pointer');
  });

  test('has correct margin bottom', () => {
    render(<FormLabel>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.marginBottom).toBeTruthy();
  });

  test('has correct display name', () => {
    expect(FormLabel.displayName).toBe('FormLabel');
  });
});