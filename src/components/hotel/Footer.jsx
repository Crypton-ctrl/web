import React from 'react';
import { Hotel, ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Mission */}
          <div>
            <div className="flex items-center gap-2 text-white mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Hotel className="w-4 h-4" />
              </div>
              <span className="text-base font-bold">AURORA HOTELS & DINING</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Curating exceptional boutique stays and bespoke culinary experiences across India&apos;s premier destinations.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Best Rate Guarantee</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Hotels & Stays
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/hotels" className="hover:text-white transition">The Grand Heritage Palace (Mumbai)</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition">Azure Coastline Beach Resort (Goa)</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition">Alpine Pine Mountain Retreat (Manali)</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition">Skyline Metropolitan Hotel (Bangalore)</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition">Emerald Lake Serenity Resort (Udaipur)</Link>
              </li>
            </ul>
          </div>

          {/* Dining */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Fine Dining
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/restaurants" className="hover:text-white transition">The Rustic Truffle (Italian)</Link>
              </li>
              <li>
                <Link to="/restaurants" className="hover:text-white transition">Spice Symphony (Awadhi Indian)</Link>
              </li>
              <li>
                <Link to="/restaurants" className="hover:text-white transition">Sakura Blossom (Japanese)</Link>
              </li>
              <li>
                <Link to="/restaurants" className="hover:text-white transition">Le Gourmet Bistro (French)</Link>
              </li>
              <li>
                <Link to="/restaurants" className="hover:text-white transition">El Fuego Cantina (Mexican)</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Guest Services
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>+91 1800 200 4545 (24/7 Concierge)</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>reservations@aurorahotels.com</span>
              </p>
              <p className="text-slate-400 pt-1">
                Flexible cancellations up to 24 hours prior to check-in. Instant digital receipts with 12% GST calculation.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Aurora Hotels & Dining Group. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React 19 & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
