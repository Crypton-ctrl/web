import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import HotelDetail from '../../components/hotel/HotelDetail';
import Loading from '../../components/common/Loading';
import { hotelApi } from '../../api/hotelApi';
import { useBookingContext } from '../../context/BookingContext';
import { ChevronRight, ArrowLeft, Home } from 'lucide-react';

export const HotelDetailPage = () => {
  // Experiment 3 topic d: useParams to retrieve hotel ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectHotel, selectRoom, selectedRoom } = useBookingContext();

  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadHotel = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await hotelApi.fetchHotelById(id);
        if (mounted) {
          setHotel(data);
          selectHotel(data); // Sync into Context API
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Hotel not found');
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    if (id) {
      loadHotel();
    }
    return () => {
      mounted = false;
    };
  }, [id, selectHotel]);

  const handleRoomSelect = (room) => {
    selectRoom(room);
  };

  // Experiment 3 topic g: useNavigate programmatically to room selection / booking wizard
  const handleProceedBooking = () => {
    navigate('/booking/guest');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      {/* Breadcrumbs (React Router Link demo) */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5">
          <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/hotels" className="hover:text-indigo-600">
            Hotels
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">
            {hotel ? hotel.name : `Hotel ID: ${id}`}
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {isLoading ? (
          <Loading message={`Loading Hotel Details for ID #${id}...`} />
        ) : error ? (
          <div className="p-12 bg-white rounded-3xl border border-rose-200 text-center space-y-4">
            <p className="text-sm font-bold text-rose-600">{error}</p>
            <button
              onClick={() => navigate('/hotels')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hotels Directory</span>
            </button>
          </div>
        ) : (
          <HotelDetail
            hotel={hotel}
            selectedRoomId={selectedRoom?.id}
            onSelectRoom={handleRoomSelect}
            onProceedBooking={handleProceedBooking}
            onBack={() => navigate('/hotels')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HotelDetailPage;
