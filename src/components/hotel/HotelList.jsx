import React from 'react';
import HotelCard from './HotelCard';
import Loading from '../common/Loading';
import { SearchX } from 'lucide-react';

export const HotelList = ({
  hotels = [],
  selectedHotelId,
  onSelectHotel,
  onViewDetails,
  loading = false,
  error = null
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Loading key={i} variant="skeleton" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center">
        <p className="text-sm font-semibold text-rose-700">{error}</p>
      </div>
    );
  }

  // Experiment 2 topic h: Conditional rendering "No hotels available"
  if (!hotels || hotels.length === 0) {
    return (
      <div className="p-12 bg-white border border-dashed border-slate-300 rounded-3xl text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <SearchX className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-800">No hotels available</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          We couldn&apos;t find any hotels matching your current search parameters and filter settings. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          isSelected={selectedHotelId === hotel.id}
          onSelect={onSelectHotel}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default HotelList;
