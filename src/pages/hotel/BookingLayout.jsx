import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import { useBookingContext } from '../../context/BookingContext';
import { Bed, UserCheck, CreditCard, ChevronRight, AlertCircle, Hotel } from 'lucide-react';

export const BookingLayout = () => {
  const { selectedHotel, selectedRoom } = useBookingContext();
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    { path: '/booking/room', label: '1. Room Selection', icon: Bed },
    { path: '/booking/guest', label: '2. Guest Details', icon: UserCheck },
    { path: '/booking/summary', label: '3. Summary & Payment', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
        {/* Selected Hotel Banner */}
        {selectedHotel ? (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Hotel className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{selectedHotel.name}</h3>
                <p className="text-xs text-slate-500">{selectedHotel.location}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/hotels')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
            >
              Change Hotel
            </button>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>No hotel selected yet. Please pick a hotel first.</span>
            </div>
            <button
              onClick={() => navigate('/hotels')}
              className="text-xs font-bold px-3 py-1.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              Browse Hotels
            </button>
          </div>
        )}

        {/* Stepper Tabs (Exp 3: NavLink) */}
        <div className="grid grid-cols-3 gap-2 bg-slate-200/60 p-1.5 rounded-2xl">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <NavLink
                key={step.path}
                to={step.path}
                className={({ isActive }) =>
                  `flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.label.split('.')[0]}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Nested Route Outlet (Experiment 3 topic f) */}
        <div className="bg-transparent">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingLayout;
