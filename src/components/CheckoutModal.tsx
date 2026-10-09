'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PaymentMethod, Order } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  Lock, 
  MapPin, 
  Phone, 
  User, 
  Mail
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    items, 
    subtotal, 
    deliveryFee, 
    totalAmount, 
    deliveryType, 
    clearCart,
    setLastOrder,
    setIsOrderSuccessOpen
  } = useCart();

  const [paymentTab, setPaymentTab] = useState<PaymentMethod>('onsite_depot');
  const [onlineChannel, setOnlineChannel] = useState<'card' | 'bank_transfer' | 'ussd'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    companyName: '',
    deliveryAddress: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name or company representative name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for dispatch & gate pass';
    } else if (formData.phone.trim().length < 10) {
      errs.phone = 'Please provide a valid 11-digit Nigerian phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required for COA & invoice delivery';
    }
    if (deliveryType !== 'ojota_pickup' && !formData.deliveryAddress.trim()) {
      errs.deliveryAddress = 'Lagos delivery address / factory location is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = `OJT-CHEM-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedPassCode = `PASS-${Math.floor(1000 + Math.random() * 9000)}`;

      const order: Order = {
        orderId: generatedOrderId,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        companyName: formData.companyName || undefined,
        items: [...items],
        subtotal,
        deliveryFee,
        totalAmount,
        deliveryType,
        deliveryAddress: formData.deliveryAddress || (deliveryType === 'ojota_pickup' ? 'Ojota Chemical Market Gate 2 Depot' : undefined),
        paymentMethod: paymentTab,
        paymentStatus: paymentTab === 'online_paystack' ? 'Paid (Online)' : (deliveryType === 'ojota_pickup' ? 'Pending Depot Onsite Payment' : 'Pending POD'),
        orderDate: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        pickupPassCode: generatedPassCode,
        notes: formData.notes,
      };

      try {
        const history = JSON.parse(localStorage.getItem('ojotachem_orders') || '[]');
        history.unshift(order);
        localStorage.setItem('ojotachem_orders', JSON.stringify(history));
      } catch {
        // ignore
      }

      setLastOrder(order);
      clearCart();
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      setIsOrderSuccessOpen(true);
      triggerConfetti();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white border border-slate-200 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative my-8 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Secure Chemical Checkout
              </span>
              <span className="text-xs text-slate-600">
                Total: <strong className="text-emerald-700 font-extrabold">{formatPrice(totalAmount)}</strong>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">
              Complete Your Chemical Order
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200 transition"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Dual Payment Switcher */}
          <div>
            <label className="text-xs uppercase tracking-wider font-extrabold text-slate-600 block mb-3">
              1. Choose How You Want to Pay:
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              
              {/* Option A: Pay Onsite at Ojota Depot */}
              <div
                onClick={() => setPaymentTab('onsite_depot')}
                className={`p-5 rounded-2xl border cursor-pointer transition relative flex flex-col justify-between ${
                  paymentTab === 'onsite_depot'
                    ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-500/30 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      PAY ONSITE (DEPOT / POD)
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      Inspect First
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-950 mb-1">
                    Pay at Ojota Warehouse or on Delivery
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pay at our Ojota Depot Counter via <strong>Cash, POS Terminal, or Instant Bank Transfer</strong> upon physically inspecting your chemicals, or pay upon doorstep truck delivery in Lagos.
                  </p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-200/80 text-[11px] text-emerald-800 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant Proforma Invoice & Warehouse Gate-Pass Generated</span>
                </div>
              </div>

              {/* Option B: Pay Online on Website */}
              <div
                onClick={() => setPaymentTab('online_paystack')}
                className={`p-5 rounded-2xl border cursor-pointer transition relative flex flex-col justify-between ${
                  paymentTab === 'online_paystack'
                    ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-500/30 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-teal-800 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-teal-600" />
                      PAY ON WEBSITE (ONLINE)
                    </span>
                    <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">
                      Instant Confirmation
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-950 mb-1">
                    Online Card, Bank Transfer & USSD
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Instant secure checkout with any Nigerian debit card (Mastercard, Visa, Verve), dynamic virtual bank transfer account, or instant USSD banking code.
                  </p>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-200/80 text-[11px] text-teal-800 flex items-center gap-1.5 font-bold">
                  <Lock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>256-bit Encrypted Nigerian Payment Gateway</span>
                </div>
              </div>

            </div>
          </div>

          {/* Sub-channel for Online Payment */}
          {paymentTab === 'online_paystack' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                Select Online Payment Channel:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOnlineChannel('card')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                    onlineChannel === 'card'
                      ? 'bg-white border-emerald-600 text-emerald-800 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Debit / Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setOnlineChannel('bank_transfer')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                    onlineChannel === 'bank_transfer'
                      ? 'bg-white border-emerald-600 text-emerald-800 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Direct Bank Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setOnlineChannel('ussd')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                    onlineChannel === 'ussd'
                      ? 'bg-white border-emerald-600 text-emerald-800 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  USSD Banking
                </button>
              </div>

              {onlineChannel === 'card' && (
                <div className="text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200">
                  <p>Accepts all Nigerian bank cards: <strong>Access, GTBank, Zenith, UBA, FirstBank, Stanbic, Kuda, OPay, Moniepoint</strong>.</p>
                </div>
              )}

              {onlineChannel === 'bank_transfer' && (
                <div className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-emerald-800">Instant Dynamic Virtual Account:</p>
                  <p>A dedicated Nigerian virtual account number will be generated immediately upon order submission for zero-delay bank app transfer.</p>
                </div>
              )}

              {onlineChannel === 'ussd' && (
                <div className="text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200">
                  <p>Dial direct bank codes (*737#, *919#, *894#, *966# etc.) directly from your phone to complete in seconds.</p>
                </div>
              )}
            </div>
          )}

          {/* Customer & Company Details */}
          <div>
            <label className="text-xs uppercase tracking-wider font-extrabold text-slate-600 block mb-3">
              2. Customer & Company Information:
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              
              <div>
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Full Name / Contact Person *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Tunde Adeleke"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white text-slate-900 text-sm rounded-xl pl-10 pr-3 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>
                {errors.fullName && <p className="text-rose-600 text-[11px] mt-1 font-bold">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Phone Number (Active for Call / WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0803 294 8831"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white text-slate-900 text-sm rounded-xl pl-10 pr-3 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>
                {errors.phone && <p className="text-rose-600 text-[11px] mt-1 font-bold">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Email Address (For COA & Electronic Invoice) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. tunde@lagosmanufacturing.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white text-slate-900 text-sm rounded-xl pl-10 pr-3 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>
                {errors.email && <p className="text-rose-600 text-[11px] mt-1 font-bold">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Company / Factory / Laboratory Name (Optional)
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Apex Detergents Ltd or Zenith Labs"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-white text-slate-900 text-sm rounded-xl pl-10 pr-3 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Delivery Details */}
          <div>
            <label className="text-xs uppercase tracking-wider font-extrabold text-slate-600 block mb-2">
              3. Delivery & Depot Details:
            </label>

            {deliveryType === 'ojota_pickup' ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black text-emerald-900">
                    Onsite Pickup at Ojota Chemical Market Depot (Gate 2)
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Your chemicals will be set aside in our secure pickup bay at Block 4, Ojota Chemical Market Complex. You or your driver can present the digital gate-pass upon arrival.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Delivery Destination Address in Lagos / State *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot 15, Industrial Estate, Ikeja / Oba Akran / Lekki Phase 1"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    className="w-full bg-white text-slate-900 text-sm rounded-xl pl-10 pr-3 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>
                {errors.deliveryAddress && <p className="text-rose-600 text-[11px] mt-1 font-bold">{errors.deliveryAddress}</p>}
              </div>
            )}

            <div className="mt-3">
              <label className="text-xs text-slate-700 font-bold block mb-1">
                Special Offloading Instructions / Tanker or Drum Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Bring forklift offload assistance, call driver 1 hour prior..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white text-slate-900 text-sm rounded-xl px-3 py-2 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
              />
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <span className="font-extrabold text-slate-800 block mb-1">Order Review:</span>
            <div className="flex justify-between text-slate-600">
              <span>{items.length} chemical items total:</span>
              <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Logistics Method:</span>
              <span className="font-bold text-slate-900">
                {deliveryType === 'ojota_pickup' ? 'Free Ojota Depot Pickup' : formatPrice(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
              <span>Total Payable:</span>
              <span className="text-emerald-700">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-2xl text-sm font-black transition flex items-center justify-center gap-2 shadow-xl ${
                isProcessing
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 active:scale-98'
              }`}
            >
              {isProcessing ? (
                <span>Generating Gate-Pass & Processing...</span>
              ) : paymentTab === 'onsite_depot' ? (
                <>
                  <Building2 className="w-5 h-5" />
                  <span>Generate Ojota Depot Gate-Pass & Confirm Onsite Order</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Pay {formatPrice(totalAmount)} Securely on Website</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-500 mt-2 font-medium">
              Official Tax Invoice, TIN receipt & Certificate of Analysis (COA) dispatched automatically.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
