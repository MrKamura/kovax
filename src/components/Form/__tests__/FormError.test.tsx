import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormError } from '../FormError';

describe('FormError', () => {
  it('renders error message', () => {
    render(<FormError>This field is required</FormError>);
    
    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  it('renders error icon', () => {
    render(<FormError>Error message</FormError>);
    
    const errorElement = screen.getByRole('alert');
    const icon = errorElement.querySelector('svg');
    expect(icon).toBeTruthy();
  });

  it('has correct ARIA attributes', () => {
    render(<FormError>Error message</FormError>);
    
    const errorElement = screen.getByRole('alert');
    expect(errorElement.getAttribute('aria-live')).toBe('polite');
  });

  it('applies error color styles', () => {
    render(<FormError>Error message</FormError>);
    
    const errorElement = screen.getByRole('alert');
    expect(errorElement.style.color).toBeTruthy();
  });

  it('applies spacing props', () => {
    render(<FormError m={8} p={4}>Error message</FormError>);
    
    const errorElement = screen.getByRole('alert');
    expect(errorElement.style.margin).toBe('8px');
    expect(errorElement.style.padding).toBe('4px');
  });

  it('applies custom className', () => {
    render(<FormError className="custom-error">Error message</FormError>);
    
    const errorElement = screen.getByRole('alert');
    expect(errorElement.className).toContain('custom-error');
  });

  it('has flex layout with centered items', () => {
    render(<FormError>Error message</FormError>);
    
    const errorElement = screen.getByRole('alert');
    expect(errorElement.style.display).toBe('flex');
    expect(errorElement.style.alignItems).toBe('center');
  });

  it('has gap between icon and text', () => {
    render(<FormError>Error message</FormError>);
    
    const errorElement = screen.getByRole('alert');
    expect(errorElement.style.gap).toBeTruthy();
  });

  it('has margin top', () => {
    render(<FormError>Error message</FormError>);
    
    const errorElement = screen.getByRole('alert');
    expect(errorElement.style.marginTop).toBeTruthy();
  });

  it('has correct display name', () => {
    expect(FormError.displayName).toBe('FormError');
  });
});