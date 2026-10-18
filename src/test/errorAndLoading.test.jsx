import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Loading from '../components/common/Loading';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Helper component that throws an error for testing ErrorBoundary
const ProblemChild = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Simulation of catastrophic rendering crash');
  }
  return <div>Component rendered peacefully</div>;
};

describe('Experiment 9: Loading and Error Components Tests', () => {
  it('renders Loading component with custom message', () => {
    render(<Loading message="Loading restaurant tables..." />);
    expect(screen.getByText('Loading restaurant tables...')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders Loading skeleton variant', () => {
    render(<Loading variant="skeleton" />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('ErrorBoundary catches rendering errors and displays user-friendly fallback', () => {
    // Suppress console.error in vitest during intentional error test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary title="Custom Error Caught">
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-boundary-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Error Caught')).toBeInTheDocument();
    expect(
      screen.getByText(/Simulation of catastrophic rendering crash/i)
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
