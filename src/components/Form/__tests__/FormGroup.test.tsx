import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormGroup } from '../FormGroup';

describe('FormGroup Component', () => {
  test('renders children correctly', () => {
    render(
      <FormGroup>
        <input type="text" placeholder="First" />
        <input type="text" placeholder="Second" />
      </FormGroup>
    );
    
    expect(screen.getByPlaceholderText('First')).toBeTruthy();
    expect(screen.getByPlaceholderText('Second')).toBeTruthy();
  });

  test('applies vertical direction by default', () => {
    render(
      <FormGroup>
        <input type="text" />
        <input type="text" />
      </FormGroup>
    );
    
    const formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.flexDirection).toBe('column');
  });

  test('applies horizontal direction when specified', () => {
    render(
      <FormGroup direction="horizontal">
        <input type="text" />
        <input type="text" />
      </FormGroup>
    );
    
    const formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.flexDirection).toBe('row');
  });

  test('applies different spacing sizes', () => {
    const { rerender } = render(
      <FormGroup spacing="sm">
        <input type="text" />
        <input type="text" />
      </FormGroup>
    );
    
    let formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.gap).toBeTruthy();

    rerender(
      <FormGroup spacing="md">
        <input type="text" />
        <input type="text" />
      </FormGroup>
    );
    
    formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.gap).toBeTruthy();

    rerender(
      <FormGroup spacing="lg">
        <input type="text" />
        <input type="text" />
      </FormGroup>
    );
    
    formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.gap).toBeTruthy();
  });

  test('applies spacing props', () => {
    render(
      <FormGroup m={16} p={8}>
        <input type="text" />
      </FormGroup>
    );
    
    const formGroup = screen.getByRole('textbox').parentElement;
    expect(formGroup?.style.margin).toBe('16px');
    expect(formGroup?.style.padding).toBe('8px');
  });

  test('applies custom className', () => {
    render(
      <FormGroup className="custom-group">
        <input type="text" />
      </FormGroup>
    );
    
    const formGroup = screen.getByRole('textbox').parentElement;
    expect(formGroup?.className).toContain('custom-group');
  });

  test('has full width', () => {
    render(
      <FormGroup>
        <input type="text" />
      </FormGroup>
    );
    
    const formGroup = screen.getByRole('textbox').parentElement;
    expect(formGroup?.style.width).toBe('100%');
  });

  test('has flex display', () => {
    render(
      <FormGroup>
        <input type="text" />
      </FormGroup>
    );
    
    const formGroup = screen.getByRole('textbox').parentElement;
    expect(formGroup?.style.display).toBe('flex');
  });

  test('has correct display name', () => {
    expect(FormGroup.displayName).toBe('FormGroup');
  });
});