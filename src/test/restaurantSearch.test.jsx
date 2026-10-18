import { describe, it, expect } from 'vitest';
import { initialRestaurants } from '../api/mockData';

describe('Experiment 9: Restaurant Search & Cuisine Filtering Tests', () => {
  it('filters restaurants correctly by search query matching name or cuisine', () => {
    const query = 'truffle';
    const filtered = initialRestaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.cuisine.toLowerCase().includes(query)
    );

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].name).toBe('The Rustic Truffle');
  });

  it('filters restaurants correctly by Italian cuisine', () => {
    const italian = initialRestaurants.filter((r) => r.cuisine === 'Italian');
    expect(italian.length).toBe(1);
    expect(italian[0].cuisine).toBe('Italian');
  });

  it('filters restaurants correctly by location city Mumbai', () => {
    const mumbaiRestaurants = initialRestaurants.filter((r) => r.city === 'Mumbai');
    expect(mumbaiRestaurants.length).toBeGreaterThan(0);
    mumbaiRestaurants.forEach((r) => {
      expect(r.city).toBe('Mumbai');
    });
  });

  it('returns empty array when search query matches nothing', () => {
    const query = 'NonExistentRestaurant12345';
    const filtered = initialRestaurants.filter((r) =>
      r.name.toLowerCase().includes(query)
    );
    expect(filtered).toHaveLength(0);
  });
});
