import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { colors } from '../../theme/tokens';
import { Input } from '../Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input aria-label="Test input" placeholder="Test input" />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toBeTruthy();
  });

  it('handles value change', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} aria-label="Test" placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    fireEvent.change(input, { target: { value: 'hello' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when isDisabled is true', () => {
    render(<Input isDisabled aria-label="Disabled" placeholder="Disabled" />);
    const input = screen.getByPlaceholderText('Disabled') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('is not disabled by default', () => {
    render(<Input aria-label="Enabled" placeholder="Enabled" />);
    const input = screen.getByPlaceholderText('Enabled') as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });

  it('shows error message', () => {
    render(<Input isInvalid errorMessage="Error text" aria-label="Test" placeholder="Test" />);
    const errorElement = screen.getByText('Error text');
    expect(errorElement).toBeTruthy();
  });

  it('has readonly attribute when isReadOnly is true', () => {
    render(<Input isReadOnly aria-label="Readonly" placeholder="Readonly" />);
    const input = screen.getByPlaceholderText('Readonly') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it('has required attribute when isRequired is true', () => {
    render(<Input isRequired aria-label="Required" placeholder="Required" />);
    const input = screen.getByPlaceholderText('Required') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" aria-label="Test" placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input.className).toContain('custom-class');
  });

  it('applies data-testid', () => {
    render(<Input data-testid="test-input" aria-label="Test" placeholder="Test" />);
    const input = screen.getByTestId('test-input');
    expect(input).toBeTruthy();
  });

  it('applies variant filled background', () => {
    render(<Input variant="filled" aria-label="Filled" placeholder="Filled" />);
    expect(screen.getByPlaceholderText('Filled')).toHaveStyle({
      backgroundColor: colors.secondary[50],
    });
  });

  it('drops shadow for outline variant', () => {
    render(<Input variant="outline" aria-label="Outline" placeholder="Outline" />);
    expect(screen.getByPlaceholderText('Outline')).toHaveStyle({ boxShadow: 'none' });
  });

  it('clearable clears value and invokes onChange', () => {
    const onChangeSpy = jest.fn();
    const Wrapper = () => {
      const [v, setV] = useState("hello");
      return (
        <Input
          clearable
          value={v}
          onChange={(e) => {
            onChangeSpy(e);
            setV(e.target.value);
          }}
          aria-label="Search"
          placeholder="Search"
        />
      );
    };
    render(<Wrapper />);
    fireEvent.click(screen.getByTestId("kv-input-clear"));
    expect(screen.getByPlaceholderText("Search")).toHaveValue("");
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy.mock.calls[0][0].target.value).toBe("");
  });

  it('shows character count when showCharacterCount and maxLength', () => {
    const Wrapper = () => {
      const [v, setV] = useState("abc");
      return (
        <Input
          showCharacterCount
          maxLength={10}
          value={v}
          onChange={(e) => setV(e.target.value)}
          aria-label="Bio"
          placeholder="Bio"
        />
      );
    };
    render(<Wrapper />);
    expect(screen.getByText("3 / 10")).toBeInTheDocument();
  });

  describe('floatingLabel', () => {
    it('renders animated caption from placeholder and hides native placeholder', () => {
      render(<Input floatingLabel aria-label="Email address" placeholder="Email address" />);
      expect(screen.queryByPlaceholderText("Email address")).toBeNull();
      expect(screen.getByTestId("kv-input-floating-label")).toHaveTextContent("Email address");
      expect(screen.getByRole("textbox", { name: "Email address" })).toBeInTheDocument();
    });

    it('marks caption floated while focused or non-empty', () => {
      render(<Input floatingLabel aria-label="Name" placeholder="Name" />);
      const input = screen.getByRole("textbox", { name: "Name" });
      const caption = screen.getByTestId("kv-input-floating-label");

      expect(caption.getAttribute("data-floated")).toBe("false");

      fireEvent.focus(input);
      expect(caption.getAttribute("data-floated")).toBe("true");

      fireEvent.blur(input);
      expect(caption.getAttribute("data-floated")).toBe("false");

      fireEvent.change(input, { target: { value: "Ada" } });
      expect(caption.getAttribute("data-floated")).toBe("true");
    });
  });
});