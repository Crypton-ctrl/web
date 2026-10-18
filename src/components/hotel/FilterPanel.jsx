import React from 'react';
import { SlidersHorizontal, Star, RotateCcw, Check } from 'lucide-react';

const ALL_AMENITIES = [
  'Free WiFi',
  'Swimming Pool',
  'Luxury Spa',
  'Fitness Gym',
  'Free Breakfast',
  'Valet Parking',
  'Airport Shuttle'
];

export const FilterPanel = ({
  maxPrice = 30000,
  minRating = 0,
  selectedAmenities = [],
  onPriceChange,
  onRatingChange,
  onToggleAmenity,
  onReset
}) => {
  return (
    <aside className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs h-fit space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-sm text-slate-800">Filter Hotels</h3>
        </div>
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="price-range" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Max Price / Night
          </label>
          <span className="text-xs font-bold text-indigo-600">
            ₹{Number(maxPrice).toLocaleString('en-IN')}
          </span>
        </div>
        <input
          id="price-range"
          type="range"
          min="3000"
          max="30000"
          step="500"
          value={maxPrice}
          onChange={(e) => onPriceChange && onPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>₹3,000</span>
          <span>₹30,000+</span>
        </div>
      </div>

      {/* Star Rating Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Star Rating
        </label>
        <div className="flex flex-wrap gap-1.5">
          {[0, 3, 4, 5].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() => onRatingChange && onRatingChange(stars)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border transition ${
                minRating === stars
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {stars === 0 ? (
                'All Ratings'
              ) : (
                <>
                  <span>{stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>+</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
          Amenities
        </label>
        <div className="space-y-2">
          {ALL_AMENITIES.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 group-hover:border-indigo-400 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => onToggleAmenity && onToggleAmenity(amenity)}
                />
                <span className={isChecked ? 'font-semibold text-indigo-900' : ''}>
                  {amenity}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
