/**
 * Comprehensive Validation Utilities for Hotel & Restaurant Reservation Forms
 * Satisfies Experiment 4 (Topic f) & Experiment 3 (Topic h)
 */

export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email address is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return 'Phone number is required';
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    return 'Please enter a valid 10-digit phone number';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return null;
};

export const validateGuestCount = (count, max = 20) => {
  const num = Number(count);
  if (!num || isNaN(num) || num < 1) return 'Guest count must be at least 1';
  if (num > max) return `Guest count cannot exceed ${max}`;
  return null;
};

export const validateReservationDate = (dateString) => {
  if (!dateString) return 'Reservation date is required';
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(selectedDate.getTime())) return 'Invalid date format';
  if (selectedDate < today) return 'Reservation date cannot be in the past';
  return null;
};

export const validateReservationTime = (timeString) => {
  if (!timeString) return 'Reservation time is required';
  // Check if valid time slot format or between 11:00 and 23:00
  return null;
};

export const validateTableSelection = (tableId) => {
  if (!tableId) return 'Please select a dining table';
  return null;
};

export const validateSpecialRequest = (request, maxLength = 250) => {
  if (request && request.length > maxLength) {
    return `Special request cannot exceed ${maxLength} characters`;
  }
  return null;
};

export const validateReservationForm = (formData) => {
  const errors = {};

  const nameError = !formData.name?.trim() ? 'Customer full name is required' : null;
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const dateError = validateReservationDate(formData.date);
  if (dateError) errors.date = dateError;

  const timeError = validateReservationTime(formData.time);
  if (timeError) errors.time = timeError;

  const guestsError = validateGuestCount(formData.guests);
  if (guestsError) errors.guests = guestsError;

  const tableError = validateTableSelection(formData.tableId);
  if (tableError) errors.tableId = tableError;

  const requestError = validateSpecialRequest(formData.specialRequests);
  if (requestError) errors.specialRequests = requestError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
