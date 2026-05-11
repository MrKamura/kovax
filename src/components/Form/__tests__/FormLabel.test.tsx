import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormLabel } from '../FormLabel';

describe('FormLabel', () => {
  it('renders label with children', () => {
    render(<FormLabel>Test Label</FormLabel>);
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('associates with input using htmlFor', () => {
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

  it('shows required indicator when isRequired is true', () => {
    render(<FormLabel isRequired>Test Label</FormLabel>);
    
    expect(screen.getByText('*')).toBeTruthy();
    const asterisk = screen.getByText('*');
    expect(asterisk.style.color).toBeTruthy();
  });

  it('does not show required indicator when isRequired is false', () => {
    render(<FormLabel isRequired={false}>Test Label</FormLabel>);
    
    expect(screen.queryByText('*')).toBeNull();
  });

  it('applies invalid styles when isInvalid is true', () => {
    render(<FormLabel isInvalid>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.color).toBeTruthy();
  });

  it('applies normal styles when isInvalid is false', () => {
    render(<FormLabel isInvalid={false}>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.color).toBeTruthy();
  });

  it('applies spacing props', () => {
    render(<FormLabel m={8} p={4}>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.margin).toBe('8px');
    expect(label.style.padding).toBe('4px');
  });

  it('applies custom className', () => {
    render(<FormLabel className="custom-label">Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.className).toContain('custom-label');
  });

  it('has pointer cursor', () => {
    render(<FormLabel>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.cursor).toBe('pointer');
  });

  it('has correct margin bottom', () => {
    render(<FormLabel>Test Label</FormLabel>);
    
    const label = screen.getByText('Test Label');
    expect(label.style.marginBottom).toBeTruthy();
  });

  it('has correct display name', () => {
    expect(FormLabel.displayName).toBe('FormLabel');
  });
});