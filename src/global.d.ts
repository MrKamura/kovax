/// <reference types="@testing-library/jest-dom" />

// Глобальные типы для тестов
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(className: string): R;
    toHaveAttribute(attr: string, value?: string): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toBeVisible(): R;
    toBeChecked(): R;
    toBeEmptyDOMElement(): R;
    toHaveStyle(css: string): R;
    toHaveTextContent(text: string | RegExp): R;
    toHaveValue(value: string | string[] | number): R;
    toHaveFocus(): R;
    toHaveFormValues(values: Record<string, any>): R;
    toBeRequired(): R;
    toBeInvalid(): R;
    toBeValid(): R;
  }
}