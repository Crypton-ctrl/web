/**
 * Front-end Security Utilities
 * Satisfies Experiment 10 (Topic f: Front-end security practices)
 */

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  // Strip potential HTML/script tags to prevent XSS injection
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const cleaned = Array.isArray(obj) ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      cleaned[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null) {
      cleaned[key] = sanitizeObject(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
};
