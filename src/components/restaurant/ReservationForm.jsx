import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Clock, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import Input from '../common/Input';
import DatePicker from '../common/DatePicker';
import Button from '../common/Button';
import { validateReservationForm } from '../../utils/validation';
import { sanitizeInput } from '../../utils/security';

export const ReservationForm = ({
  initialValues = {},
  tables = [],
  timeSlots = [],
  onSubmit,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: initialValues.customerName || initialValues.name || '',
    email: initialValues.customerEmail || initialValues.email || '',
    phone: initialValues.customerPhone || initialValues.phone || '',
    date: initialValues.date || new Date().toISOString().split('T')[0],
    time: initialValues.time || (timeSlots[0] || '07:30 PM'),
    guests: initialValues.guests || 2,
    tableId: initialValues.tableId || initialValues.table?.id || '',
    specialRequests: initialValues.specialRequests || ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear field-level error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sanitize user inputs (Experiment 10 topic f)
    const cleaned = {
      ...formData,
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      specialRequests: sanitizeInput(formData.specialRequests)
    };

    // Validate form (Experiment 4 topic f)
    const validation = validateReservationForm(cleaned);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (onSubmit) {
      onSubmit(cleaned);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn" noValidate>
      {/* Contact Details */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
          Step 1: Diner Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Full Name"
            name="name"
            required
            placeholder="e.g. Aarav Sharma"
            icon={User}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            error={touched.name ? errors.name : null}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            required
            placeholder="e.g. aarav@example.com"
            icon={Mail}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : null}
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            required
            placeholder="e.g. 9876543210"
            icon={Phone}
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            error={touched.phone ? errors.phone : null}
          />
        </div>
      </div>

      {/* Date, Time & Guest Count */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
          Step 2: Date, Time & Guest Count
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DatePicker
            label="Reservation Date"
            name="date"
            required
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            error={errors.date}
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Time Slot <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
              <select
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="block w-full rounded-xl border border-slate-300 text-sm py-2.5 pl-9 pr-3.5 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            {errors.time && (
              <p className="mt-1 text-xs text-rose-600">{errors.time}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Party Size (Guests) <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.guests}
              onChange={(e) => handleChange('guests', Number(e.target.value))}
              className="block w-full rounded-xl border border-slate-300 text-sm py-2.5 px-3.5 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
            {errors.guests && (
              <p className="mt-1 text-xs text-rose-600">{errors.guests}</p>
            )}
          </div>
        </div>
      </div>

      {/* Table Selection Dropdown / Selector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
          Step 3: Table Selection
        </h4>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Select Table <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.tableId}
            onChange={(e) => handleChange('tableId', e.target.value)}
            className={`block w-full rounded-xl border text-sm py-2.5 px-3.5 bg-white ${
              errors.tableId ? 'border-rose-400 text-rose-900' : 'border-slate-300'
            }`}
          >
            <option value="">-- Choose a table --</option>
            {tables.map((t) => (
              <option key={t.id} value={t.id} disabled={t.available === false}>
                Table {t.number} ({t.type} - Max {t.capacity} guests){' '}
                {t.available === false ? '[Already Booked]' : ''}
              </option>
            ))}
          </select>
          {errors.tableId && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.tableId}</span>
            </p>
          )}
        </div>
      </div>

      {/* Special Requests */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Special Requests / Dietary Notes (Optional)
          </label>
          <span className="text-[11px] text-slate-400">
            {formData.specialRequests.length}/250
          </span>
        </div>
        <textarea
          rows={3}
          maxLength={250}
          value={formData.specialRequests}
          onChange={(e) => handleChange('specialRequests', e.target.value)}
          placeholder="e.g. Birthday celebration, candle arrangement, gluten-free preference, high chair needed..."
          className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.specialRequests && (
          <p className="text-xs text-rose-600">{errors.specialRequests}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          icon={CheckCircle2}
        >
          Confirm Reservation
        </Button>
      </div>
    </form>
  );
};

export default ReservationForm;
