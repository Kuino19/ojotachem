'use client';

import React from 'react';
import Link from 'next/link';
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
  Building2,
  Maximize2
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
    setIsCheckoutOpen,
    setPreviewImage
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
      label: 'Ojota Depot Pickup (Gate 2)',
      fee: 0,
      note: 'Self-collect at Ojota Chemical Market Complex',
    },
    {
      id: 'lagos_mainland',
      label: 'Lagos Mainland Delivery',
      fee: 4500,
      note: 'Ikeja, Oshodi, Maryland, Ikorodu, Surulere, etc.',
    },
    {
      id: 'lagos_island',
      label: 'Lagos Island Delivery',
      fee: 7500,
      note: 'Lekki Phase 1, Victoria Island, Ikoyi, Ajah, etc.',
    },
    {
      id: 'interstate_freight',
      label: 'Interstate Freight Haulage',
      fee: 18000,
      note: 'Dispatched via certified logistics from Ojota Hub',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-950">Your Order Cart</h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {items.length} {items.length === 1 ? 'product' : 'products'} selected
                </p>
              </div>
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
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Your cart is currently empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our wholesale catalog of certified food grade, industrial, and specialty chemicals.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-5 rounded-xl transition shadow-xs"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <>
                {items.map(({ chemical, quantity }) => (
                  <div
                    key={chemical.id}
                    className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200 flex gap-3 relative shadow-2xs hover:border-slate-300 transition"
                  >
                    {/* Thumbnail Image - Click to Expand */}
                    <div 
                      onClick={() => setPreviewImage({
                        imageUrl: chemical.imageUrl,
                        title: chemical.name,
                        packaging: chemical.packaging,
                        price: chemical.priceNgn,
                        grade: chemical.grade,
                        chemical
                      })}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 relative cursor-pointer group"
                      title="Tap to expand picture"
                    >
                      {chemical.imageUrl ? (
                        <img 
                          src={chemical.imageUrl} 
                          alt={chemical.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold">
                          HOPEARMS
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <Maximize2 className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    {/* Info & Quantity controls */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-1">
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={chemical.name}>
                            <Link 
                              href={`/catalog/${chemical.id}`}
                              onClick={() => setIsCartOpen(false)}
                              className="hover:text-emerald-700 hover:underline"
                            >
                              {chemical.name}
                            </Link>
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-slate-500 font-medium truncate">
                              {chemical.packaging}
                            </span>
                            <span className="text-[10px] text-slate-300">•</span>
                            <span className="text-[10px] text-emerald-700 font-semibold truncate">
                              {chemical.grade}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(chemical.id)}
                          className="text-slate-400 hover:text-rose-600 transition p-1 shrink-0"
                          title="Remove item"
                          aria-label={`Remove ${chemical.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity Input & Item Total */}
                      <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-200/80">
                        {/* Editable Quantity Stepper */}
                        <div className="flex items-center bg-white rounded-lg border border-slate-300 overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(chemical.id, quantity - 1)}
                            className="px-2 py-1 text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition"
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
                            className="w-12 text-center text-xs font-bold text-slate-900 py-1 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            aria-label={`Quantity for ${chemical.name}`}
                          />

                          <button
                            type="button"
                            onClick={() => updateQuantity(chemical.id, quantity + 1)}
                            className="px-2 py-1 text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Calculated Line Item Price */}
                        <span className="text-xs sm:text-sm font-black text-slate-950">
                          {formatPrice(chemical.priceNgn * quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Delivery Option Selector */}
                <div className="pt-3 border-t border-slate-200">
                  <label className="text-xs font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Delivery or Pickup Option:</span>
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {deliveryOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setDeliveryType(opt.id)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between gap-2 ${
                          deliveryType === opt.id
                            ? 'bg-emerald-50/90 border-emerald-600 text-slate-950 ring-1 ring-emerald-600 shadow-2xs font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {opt.id === 'ojota_pickup' ? (
                            <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          ) : (
                            <Truck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          )}
                          <span className="text-xs truncate">{opt.label}</span>
                        </div>
                        <span className="text-xs font-black shrink-0 text-slate-900">
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
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-3.5">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Logistics / Delivery:</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? 'FREE (Ojota Pickup)' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-emerald-700 font-extrabold">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-4 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Onsite Counter & Online Payment</span>
                </span>
                <button
                  onClick={clearCart}
                  className="hover:text-rose-600 underline font-medium"
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
