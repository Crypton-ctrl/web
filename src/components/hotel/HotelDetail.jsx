import React from 'react';
import { Star, MapPin, Check, ArrowLeft, Calendar, ShieldCheck, Phone, Mail } from 'lucide-react';
import RoomSelection from './RoomSelection';
import Button from '../common/Button';

export const HotelDetail = ({
  hotel,
  selectedRoomId,
  onSelectRoom,
  onProceedBooking,
  onBack,
  minGuests = 1
}) => {
  if (!hotel) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Bar with Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hotel Listings</span>
        </button>
      )}

      {/* Hero Showcase */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
        <div className="relative h-72 md:h-96 w-full bg-slate-900">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>{hotel.starRating} Star Luxury Hotel</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md">
                ⭐ {hotel.ratingScore} ({hotel.reviewsCount} verified reviews)
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
              {hotel.name}
            </h1>
            <p className="flex items-center gap-1 text-xs md:text-sm text-slate-200">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{hotel.location}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Description & Amenities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-3">About this Property</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {hotel.description}
            </p>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Included Amenities & Perks
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                >
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <RoomSelection
              rooms={hotel.rooms}
              selectedRoomId={selectedRoomId}
              onSelectRoom={onSelectRoom}
              minGuests={minGuests}
            />
          </div>
        </div>

        {/* Quick Booking Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <span className="text-xs text-slate-400">Starting from</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-indigo-600">
                  ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500">/ night</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Free cancellation up to 24h prior</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-700 bg-indigo-50 p-2 rounded-lg">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Instant Confirmation</span>
              </div>
            </div>

            {onProceedBooking && (
              <Button
                variant="primary"
                size="lg"
                className="w-full mt-4"
                disabled={!selectedRoomId}
                onClick={onProceedBooking}
              >
                {selectedRoomId ? 'Proceed to Booking →' : 'Select a Room to Continue'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
