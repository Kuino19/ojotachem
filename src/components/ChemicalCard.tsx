'use client';

import React from 'react';
import { Chemical } from '../types';
import { useCart } from '../context/CartContext';
import { Plus, Check, MapPin } from 'lucide-react';
import Image from 'next/image';

interface ChemicalCardProps {
  chemical: Chemical;
}

export const ChemicalCard: React.FC<ChemicalCardProps> = ({ chemical }) => {
  const { addToCart, setSelectedChemical, items } = useCart();
  const cartItem = items.find((item) => item.chemical.id === chemical.id);
  const isInCart = Boolean(cartItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
      
      {/* Premium Image Header */}
      <div className="relative w-full h-56 lg:h-64 bg-slate-100 overflow-hidden">
        {chemical.imageUrl ? (
          <img 
            src={chemical.imageUrl} 
            alt={chemical.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <span className="text-slate-300 font-bold">OJOTACHEM</span>
          </div>
        )}
        
        {/* Floating Grade Badge */}
        <div className="absolute top-5 left-5">
          <span className="bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
            {chemical.grade}
          </span>
        </div>
      </div>

      <div className="p-8 pb-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            CAS: {chemical.casNumber}
          </span>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
            <MapPin className="w-3 h-3" /> In Stock
          </span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-slate-700 transition">
          {chemical.name}
        </h3>
        
        <p className="text-sm font-semibold text-slate-400 mb-6">
          Formula: <span className="text-slate-500">{chemical.chemicalFormula}</span>
        </p>
      </div>

      <div className="p-8 pt-0">
        <div className="grid grid-cols-2 gap-4 text-sm mb-8 pt-6 border-t border-slate-50">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-1">Purity</span>
            <span className="font-semibold text-slate-900">{chemical.purity}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-1">Packaging</span>
            <span className="font-semibold text-slate-900 truncate block">{chemical.packaging}</span>
          </div>
        </div>

        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block font-bold mb-1">
              Wholesale Price
            </span>
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {formatPrice(chemical.priceNgn)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedChemical(chemical)}
            className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-900 text-sm font-semibold py-4 rounded-full transition flex items-center justify-center gap-2"
          >
            Details
          </button>

          <button
            onClick={() => addToCart(chemical, 1)}
            className={`flex-1 text-sm font-semibold py-4 rounded-full transition flex items-center justify-center gap-2 ${
              isInCart
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 active:scale-95'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                Added ({cartItem?.quantity})
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
