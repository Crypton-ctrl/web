import React, { useRef } from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import Button from '../common/Button';

export const SearchBar = ({
  location,
  checkIn,
  checkOut,
  guests,
  onLocationChange,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onSearch,
  searchRef: externalRef
}) => {
  // Use internal ref if external is not provided (Experiment 1 topic d)
  const internalRef = useRef(null);
  const activeInputRef = externalRef || internalRef;

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 md:p-6 transition-all hover:shadow-2xl">
      <div className="pb-4 mb-4 border-b border-slate-100">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-600" />
          <span>Find Your Perfect Stay</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Search luxury hotels, resorts, and private villas across top destinations
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (onSearch) onSearch();
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Location Input with useRef target */}
        <div>
          <label htmlFor="hotel-location" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Destination / City
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <MapPin className="h-4 w-4" />
            </div>
            <input
              ref={activeInputRef}
              id="hotel-location"
              type="text"
              value={location || ''}
              onChange={(e) => onLocationChange && onLocationChange(e.target.value)}
              placeholder="e.g. Mumbai, Goa, Manali..."
              className="block w-full rounded-xl border border-slate-300 text-sm py-2.5 pl-9 pr-3.5 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div>
          <label htmlFor="hotel-checkin" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Check-In Date
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Calendar className="h-4 w-4" />
            </div>
            <input
              id="hotel-checkin"
              type="date"
              min={todayStr}
              value={checkIn || ''}
              onChange={(e) => onCheckInChange && onCheckInChange(e.target.value)}
              className="block w-full rounded-xl border border-slate-300 text-sm py-2.5 pl-9 pr-3.5 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div>
          <label htmlFor="hotel-checkout" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Check-Out Date
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Calendar className="h-4 w-4" />
            </div>
            <input
              id="hotel-checkout"
              type="date"
              min={checkIn || todayStr}
              value={checkOut || ''}
              onChange={(e) => onCheckOutChange && onCheckOutChange(e.target.value)}
              className="block w-full rounded-xl border border-slate-300 text-sm py-2.5 pl-9 pr-3.5 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        {/* Guests & Submit */}
        <div className="flex flex-col sm:flex-row gap-2 items-end">
          <div className="w-full sm:w-1/2">
            <label htmlFor="hotel-guests" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Guests
            </label>
            <div className="relative rounded-xl shadow-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Users className="h-4 w-4" />
              </div>
              <select
                id="hotel-guests"
                value={guests || 2}
                onChange={(e) => onGuestsChange && onGuestsChange(Number(e.target.value))}
                className="block w-full rounded-xl border border-slate-300 text-sm py-2.5 pl-9 pr-3.5 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <Button
              type="submit"
              variant="primary"
              className="w-full h-[42px]"
              icon={Search}
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
