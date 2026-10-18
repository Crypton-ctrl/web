import { useState, useEffect, useMemo, useCallback } from 'react';
import { hotelApi } from '../api/hotelApi';
import { generateAndLogApiKey } from '../utils/apiKeyLogger';

/**
 * Custom Hook: useHotels (Experiment 2 topic a)
 * Manages hotel data, location search, travel dates, price, star-rating, and amenities filtering.
 */
export const useHotels = (initialFilters = {}) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    maxPrice: 30000,
    minRating: 0,
    selectedAmenities: [],
    ...initialFilters
  });

  // Load hotel data on mount (Experiment 1 topic c)
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await hotelApi.fetchHotels();
        if (isMounted) setHotels(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load hotels');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update hotel availability whenever location or dates change (Experiment 1 topic c)
  useEffect(() => {
    if (!filters.location && !filters.checkIn && !filters.checkOut) return;
    // Simulated live availability recalculation
    console.log('[useHotels] Recalculating availability for:', {
      location: filters.location,
      checkIn: filters.checkIn,
      checkOut: filters.checkOut
    });
  }, [filters.location, filters.checkIn, filters.checkOut]);

  // Efficient memoized filtering of hotels (Experiment 1 topic e, Experiment 2 topic a)
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      // Location filter
      if (filters.location && filters.location.trim()) {
        const query = filters.location.toLowerCase().trim();
        const matchesLoc =
          hotel.city.toLowerCase().includes(query) ||
          hotel.location.toLowerCase().includes(query) ||
          hotel.name.toLowerCase().includes(query);
        if (!matchesLoc) return false;
      }

      // Max price filter
      if (filters.maxPrice && hotel.pricePerNight > filters.maxPrice) {
        return false;
      }

      // Min star rating filter
      if (filters.minRating && hotel.starRating < filters.minRating) {
        return false;
      }

      // Amenities filter
      if (filters.selectedAmenities && filters.selectedAmenities.length > 0) {
        const hasAllAmenities = filters.selectedAmenities.every((amenity) =>
          hotel.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [hotels, filters]);

  const updateFilters = useCallback((updates) => {
    generateAndLogApiKey('HOTEL_FILTER_UPDATE', updates);
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    generateAndLogApiKey('HOTEL_FILTER_RESET', { action: 'All filters reset to initial state' });
    setFilters({
      location: '',
      checkIn: '',
      checkOut: '',
      maxPrice: 30000,
      minRating: 0,
      selectedAmenities: []
    });
  }, []);

  const toggleAmenity = useCallback((amenity) => {
    generateAndLogApiKey('HOTEL_TOGGLE_AMENITY', { amenity });
    setFilters((prev) => {
      const exists = prev.selectedAmenities.includes(amenity);
      return {
        ...prev,
        selectedAmenities: exists
          ? prev.selectedAmenities.filter((a) => a !== amenity)
          : [...prev.selectedAmenities, amenity]
      };
    });
  }, []);

  return {
    hotels,
    filteredHotels,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    toggleAmenity
  };
};

export default useHotels;
