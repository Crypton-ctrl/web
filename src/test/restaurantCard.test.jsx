import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RestaurantCard from '../components/restaurant/RestaurantCard';

describe('Experiment 9: RestaurantCard Component Tests', () => {
  const mockRestaurant = {
    id: 'test-rest-1',
    name: 'Bella Italia',
    cuisine: 'Italian',
    location: 'Mumbai Central',
    rating: 4.8,
    reviewsCount: 150,
    priceRange: '₹₹₹',
    averageCostForTwo: 2000,
    image: 'https://via.placeholder.com/150',
    description: 'Authentic stone-baked pizzas and handmade pastas.',
    operatingHours: '12:00 PM - 11:00 PM'
  };

  it('renders restaurant card with name, cuisine, and rating correctly', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);

    expect(screen.getByText('Bella Italia')).toBeInTheDocument();
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('Mumbai Central')).toBeInTheDocument();
    expect(screen.getByText('₹2000')).toBeInTheDocument();
  });

  it('triggers onReserve callback when "Book Table" button is clicked', () => {
    const handleReserve = vi.fn();
    render(<RestaurantCard restaurant={mockRestaurant} onReserve={handleReserve} />);

    const bookBtn = screen.getByRole('button', { name: /Book Table/i });
    fireEvent.click(bookBtn);

    expect(handleReserve).toHaveBeenCalledTimes(1);
    expect(handleReserve).toHaveBeenCalledWith(mockRestaurant);
  });

  it('triggers onViewDetails callback when "Details" button is clicked', () => {
    const handleDetails = vi.fn();
    render(
      <RestaurantCard
        restaurant={mockRestaurant}
        onViewDetails={handleDetails}
      />
    );

    const detailsBtn = screen.getByRole('button', { name: /Details/i });
    fireEvent.click(detailsBtn);

    expect(handleDetails).toHaveBeenCalledTimes(1);
    expect(handleDetails).toHaveBeenCalledWith('test-rest-1');
  });
});
