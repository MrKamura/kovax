import React from 'react';
import { render, screen } from '@testing-library/react';
import { HStack, VStack } from '../index';

describe('Stack Components Integration', () => {
  test('nested HStack and VStack', () => {
    render(
      <VStack gap={16}>
        <HStack gap={8} justify="space-between">
          <div data-testid="left">Left</div>
          <div data-testid="right">Right</div>
        </HStack>
        <HStack gap={8} justify="center">
          <div data-testid="center-1">Center 1</div>
          <div data-testid="center-2">Center 2</div>
        </HStack>
      </VStack>
    );

    expect(screen.getByTestId('left')).toBeTruthy();
    expect(screen.getByTestId('right')).toBeTruthy();
    expect(screen.getByTestId('center-1')).toBeTruthy();
    expect(screen.getByTestId('center-2')).toBeTruthy();
  });

  test('complex layout with spacing props', () => {
    render(
      <HStack m={24} p={16} gap={12} align="stretch">
        <VStack flex={1} gap={8}>
          <div data-testid="sidebar-1">Sidebar Item 1</div>
          <div data-testid="sidebar-2">Sidebar Item 2</div>
        </VStack>
        <VStack flex={2} gap={8}>
          <div data-testid="content-1">Content Item 1</div>
          <div data-testid="content-2">Content Item 2</div>
        </VStack>
      </HStack>
    );

    expect(screen.getByTestId('sidebar-1')).toBeTruthy();
    expect(screen.getByTestId('content-1')).toBeTruthy();
  });

  test('reverse stacks', () => {
    const { container } = render(
      <VStack reverse gap={8}>
        <div data-testid="first">First (should appear last)</div>
        <div data-testid="last">Last (should appear first)</div>
      </VStack>
    );

    const vstack = container.firstChild as HTMLElement;
    expect(vstack.style.flexDirection).toBe('column-reverse');
    
    const first = screen.getByTestId('first');
    const last = screen.getByTestId('last');
    expect(first).toBeTruthy();
    expect(last).toBeTruthy();
  });
});