import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import SearchBar from '../../components/hotel/SearchBar';
import FilterPanel from '../../components/hotel/FilterPanel';
import HotelList from '../../components/hotel/HotelList';
import { useHotels } from '../../hooks/useHotels';
import { useBookingContext } from '../../context/BookingContext';

export const HotelListPage = () => {
  const navigate = useNavigate();
  const { selectHotel, selectedHotel } = useBookingContext();

  // Experiment 2 topic a: Custom hook useHotels
  const {
    filteredHotels,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    toggleAmenity
  } = useHotels();

  const handleSelectHotel = (hotel) => {
    selectHotel(hotel);
    navigate(`/hotel/${hotel.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Explore All Hotels & Resorts
          </h1>
          <p className="text-xs text-slate-500">
            Powered by custom hook <code className="text-indigo-600 font-mono">useHotels()</code> and shared through <code className="text-indigo-600 font-mono">BookingContext</code>
          </p>
        </div>

        <SearchBar
          location={filters.location}
          checkIn={filters.checkIn}
          checkOut={filters.checkOut}
          onLocationChange={(loc) => updateFilters({ location: loc })}
          onCheckInChange={(ci) => updateFilters({ checkIn: ci })}
          onCheckOutChange={(co) => updateFilters({ checkOut: co })}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel
              maxPrice={filters.maxPrice}
              minRating={filters.minRating}
              selectedAmenities={filters.selectedAmenities}
              onPriceChange={(price) => updateFilters({ maxPrice: price })}
              onRatingChange={(rating) => updateFilters({ minRating: rating })}
              onToggleAmenity={toggleAmenity}
              onReset={resetFilters}
            />
          </div>

          <div className="lg:col-span-3">
            <HotelList
              hotels={filteredHotels}
              selectedHotelId={selectedHotel?.id}
              onSelectHotel={handleSelectHotel}
              onViewDetails={(id) => navigate(`/hotel/${id}`)}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HotelListPage;
