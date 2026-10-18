import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import Button from '../../components/common/Button';
import { Hotel, Calendar, Users, MapPin, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { generateAndLogApiKey } from '../../utils/apiKeyLogger';

export const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('agy_hotel_history');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setBookings(parsed);
        generateAndLogApiKey('HOTEL_READ_HISTORY [GET /api/user-bookings]', {
          endpoint: '/api/user-bookings',
          method: 'GET',
          status: '200 OK',
          count: parsed.length,
          bookings: parsed
        });
      } catch {
        setBookings([]);
      }
    }
  }, []);

  const handleCancelBooking = (bookingId) => {
    if (window.confirm(`Are you sure you want to cancel booking #${bookingId}?`)) {
      const canceled = bookings.find((b) => b.bookingId === bookingId);
      const updated = bookings.filter((b) => b.bookingId !== bookingId);
      setBookings(updated);
      localStorage.setItem('agy_hotel_history', JSON.stringify(updated));

      generateAndLogApiKey('HOTEL_DELETE_BOOKING [DELETE /api/hotel-bookings/:id]', {
        endpoint: `/api/hotel-bookings/${bookingId}`,
        method: 'DELETE',
        status: '200 OK',
        canceledBookingId: bookingId,
        refundProcessed: true,
        canceledRecord: canceled
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              My Hotel Bookings
            </h1>
            <p className="text-xs text-slate-500">
              Manage your upcoming stays, view invoices, or cancel reservations
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate('/hotels')}>
            Book New Stay
          </Button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Hotel Bookings Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven&apos;t reserved any hotel rooms yet. Browse our luxury hotels to plan your next getaway!
            </p>
            <Button variant="primary" onClick={() => navigate('/hotels')} icon={ArrowRight}>
              Explore Hotels
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.bookingId}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                      #{b.bookingId}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      CONFIRMED
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <Hotel className="w-4 h-4 text-indigo-600" />
                    <span>{b.selectedHotel?.name || 'Hotel Stay'}</span>
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.selectedHotel?.location}</span>
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {b.checkInDate} to {b.checkOutDate} ({b.totalStayDuration || 1} nights)
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {b.guests} Guests
                    </span>
                    <span className="font-semibold text-slate-800">
                      Room: {b.selectedRoom?.type}
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-col items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Total Amount</span>
                    <span className="text-lg font-black text-indigo-600">
                      ₹{(b.finalBookingAmount || 0).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    onClick={() => handleCancelBooking(b.bookingId)}
                    icon={Trash2}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyBookingsPage;
