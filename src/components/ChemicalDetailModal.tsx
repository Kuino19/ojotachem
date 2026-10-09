'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  MapPin, 
  Plus, 
  Minus, 
  ShoppingCart,
  CreditCard
} from 'lucide-react';

export const ChemicalDetailModal: React.FC = () => {
  const { selectedChemical, setSelectedChemical, addToCart, setIsCheckoutOpen } = useCart();
  const [qty, setQty] = useState(1);

  if (!selectedChemical) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddAndCheckout = () => {
    addToCart(selectedChemical, qty);
    setSelectedChemical(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white border border-slate-200 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative my-8 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {selectedChemical.grade}
              </span>
              <span className="text-xs font-mono text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                CAS: {selectedChemical.casNumber}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                {selectedChemical.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              {selectedChemical.name}
            </h2>
            <p className="text-sm font-mono text-emerald-700 font-bold mt-1">
              Chemical Formula: {selectedChemical.chemicalFormula}
            </p>
          </div>

          <button
            onClick={() => setSelectedChemical(null)}
            className="text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 p-2 rounded-full border border-slate-200 transition"
            aria-label="Close chemical specification modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Price & Depot Stock Banner */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 font-bold block uppercase">Unit Depot Price</span>
              <span className="text-2xl font-black text-slate-950">
                {formatPrice(selectedChemical.priceNgn)}
              </span>
              <span className="text-xs text-slate-500 ml-2 font-medium">/ {selectedChemical.packaging}</span>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                In Stock at Ojota Depot ({selectedChemical.stockQuantity} units)
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Depot Gate 2 Pickup or Lagos Dispatch
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-extrabold mb-2">
              Chemical Overview & Specifications
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedChemical.description}
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase">Purity Assay</span>
              <span className="text-xs font-bold text-slate-900 mt-0.5 block">{selectedChemical.purity}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase">Physical State</span>
              <span className="text-xs font-bold text-slate-900 mt-0.5 block">{selectedChemical.physicalState}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase">Packaging</span>
              <span className="text-xs font-bold text-slate-900 mt-0.5 block truncate" title={selectedChemical.packaging}>
                {selectedChemical.packaging}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase">Origin / Source</span>
              <span className="text-xs font-bold text-slate-900 mt-0.5 block">{selectedChemical.origin}</span>
            </div>
          </div>

          {/* Applications & Industry Uses */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-extrabold mb-2">
              Industrial, Commercial & Lab Applications
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {selectedChemical.applications.map((app, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-750 bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Hazard Alerts */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
            <h4 className="text-xs uppercase tracking-wider text-amber-900 font-extrabold mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Safety, GHS Hazard Warnings & Handling
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-950 mb-3 font-medium">
              {selectedChemical.hazardWarnings.map((warning, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
            <div className="text-[11px] text-slate-600 border-t border-amber-200/60 pt-2 flex items-center justify-between">
              <span><strong>Storage:</strong> {selectedChemical.storageConditions}</span>
              <span className="text-emerald-700 font-bold">MSDS Sheet Provided</span>
            </div>
          </div>

        </div>

        {/* Modal Footer with dual checkout actions */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-bold">Quantity:</span>
            <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden shadow-2xs">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-black text-slate-950 min-w-[2.5rem] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-slate-600 font-medium">
              Total: <strong className="text-slate-950 font-bold">{formatPrice(selectedChemical.priceNgn * qty)}</strong>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                addToCart(selectedChemical, qty);
                setSelectedChemical(null);
              }}
              className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold py-3 px-4 rounded-xl border border-slate-300 transition flex items-center gap-1.5 shadow-2xs"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleAddAndCheckout}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-5 rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Onsite / Online</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
