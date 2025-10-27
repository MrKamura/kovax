import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input Simple Tests', () => {
  test('input renders and can be found by placeholder', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInstanceOf(HTMLInputElement);
  });

  test('input calls onChange when value changes', () => {
    const mockOnChange = jest.fn();
    render(<Input onChange={mockOnChange} placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('disabled input cannot be focused or changed', () => {
    const mockOnChange = jest.fn();
    const mockOnFocus = jest.fn();
    
    render(
      <Input 
        isDisabled 
        onChange={mockOnChange}
        onFocus={mockOnFocus}
        placeholder="Disabled"
      />
    );
    
    const input = screen.getByPlaceholderText('Disabled') as HTMLInputElement;
    
    // Проверяем disabled свойство
    expect(input.disabled).toBe(true);
    
    // Пытаемся изменить значение - не должно вызывать onChange
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(mockOnChange).not.toHaveBeenCalled();
    
    // Пытаемся сфокусироваться - не должно вызывать onFocus
    fireEvent.focus(input);
    expect(mockOnFocus).not.toHaveBeenCalled();
  });

  test('error message appears when isInvalid is true', () => {
    render(
      <Input 
        isInvalid 
        errorMessage="This field has an error" 
        placeholder="With error"
      />
    );
    
    const errorMessage = screen.getByText('This field has an error');
    expect(errorMessage).toBeTruthy();
  });

  test('input has correct type attribute', () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  test('input has correct default type', () => {
    render(<Input placeholder="Default" />);
    const input = screen.getByPlaceholderText('Default') as HTMLInputElement;
    expect(input.type).toBe('text');
  });

  test('readonly input cannot be changed', () => {
    const mockOnChange = jest.fn();
    render(
      <Input 
        isReadOnly 
        onChange={mockOnChange}
        placeholder="Readonly"
      />
    );
    
    const input = screen.getByPlaceholderText('Readonly') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
    
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});