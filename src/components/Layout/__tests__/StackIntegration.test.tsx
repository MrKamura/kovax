import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stack, HStack, VStack } from '../index';

describe('Stack Components Integration', () => {
  test('nested Stack components', () => {
    render(
      <Stack direction="column" gap={16}>
        <Stack direction="row" gap={8} justify="space-between">
          <div data-testid="left">Left</div>
          <div data-testid="right">Right</div>
        </Stack>
        <Stack direction="row" gap={8} justify="center">
          <div data-testid="center-1">Center 1</div>
          <div data-testid="center-2">Center 2</div>
        </Stack>
      </Stack>
    );

    expect(screen.getByTestId('left')).toBeTruthy();
    expect(screen.getByTestId('right')).toBeTruthy();
    expect(screen.getByTestId('center-1')).toBeTruthy();
    expect(screen.getByTestId('center-2')).toBeTruthy();
  });

  test('mixed Stack, HStack and VStack', () => {
    render(
      <VStack gap={20}>
        <HStack gap={12} justify="space-between">
          <div data-testid="header-left">Header Left</div>
          <div data-testid="header-right">Header Right</div>
        </HStack>
        <Stack direction="row" gap={16} wrap="wrap">
          <div data-testid="item-1">Item 1</div>
          <div data-testid="item-2">Item 2</div>
          <div data-testid="item-3">Item 3</div>
        </Stack>
      </VStack>
    );

    expect(screen.getByTestId('header-left')).toBeTruthy();
    expect(screen.getByTestId('header-right')).toBeTruthy();
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('item-3')).toBeTruthy();
  });

  test('complex layout with all Stack variants', () => {
    render(
      <Stack direction="column" gap={24} m={16} p={12}>
        <VStack flex={1} gap={8}>
          <div data-testid="sidebar-title">Sidebar</div>
          <div data-testid="sidebar-item-1">Item 1</div>
          <div data-testid="sidebar-item-2">Item 2</div>
        </VStack>
        <VStack flex={2} gap={12}>
          <HStack justify="space-between">
            <div data-testid="content-title">Content</div>
            <div data-testid="actions">Actions</div>
          </HStack>
          <div data-testid="content-body">Content body</div>
        </VStack>
      </Stack>
    );

    expect(screen.getByTestId('sidebar-title')).toBeTruthy();
    expect(screen.getByTestId('content-title')).toBeTruthy();
    expect(screen.getByTestId('content-body')).toBeTruthy();
  });

  test('all direction variants work correctly', () => {
    const directions = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
    
    directions.forEach(direction => {
      const { container, unmount } = render(
        <Stack direction={direction} gap={8}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>
      );
      
      const stack = container.firstChild as HTMLElement;
      expect(stack.style.flexDirection).toBe(direction);
      unmount();
    });
  });
});