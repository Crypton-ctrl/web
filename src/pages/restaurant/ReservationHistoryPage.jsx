import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantApi } from '../../api/restaurantApi';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import EditReservationModal from '../../components/restaurant/EditReservationModal';
import {
  Calendar,
  Clock,
  Users,
  Armchair,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  KeyRound
} from 'lucide-react';

export const ReservationHistoryPage = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReservation, setEditingReservation] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Experiment 7 topic a, e: Retrieve reservation history using GET
  const fetchReservations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await restaurantApi.getReservations();
      setReservations(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch reservations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Experiment 7 topic c: Modify reservation using PUT/PATCH
  const handleUpdate = async (id, updatedFields) => {
    setIsUpdating(true);
    try {
      const updated = await restaurantApi.updateReservation(id, updatedFields);
      setReservations((prev) => prev.map((r) => (r.id === id ? updated : r)));
      setEditingReservation(null);
      setStatusMessage(`Reservation #${id} successfully updated!`);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update reservation');
    } finally {
      setIsUpdating(false);
    }
  };

  // Experiment 7 topic d: Cancel reservation using DELETE
  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to cancel and delete reservation #${id}?`)) {
      try {
        await restaurantApi.deleteReservation(id);
        setReservations((prev) => prev.filter((r) => r.id !== id));
        setStatusMessage(`Reservation #${id} successfully cancelled.`);
        setTimeout(() => setStatusMessage(null), 4000);
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to cancel reservation');
      }
    }
  };

  // Experiment 8 test trigger: Simulate expired token / unauthorized 401
  const handleSimulateExpiredToken = () => {
    localStorage.removeItem('agy_auth_token');
    window.dispatchEvent(new CustomEvent('auth:expired'));
    navigate('/login');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Bearer Token Active
            </span>
          </div>
          <h1 className="text-2xl font-black">Manage Dining Reservations</h1>
          <p className="text-xs text-slate-400">
            View, modify, or cancel your upcoming restaurant table reservations
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchReservations}
            icon={RefreshCw}
          >
            Refresh
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/reservation')}
            icon={Plus}
          >
            New Reservation
          </Button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-800 font-bold animate-in fade-in">
          {statusMessage}
        </div>
      )}

      {/* Loading & Error States (Experiment 7 topic f) */}
      {isLoading ? (
        <Loading message="Fetching reservations using authenticated GET request..." />
      ) : error ? (
        <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
          <h3 className="text-base font-bold text-rose-900">API Error</h3>
          <p className="text-xs text-rose-700">{error}</p>
          <Button variant="danger" size="sm" onClick={fetchReservations}>
            Retry GET Request
          </Button>
        </div>
      ) : reservations.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center space-y-3">
          <Armchair className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Reservations Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You do not have any restaurant table reservations booked at this time.
          </p>
          <Button variant="primary" onClick={() => navigate('/reservation')} icon={Plus}>
            Book a Table Now
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                    #{res.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {res.status || 'CONFIRMED'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {res.restaurantName}
                </h3>

                <p className="text-xs text-slate-500">
                  {res.cuisine} Cuisine • {res.location}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-700 pt-1">
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    {res.date}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    {res.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    {res.guests} Guests
                  </span>
                  <span className="flex items-center gap-1">
                    <Armchair className="w-3.5 h-3.5 text-indigo-500" />
                    Table {res.tableNumber} ({res.tableType})
                  </span>
                </div>

                <div className="text-xs text-slate-500 pt-1">
                  Reserved for <strong>{res.customerName}</strong> ({res.customerPhone})
                  {res.specialRequests && (
                    <span className="block italic text-slate-400 mt-0.5">
                      Note: &ldquo;{res.specialRequests}&rdquo;
                    </span>
                  )}
                </div>
              </div>

              {/* CRUD Action Buttons */}
              <div className="flex md:flex-col items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingReservation(res)}
                  icon={Edit2}
                >
                  Edit (PUT)
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(res.id)}
                  icon={Trash2}
                >
                  Cancel (DELETE)
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal (Experiment 7 topic c: PUT/PATCH) */}
      <EditReservationModal
        isOpen={!!editingReservation}
        onClose={() => setEditingReservation(null)}
        reservation={editingReservation}
        onSave={handleUpdate}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default ReservationHistoryPage;
