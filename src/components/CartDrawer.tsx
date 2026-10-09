'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { DeliveryType } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingCart,
  Building2
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    deliveryType, 
    setDeliveryType, 
    deliveryFee, 
    subtotal, 
    totalAmount,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const deliveryOptions: { id: DeliveryType; label: string; fee: number; note: string }[] = [
    {
      id: 'ojota_pickup',
      label: 'Free Ojota Depot Pickup (Gate 2)',
      fee: 0,
      note: 'Inspect & collect directly from Ojota Chemical Market complex',
    },
    {
      id: 'lagos_mainland',
      label: 'Lagos Mainland Delivery',
      fee: 4500,
      note: 'Ikeja, Oshodi, Maryland, Ikorodu, Surulere, Yaba, Gbagada',
    },
    {
      id: 'lagos_island',
      label: 'Lagos Island Delivery',
      fee: 7500,
      note: 'Lekki Phase 1, Victoria Island, Ikoyi, Ajah, Chevron',
    },
    {
      id: 'interstate_freight',
      label: 'Interstate Freight Waybill',
      fee: 18000,
      note: 'Dispatched via certified chemical haulage from Ojota Hub',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-black text-slate-950">Your Chemical Cart</h3>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                {items.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200 transition"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our catalog of verified industrial, water treatment, and lab chemicals in Ojota.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition shadow-xs"
                >
                  Browse Chemical Catalog
                </button>
              </div>
            ) : (
              <>
                {items.map(({ chemical, quantity }) => (
                  <div
                    key={chemical.id}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col gap-2 relative shadow-2xs"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-700 font-bold block">
                          CAS: {chemical.casNumber} • {chemical.grade}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">
                          {chemical.name}
                        </h4>
                        <span className="text-[11px] text-slate-500 block">
                          {chemical.packaging}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(chemical.id)}
                        className="text-slate-400 hover:text-rose-600 transition p-1"
                        aria-label={`Remove ${chemical.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <div className="flex items-center bg-white rounded-lg border border-slate-300">
                        <button
                          onClick={() => updateQuantity(chemical.id, quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-950"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(chemical.id, quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-950"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-black text-slate-950">
                        {formatPrice(chemical.priceNgn * quantity)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Delivery Option Selector */}
                <div className="pt-4 border-t border-slate-200">
                  <label className="text-xs font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    Select Delivery or Pickup Method:
                  </label>
                  <div className="space-y-2">
                    {deliveryOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setDeliveryType(opt.id)}
                        className={`p-3 rounded-2xl border text-xs cursor-pointer transition flex items-start justify-between gap-3 ${
                          deliveryType === opt.id
                            ? 'bg-emerald-50/80 border-emerald-600 text-slate-950 ring-1 ring-emerald-600 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold flex items-center gap-1.5">
                            {opt.id === 'ojota_pickup' ? (
                              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                            ) : (
                              <Truck className="w-3.5 h-3.5 text-teal-700" />
                            )}
                            <span className="text-slate-900">{opt.label}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {opt.note}
                          </span>
                        </div>
                        <span className="font-black text-slate-900 shrink-0">
                          {opt.fee === 0 ? 'FREE' : formatPrice(opt.fee)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Chemicals Subtotal:</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery / Logistics:</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? 'FREE (Ojota Pickup)' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-emerald-700">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Pay Online or Pay Onsite at Ojota
                </span>
                <button
                  onClick={clearCart}
                  className="hover:text-rose-600 underline"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
