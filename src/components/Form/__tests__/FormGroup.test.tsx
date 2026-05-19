import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormGroup } from '../FormGroup';

describe('FormGroup', () => {
  it('renders children correctly', () => {
    render(
      <FormGroup>
        <input type="text" aria-label="First" placeholder="First" />
        <input type="text" aria-label="Second" placeholder="Second" />
      </FormGroup>
    );
    
    expect(screen.getByPlaceholderText('First')).toBeTruthy();
    expect(screen.getByPlaceholderText('Second')).toBeTruthy();
  });

  it('applies vertical direction by default', () => {
    render(
      <FormGroup>
        <input type="text" aria-label="Field" />
        <input type="text" aria-label="Field" />
      </FormGroup>
    );
    
    const formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.flexDirection).toBe('column');
  });

  it('applies horizontal direction when specified', () => {
    render(
      <FormGroup direction="horizontal">
        <input type="text" aria-label="Field" />
        <input type="text" aria-label="Field" />
      </FormGroup>
    );
    
    const formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.flexDirection).toBe('row');
  });

  it('applies different spacing sizes', () => {
    const { rerender } = render(
      <FormGroup spacing="sm">
        <input type="text" aria-label="Field" />
        <input type="text" aria-label="Field" />
      </FormGroup>
    );
    
    let formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.gap).toBeTruthy();

    rerender(
      <FormGroup spacing="md">
        <input type="text" aria-label="Field" />
        <input type="text" aria-label="Field" />
      </FormGroup>
    );
    
    formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.gap).toBeTruthy();

    rerender(
      <FormGroup spacing="lg">
        <input type="text" aria-label="Field" />
        <input type="text" aria-label="Field" />
      </FormGroup>
    );
    
    formGroup = screen.getAllByRole('textbox')[0].parentElement;
    expect(formGroup?.style.gap).toBeTruthy();
  });

  it('applies spacing props', () => {
    render(
      <FormGroup m={16} p={8}>
        <input type="text" aria-label="Field" />
      </FormGroup>
    );
    
    const formGroup = screen.getByRole('textbox').parentElement;
    expect(formGroup?.style.margin).toBe('16px');
    expect(formGroup?.style.padding).toBe('8px');
  });

  it('applies custom className', () => {
    render(
      <FormGroup className="custom-group">
        <input type="text" aria-label="Field" />
      </FormGroup>
    );
    
    const formGroup = screen.getByRole('textbox').parentElement;
    expect(formGroup?.className).toContain('custom-group');
  });

  it('has full width', () => {
    render(
      <FormGroup>
        <input type="text" aria-label="Field" />
      </FormGroup>
    );
    
    const formGroup = screen.getByRole('textbox').parentElement;
    expect(formGroup?.style.width).toBe('100%');
  });

  it('has flex display', () => {
    render(
      <FormGroup>
        <input type="text" aria-label="Field" />
      </FormGroup>
    );
    
    const formGroup = screen.getByRole('textbox').parentElement;
    expect(formGroup?.style.display).toBe('flex');
  });

  it('has correct display name', () => {
    expect(FormGroup.displayName).toBe('FormGroup');
  });
});