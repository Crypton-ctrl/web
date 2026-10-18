import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2, QrCode, Building, Lock } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

export const Payment = ({
  finalAmount = 0,
  onConfirmBooking,
  isProcessing = false,
  disabled = false
}) => {
  const [method, setMethod] = useState('card'); // 'card' | 'upi' | 'netbanking'
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8829',
    cardHolder: 'Aarav Sharma',
    expiry: '12/28',
    cvv: '829'
  });
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURORA10') {
      setAppliedPromo({ code: 'AURORA10', discount: 500 });
    } else {
      alert('Invalid promo code. Try "AURORA10" for ₹500 off!');
    }
  };

  const netPayable = Math.max(0, finalAmount - (appliedPromo?.discount || 0));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-sm text-slate-900">Secure Payment</h3>
          <p className="text-[11px] text-slate-500">256-bit SSL encrypted checkout</p>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Safe</span>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setMethod('card')}
          className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
            method === 'card'
              ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 ring-1 ring-indigo-500'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <CreditCard className="w-4 h-4 text-indigo-600" />
          <span>Card</span>
        </button>

        <button
          type="button"
          onClick={() => setMethod('upi')}
          className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
            method === 'upi'
              ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 ring-1 ring-indigo-500'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <QrCode className="w-4 h-4 text-emerald-600" />
          <span>UPI / QR</span>
        </button>

        <button
          type="button"
          onClick={() => setMethod('netbanking')}
          className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
            method === 'netbanking'
              ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 ring-1 ring-indigo-500'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Building className="w-4 h-4 text-amber-600" />
          <span>Net Banking</span>
        </button>
      </div>

      {/* Method details */}
      {method === 'card' && (
        <div className="space-y-3 pt-2">
          <Input
            label="Card Number"
            value={cardData.cardNumber}
            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
            placeholder="1234 5678 9012 3456"
            icon={CreditCard}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Expiry"
              value={cardData.expiry}
              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
              placeholder="MM/YY"
            />
            <Input
              label="CVV"
              type="password"
              maxLength={4}
              value={cardData.cvv}
              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
              placeholder="123"
            />
          </div>

          <Input
            label="Cardholder Name"
            value={cardData.cardHolder}
            onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
            placeholder="e.g. Aarav Sharma"
          />
        </div>
      )}

      {method === 'upi' && (
        <div className="space-y-3 pt-2">
          <Input
            label="Virtual Payment Address (VPA / UPI ID)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="yourname@okbank"
            icon={QrCode}
            helperText="Support for GPay, PhonePe, Paytm, and BHIM"
          />
        </div>
      )}

      {method === 'netbanking' && (
        <div className="space-y-2 pt-2 text-xs">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Select Your Bank
          </label>
          <select className="w-full border border-slate-300 rounded-xl p-2.5 bg-white text-slate-800">
            <option>HDFC Bank</option>
            <option>State Bank of India</option>
            <option>ICICI Bank</option>
            <option>Axis Bank</option>
          </select>
        </div>
      )}

      {/* Promo Code */}
      <form onSubmit={handleApplyPromo} className="flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo code (AURORA10)"
          className="flex-1 text-xs border border-slate-300 rounded-xl px-3 py-2 uppercase placeholder:normal-case"
        />
        <button
          type="submit"
          className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
        >
          Apply
        </button>
      </form>

      {appliedPromo && (
        <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
          <span>Promo <strong>{appliedPromo.code}</strong> applied!</span>
          <span>-₹{appliedPromo.discount}</span>
        </div>
      )}

      {/* Total & Confirm Button */}
      <div className="pt-3 border-t border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Payable Today</span>
          <span className="text-lg font-black text-slate-900">
            ₹{netPayable.toLocaleString('en-IN')}
          </span>
        </div>

        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full shadow-lg shadow-indigo-500/25"
          onClick={onConfirmBooking}
          disabled={disabled || finalAmount <= 0}
          isLoading={isProcessing}
          icon={Lock}
        >
          Confirm & Pay ₹{netPayable.toLocaleString('en-IN')}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
