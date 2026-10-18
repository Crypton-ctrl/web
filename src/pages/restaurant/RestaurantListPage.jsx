import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../../components/restaurant/RestaurantCard';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import { restaurantApi } from '../../api/restaurantApi';
import { useReservationStore } from '../../store/reservationStore';
import { Search, MapPin, Utensils, RefreshCw, AlertCircle } from 'lucide-react';

export const RestaurantListPage = () => {
  const navigate = useNavigate();
  const setStoreRestaurant = useReservationStore((state) => state.setRestaurant);

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters for Experiment 5 (topic b: location and cuisine)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const fetchRestaurants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Experiment 5 topic a, b, d: Fetch restaurant info with location, cuisine, search
      const data = await restaurantApi.getRestaurants({
        location: selectedCity,
        cuisine: selectedCuisine,
        search: searchQuery
      });
      setRestaurants(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch restaurants from REST API');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [selectedCity, selectedCuisine]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRestaurants();
  };

  const handleReserve = (restaurant) => {
    // Save to Zustand store (Experiment 6)
    setStoreRestaurant(restaurant);
    // Navigate to protected reservation wizard (Experiment 4)
    navigate('/reservation');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Gourmet Restaurant Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Explore curated dining destinations, artisanal cuisines, and reserve your table in real time.
          </p>
        </div>

        <button
          onClick={fetchRestaurants}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reload API Data</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Text Search */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name or dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl bg-white focus:border-indigo-500"
            />
          </div>

          {/* City selector */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-sm pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl bg-white"
            >
              <option value="All">All Cities (Mumbai, Bangalore, Delhi)</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          {/* Cuisine selector */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Utensils className="w-4 h-4" />
            </div>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full text-sm pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl bg-white"
            >
              <option value="All">All Cuisines</option>
              <option value="Italian">Italian</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
              <option value="French">French</option>
              <option value="Mexican">Mexican</option>
            </select>
          </div>
        </form>
      </div>

      {/* Loading state (Experiment 5 topic f) */}
      {isLoading && (
        <Loading message="Fetching restaurants from simulated REST API endpoint..." variant="spinner" />
      )}

      {/* Error state (Experiment 5 topic f) */}
      {error && !isLoading && (
        <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
          <h3 className="text-base font-bold text-rose-900">API Request Failed</h3>
          <p className="text-xs text-rose-700">{error}</p>
          <Button variant="danger" size="sm" onClick={fetchRestaurants}>
            Try Again
          </Button>
        </div>
      )}

      {/* Restaurant Cards Grid */}
      {!isLoading && !error && (
        <>
          {restaurants.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-dashed border-slate-300 text-center space-y-2">
              <h4 className="text-base font-bold text-slate-800">No restaurants found</h4>
              <p className="text-xs text-slate-500">
                Try selecting a different cuisine or location filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((rest) => (
                <RestaurantCard
                  key={rest.id}
                  restaurant={rest}
                  onReserve={handleReserve}
                  onViewDetails={(id) => navigate(`/restaurant/${id}`)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantListPage;
