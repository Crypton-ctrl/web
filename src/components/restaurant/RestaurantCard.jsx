import React from 'react';
import { Star, MapPin, Clock, Utensils, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export const RestaurantCard = ({ restaurant, onReserve, onViewDetails }) => {
  if (!restaurant) return null;

  return (
    <div
      data-testid={`restaurant-card-${restaurant.id}`}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Restaurant Image with Cuisine Badge */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-xs">
            <Utensils className="w-3 h-3 text-indigo-600" />
            <span>{restaurant.cuisine}</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{restaurant.rating}</span>
            <span className="text-[10px] text-slate-300">({restaurant.reviewsCount})</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
              {restaurant.name}
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {restaurant.priceRange}
            </span>
          </div>

          <p className="flex items-center gap-1 text-xs text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{restaurant.location}</span>
          </p>

          <p className="flex items-center gap-1 text-xs text-slate-500 mb-3">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{restaurant.operatingHours}</span>
          </p>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {restaurant.description}
          </p>

          <div className="text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100 flex justify-between">
            <span>Avg. Cost for two:</span>
            <span className="font-bold text-slate-800">₹{restaurant.averageCostForTwo}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 border-t border-slate-100 flex items-center gap-2">
        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(restaurant.id)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition text-center"
          >
            Details
          </button>
        )}

        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onReserve && onReserve(restaurant)}
          icon={ArrowRight}
        >
          Book Table
        </Button>
      </div>
    </div>
  );
};

export default RestaurantCard;
