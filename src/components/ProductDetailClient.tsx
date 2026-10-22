'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Chemical } from '../types';
import { useCart } from '../context/CartContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { ChemicalDetailModal } from './ChemicalDetailModal';
import { CheckoutModal } from './CheckoutModal';
import { OrderSuccessModal } from './OrderSuccessModal';
import { TrackOrderModal } from './TrackOrderModal';
import { RfqModal } from './RfqModal';
import { ImagePreviewModal } from './ImagePreviewModal';
import { ChemicalCard } from './ChemicalCard';
import { 
  ChevronRight, 
  MapPin, 
  Plus, 
  Minus, 
  ShoppingCart, 
  CreditCard, 
  MessageCircle, 
  Maximize2, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Building2, 
  CheckCircle2, 
  ShieldAlert, 
  Check 
} from 'lucide-react';

interface ProductDetailClientProps {
  chemical: Chemical;
  relatedChemicals: Chemical[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ 
  chemical, 
  relatedChemicals 
}) => {
  const { addToCart, items, setIsCheckoutOpen, setPreviewImage } = useCart();
  const [qty, setQty] = useState(1);

  const cartItem = items.find((item) => item.chemical.id === chemical.id);
  const isInCart = Boolean(cartItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInstantCheckout = () => {
    addToCart(chemical, qty);
    setIsCheckoutOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello HopeArms Chemicals,\n\nI would like to order this chemical directly from the website product page:\n*Product:* ${chemical.name}\n*Quantity:* ${qty} (${chemical.packaging})\n*Grade:* ${chemical.grade}\n*Unit Price:* ${formatPrice(chemical.priceNgn)}\n*Total Estimated Amount:* ${formatPrice(chemical.priceNgn * qty)}\n\nPlease confirm availability and payment/delivery details.`
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 text-xs font-semibold text-slate-500 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-slate-900 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/catalog" className="hover:text-slate-900 transition">
              Chemical Catalog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 truncate max-w-[150px] sm:max-w-none">
              {chemical.category}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
              {chemical.name}
            </span>
          </nav>

          {/* Product Hero Section (2 Columns) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              
              {/* Left Column: Product Picture & Expandable Lightbox */}
              <div className="lg:col-span-5 space-y-4">
                <div 
                  onClick={() => setPreviewImage({
                    imageUrl: chemical.imageUrl,
                    title: chemical.name,
                    packaging: chemical.packaging,
                    price: chemical.priceNgn,
                    grade: chemical.grade,
                    chemical
                  })}
                  className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group shadow-2xs select-none"
                  title="Click to expand high-res picture"
                >
                  {chemical.imageUrl ? (
                    <img 
                      src={chemical.imageUrl} 
                      alt={chemical.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-black text-2xl">
                      HOPEARMS
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-slate-200/50">
                      {chemical.grade}
                    </span>
                    <span className="bg-emerald-600/95 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> In Stock (Ojota Depot)
                    </span>
                  </div>

                  {/* Tap to expand overlay */}
                  <div className="absolute bottom-4 right-4 bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tap to expand</span>
                  </div>
                </div>

                {/* Trust Highlights Under Image */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Original Factory Sealed</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2 text-slate-700">
                    <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">COA & MSDS Included</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Title, Pricing, Quantity & Buying Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                      CAS: {chemical.casNumber}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Formula: {chemical.chemicalFormula}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {chemical.category}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.1] mb-3">
                    {chemical.name}
                  </h1>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                    {chemical.description}
                  </p>
                </div>

                {/* Pricing & Stock Card */}
                <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block mb-1">
                        Wholesale Depot Price
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                          {formatPrice(chemical.priceNgn)}
                        </span>
                        <span className="text-sm font-bold text-slate-500">
                          / {chemical.packaging}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        {chemical.stockQuantity} Units In Stock
                      </span>
                    </div>
                  </div>

                  {/* Quantity Selector with Direct Numeric Input */}
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <label htmlFor="quantity-input" className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                        Order Quantity:
                      </label>
                      <div className="flex items-center bg-white rounded-xl border border-slate-300 overflow-hidden shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          className="p-3 text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition active:scale-95"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <input
                          id="quantity-input"
                          type="number"
                          min={1}
                          max={10000}
                          value={qty}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setQty(isNaN(val) || val < 1 ? 1 : val);
                          }}
                          className="w-16 py-2 text-center text-sm font-black text-slate-950 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          aria-label="Order quantity"
                        />

                        <button
                          type="button"
                          onClick={() => setQty(qty + 1)}
                          className="p-3 text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition active:scale-95"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-bold">
                        Calculated Total:
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-700">
                        {formatPrice(chemical.priceNgn * qty)}
                      </span>
                    </div>
                  </div>

                  {/* Purchasing Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => addToCart(chemical, qty)}
                        className={`py-4 px-6 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 active:scale-98 ${
                          isInCart
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                            : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10'
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>In Cart ({cartItem?.quantity} total)</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add {qty} to Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleInstantCheckout}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl text-sm transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-98"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Pay Onsite / Online</span>
                      </button>
                    </div>

                    {/* WhatsApp Direct Order Button */}
                    <a
                      href={`https://wa.me/2349169437276?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 font-bold py-3.5 px-6 rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow-2xs active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Order {qty} {chemical.packaging} via WhatsApp (+234 916 943 7276)</span>
                    </a>
                  </div>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Purity</span>
                    <span className="font-bold text-slate-900">{chemical.purity || 'Standard'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Packaging</span>
                    <span className="font-bold text-slate-900 truncate block">{chemical.packaging}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Physical State</span>
                    <span className="font-bold text-slate-900">{chemical.physicalState || 'Solid / Liquid'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Depot Location</span>
                    <span className="font-bold text-slate-900">Ojota, Lagos</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Detailed Technical Specifications & Information Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Left 8 Cols: Overview, Specs Table, Applications, Safety */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Technical Specifications Table */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-black text-slate-950 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>Technical & Chemical Specifications</span>
                </h2>

                <div className="divide-y divide-slate-100 text-sm">
                  <div className="py-3.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-semibold">Chemical Name</span>
                    <span className="text-slate-950 font-bold text-right">{chemical.name}</span>
                  </div>
                  <div className="py-3.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-semibold">CAS Registry Number</span>
                    <span className="font-mono text-slate-950 font-bold">{chemical.casNumber}</span>
                  </div>
                  <div className="py-3.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-semibold">Chemical Formula</span>
                    <span className="font-mono text-emerald-700 font-bold">{chemical.chemicalFormula}</span>
                  </div>
                  <div className="py-3.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-semibold">Quality Grade</span>
                    <span className="text-slate-950 font-bold">{chemical.grade}</span>
                  </div>
                  <div className="py-3.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-semibold">Purity Assay</span>
                    <span className="text-slate-950 font-bold">{chemical.purity || 'Industrial Standard'}</span>
                  </div>
                  <div className="py-3.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-semibold">Physical State</span>
                    <span className="text-slate-950 font-bold">{chemical.physicalState}</span>
                  </div>
                  <div className="py-3.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-semibold">Packaging Unit</span>
                    <span className="text-slate-950 font-bold">{chemical.packaging}</span>
                  </div>
                  {chemical.storageConditions && (
                    <div className="py-3.5 flex justify-between gap-4">
                      <span className="text-slate-500 font-semibold">Storage Conditions</span>
                      <span className="text-slate-950 font-bold text-right">{chemical.storageConditions}</span>
                    </div>
                  )}
                  <div className="py-3.5 flex justify-between gap-4">
                    <span className="text-slate-500 font-semibold">Origin / Import Hub</span>
                    <span className="text-slate-950 font-bold">{chemical.origin || 'Bonded Chemical Terminal / Port Import'}</span>
                  </div>
                </div>
              </div>

              {/* Applications & Industry Uses */}
              {chemical.applications && chemical.applications.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl font-black text-slate-950 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Industrial, Manufacturing & Food Grade Applications</span>
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    {chemical.applications.map((app, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-800 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety & Hazard Alerts */}
              {chemical.hazardWarnings && chemical.hazardWarnings.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl font-black text-amber-950 mb-4 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-600" />
                    <span>Safety, GHS Handling & Hazard Warnings</span>
                  </h2>

                  <ul className="space-y-2 text-xs sm:text-sm text-amber-950 mb-5 font-medium">
                    {chemical.hazardWarnings.map((warning, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-amber-600 font-bold text-base leading-none">•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-xs text-amber-900 border-t border-amber-200/70 pt-4 flex flex-wrap items-center justify-between gap-2">
                    <span>Always wear appropriate PPE (chemical goggles, nitrile gloves, apron).</span>
                    <span className="font-bold text-emerald-800">Official MSDS Sheet Dispatched with Order</span>
                  </div>
                </div>
              )}

            </div>

            {/* Right 4 Cols: Depot & Logistics Offload Guide */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
                <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Depot Collection & Dispatch</span>
                </h3>

                <div className="space-y-4 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Ojota Depot Gate 2:</strong>
                      <span>Block 4, Ojota Chemical Market Complex, Off Ikorodu Road, Lagos.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Lagos Same-Day Delivery:</strong>
                      <span>Dispatched via certified trucks to Ikeja, Oshodi, Apapa, Ilupeju, Lekki, and VI.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Nationwide Waybill:</strong>
                      <span>Haulage dispatch to Ogun, Ibadan, Kano, Aba, Port Harcourt, and Onitsha.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
                    Direct Purchasing Inquiries:
                  </span>
                  <div className="text-xs font-bold space-y-1">
                    <a href="tel:+2349169437276" className="text-emerald-700 hover:underline block">
                      Line 1: +234 916 943 7276
                    </a>
                    <a href="tel:+2349010715400" className="text-emerald-700 hover:underline block">
                      Line 2: +234 901 071 5400
                    </a>
                  </div>
                </div>
              </div>

              {/* Bulk RFQ card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  Bulk Wholesale Orders
                </span>
                <h4 className="text-lg font-black leading-tight">
                  Need Metric Tons or Truckload Volumes?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Request custom factory contract pricing and bonded terminal allocation directly from our senior procurement desk.
                </p>
                <Link
                  href="/rfq"
                  className="inline-block w-full text-center bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl transition"
                >
                  Request Wholesale Proforma
                </Link>
              </div>

            </div>

          </div>

          {/* Related Products from the Same Category */}
          {relatedChemicals && relatedChemicals.length > 0 && (
            <div className="border-t border-slate-200 pt-12 sm:pt-16">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                    Similar Products
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    Related Chemicals in {chemical.category}
                  </h3>
                </div>
                <Link
                  href="/catalog"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition hidden sm:block"
                >
                  View Full Catalog →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedChemicals.slice(0, 3).map((item) => (
                  <ChemicalCard key={item.id} chemical={item} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <CartDrawer />
      <ChemicalDetailModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <TrackOrderModal />
      <RfqModal />
      <ImagePreviewModal />
    </div>
  );
};
