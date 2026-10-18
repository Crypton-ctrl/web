import React, { createContext, useContext } from 'react';
import { useBooking } from '../hooks/useBooking';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const booking = useBooking();

  return (
    <BookingContext.Provider value={booking}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};

export default BookingContext;
