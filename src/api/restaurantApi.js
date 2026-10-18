import axios from 'axios';
import { initialRestaurants, sampleReservations } from './mockData';
import { generateAndLogApiKey } from '../utils/apiKeyLogger';

// Local storage keys
const STORAGE_RESTAURANTS_KEY = 'agy_lab_restaurants';
const STORAGE_RESERVATIONS_KEY = 'agy_lab_reservations';
const STORAGE_AUTH_TOKEN_KEY = 'agy_auth_token';

// Helper to load or initialize data
const getStoredRestaurants = () => {
  const data = localStorage.getItem(STORAGE_RESTAURANTS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_RESTAURANTS_KEY, JSON.stringify(initialRestaurants));
    return initialRestaurants;
  }
  return JSON.parse(data);
};

const getStoredReservations = () => {
  const data = localStorage.getItem(STORAGE_RESERVATIONS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(sampleReservations));
    return sampleReservations;
  }
  return JSON.parse(data);
};

const saveReservations = (reservations) => {
  localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(reservations));
};

// Create Axios instance (Experiment 5 & 8)
export const apiClient = axios.create({
  baseURL: 'https://api.mock-reservation.internal/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach Authorization Bearer token (Experiment 8 topic c)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401 Unauthorized responses & expired tokens (Experiment 8 topic f)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('[API Interceptor] Unauthorized (401) or expired token encountered.');
      localStorage.removeItem(STORAGE_AUTH_TOKEN_KEY);
      localStorage.removeItem('agy_auth_user');
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }
    return Promise.reject(error);
  }
);

