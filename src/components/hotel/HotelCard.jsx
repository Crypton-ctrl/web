import React from 'react';
import { Star, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export const HotelCard = ({ hotel, isSelected, onSelect, onViewDetails }) => {
  if (!hotel) return null;

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-lg'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-xl'
      }`}
    >
      <div>
        {/* Hotel Image with Badges */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{hotel.starRating} Star</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-xs font-bold">
            ₹{hotel.pricePerNight.toLocaleString('en-IN')}{' '}
            <span className="font-normal text-slate-300 text-[10px]">/ night</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
              {hotel.name}
            </h3>
          </div>

          <p className="flex items-center gap-1 text-xs text-slate-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{hotel.location}</span>
          </p>

          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {hotel.description}
          </p>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-500">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center gap-2 mt-2">
        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(hotel.id)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition text-center"
          >
            View Details
          </button>
        )}

        <Button
          variant={isSelected ? 'success' : 'primary'}
          size="sm"
          className="flex-1"
          onClick={() => onSelect && onSelect(hotel)}
          icon={isSelected ? CheckCircle2 : ArrowRight}
        >
          {isSelected ? 'Selected' : 'Select Hotel'}
        </Button>
      </div>
    </div>
  );
};

export default HotelCard;
