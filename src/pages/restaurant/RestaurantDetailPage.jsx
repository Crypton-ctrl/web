import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantApi } from '../../api/restaurantApi';
import TableCard from '../../components/restaurant/TableCard';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import { useReservationStore } from '../../store/reservationStore';
import { Star, MapPin, Clock, ArrowLeft, ArrowRight, Utensils, AlertCircle } from 'lucide-react';

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const setStoreRestaurant = useReservationStore((state) => state.setRestaurant);
  const setStoreTable = useReservationStore((state) => state.setTable);
  const setStoreDateTime = useReservationStore((state) => state.setDateTime);

  const [restaurant, setRestaurant] = useState(null);
  const [tables, setTables] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;
    const loadDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const rest = await restaurantApi.getRestaurantById(id);
        const { tables: tbls, timeSlots: slots } = await restaurantApi.getTablesAndSlots(id);
        if (isCurrent) {
          setRestaurant(rest);
          setTables(tbls);
          setTimeSlots(slots);
          if (slots.length > 0) setSelectedSlot(slots[0]);
        }
      } catch (err) {
        if (isCurrent) setError(err.message || 'Error loading restaurant');
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    if (id) loadDetails();
    return () => {
      isCurrent = false;
    };
  }, [id]);

  const handleProceedReservation = () => {
    if (!restaurant) return;
    setStoreRestaurant(restaurant);
    if (selectedTable) setStoreTable(selectedTable);
    if (selectedSlot) {
      setStoreDateTime(new Date().toISOString().split('T')[0], selectedSlot);
    }
    navigate('/reservation');
  };

  if (isLoading) {
    return <Loading message="Loading restaurant menu and table layout..." />;
  }

  if (error || !restaurant) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center bg-white rounded-3xl border border-rose-200 space-y-4 my-8">
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
        <h3 className="text-base font-bold text-rose-900">{error || 'Restaurant not found'}</h3>
        <Button variant="primary" onClick={() => navigate('/restaurants')}>
          Back to Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <button
        onClick={() => navigate('/restaurants')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Restaurants</span>
      </button>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
        <div className="relative h-72 md:h-80 w-full bg-slate-900">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>{restaurant.rating} ({restaurant.reviewsCount} reviews)</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md">
                {restaurant.cuisine} Cuisine
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-rose-400" />
                {restaurant.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-indigo-400" />
                {restaurant.operatingHours}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Selection & Booking Flow (Exp 4 & 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-2">About the Dining Experience</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {restaurant.description}
            </p>
          </div>

          {/* Available Tables (Exp 5 topic c: Fetch available tables) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Interactive Dining Table Layout
              </h2>
              <p className="text-xs text-slate-500">
                Live availability fetched via REST API: <code className="text-indigo-600 font-mono">GET /api/restaurants/{id}/tables</code>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tables.map((tbl) => (
                <TableCard
                  key={tbl.id}
                  table={tbl}
                  isSelected={selectedTable?.id === tbl.id}
                  onSelect={setSelectedTable}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
              Reservation Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Selected Table:</span>
                <span className="font-bold text-slate-900">
                  {selectedTable ? `${selectedTable.number} (${selectedTable.type})` : 'None selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Cost for Two:</span>
                <span className="font-bold text-slate-900">₹{restaurant.averageCostForTwo}</span>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition ${
                      selectedSlot === slot
                        ? 'bg-indigo-600 border-indigo-600 text-white font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full mt-4"
              onClick={handleProceedReservation}
              icon={ArrowRight}
            >
              Continue to Reservation Form →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
