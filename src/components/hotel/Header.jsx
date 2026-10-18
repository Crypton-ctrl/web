import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Hotel, UtensilsCrossed, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Hotel className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
              AURORA <span className="text-indigo-600 font-semibold text-xs px-2 py-0.5 bg-indigo-50 rounded-full border border-indigo-100">Hotels & Dining</span>
            </span>
            <span className="block text-[10px] text-slate-500 font-medium -mt-1">
              Luxury Stays & Table Reservations
            </span>
          </div>
        </Link>

        {/* Navigation links (Exp 3: Link and NavLink) */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/hotels"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            Hotels
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            Rooms
          </NavLink>
          <NavLink
            to="/booking"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            Booking Wizard
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            My Bookings
          </NavLink>
          <NavLink
            to="/restaurants"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-xl text-sm font-medium transition flex items-center gap-1.5 ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            <UtensilsCrossed className="w-4 h-4 text-indigo-500" />
            <span>Restaurants</span>
          </NavLink>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-xs font-medium text-slate-700 hidden sm:inline">{user?.name}</span>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 text-sm font-medium">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/hotels"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            All Hotels
          </NavLink>
          <NavLink
            to="/rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Rooms Showcase
          </NavLink>
          <NavLink
            to="/booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            Booking Wizard
          </NavLink>
          <NavLink
            to="/bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            My Hotel Bookings
          </NavLink>
          <NavLink
            to="/restaurants"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-indigo-600 hover:bg-slate-100"
          >
            Restaurants Directory & Tables
          </NavLink>
          <NavLink
            to="/reservations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-indigo-600 hover:bg-slate-100"
          >
            My Dining Reservations
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
