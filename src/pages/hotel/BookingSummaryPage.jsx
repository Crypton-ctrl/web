import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingSummary from '../../components/hotel/BookingSummary';
import Payment from '../../components/hotel/Payment';
import Button from '../../components/common/Button';
import { useBookingContext } from '../../context/BookingContext';
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, Phone, User } from 'lucide-react';

export const BookingSummaryPage = () => {
  const navigate = useNavigate();
  const {
    selectedHotel,
    selectedRoom,
    checkInDate,
    checkOutDate,
    guests,
    guestDetails,
    totalStayDuration,
    roomCost,
    taxes,
    additionalCharges,
    finalBookingAmount,
    confirmBooking
  } = useBookingContext();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const record = confirmBooking();
      setIsProcessing(false);
      // Navigate to checkout confirmation page (Experiment 3 topic g)
      navigate('/checkout', { state: { booking: record } });
    }, 700);
  };

  if (!selectedHotel || !selectedRoom) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4">
        <p className="text-sm text-slate-600">Please choose a hotel and room before checking out.</p>
        <Button variant="primary" onClick={() => navigate('/booking/room')}>
          Select Room First
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Guest Info */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Guest Reservation Information
          </h4>
          <button
            onClick={() => navigate('/booking/guest')}
            className="text-xs text-indigo-600 hover:underline font-semibold"
          >
            Edit Info
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            <span>{guestDetails.fullName || 'Guest Name'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            <span>{guestDetails.email || 'Email not provided'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            <span>{guestDetails.phone || 'Phone not provided'}</span>
          </div>
        </div>

        {guestDetails.specialRequests && (
          <p className="text-xs text-slate-500 italic mt-3 pt-2 border-t border-slate-100">
            &ldquo;{guestDetails.specialRequests}&rdquo;
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BookingSummary
          hotel={selectedHotel}
          room={selectedRoom}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guests={guests}
          totalStayDuration={totalStayDuration}
          roomCost={roomCost}
          taxes={taxes}
          additionalCharges={additionalCharges}
          finalBookingAmount={finalBookingAmount}
        />

        <Payment
          finalAmount={finalBookingAmount}
          onConfirmBooking={handleConfirm}
          isProcessing={isProcessing}
        />
      </div>

      <div className="flex justify-start">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/booking/guest')}
          icon={ArrowLeft}
        >
          Back to Guest Details
        </Button>
      </div>
    </div>
  );
};

export default BookingSummaryPage;
