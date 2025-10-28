import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  FormControl,
  FormLabel,
  FormError,
  FormHelperText,
  FormGroup
} from '../index';
import { Input } from '../../Input/Input';

describe('Form Components Integration', () => {
  test('complete form with all components', () => {
    render(
      <FormControl isInvalid isRequired>
        <FormLabel htmlFor="email" isRequired isInvalid>
          Email Address
        </FormLabel>
        <Input id="email" type="email" placeholder="Enter your email" />
        <FormHelperText isInvalid>
          We'll never share your email with anyone else.
        </FormHelperText>
        <FormError>Please enter a valid email address</FormError>
      </FormControl>
    );

    expect(screen.getByText('Email Address')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(screen.getByText("We'll never share your email with anyone else.")).toBeTruthy();
    expect(screen.getByText('Please enter a valid email address')).toBeTruthy();
    expect(screen.getByText('*')).toBeTruthy();
  });

  test('form group with multiple controls', () => {
    render(
      <FormGroup direction="horizontal" spacing="md">
        <FormControl>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input id="firstName" type="text" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input id="lastName" type="text" />
        </FormControl>
      </FormGroup>
    );

    expect(screen.getByText('First Name')).toBeTruthy();
    expect(screen.getByText('Last Name')).toBeTruthy();
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
  });

  test('form control state propagation', () => {
    render(
      <FormControl isInvalid isRequired isDisabled>
        <FormLabel isInvalid isRequired>
          Test Field
        </FormLabel>
        <Input data-testid="test-input" />
        <FormHelperText isInvalid>Invalid input</FormHelperText>
        <FormError>Field is required</FormError>
      </FormControl>
    );

    const input = screen.getByTestId('test-input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.hasAttribute('required')).toBe(true);
    expect(input.hasAttribute('disabled')).toBe(true);
    
    const label = screen.getByText('Test Field');
    expect(label.style.color).toBeTruthy();
    
    const helperText = screen.getByText('Invalid input');
    expect(helperText.style.color).toBeTruthy();
  });

  test('accessible form structure', () => {
    render(
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input id="username" type="text" />
        <FormError>Username is taken</FormError>
      </FormControl>
    );

    const label = screen.getByText('Username');
    const input = screen.getByRole('textbox');
    const error = screen.getByRole('alert');

    expect(label.getAttribute('for')).toBe('username');
    expect(input.getAttribute('id')).toBe('username');
    expect(error.textContent).toContain('Username is taken');
  });
});