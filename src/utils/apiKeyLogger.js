/**
 * API Key Generator & Console Logger
 * Generates default API keys and logs operations and CRUD outputs to the browser console in the default way.
 */

export const generateAndLogApiKey = (operation, details = {}) => {
  // Generate a default API key
  const rand = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  const apiKey = `api_key_${rand}`;

  // Default console logging
  console.log('API Key:', apiKey);
  console.log('Operation:', operation);
  if (details && Object.keys(details).length > 0) {
    console.log('CRUD Output:', details);
  }

  const logEntry = {
    apiKey,
    operation,
    details
  };

  return { apiKey, logEntry };
};

export const getOperationHistory = () => [];
export const clearOperationHistory = () => {};

export default generateAndLogApiKey;
