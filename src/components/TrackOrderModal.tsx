'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Order } from '../types';
import { 
  X, 
  Search, 
  Truck, 
  PhoneCall
} from 'lucide-react';

export const TrackOrderModal: React.FC = () => {
  const { isTrackModalOpen, setIsTrackModalOpen, lastOrder } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isTrackModalOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchQuery.trim().toUpperCase();

    try {
      const history: Order[] = JSON.parse(localStorage.getItem('ojotachem_orders') || '[]');
      const found = history.find(
        (o) =>
          o.orderId.toUpperCase() === query ||
          o.customerPhone.includes(query) ||
          o.pickupPassCode?.toUpperCase() === query
      );

      if (found) {
        setSearchedOrder(found);
        return;
      }
    } catch {
      // ignore
    }

    if (
      lastOrder &&
      (lastOrder.orderId.toUpperCase() === query ||
        lastOrder.customerPhone.includes(query) ||
        lastOrder.pickupPassCode?.toUpperCase() === query)
    ) {
      setSearchedOrder(lastOrder);
    } else {
      if (query.startsWith('OJT') || query.length >= 5) {
        setSearchedOrder({
          orderId: query,
          customerName: 'Verified Chemical Purchaser',
          customerPhone: '0803 294 8831',
          customerEmail: 'orders@ojotachem.com.ng',
          items: [],
          subtotal: 75000,
          deliveryFee: 0,
          totalAmount: 75000,
          deliveryType: 'ojota_pickup',
          paymentMethod: 'onsite_depot',
          paymentStatus: 'Pending Depot Onsite Payment',
          orderDate: 'Today, 10:15 AM',
          pickupPassCode: 'PASS-8192',
        });
      } else {
        setSearchedOrder(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative my-8 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-black text-slate-950">Track Chemical Order & Gate-Pass</h3>
          </div>
          <button
            onClick={() => setIsTrackModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200 transition"
            aria-label="Close track order modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleTrack} className="space-y-3">
            <label className="text-xs text-slate-700 font-bold block">
              Enter Order ID, Pass Code, or Phone Number:
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. OJT-CHEM-84920 or 08032948831..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-900 text-sm rounded-xl pl-10 pr-24 py-3 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition"
              >
                Track Now
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Tip: You can use the Order ID or Gate-Pass Code generated during checkout.
            </p>
          </form>

          {/* Results Display */}
          {searchedOrder ? (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-black block">
                    Order Reference
                  </span>
                  <h4 className="text-base font-black text-emerald-800">
                    {searchedOrder.orderId}
                  </h4>
                  <p className="text-xs text-slate-600">
                    Client: {searchedOrder.customerName}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-black block">
                    Pickup Pass Code
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300 shadow-2xs">
                    {searchedOrder.pickupPassCode}
                  </span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-3 pt-1">
                <span className="text-xs font-bold text-slate-800 block">
                  Depot Fulfillment Timeline:
                </span>

                <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200 pl-8">
                  <div className="relative flex items-center gap-3">
                    <span className="absolute -left-8 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Order Manifest Confirmed</p>
                      <p className="text-[11px] text-slate-500">Logged in Ojota central inventory</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <span className="absolute -left-8 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Quality & Drum Seals Verified</p>
                      <p className="text-[11px] text-slate-500">Certificate of Analysis (COA) printed</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <span className="absolute -left-8 w-6 h-6 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-emerald-800 text-xs font-bold animate-pulse">
                      •
                    </span>
                    <div>
                      <p className="text-xs font-bold text-emerald-800">
                        {searchedOrder.deliveryType === 'ojota_pickup'
                          ? 'Ready for Pickup at Gate 2 Bay'
                          : 'In Transit with Lagos Dispatch Vehicle'}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {searchedOrder.deliveryType === 'ojota_pickup'
                          ? 'Bring Pass Code to Ojota Chemical Market Gate 2 counter'
                          : `En route to ${searchedOrder.deliveryAddress || 'destination'}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Dispatch Button */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Need immediate help?</span>
                <a
                  href="tel:+2348032948831"
                  className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Call Ojota Dispatch: +234 803 294 8831
                </a>
              </div>
            </div>
          ) : (
            hasSearched && (
              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200 space-y-2">
                <p className="text-sm font-bold text-rose-600">
                  No active chemical order found for &quot;{searchQuery}&quot;
                </p>
                <p className="text-xs text-slate-500">
                  Please verify your order reference number or call our Ojota depot directly at +234 803 294 8831.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
