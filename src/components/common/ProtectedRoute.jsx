import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loading } from './Loading';

export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading message="Verifying authentication session..." variant="full" />;
  }

  if (!isAuthenticated) {
    // Experiment 4 topic d: Redirect unauthenticated users using Navigate and save from location
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
