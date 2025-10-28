
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormControl } from '../FormControl';
import { Input } from '../../Input/Input';

describe('FormControl Component', () => {
  test('renders children correctly', () => {
    render(
      <FormControl>
        <label htmlFor="test">Test Label</label>
        <input id="test" type="text" />
      </FormControl>
    );
    
    expect(screen.getByText('Test Label')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  test('applies spacing props', () => {
    render(
      <FormControl m={16} p={8}>
        <input type="text" />
      </FormControl>
    );
    
    const formControl = screen.getByRole('textbox').parentElement;
    expect(formControl?.style.margin).toBe('16px');
    expect(formControl?.style.padding).toBe('8px');
  });

  test('applies disabled styles when isDisabled is true', () => {
    render(
      <FormControl isDisabled>
        <input type="text" />
      </FormControl>
    );
    
    const formControl = screen.getByRole('textbox').parentElement;
    expect(formControl?.style.opacity).toBe('0.6');
  });

  test('does not apply disabled styles when isDisabled is false', () => {
    render(
      <FormControl isDisabled={false}>
        <input type="text" />
      </FormControl>
    );
    
    const formControl = screen.getByRole('textbox').parentElement;
    expect(formControl?.style.opacity).toBe('1');
  });

  test('passes form state props to children', () => {
    const { rerender } = render(
      <FormControl isInvalid isRequired isDisabled>
        <Input data-testid="test-input" />
      </FormControl>
    );
    
    let input = screen.getByTestId('test-input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.hasAttribute('required')).toBe(true);
    expect(input.hasAttribute('disabled')).toBe(true);

    // Test with different props
    rerender(
      <FormControl isInvalid={false} isRequired={false} isDisabled={false}>
        <Input data-testid="test-input" />
      </FormControl>
    );
    
    input = screen.getByTestId('test-input');
    // Когда isInvalid=false, aria-invalid может быть null или 'false'
    const ariaInvalid = input.getAttribute('aria-invalid');
    expect(ariaInvalid === 'false' || ariaInvalid === null).toBe(true);
    expect(input.hasAttribute('required')).toBe(false);
    expect(input.hasAttribute('disabled')).toBe(false);
  });

  test('applies custom className', () => {
    render(
      <FormControl className="custom-form-control">
        <input type="text" />
      </FormControl>
    );
    
    const formControl = screen.getByRole('textbox').parentElement;
    expect(formControl?.className).toContain('custom-form-control');
  });

  test('has correct display name', () => {
    expect(FormControl.displayName).toBe('FormControl');
  });

  test('maintains flex column layout', () => {
    render(
      <FormControl>
        <input type="text" />
      </FormControl>
    );
    
    const formControl = screen.getByRole('textbox').parentElement;
    expect(formControl?.style.display).toBe('flex');
    expect(formControl?.style.flexDirection).toBe('column');
    expect(formControl?.style.width).toBe('100%');
  });

  test('applies gap between children', () => {
    render(
      <FormControl>
        <label>Label</label>
        <input type="text" />
        <span>Helper text</span>
      </FormControl>
    );
    
    const formControl = screen.getByRole('textbox').parentElement;
    expect(formControl?.style.gap).toBeTruthy();
  });
});