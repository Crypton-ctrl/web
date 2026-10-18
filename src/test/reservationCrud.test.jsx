import { describe, it, expect, beforeEach } from 'vitest';
import { restaurantApi } from '../api/restaurantApi';

describe('Experiment 9: Reservation Creation and Cancellation Tests', () => {
  beforeEach(() => {
    // Reset storage to sample defaults
    restaurantApi.resetDefaults();
    // Simulate login for CRUD token access
    localStorage.setItem('agy_auth_token', 'mock_token_123');
  });

  it('retrieves initial reservation history via GET', async () => {
    const list = await restaurantApi.getReservations();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
  });

  it('creates a new reservation via POST', async () => {
    const newBooking = {
      restaurantId: 'rest-1',
      restaurantName: 'The Rustic Truffle',
      cuisine: 'Italian',
      location: 'Downtown, Mumbai',
      date: '2026-11-01',
      time: '08:00 PM',
      guests: 2,
      tableId: 'tbl-1',
      tableNumber: 'T-01',
      tableType: 'Window Seat',
      customerName: 'Test Student',
      customerEmail: 'student@test.com',
      customerPhone: '9988776655',
      specialRequests: 'Near window please'
    };

    const created = await restaurantApi.createReservation(newBooking);
    expect(created).toBeDefined();
    expect(created.id).toContain('res-');
    expect(created.customerName).toBe('Test Student');
    expect(created.status).toBe('CONFIRMED');

    // Verify it is in list
    const updatedList = await restaurantApi.getReservations();
    const found = updatedList.find((r) => r.id === created.id);
    expect(found).toBeDefined();
  });

  it('cancels and deletes a reservation via DELETE', async () => {
    const listBefore = await restaurantApi.getReservations();
    const idToDelete = listBefore[0].id;

    const result = await restaurantApi.deleteReservation(idToDelete);
    expect(result.success).toBe(true);

    const listAfter = await restaurantApi.getReservations();
    const found = listAfter.find((r) => r.id === idToDelete);
    expect(found).toBeUndefined();
  });
});
