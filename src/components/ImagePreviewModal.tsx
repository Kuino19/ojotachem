'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingCart, MessageCircle, Info } from 'lucide-react';

export const ImagePreviewModal: React.FC = () => {
  const { previewImage, setPreviewImage, addToCart, setSelectedChemical } = useCart();

  if (!previewImage) return null;

  const formatPrice = (price?: number) => {
    if (!price) return '₦0';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleOpenDetails = () => {
    if (previewImage.chemical) {
      setSelectedChemical(previewImage.chemical);
      setPreviewImage(null);
    }
  };

  const handleAddToCart = () => {
    if (previewImage.chemical) {
      addToCart(previewImage.chemical, 1);
      setPreviewImage(null);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello HopeArms Chemicals,\n\nI am interested in this product:\n*Product:* ${previewImage.title}\n*Packaging:* ${previewImage.packaging || 'Standard'}\n*Grade:* ${previewImage.grade || 'Food / Industrial Grade'}\n*Price:* ${formatPrice(previewImage.price)}\n\nPlease confirm availability and delivery schedule.`
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md transition-all duration-300"
      onClick={() => setPreviewImage(null)}
    >
      <div 
        className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto text-white animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {previewImage.grade && (
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase tracking-wider">
                  {previewImage.grade}
                </span>
              )}
              {previewImage.packaging && (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                  {previewImage.packaging}
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-black text-white mt-1">
              {previewImage.title}
            </h3>
          </div>

          <button
            onClick={() => setPreviewImage(null)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Large Expanded Image View */}
        <div className="relative w-full bg-slate-950 flex items-center justify-center p-4 sm:p-8 min-h-[320px] max-h-[60vh] overflow-hidden">
          {previewImage.imageUrl ? (
            <img
              src={previewImage.imageUrl}
              alt={previewImage.title}
              className="max-h-[55vh] max-w-full object-contain rounded-xl drop-shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
            />
          ) : (
            <div className="py-20 text-center text-slate-500 font-bold">
              Image not available
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="px-5 py-4 border-t border-slate-800 bg-slate-900/95 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Wholesale Price
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400">
              {formatPrice(previewImage.price)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {previewImage.chemical && (
              <button
                onClick={handleOpenDetails}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5"
              >
                <Info className="w-4 h-4 text-slate-400" />
                <span>Full Specifications</span>
              </button>
            )}

            {previewImage.chemical && (
              <button
                onClick={handleAddToCart}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 border border-slate-700"
              >
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
                <span>Add to Cart</span>
              </button>
            )}

            <a
              href={`https://wa.me/2349169437276?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
