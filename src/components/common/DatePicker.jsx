import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

export const DatePicker = ({
  label,
  value,
  onChange,
  error,
  min,
  max,
  name,
  id,
  required = false,
  className = ''
}) => {
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, '-') : 'date-picker');
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-xs">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <Calendar className="h-4 w-4" />
        </div>
        <input
          type="date"
          id={inputId}
          name={name}
          value={value || ''}
          min={min || todayStr}
          max={max}
          onChange={onChange}
          className={`block w-full rounded-xl border text-sm transition-colors py-2.5 pl-9 pr-3.5 ${
            error
              ? 'border-rose-400 text-rose-900 bg-rose-50/30 focus:border-rose-500 focus:ring-rose-500'
              : 'border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 bg-white'
          }`}
          aria-invalid={!!error}
        />
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default DatePicker;
