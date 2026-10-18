import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import { initialHotels } from '../../api/mockData';
import { useBookingContext } from '../../context/BookingContext';
import { Bed, Users, Maximize, ArrowRight, Hotel } from 'lucide-react';
import Button from '../../components/common/Button';

export const RoomsPage = () => {
  const navigate = useNavigate();
  const { selectHotel, selectRoom } = useBookingContext();

  // Aggregate all rooms across hotels
  const allRooms = initialHotels.flatMap((hotel) =>
    hotel.rooms.map((room) => ({
      ...room,
      hotel
    }))
  );

  const handleBookRoom = (hotel, room) => {
    selectHotel(hotel);
    selectRoom(room);
    navigate('/booking/guest');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Curated Suites & Rooms Showcase
          </h1>
          <p className="text-xs text-slate-500">
            Experiment 3 Route: <code className="text-indigo-600 font-mono">/rooms</code> - Direct Room Selection with Context Sync
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRooms.map((item) => (
            <div
              key={`${item.hotel.id}-${item.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold mb-2">
                  <Hotel className="w-3.5 h-3.5" />
                  <span>{item.hotel.name}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1">{item.type}</h3>
                <p className="text-xs text-slate-500 mb-4">{item.hotel.location}</p>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Bed className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Max {item.capacity} Guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.size}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
                <div>
                  <span className="text-base font-extrabold text-indigo-600">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/ night</span>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleBookRoom(item.hotel, item)}
                  icon={ArrowRight}
                >
                  Reserve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoomsPage;
