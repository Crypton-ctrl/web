import React, { createContext, useContext, useState, useEffect } from 'react';
import { restaurantApi } from '../api/restaurantApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => restaurantApi.getCurrentUser());
  const [token, setToken] = useState(() => localStorage.getItem('agy_auth_token'));
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Listen to expired token event dispatched by API client interceptor (Experiment 8)
  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      setToken(null);
      setAuthError('Session expired. Please log in again.');
    };

    window.addEventListener('auth:expired', handleAuthExpired);
    return () => window.removeEventListener('auth:expired', handleAuthExpired);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await restaurantApi.login(email, password);
      setUser(response.user);
      setToken(response.token);
      return { success: true, user: response.user };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    restaurantApi.logout();
    setUser(null);
    setToken(null);
    setAuthError(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    authError,
    setAuthError,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
