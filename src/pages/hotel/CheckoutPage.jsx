import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import Button from '../../components/common/Button';
import { CheckCircle2, Hotel, Calendar, Users, MapPin, Receipt, ArrowRight, Printer } from 'lucide-react';

export const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-black">Booking Confirmed!</h1>
            <p className="text-xs text-emerald-100 mt-1">
              Your reservation has been successfully placed and payment settled.
            </p>
            {booking?.bookingId && (
              <span className="inline-block mt-3 px-3 py-1 bg-black/20 rounded-full font-mono text-xs font-bold tracking-wider">
                Confirmation #{booking.bookingId}
              </span>
            )}
          </div>

          {/* Details body */}
          <div className="p-6 sm:p-8 space-y-6">
            {booking ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-1.5">
                      <Hotel className="w-5 h-5 text-indigo-600" />
                      <span>{booking.selectedHotel?.name}</span>
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{booking.selectedHotel?.location}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400 block">Room Type</span>
                    <span className="text-sm font-bold text-slate-800">{booking.selectedRoom?.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-In</span>
                    <span className="font-bold text-slate-700">{booking.checkInDate || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Check-Out</span>
                    <span className="font-bold text-slate-700">{booking.checkOutDate || 'Not specified'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                    <span className="font-bold text-slate-700">{booking.totalStayDuration || 1} Night(s)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Guests</span>
                    <span className="font-bold text-slate-700">{booking.guests || 2} Guest(s)</span>
                  </div>
                </div>

                {/* Amount Paid breakdown */}
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-indigo-600" />
                    <div>
                      <span className="text-xs font-bold text-indigo-950">Total Paid (Incl. 12% GST)</span>
                      <p className="text-[11px] text-indigo-700">Digital receipt dispatched to {booking.guestDetails?.email || 'email'}</p>
                    </div>
                  </div>
                  <span className="text-xl font-black text-indigo-600">
                    ₹{(booking.finalBookingAmount || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-4">
                Receipt view active. You can browse all your past hotel bookings in your history page.
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
                onClick={handlePrint}
                icon={Printer}
              >
                Print Invoice
              </Button>
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto ml-auto"
                onClick={() => navigate('/bookings')}
                icon={ArrowRight}
              >
                View All My Bookings
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
