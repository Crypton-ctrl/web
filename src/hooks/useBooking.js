import { useState, useEffect, useMemo, useCallback } from 'react';
import { generateAndLogApiKey } from '../utils/apiKeyLogger';

const STORAGE_BOOKING_KEY = 'agy_active_hotel_booking';

const getInitialBookingState = () => {
  const saved = localStorage.getItem(STORAGE_BOOKING_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return {
    selectedHotel: null,
    selectedRoom: null,
    checkInDate: '',
    checkOutDate: '',
    guests: 2,
    guestDetails: {
      fullName: '',
      email: '',
      phone: '',
      specialRequests: ''
    },
    bookingId: null,
    confirmedAt: null
  };
};

/**
 * Custom Hook: useBooking (Experiment 2 topics b, e, f, g)
 */
export const useBooking = () => {
  const [bookingState, setBookingState] = useState(getInitialBookingState);

  // Synchronize booking info with localStorage (Experiment 2 topic g)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKING_KEY, JSON.stringify(bookingState));
    } catch (e) {
      console.error('Failed to sync booking to localStorage', e);
    }
  }, [bookingState]);

  // Calculations using useMemo (Experiment 2 topic e)
  const totalStayDuration = useMemo(() => {
    if (!bookingState.checkInDate || !bookingState.checkOutDate) return 1;
    const start = new Date(bookingState.checkInDate);
    const end = new Date(bookingState.checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 1;
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [bookingState.checkInDate, bookingState.checkOutDate]);

  const roomCost = useMemo(() => {
    if (!bookingState.selectedRoom) return 0;
    return bookingState.selectedRoom.price * totalStayDuration;
  }, [bookingState.selectedRoom, totalStayDuration]);

  const taxes = useMemo(() => {
    // 12% GST
    return Math.round(roomCost * 0.12);
  }, [roomCost]);

  const additionalCharges = useMemo(() => {
    // ₹450 service & amenities fee if a room is chosen
    return bookingState.selectedRoom ? 450 : 0;
  }, [bookingState.selectedRoom]);

  const finalBookingAmount = useMemo(() => {
    return roomCost + taxes + additionalCharges;
  }, [roomCost, taxes, additionalCharges]);

  // Memoized reservation operations (Experiment 2 topic f)
  const selectHotel = useCallback((hotel) => {
    generateAndLogApiKey('HOTEL_SELECT_PROPERTY', {
      hotelId: hotel?.id,
      hotelName: hotel?.name,
      city: hotel?.city,
      basePrice: hotel?.pricePerNight
    });

    setBookingState((prev) => ({
      ...prev,
      selectedHotel: hotel,
      selectedRoom: null // reset room when hotel changes
    }));
  }, []);

  const selectRoom = useCallback((room) => {
    generateAndLogApiKey('HOTEL_SELECT_ROOM_TYPE', {
      roomId: room?.id,
      roomType: room?.type,
      pricePerNight: room?.price,
      capacity: room?.capacity
    });

    setBookingState((prev) => ({
      ...prev,
      selectedRoom: room
    }));
  }, []);

  const updateGuests = useCallback((guests) => {
    const val = Math.max(1, Math.min(10, Number(guests) || 1));
    generateAndLogApiKey('HOTEL_UPDATE_GUEST_COUNT', {
      guests: val
    });

    setBookingState((prev) => ({
      ...prev,
      guests: val
    }));
  }, []);

  const updateDates = useCallback((checkInDate, checkOutDate) => {
    generateAndLogApiKey('HOTEL_UPDATE_RESERVATION_DATES', {
      checkInDate,
      checkOutDate
    });

    setBookingState((prev) => ({
      ...prev,
      checkInDate,
      checkOutDate
    }));
  }, []);

  const updateGuestDetails = useCallback((details) => {
    generateAndLogApiKey('HOTEL_UPDATE_GUEST_INFO', details);

    setBookingState((prev) => ({
      ...prev,
      guestDetails: {
        ...prev.guestDetails,
        ...details
      }
    }));
  }, []);

  const confirmBooking = useCallback(() => {
    const newId = 'HTL-BK-' + Math.floor(100000 + Math.random() * 900000);
    const confirmedRecord = {
      ...bookingState,
      bookingId: newId,
      confirmedAt: new Date().toISOString(),
      totalStayDuration,
      roomCost,
      taxes,
      additionalCharges,
      finalBookingAmount
    };

    // Save to user bookings history
    const existingHistory = JSON.parse(localStorage.getItem('agy_hotel_history') || '[]');
    localStorage.setItem('agy_hotel_history', JSON.stringify([confirmedRecord, ...existingHistory]));

    // Log API Key for POST create hotel booking
    generateAndLogApiKey('HOTEL_CREATE_BOOKING [POST /api/hotel-bookings]', {
      endpoint: '/api/hotel-bookings',
      method: 'POST',
      status: '201 CREATED',
      bookingId: newId,
      hotelName: confirmedRecord.selectedHotel?.name,
      roomType: confirmedRecord.selectedRoom?.type,
      totalPaid: finalBookingAmount,
      guestEmail: confirmedRecord.guestDetails?.email
    });

    setBookingState(confirmedRecord);
    return confirmedRecord;
  }, [bookingState, totalStayDuration, roomCost, taxes, additionalCharges, finalBookingAmount]);

  const clearBooking = useCallback(() => {
    generateAndLogApiKey('HOTEL_CLEAR_BOOKING [DELETE /api/active-booking]', {
      endpoint: '/api/active-booking',
      method: 'DELETE',
      status: '200 OK',
      message: 'Active booking session reset'
    });

    const emptyState = {
      selectedHotel: null,
      selectedRoom: null,
      checkInDate: '',
      checkOutDate: '',
      guests: 2,
      guestDetails: {
        fullName: '',
        email: '',
        phone: '',
        specialRequests: ''
      },
      bookingId: null,
      confirmedAt: null
    };
    setBookingState(emptyState);
    localStorage.removeItem(STORAGE_BOOKING_KEY);
  }, []);

  return {
    ...bookingState,
    totalStayDuration,
    roomCost,
    taxes,
    additionalCharges,
    finalBookingAmount,
    selectHotel,
    selectRoom,
    updateGuests,
    updateDates,
    updateGuestDetails,
    confirmBooking,
    clearBooking
  };
};

export default useBooking;
