import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import SearchBar from '../../components/hotel/SearchBar';
import FilterPanel from '../../components/hotel/FilterPanel';
import HotelList from '../../components/hotel/HotelList';
import HotelDetail from '../../components/hotel/HotelDetail';
import RoomSelection from '../../components/hotel/RoomSelection';
import BookingSummary from '../../components/hotel/BookingSummary';
import Payment from '../../components/hotel/Payment';
import { useBookingContext } from '../../context/BookingContext';
import { hotelApi } from '../../api/hotelApi';
import { generateAndLogApiKey } from '../../utils/apiKeyLogger';
import { Sparkles, Code2, CheckCircle2 } from 'lucide-react';

export const HotelBookingApp = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null); // Experiment 1 topic d: useRef hook to focus hotel search field

  // Experiment 1 topic b: useState hook to manage hotel search criteria, selected hotel, dates, guests, customer info
  const [searchLocation, setSearchLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Hotel data loading state
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  // Experiment 2 Context API access (for shared state demonstration)
  const bookingCtx = useBookingContext();

  // Experiment 1 topic c: useEffect to load hotel data when the application starts
  useEffect(() => {
    let active = true;
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await hotelApi.fetchHotels();
        if (active) {
          setHotels(data);
          // Pre-select first hotel for preview if none selected
          if (data.length > 0 && !selectedHotel) {
            setSelectedHotel(data[0]);
          }
        }
      } catch (err) {
        if (active) setErrorMessage(err.message || 'Failed to fetch hotels');
      } finally {
        if (active) setIsLoading(false);
      }
    };
    fetchInitialData();
    return () => {
      active = false;
    };
  }, []);

  // Experiment 1 topic c: useEffect to update hotel availability when location, check-in, or check-out changes
  useEffect(() => {
    if (selectedHotel && (searchLocation || checkInDate || checkOutDate)) {
      console.log('[Experiment 1 useEffect] Updating hotel availability for criteria:', {
        hotel: selectedHotel.name,
        location: searchLocation,
        checkInDate,
        checkOutDate
      });
    }
  }, [selectedHotel, searchLocation, checkInDate, checkOutDate]);

  // Experiment 1 topic d: Focus hotel search field using useRef
  const handleFocusSearch = useCallback(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Experiment 1 topic e: useMemo to efficiently calculate filtered hotels
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      if (searchLocation && searchLocation.trim()) {
        const q = searchLocation.toLowerCase().trim();
        const matches =
          hotel.city.toLowerCase().includes(q) ||
          hotel.location.toLowerCase().includes(q) ||
          hotel.name.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (maxPrice && hotel.pricePerNight > maxPrice) return false;
      if (minRating && hotel.starRating < minRating) return false;

      if (selectedAmenities.length > 0) {
        const matchesAll = selectedAmenities.every((a) => hotel.amenities.includes(a));
        if (!matchesAll) return false;
      }

      return true;
    });
  }, [hotels, searchLocation, maxPrice, minRating, selectedAmenities]);

  // Experiment 1 topic e: useMemo to efficiently calculate available rooms
  const availableRooms = useMemo(() => {
    if (!selectedHotel) return [];
    return selectedHotel.rooms.filter((room) => room.capacity >= guests);
  }, [selectedHotel, guests]);

  // Experiment 1 topic e: useMemo to calculate total stay duration (nights)
  const totalStayDuration = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = end.getTime() - start.getTime();
    if (diff <= 0) return 1;
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [checkInDate, checkOutDate]);

  // Experiment 1 topic e: useMemo to calculate total booking cost
  const { roomCost, taxes, additionalCharges, totalBookingCost } = useMemo(() => {
    if (!selectedRoom) {
      return { roomCost: 0, taxes: 0, additionalCharges: 0, totalBookingCost: 0 };
    }
    const cost = selectedRoom.price * totalStayDuration;
    const tax = Math.round(cost * 0.12); // 12% GST
    const charges = 450; // standard amenities & resort fee
    return {
      roomCost: cost,
      taxes: tax,
      additionalCharges: charges,
      totalBookingCost: cost + tax + charges
    };
  }, [selectedRoom, totalStayDuration]);

  // Experiment 1 topic f: useCallback for reusable selectHotel()
  const selectHotel = useCallback((hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null); // Reset room selection
    setIsBookingConfirmed(false);
    // Also sync to Context API (Experiment 2)
    bookingCtx.selectHotel(hotel);
  }, [bookingCtx]);

  // Experiment 1 topic f: useCallback for reusable selectRoom()
  const selectRoom = useCallback((room) => {
    setSelectedRoom(room);
    setIsBookingConfirmed(false);
    bookingCtx.selectRoom(room);
  }, [bookingCtx]);

  // Experiment 1 topic f: useCallback for reusable updateGuests()
  const updateGuests = useCallback((count) => {
    setGuests(count);
    bookingCtx.updateGuests(count);
  }, [bookingCtx]);

  // Experiment 1 topic f: useCallback for reusable confirmBooking()
  const confirmBooking = useCallback(() => {
    if (!selectedHotel || !selectedRoom) {
      alert('Please select a hotel and room before confirming!');
      return;
    }
    const booking = {
      id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
      hotel: selectedHotel,
      room: selectedRoom,
      checkInDate: checkInDate || new Date().toISOString().split('T')[0],
      checkOutDate: checkOutDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      guests,
      stayDuration: totalStayDuration,
      roomCost,
      taxes,
      additionalCharges,
      totalCost: totalBookingCost,
      timestamp: new Date().toLocaleString()
    };
    setConfirmedBookingData(booking);
    setIsBookingConfirmed(true);
    bookingCtx.confirmBooking();
  }, [selectedHotel, selectedRoom, checkInDate, checkOutDate, guests, totalStayDuration, roomCost, taxes, additionalCharges, totalBookingCost, bookingCtx]);

  const handleSearch = useCallback(() => {
    generateAndLogApiKey('HOTEL_SEARCH_QUERY', {
      location: searchLocation || 'All Locations',
      checkInDate: checkInDate || 'Any',
      checkOutDate: checkOutDate || 'Any',
      guests
    });
  }, [searchLocation, checkInDate, checkOutDate, guests]);

  const handlePriceChange = useCallback((price) => {
    setMaxPrice(price);
    generateAndLogApiKey('HOTEL_FILTER_PRICE_CHANGE', { maxPrice: price });
  }, []);

  const handleRatingChange = useCallback((rating) => {
    setMinRating(rating);
    generateAndLogApiKey('HOTEL_FILTER_RATING_CHANGE', { minRating: rating });
  }, []);

  const toggleAmenity = (amenity) => {
    generateAndLogApiKey('HOTEL_TOGGLE_AMENITY', { amenity });
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    generateAndLogApiKey('HOTEL_RESET_FILTERS', { action: 'All hotel filters reset' });
    setSearchLocation('');
    setMaxPrice(30000);
    setMinRating(0);
    setSelectedAmenities([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Search Bar (Experiment 1 topic d: useRef) */}
        <SearchBar
          searchRef={searchInputRef}
          location={searchLocation}
          checkIn={checkInDate}
          checkOut={checkOutDate}
          guests={guests}
          onLocationChange={setSearchLocation}
          onCheckInChange={setCheckInDate}
          onCheckOutChange={setCheckOutDate}
          onGuestsChange={updateGuests}
          onSearch={handleSearch}
        />

        {/* Confirmation Modal Banner */}
        {isBookingConfirmed && confirmedBookingData && (
          <div className="p-6 bg-emerald-50 border-2 border-emerald-500 rounded-3xl text-emerald-950 shadow-lg animate-in fade-in">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-lg font-black text-emerald-900">
                  Booking Confirmed Successfully! (#{confirmedBookingData.id})
                </h3>
                <p className="text-xs text-emerald-800">
                  Reserved <strong>{confirmedBookingData.room.type}</strong> at <strong>{confirmedBookingData.hotel.name}</strong> for {confirmedBookingData.guests} guest(s). Total: ₹{confirmedBookingData.totalCost.toLocaleString('en-IN')}.
                </p>
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => navigate('/bookings')}
                    className="text-xs font-bold underline text-emerald-800 hover:text-emerald-950"
                  >
                    View All My Bookings →
                  </button>
                  <button
                    onClick={() => setIsBookingConfirmed(false)}
                    className="text-xs text-emerald-700 hover:text-emerald-900"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hotel Catalog & Filters Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: FilterPanel */}
          <div className="lg:col-span-1">
            <FilterPanel
              maxPrice={maxPrice}
              minRating={minRating}
              selectedAmenities={selectedAmenities}
              onPriceChange={handlePriceChange}
              onRatingChange={handleRatingChange}
              onToggleAmenity={toggleAmenity}
              onReset={handleResetFilters}
            />
          </div>

          {/* Right Column: HotelList */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Featured Properties</h2>
                <p className="text-xs text-slate-500">
                  Showing {filteredHotels.length} luxury hotels matching your filters
                </p>
              </div>

              {selectedHotel && (
                <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                  Active Hotel: {selectedHotel.name}
                </span>
              )}
            </div>

            <HotelList
              hotels={filteredHotels}
              selectedHotelId={selectedHotel?.id}
              onSelectHotel={selectHotel}
              onViewDetails={(id) => navigate(`/hotel/${id}`)}
              loading={isLoading}
              error={errorMessage}
            />
          </div>
        </div>

        {/* Selected Hotel Detail & Interactive Booking Section */}
        {selectedHotel && (
          <section className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Room Selection & Booking Checkout
                </h2>
                <p className="text-xs text-slate-500">
                  Instant confirmation with transparent price breakdown
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Room Selection */}
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <RoomSelection
                  rooms={availableRooms}
                  selectedRoomId={selectedRoom?.id}
                  onSelectRoom={selectRoom}
                  minGuests={guests}
                />
              </div>

              {/* Booking Summary & Payment */}
              <div className="space-y-6">
                <BookingSummary
                  hotel={selectedHotel}
                  room={selectedRoom}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  guests={guests}
                  totalStayDuration={totalStayDuration}
                  roomCost={roomCost}
                  taxes={taxes}
                  additionalCharges={additionalCharges}
                  finalBookingAmount={totalBookingCost}
                />

                <Payment
                  finalAmount={totalBookingCost}
                  onConfirmBooking={confirmBooking}
                  disabled={!selectedRoom}
                />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HotelBookingApp;
