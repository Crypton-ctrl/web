import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import DatePicker from '../../components/common/DatePicker';
import Button from '../../components/common/Button';
import { useBookingContext } from '../../context/BookingContext';
import { validateEmail, validatePhone } from '../../utils/validation';
import { User, Mail, Phone, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

export const BookingGuestPage = () => {
  const navigate = useNavigate();
  const {
    guestDetails,
    updateGuestDetails,
    checkInDate,
    checkOutDate,
    guests,
    updateDates,
    updateGuests
  } = useBookingContext();

  const [formData, setFormData] = useState({
    fullName: guestDetails.fullName || '',
    email: guestDetails.email || '',
    phone: guestDetails.phone || '',
    checkIn: checkInDate || new Date().toISOString().split('T')[0],
    checkOut: checkOutDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: guests || 2,
    specialRequests: guestDetails.specialRequests || ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Guest name is required';

    const emailErr = validateEmail(formData.email);
    if (emailErr) errs.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) errs.phone = phoneErr;

    if (!formData.checkIn) errs.checkIn = 'Check-in date is required';
    if (!formData.checkOut) errs.checkOut = 'Check-out date is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Save into Context
    updateGuestDetails({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      specialRequests: formData.specialRequests
    });
    updateDates(formData.checkIn, formData.checkOut);
    updateGuests(formData.guests);

    // Experiment 3 topic g: useNavigate to Booking Summary
    navigate('/booking/summary');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6"
    >
      <div>
        <h2 className="text-base font-bold text-slate-900">
          Step 2: Guest Details & Stay Dates
        </h2>
        <p className="text-xs text-slate-500">
          Controlled reservation form with client-side validation (Experiment 3 topic h)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Full Name"
          required
          icon={User}
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={errors.fullName}
          placeholder="e.g. Aarav Sharma"
        />

        <Input
          label="Email Address"
          type="email"
          required
          icon={Mail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          placeholder="e.g. aarav@example.com"
        />

        <Input
          label="Phone Number"
          type="tel"
          required
          icon={Phone}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          placeholder="e.g. 9876543210"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
        <DatePicker
          label="Check-In Date"
          required
          value={formData.checkIn}
          onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
          error={errors.checkIn}
        />

        <DatePicker
          label="Check-Out Date"
          required
          min={formData.checkIn}
          value={formData.checkOut}
          onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
          error={errors.checkOut}
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Total Guests
          </label>
          <select
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
            className="block w-full rounded-xl border border-slate-300 text-sm py-2.5 px-3.5 bg-white"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Special Requests (Optional)
        </label>
        <textarea
          rows={3}
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          placeholder="Any requests for high floor, quiet room, late check-in..."
          className="w-full text-xs rounded-xl border border-slate-300 p-3"
        />
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate('/booking/room')}
          icon={ArrowLeft}
        >
          Back to Rooms
        </Button>

        <Button type="submit" variant="primary" size="md" icon={ArrowRight}>
          Next: Review Summary & Payment →
        </Button>
      </div>
    </form>
  );
};

export default BookingGuestPage;
