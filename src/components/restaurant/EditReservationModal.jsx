import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import DatePicker from '../common/DatePicker';
import Button from '../common/Button';
import { Save, Calendar, Clock, Users, Armchair } from 'lucide-react';
import { sanitizeInput } from '../../utils/security';

export const EditReservationModal = ({
  isOpen,
  onClose,
  reservation,
  onSave,
  isLoading = false
}) => {
  if (!reservation) return null;

  const [date, setDate] = useState(reservation.date || '');
  const [time, setTime] = useState(reservation.time || '');
  const [guests, setGuests] = useState(reservation.guests || 2);
  const [specialRequests, setSpecialRequests] = useState(reservation.specialRequests || '');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) {
      setError('Date and time are required');
      return;
    }

    const updated = {
      date,
      time,
      guests: Number(guests),
      specialRequests: sanitizeInput(specialRequests)
    };

    onSave(reservation.id, updated);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit Reservation #${reservation.id}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3">
          <p className="text-xs font-bold text-slate-800">{reservation.restaurantName}</p>
          <p className="text-[11px] text-slate-500">{reservation.tableNumber} • {reservation.tableType}</p>
        </div>

        <DatePicker
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Time Slot
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full rounded-xl border border-slate-300 text-sm py-2.5 px-3 bg-white"
            >
              {['12:00 PM', '12:30 PM', '01:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:30 PM'].map(
                (slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="block w-full rounded-xl border border-slate-300 text-sm py-2.5 px-3 bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                <option key={num} value={num}>
                  {num} Guests
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Special Requests
          </label>
          <textarea
            rows={2}
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="w-full text-xs rounded-xl border border-slate-300 p-2.5"
          />
        </div>

        {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isLoading}
            icon={Save}
          >
            Save Changes (PUT)
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditReservationModal;
