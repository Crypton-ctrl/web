import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import Loading from './components/common/Loading';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Lazy loading for route-level code splitting (Experiment 10 topics a & b)
const HotelBookingApp = lazy(() => import('./pages/hotel/HotelBookingApp'));
const HotelListPage = lazy(() => import('./pages/hotel/HotelListPage'));
const HotelDetailPage = lazy(() => import('./pages/hotel/HotelDetailPage'));
const RoomsPage = lazy(() => import('./pages/hotel/RoomsPage'));
const BookingLayout = lazy(() => import('./pages/hotel/BookingLayout'));
const BookingRoomPage = lazy(() => import('./pages/hotel/BookingRoomPage'));
const BookingGuestPage = lazy(() => import('./pages/hotel/BookingGuestPage'));
const BookingSummaryPage = lazy(() => import('./pages/hotel/BookingSummaryPage'));
const CheckoutPage = lazy(() => import('./pages/hotel/CheckoutPage'));
const MyBookingsPage = lazy(() => import('./pages/hotel/MyBookingsPage'));

// Restaurant Suite
const RestaurantApp = lazy(() => import('./pages/restaurant/RestaurantApp'));
const RestaurantListPage = lazy(() => import('./pages/restaurant/RestaurantListPage'));
const RestaurantDetailPage = lazy(() => import('./pages/restaurant/RestaurantDetailPage'));
const ReservationWizardPage = lazy(() => import('./pages/restaurant/ReservationWizardPage'));
const ReservationHistoryPage = lazy(() => import('./pages/restaurant/ReservationHistoryPage'));

// Auth & Specialized Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const TestRunnerPage = lazy(() => import('./pages/tests/TestRunnerPage'));
const OptimizationPage = lazy(() => import('./pages/optimization/OptimizationPage'));
const DeploymentPage = lazy(() => import('./pages/deployment/DeploymentPage'));
const LabManualPage = lazy(() => import('./pages/docs/LabManualPage'));

export function App() {

  return (
    <ErrorBoundary title="Application Error Boundary Caught An Exception">
      <AuthProvider>
        <BookingProvider>
          <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <div className="flex-1 flex flex-col">
              <Suspense fallback={<Loading message="Loading module chunk..." variant="full" />}>
                <Routes>
                  {/* Hotel Booking Routes (Experiment 1, 2, 3) */}
                  <Route path="/" element={<HotelBookingApp />} />
                  <Route path="/hotels" element={<HotelListPage />} />
                  <Route path="/hotel/:id" element={<HotelDetailPage />} />
                  <Route path="/rooms" element={<RoomsPage />} />

                  {/* Nested Booking Routes using Outlet (Experiment 3 topic e, f) */}
                  <Route path="/booking" element={<BookingLayout />}>
                    <Route index element={<Navigate to="/booking/room" replace />} />
                    <Route path="room" element={<BookingRoomPage />} />
                    <Route path="guest" element={<BookingGuestPage />} />
                    <Route path="summary" element={<BookingSummaryPage />} />
                  </Route>

                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/bookings" element={<MyBookingsPage />} />

                  {/* Restaurant Routes (Experiment 4, 5, 6, 7, 8) */}
                  <Route element={<RestaurantApp />}>
                    <Route path="/restaurants" element={<RestaurantListPage />} />
                    <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />

                    {/* Protected Routes (Experiment 4 topic c) */}
                    <Route
                      path="/reservation"
                      element={
                        <ProtectedRoute>
                          <ReservationWizardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/reservations"
                      element={
                        <ProtectedRoute>
                          <ReservationHistoryPage />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  {/* Authentication (Experiment 4 & 8) */}
                  <Route path="/login" element={<LoginPage />} />

                  {/* Experiment 9, 10, 12 & Lab Manual */}
                  <Route path="/tests" element={<TestRunnerPage />} />
                  <Route path="/optimization" element={<OptimizationPage />} />
                  <Route path="/deployment" element={<DeploymentPage />} />
                  <Route path="/manual" element={<LabManualPage />} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </BookingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
