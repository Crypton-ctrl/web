import React from 'react';
import { Calendar, Users, Hotel, ShieldAlert, Sparkles } from 'lucide-react';

export const BookingSummary = ({
  hotel,
  room,
  checkInDate,
  checkOutDate,
  guests = 1,
  totalStayDuration = 1,
  roomCost = 0,
  taxes = 0,
  additionalCharges = 0,
  finalBookingAmount = 0
}) => {
  // Experiment 2 topic h: Conditional rendering "Your booking is empty"
  if (!hotel && !room) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-800">Your booking is empty</h4>
        <p className="text-xs text-slate-500">
          Please select a hotel and room from the catalog to see price calculations and booking breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-sm text-slate-900">Booking Summary</h3>
          <p className="text-[11px] text-slate-500">Transparent pricing & taxes included</p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          <Sparkles className="w-3 h-3 text-emerald-500" />
          <span>Best Rate Guarantee</span>
        </span>
      </div>

      {/* Selected Hotel & Room details */}
      {hotel && (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Hotel className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-semibold text-slate-800">{hotel.name}</span>
          </div>
          <p className="text-[11px] text-slate-500 pl-5">{hotel.location}</p>
        </div>
      )}

      {room ? (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          <div className="flex justify-between items-center font-bold text-slate-800">
            <span>{room.type}</span>
            <span className="text-indigo-600">₹{room.price.toLocaleString('en-IN')}/night</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {room.beds} • Max {room.capacity} guests
          </div>
        </div>
      ) : (
        <p className="text-xs text-amber-600 font-medium italic">
          * Please select a room to view exact costs
        </p>
      )}

      {/* Stay info */}
      <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Duration</span>
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            {totalStayDuration} {totalStayDuration === 1 ? 'Night' : 'Nights'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Party</span>
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            {guests} {guests === 1 ? 'Guest' : 'Guests'}
          </span>
        </div>
      </div>

      {/* Price breakdown (Calculated via useMemo in Exp 1 / 2) */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Room base rate ({totalStayDuration} night{totalStayDuration > 1 ? 's' : ''}):</span>
          <span className="font-semibold text-slate-800">₹{roomCost.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Taxes & GST (12%):</span>
          <span className="font-semibold text-slate-800">₹{taxes.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Service & Amenities Fee:</span>
          <span className="font-semibold text-slate-800">₹{additionalCharges.toLocaleString('en-IN')}</span>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
          <span>Total Amount:</span>
          <span className="text-lg font-extrabold text-indigo-600">
            ₹{finalBookingAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
