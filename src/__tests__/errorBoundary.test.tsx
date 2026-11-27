import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

const FaultyChild: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test telemetry explosion');
  }
  return <div>Healthy Telemetry Display</div>;
};

describe('ErrorBoundary Component Comprehensive Suite', () => {
  it('renders normal children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <FaultyChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Healthy Telemetry Display')).toBeDefined();
  });

  it('renders default fallback UI and handles reset button click', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const errorHandler = (e: ErrorEvent) => e.preventDefault();
    window.addEventListener('error', errorHandler);

    render(
      <ErrorBoundary>
        <FaultyChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeDefined();
    expect(screen.getByText(/Something went wrong loading air quality data/i)).toBeDefined();

    const resetBtn = screen.getByRole('button', { name: /Reload Telemetry Station/i });
    expect(resetBtn).toBeDefined();
    fireEvent.click(resetBtn);

    window.removeEventListener('error', errorHandler);
    errorSpy.mockRestore();
  });

  it('renders custom fallback element when fallback prop is provided', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const errorHandler = (e: ErrorEvent) => e.preventDefault();
    window.addEventListener('error', errorHandler);

    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom Error Recovery</div>}>
        <FaultyChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeDefined();
    expect(screen.getByText('Custom Error Recovery')).toBeDefined();

    window.removeEventListener('error', errorHandler);
    errorSpy.mockRestore();
  });
});
