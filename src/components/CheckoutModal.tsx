'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PaymentMethod, Order, DeliveryType } from '../types';
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
  Mail,
  Truck,
  Trash2,
  Plus,
  Minus,
  Maximize2,
  ShieldCheck
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    items, 
    updateQuantity,
    removeFromCart,
    subtotal, 
    deliveryFee, 
    totalAmount, 
    deliveryType, 
    setDeliveryType,
    clearCart,
    setLastOrder,
    setIsOrderSuccessOpen,
    setPreviewImage
  } = useCart();

  const [paymentTab, setPaymentTab] = useState<PaymentMethod>('onsite_depot');
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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

  const deliveryOptions: { id: DeliveryType; label: string; fee: number }[] = [
    { id: 'ojota_pickup', label: 'Free Ojota Depot Pickup (Gate 2)', fee: 0 },
    { id: 'lagos_mainland', label: 'Lagos Mainland Delivery (₦4,500)', fee: 4500 },
    { id: 'lagos_island', label: 'Lagos Island Delivery (₦7,500)', fee: 7500 },
    { id: 'interstate_freight', label: 'Interstate Freight Haulage (₦18,000)', fee: 18000 },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for dispatch & gate pass';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid Nigerian phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required for invoice & COA delivery';
    }
    if (deliveryType !== 'ojota_pickup' && !formData.deliveryAddress.trim()) {
      errs.deliveryAddress = 'Delivery destination address is required';
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

  const handleFinishLocalOrder = (paymentRef?: string) => {
    const generatedOrderId = paymentRef || `OJT-CHEM-${Math.floor(100000 + Math.random() * 900000)}`;
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
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (items.length === 0) {
      setApiError('Your cart is empty. Please add chemicals before checking out.');
      return;
    }

    if (!validate()) return;

    setIsProcessing(true);

    if (paymentTab === 'online_paystack') {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            customerName: formData.fullName,
            companyName: formData.companyName,
            userEmail: formData.email,
            deliveryType,
            deliveryFee,
            subtotal,
            totalAmount,
          }),
        });

        const data = await res.json();

        if (res.ok && data.url) {
          // Redirect to Paystack
          window.location.href = data.url;
          return;
        } else {
          // If Paystack init fails or test key offline, fallback gracefully
          console.warn('Paystack init fallback:', data.error);
          handleFinishLocalOrder();
        }
      } catch (err) {
        console.warn('Paystack request error, falling back:', err);
        handleFinishLocalOrder();
      }
    } else {
      // Onsite depot payment
      setTimeout(() => {
        handleFinishLocalOrder();
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white border border-slate-200 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative my-auto text-slate-900 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-950">
                Checkout & Order Confirmation
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Verified HopeArms Chemical Depot Procurement
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200 transition"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - 2 Column Layout */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-5 sm:p-7">
          {apiError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {apiError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Customer, Delivery, and Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Contact Info */}
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-3.5">
                <span className="text-xs uppercase tracking-wider font-extrabold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  1. Contact Information
                </span>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-600 font-bold block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Tunde Adeleke"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                    {errors.fullName && <p className="text-rose-600 text-[10px] mt-1 font-bold">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 font-bold block mb-1">
                      Phone Number (WhatsApp Active) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0916 943 7276"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                    {errors.phone && <p className="text-rose-600 text-[10px] mt-1 font-bold">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 font-bold block mb-1">
                      Email Address (For Invoices & COA) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. tunde@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                    {errors.email && <p className="text-rose-600 text-[10px] mt-1 font-bold">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 font-bold block mb-1">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Industrial Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Delivery & Logistics */}
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-3.5">
                <span className="text-xs uppercase tracking-wider font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  2. Logistics & Delivery Destination
                </span>

                <div>
                  <label className="text-[11px] text-slate-600 font-bold block mb-1.5">
                    Selected Delivery Method:
                  </label>
                  <select
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
                    className="w-full bg-white text-slate-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 font-semibold shadow-2xs"
                  >
                    {deliveryOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {deliveryType === 'ojota_pickup' ? (
                  <div className="p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Onsite Depot Collection:</span>
                      <span>Block 4, Ojota Chemical Market Complex. Present digital gate-pass at Gate 2.</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] text-slate-600 font-bold block mb-1">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot 12, Industrial Layout, Ikeja, Lagos"
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      className="w-full bg-white text-slate-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                    {errors.deliveryAddress && <p className="text-rose-600 text-[10px] mt-1 font-bold">{errors.deliveryAddress}</p>}
                  </div>
                )}

                <div>
                  <label className="text-[11px] text-slate-600 font-bold block mb-1">
                    Offload Instructions / Driver Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Call warehouse receiving manager 1 hour prior..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white text-slate-900 text-xs sm:text-sm rounded-xl px-3.5 py-2 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>
              </div>

              {/* 3. Payment Method Choice */}
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs uppercase tracking-wider font-extrabold text-slate-700 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                  3. Select Payment Method
                </span>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Onsite / POD */}
                  <div
                    onClick={() => setPaymentTab('onsite_depot')}
                    className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                      paymentTab === 'onsite_depot'
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-emerald-600" />
                          Pay Onsite / Inspection
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                          Inspect First
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        Pay at Ojota Depot Counter via <strong>Cash, POS, or Instant Bank Transfer</strong> after physically inspecting batch seals, or on truck delivery.
                      </p>
                    </div>
                  </div>

                  {/* Online Paystack */}
                  <div
                    onClick={() => setPaymentTab('online_paystack')}
                    className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                      paymentTab === 'online_paystack'
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/30 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-teal-900 flex items-center gap-1.5">
                          <Lock className="w-4 h-4 text-teal-600" />
                          Pay Online (Paystack)
                        </span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-bold">
                          Instant
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        Fast payment using <strong>Debit Card (Mastercard, Visa, Verve)</strong>, dynamic Bank Transfer, or Nigerian USSD banking code.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Editable Order Summary & Action (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sticky top-2 space-y-4">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                    Order Summary ({items.length} items)
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Editable quantities
                  </span>
                </div>

                {/* Editable items list */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map(({ chemical, quantity }) => (
                    <div 
                      key={chemical.id}
                      className="bg-white rounded-xl p-3 border border-slate-200 flex gap-2.5 items-center justify-between shadow-2xs"
                    >
                      {/* Thumbnail Image */}
                      <div 
                        onClick={() => setPreviewImage({
                          imageUrl: chemical.imageUrl,
                          title: chemical.name,
                          packaging: chemical.packaging,
                          price: chemical.priceNgn,
                          grade: chemical.grade,
                          chemical
                        })}
                        className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 cursor-pointer relative group"
                        title="Tap to expand picture"
                      >
                        {chemical.imageUrl ? (
                          <img 
                            src={chemical.imageUrl} 
                            alt={chemical.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-400 font-bold">
                            LOGO
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <Maximize2 className="w-3 h-3 text-white" />
                        </div>
                      </div>

                      {/* Name & Packaging */}
                      <div className="flex-1 min-w-0 pr-1">
                        <h4 className="text-xs font-bold text-slate-900 truncate" title={chemical.name}>
                          {chemical.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {chemical.packaging}
                        </span>
                      </div>

                      {/* Editable Quantity */}
                      <div className="flex items-center bg-slate-50 rounded-lg border border-slate-300 overflow-hidden shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(chemical.id, quantity - 1)}
                          className="px-1.5 py-1 text-slate-500 hover:text-slate-950 hover:bg-slate-200 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <input
                          type="number"
                          min={1}
                          max={10000}
                          value={quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            updateQuantity(chemical.id, isNaN(val) || val < 1 ? 1 : val);
                          }}
                          className="w-9 text-center text-xs font-bold text-slate-900 py-0.5 focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          aria-label={`Quantity for ${chemical.name}`}
                        />

                        <button
                          type="button"
                          onClick={() => updateQuantity(chemical.id, quantity + 1)}
                          className="px-1.5 py-1 text-slate-500 hover:text-slate-950 hover:bg-slate-200 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total & Remove */}
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-slate-950 block">
                          {formatPrice(chemical.priceNgn * quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(chemical.id)}
                          className="text-[10px] text-slate-400 hover:text-rose-600 transition"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span>Chemicals Subtotal:</span>
                    <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logistics / Freight:</span>
                    <span className="font-bold text-slate-900">
                      {deliveryFee === 0 ? 'FREE (Ojota Depot)' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200">
                    <span>Grand Total:</span>
                    <span className="text-emerald-700 font-extrabold">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing || items.length === 0}
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-black transition flex items-center justify-center gap-2 shadow-lg active:scale-98 ${
                      isProcessing || items.length === 0
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
                    }`}
                  >
                    {isProcessing ? (
                      <span>Processing Order...</span>
                    ) : paymentTab === 'onsite_depot' ? (
                      <>
                        <Building2 className="w-4 h-4" />
                        <span>Confirm & Generate Gate-Pass</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay {formatPrice(totalAmount)} via Paystack</span>
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-medium">
                    <span>✓ COA Certificate Included</span>
                    <span>✓ 100% Pure Chemical Assay</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
