import React from 'react';
import { Bed, Users, Maximize, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

export const RoomSelection = ({
  rooms = [],
  selectedRoomId,
  onSelectRoom,
  minGuests = 1
}) => {
  // Experiment 2 topic h: Conditional rendering "No rooms available for selected dates"
  if (!rooms || rooms.length === 0) {
    return (
      <div className="p-8 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2">
        <AlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
        <h4 className="text-sm font-bold text-amber-900">No rooms available for selected dates</h4>
        <p className="text-xs text-amber-700">Please choose alternative dates or another hotel.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-800">Select Your Room</h3>
          <p className="text-xs text-slate-500">Pick from our luxurious rooms & suites tailored to your party.</p>
        </div>

        {/* Experiment 2 topic h: "Please select a room" hint */}
        {!selectedRoomId && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg animate-pulse">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Please select a room</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map((room) => {
          const isSelected = selectedRoomId === room.id;
          const isCapacityMatch = room.capacity >= minGuests;

          return (
            <div
              key={room.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`${room.type}, ₹${room.price} per night, max ${room.capacity} guests`}
              onClick={() => onSelectRoom && onSelectRoom(room)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (onSelectRoom) onSelectRoom(room);
                }
              }}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-sm text-slate-900">{room.type}</h4>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-indigo-600">
                      ₹{room.price.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-slate-400">/ night</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Up to {room.capacity} guests</span>
                    {!isCapacityMatch && (
                      <span className="text-[10px] text-amber-600 font-medium">
                        (Needs {minGuests} guests)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-3.5 h-3.5 text-slate-400" />
                    <span>{room.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="w-3.5 h-3.5 text-slate-400" />
                    <span>{room.size}</span>
                  </div>
                </div>
              </div>

              <Button
                variant={isSelected ? 'success' : 'outline'}
                size="sm"
                className="w-full mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRoom && onSelectRoom(room);
                }}
                icon={isSelected ? CheckCircle2 : undefined}
              >
                {isSelected ? 'Room Selected' : 'Choose Room'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomSelection;
