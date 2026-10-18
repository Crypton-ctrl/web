import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import { Utensils, CalendarPlus, ListOrdered, Shield } from 'lucide-react';

export const RestaurantApp = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      {/* Sub-header navigation for Restaurant Section */}
      <div className="bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12 text-xs">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            <NavLink
              to="/restaurants"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition ${
                  isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>All Restaurants</span>
            </NavLink>

            <NavLink
              to="/reservation"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition ${
                  isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </NavLink>

            <NavLink
              to="/reservations"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition ${
                  isActive ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>My Reservations</span>
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Confirmation</span>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantApp;
