import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationForm from '../../components/restaurant/ReservationForm';
import TableCard from '../../components/restaurant/TableCard';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import { useAuth } from '../../context/AuthContext';
import { useReservationStore } from '../../store/reservationStore';
import { restaurantApi } from '../../api/restaurantApi';
import {
  UtensilsCrossed,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Database
} from 'lucide-react';

export const ReservationWizardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Zustand Global Store (Experiment 6)
  const store = useReservationStore();

  const [availableTables, setAvailableTables] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [apiError, setApiError] = useState(null);

  // If no restaurant was chosen in store, default to first restaurant
  useEffect(() => {
    const initializeData = async () => {
      let targetRestaurant = store.selectedRestaurant;
      if (!targetRestaurant) {
        const all = await restaurantApi.getRestaurants();
        if (all.length > 0) {
          targetRestaurant = all[0];
          store.setRestaurant(all[0]);
        }
      }

      if (targetRestaurant) {
        const { tables, timeSlots } = await restaurantApi.getTablesAndSlots(targetRestaurant.id);
        setAvailableTables(tables);
        setTimeSlots(timeSlots);
      }
    };

    initializeData();
  }, [store.selectedRestaurant]);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setApiError(null);

    // Save to Zustand store (Experiment 6)
    store.setDateTime(formData.date, formData.time);
    store.setGuests(formData.guests);
    store.setSpecialRequests(formData.specialRequests);
    store.setCustomerDetails({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });

    const chosenTable = availableTables.find((t) => t.id === formData.tableId);
    if (chosenTable) store.setTable(chosenTable);

    try {
      // Experiment 7 topic b & Experiment 8 topic c:
      // POST reservation to REST API with Bearer token attached by Axios interceptor
      const payload = {
        restaurantId: store.selectedRestaurant.id,
        restaurantName: store.selectedRestaurant.name,
        cuisine: store.selectedRestaurant.cuisine,
        location: store.selectedRestaurant.location,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        tableId: formData.tableId,
        tableNumber: chosenTable ? chosenTable.number : 'T-01',
        tableType: chosenTable ? chosenTable.type : 'Standard',
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        specialRequests: formData.specialRequests
      };

      const result = await restaurantApi.createReservation(payload);
      setConfirmedReservation(result);
    } catch (err) {
      setApiError(err.response?.data?.message || err.message || 'Failed to complete reservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Authenticated as {user?.email}
            </span>
          </div>
          <h1 className="text-2xl font-black">Restaurant Table Reservation</h1>
          <p className="text-xs text-indigo-200 mt-0.5">
            Select your preferred dining time, table, and complete your reservation
          </p>
        </div>

        <button
          onClick={() => navigate('/reservations')}
          className="text-xs font-bold text-indigo-200 hover:text-white underline"
        >
          View Reservation History (CRUD) →
        </button>
      </div>

      {/* Confirmation State */}
      {confirmedReservation ? (
        <div className="bg-white p-8 rounded-3xl border-2 border-emerald-500 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              Reservation #{confirmedReservation.id}
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-3">
              Table Reserved Successfully!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              A confirmation email has been dispatched to <strong>{confirmedReservation.customerEmail}</strong>.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Restaurant:</span>
              <span className="font-bold text-slate-900">{confirmedReservation.restaurantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date & Time:</span>
              <span className="font-bold text-slate-900">{confirmedReservation.date} at {confirmedReservation.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Table:</span>
              <span className="font-bold text-slate-900">{confirmedReservation.tableNumber} ({confirmedReservation.tableType})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Guest Count:</span>
              <span className="font-bold text-slate-900">{confirmedReservation.guests} Guest(s)</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setConfirmedReservation(null);
                store.resetReservation();
              }}
            >
              Reserve Another Table
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/reservations')}
              icon={ArrowRight}
            >
              Manage in Reservations Dashboard
            </Button>
          </div>
        </div>
      ) : (
        /* Reservation Form */
        <div className="space-y-6">
          {/* Selected Restaurant preview */}
          {store.selectedRestaurant && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={store.selectedRestaurant.image}
                    alt={store.selectedRestaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{store.selectedRestaurant.name}</h3>
                  <p className="text-xs text-slate-500">{store.selectedRestaurant.cuisine} • {store.selectedRestaurant.location}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/restaurants')}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Change Restaurant
              </button>
            </div>
          )}

          {apiError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-medium">
              {apiError}
            </div>
          )}

          <ReservationForm
            initialValues={{
              name: store.customerName || user?.name || '',
              email: store.customerEmail || user?.email || '',
              phone: store.customerPhone || '',
              date: store.date || new Date().toISOString().split('T')[0],
              time: store.time || (timeSlots[0] || '07:30 PM'),
              guests: store.guests || 2,
              tableId: store.table?.id || '',
              specialRequests: store.specialRequests || ''
            }}
            tables={availableTables}
            timeSlots={timeSlots}
            onSubmit={handleFormSubmit}
            isLoading={isSubmitting}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationWizardPage;
