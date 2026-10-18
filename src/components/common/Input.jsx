import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      type = 'text',
      className = '',
      id,
      name,
      required = false,
      ...props
    },
    ref
  ) => {
    const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <div className="relative rounded-xl shadow-xs">
          {Icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            className={`block w-full rounded-xl border text-sm transition-colors py-2.5 ${
              Icon ? 'pl-9' : 'pl-3.5'
            } pr-3.5 ${
              error
                ? 'border-rose-400 text-rose-900 placeholder-rose-300 focus:border-rose-500 focus:ring-rose-500 bg-rose-50/30'
                : 'border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500 bg-white'
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 font-medium animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
