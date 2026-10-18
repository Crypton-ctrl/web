import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TableCard from '../components/restaurant/TableCard';

describe('Experiment 9: Table Selection Tests', () => {
  const availableTable = {
    id: 'tbl-1',
    number: 'T-01',
    capacity: 4,
    type: 'Window Seat',
    available: true
  };

  const bookedTable = {
    id: 'tbl-2',
    number: 'T-02',
    capacity: 2,
    type: 'Patio Outdoor',
    available: false
  };

  it('renders available table with correct number and capacity', () => {
    render(<TableCard table={availableTable} guestCount={2} />);

    expect(screen.getByText('T-01')).toBeInTheDocument();
    expect(screen.getByText('Window Seat')).toBeInTheDocument();
    expect(screen.getByText(/Max 4 guests/i)).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('triggers onSelect when clicking an available table', () => {
    const handleSelect = vi.fn();
    render(<TableCard table={availableTable} onSelect={handleSelect} />);

    fireEvent.click(screen.getByTestId('table-card-tbl-1'));
    expect(handleSelect).toHaveBeenCalledWith(availableTable);
  });

  it('does NOT trigger onSelect when clicking a booked table', () => {
    const handleSelect = vi.fn();
    render(<TableCard table={bookedTable} onSelect={handleSelect} />);

    fireEvent.click(screen.getByTestId('table-card-tbl-2'));
    expect(handleSelect).not.toHaveBeenCalled();
    expect(screen.getByText('Booked')).toBeInTheDocument();
  });
});
