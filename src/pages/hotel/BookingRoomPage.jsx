import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomSelection from '../../components/hotel/RoomSelection';
import Button from '../../components/common/Button';
import { useBookingContext } from '../../context/BookingContext';
import { ArrowRight, Bed } from 'lucide-react';

export const BookingRoomPage = () => {
  const navigate = useNavigate();
  const { selectedHotel, selectedRoom, selectRoom, guests } = useBookingContext();

  const handleContinue = () => {
    // Experiment 3 topic g: useNavigate programmatically through the reservation process
    navigate('/booking/guest');
  };

  if (!selectedHotel) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4">
        <p className="text-sm text-slate-600">Please choose a hotel to view available rooms.</p>
        <Button variant="primary" onClick={() => navigate('/hotels')}>
          Select Hotel First
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <RoomSelection
        rooms={selectedHotel.rooms}
        selectedRoomId={selectedRoom?.id}
        onSelectRoom={selectRoom}
        minGuests={guests}
      />

      <div className="pt-4 border-t border-slate-100 flex justify-end">
        <Button
          variant="primary"
          size="md"
          disabled={!selectedRoom}
          onClick={handleContinue}
          icon={ArrowRight}
        >
          {selectedRoom ? 'Next: Enter Guest Details →' : 'Select a Room to Continue'}
        </Button>
      </div>
    </div>
  );
};

export default BookingRoomPage;
