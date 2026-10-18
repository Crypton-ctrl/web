import { initialHotels } from './mockData';
import { generateAndLogApiKey } from '../utils/apiKeyLogger';

const STORAGE_HOTELS_KEY = 'agy_lab_hotels';

export const getStoredHotels = () => {
  const data = localStorage.getItem(STORAGE_HOTELS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_HOTELS_KEY, JSON.stringify(initialHotels));
    return initialHotels;
  }
  return JSON.parse(data);
};

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const hotelApi = {
  fetchHotels: async () => {
    await delay(300);
    const list = getStoredHotels();
    generateAndLogApiKey('HOTEL_READ_LIST [GET /api/hotels]', {
      endpoint: '/api/hotels',
      method: 'GET',
      status: '200 OK',
      totalHotels: list.length,
      hotels: list.map((h) => ({ id: h.id, name: h.name, location: h.location, price: h.pricePerNight }))
    });
    return list;
  },

  fetchHotelById: async (id) => {
    await delay(250);
    const hotels = getStoredHotels();
    const found = hotels.find((h) => h.id === String(id));
    if (!found) {
      throw new Error(`Hotel with ID ${id} not found`);
    }

    generateAndLogApiKey('HOTEL_READ_DETAIL [GET /api/hotels/:id]', {
      endpoint: `/api/hotels/${id}`,
      method: 'GET',
      status: '200 OK',
      hotelId: id,
      name: found.name,
      roomsAvailable: found.rooms.length
    });

    return found;
  },

  checkAvailability: async (hotelId, checkIn, checkOut) => {
    await delay(200);
    const hotel = await hotelApi.fetchHotelById(hotelId);
    const availability = hotel.rooms.map((r) => ({
      ...r,
      availableCount: Math.max(1, r.available - (checkIn ? 1 : 0))
    }));

    generateAndLogApiKey('HOTEL_CHECK_AVAILABILITY [GET /api/hotels/:id/availability]', {
      endpoint: `/api/hotels/${hotelId}/availability`,
      method: 'GET',
      status: '200 OK',
      hotelName: hotel.name,
      checkIn: checkIn || 'N/A',
      checkOut: checkOut || 'N/A',
      rooms: availability
    });

    return availability;
  }
};