// Simulated latency helper
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// REST API Service layer with full CRUD (Experiment 5, 7, 8)
export const restaurantApi = {
  // Authentication API (Experiment 8 a, b)
  login: async (email, password) => {
    await delay(500);
    if (!email || !password) {
      const err = new Error('Email and password are required');
      err.response = { status: 400, data: { message: 'Email and password are required' } };
      throw err;
    }

    if (password.length < 6) {
      const err = new Error('Password must be at least 6 characters');
      err.response = { status: 401, data: { message: 'Invalid credentials. Password too short.' } };
      throw err;
    }

    // Generate mock JWT-like token
    const token = `jwt_token_${btoa(email)}_${Date.now()}`;
    const user = {
      id: 'usr_' + Math.floor(Math.random() * 10000),
      email,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      role: 'Diner'
    };

    localStorage.setItem(STORAGE_AUTH_TOKEN_KEY, token);
    localStorage.setItem('agy_auth_user', JSON.stringify(user));

    // Log API Key for login operation
    generateAndLogApiKey('AUTH_USER_LOGIN', {
      email,
      userId: user.id,
      role: user.role,
      tokenSnippet: token.substring(0, 18) + '...'
    });

    return { token, user };
  },

  logout: () => {
    generateAndLogApiKey('AUTH_USER_LOGOUT', {
      action: 'Session invalidated & token cleared'
    });
    localStorage.removeItem(STORAGE_AUTH_TOKEN_KEY);
    localStorage.removeItem('agy_auth_user');
  },

  getCurrentUser: () => {
    const raw = localStorage.getItem('agy_auth_user');
    const token = localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
    if (token && raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  },

  // CRUD READ: GET Restaurants (Experiment 5 a, b, d)
  getRestaurants: async ({ location, cuisine, search } = {}) => {
    await delay(350);
    let restaurants = getStoredRestaurants();

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      restaurants = restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q)
      );
    }

    if (location && location !== 'All') {
      restaurants = restaurants.filter((r) => r.city.toLowerCase() === location.toLowerCase());
    }

    if (cuisine && cuisine !== 'All') {
      restaurants = restaurants.filter((r) => r.cuisine.toLowerCase() === cuisine.toLowerCase());
    }

    // Log API Key for restaurant catalog read operation
    generateAndLogApiKey('CRUD_READ_RESTAURANTS [GET /api/restaurants]', {
      filters: { location: location || 'All', cuisine: cuisine || 'All', search: search || '' },
      count: restaurants.length,
      status: '200 OK',
      preview: restaurants.map((r) => ({ id: r.id, name: r.name, cuisine: r.cuisine }))
    });

    return restaurants;
  },

  // CRUD READ: GET Restaurant by ID
  getRestaurantById: async (id) => {
    await delay(300);
    const restaurants = getStoredRestaurants();
    const found = restaurants.find((r) => r.id === id);
    if (!found) {
      const err = new Error(`Restaurant with id ${id} not found`);
      err.response = { status: 404, data: { message: 'Restaurant not found' } };
      throw err;
    }

    generateAndLogApiKey('CRUD_READ_RESTAURANT_BY_ID [GET /api/restaurants/:id]', {
      id,
      name: found.name,
      status: '200 OK'
    });

    return found;
  },

  // CRUD READ: GET Tables & Time Slots (Experiment 5 c)
  getTablesAndSlots: async (restaurantId, { date, guests } = {}) => {
    await delay(300);
    const restaurant = await restaurantApi.getRestaurantById(restaurantId);
    let tables = restaurant.tables;

    if (guests) {
      tables = tables.map((t) => ({
        ...t,
        isSuitable: t.capacity >= guests
      }));
    }

    generateAndLogApiKey('CRUD_READ_TABLES_AND_SLOTS [GET /api/restaurants/:id/tables]', {
      restaurantId,
      tablesCount: tables.length,
      availableSlotsCount: restaurant.timeSlots.length,
      status: '200 OK'
    });

    return {
      tables,
      timeSlots: restaurant.timeSlots
    };
  },

  // CRUD 1: GET Reservation History (Experiment 7 a, e; Exp 8 d)
  getReservations: async () => {
    await delay(400);
    const token = localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
    if (!token) {
      const err = new Error('Unauthorized: Authentication token missing');
      err.response = { status: 401, data: { message: 'Please log in to access reservations' } };
      throw err;
    }

    const stored = getStoredReservations();

    // Log API Key for GET reservations
    generateAndLogApiKey('CRUD_READ_RESERVATIONS [GET /api/reservations]', {
      endpoint: '/api/reservations',
      method: 'GET',
      status: '200 OK',
      totalCount: stored.length,
      data: stored
    });

    return stored;
  },

  // CRUD 2: POST Create Reservation (Experiment 7 b; Exp 8 c)
  createReservation: async (reservationData) => {
    await delay(500);
    const token = localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
    if (!token) {
      const err = new Error('Unauthorized: You must be logged in to create a reservation');
      err.response = { status: 401, data: { message: 'Authentication required' } };
      throw err;
    }

    // Validation
    if (!reservationData.restaurantId || !reservationData.date || !reservationData.time || !reservationData.tableId) {
      const err = new Error('Missing required reservation fields');
      err.response = { status: 400, data: { message: 'All booking fields are mandatory' } };
      throw err;
    }

    const newReservation = {
      id: 'res-' + Math.floor(1000 + Math.random() * 9000),
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      ...reservationData
    };

    const currentList = getStoredReservations();
    const updatedList = [newReservation, ...currentList];
    saveReservations(updatedList);

    // Log API Key for POST create reservation
    generateAndLogApiKey('CRUD_CREATE_RESERVATION [POST /api/reservations]', {
      endpoint: '/api/reservations',
      method: 'POST',
      status: '201 CREATED',
      createdRecord: newReservation
    });

    return newReservation;
  },

  // CRUD 3: PUT/PATCH Modify Reservation (Experiment 7 c)
  updateReservation: async (id, updateFields) => {
    await delay(450);
    const token = localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
    if (!token) {
      const err = new Error('Unauthorized');
      err.response = { status: 401, data: { message: 'Authentication required' } };
      throw err;
    }

    const currentList = getStoredReservations();
    const index = currentList.findIndex((r) => r.id === id);
    if (index === -1) {
      const err = new Error(`Reservation ${id} not found`);
      err.response = { status: 404, data: { message: 'Reservation not found' } };
      throw err;
    }

    const updatedReservation = {
      ...currentList[index],
      ...updateFields,
      updatedAt: new Date().toISOString()
    };

    currentList[index] = updatedReservation;
    saveReservations(currentList);

    // Log API Key for PUT update reservation
    generateAndLogApiKey('CRUD_UPDATE_RESERVATION [PUT /api/reservations/:id]', {
      endpoint: `/api/reservations/${id}`,
      method: 'PUT',
      status: '200 OK',
      id,
      updatedFields,
      updatedRecord: updatedReservation
    });

    return updatedReservation;
  },

  // CRUD 4: DELETE Cancel Reservation (Experiment 7 d)
  deleteReservation: async (id) => {
    await delay(400);
    const token = localStorage.getItem(STORAGE_AUTH_TOKEN_KEY);
    if (!token) {
      const err = new Error('Unauthorized');
      err.response = { status: 401, data: { message: 'Authentication required' } };
      throw err;
    }

    const currentList = getStoredReservations();
    const filtered = currentList.filter((r) => r.id !== id);
    if (filtered.length === currentList.length) {
      const err = new Error(`Reservation ${id} not found`);
      err.response = { status: 404, data: { message: 'Reservation not found' } };
      throw err;
    }

    saveReservations(filtered);

    // Log API Key for DELETE reservation
    generateAndLogApiKey('CRUD_DELETE_RESERVATION [DELETE /api/reservations/:id]', {
      endpoint: `/api/reservations/${id}`,
      method: 'DELETE',
      status: '200 OK',
      deletedReservationId: id,
      message: `Reservation ${id} cancelled successfully`
    });

    return { success: true, message: `Reservation ${id} cancelled successfully` };
  },

  // Reset to initial sample data
  resetDefaults: () => {
    localStorage.setItem(STORAGE_RESTAURANTS_KEY, JSON.stringify(initialRestaurants));
    localStorage.setItem(STORAGE_RESERVATIONS_KEY, JSON.stringify(sampleReservations));
    return { restaurants: initialRestaurants, reservations: sampleReservations };
  }
};
