const fs = require('fs');
const path = require('path');

const ROOT = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market';

const navbarContent = `
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Clock, ShieldCheck, Phone, 
  Search, BookOpen, Warehouse, Truck, 
  FileText, ShoppingCart, FlaskConical, Menu, X
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onSearch?: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { cartItems, setIsCartOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <header className="w-full flex flex-col z-50 sticky top-0 shadow-sm">
      {/* Top Bar (Dark Green) */}
      <div className="hidden lg:flex items-center justify-between px-6 xl:px-12 py-2.5 bg-emerald-900 text-emerald-50 text-[11px] font-medium tracking-wide">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ojota Chemical Market Complex, Off Ikorodu Road, Lagos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Depot Hours: Mon - Sat 8:00 AM - 6:00 PM</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>COA & MSDS Included • Pay Onsite or Online</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 font-bold">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Depot Hotline: +234 803 294 8831</span>
          </div>
          <Link href="#track" className="hover:text-white underline decoration-emerald-500 underline-offset-4 transition">
            Track Order ?
          </Link>
        </div>
      </div>

      {/* Main Navbar (White) */}
      <div className="bg-white border-b border-slate-100 px-4 lg:px-6 xl:px-12 py-3 lg:py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-700 rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <FlaskConical className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight leading-none mb-0.5">
                OJOTACHEM
              </span>
              <span className="text-[9px] lg:text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase leading-none">
                Nigeria Chemical Depot
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="w-full relative flex items-center">
              <div className="absolute left-4 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search chemicals (e.g., Caustic Soda, H2SO4, Detergent...)"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-l-full py-3.5 pl-11 pr-4 focus:outline-none focus:border-emerald-500 focus:bg-white transition shadow-inner"
              />
              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-r-full font-semibold transition shadow-md flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Navigation Links & Cart (Desktop) */}
          <div className="hidden xl:flex items-center gap-6 shrink-0">
            <Link href="#catalog" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-emerald-700 transition">
              <BookOpen className="w-4 h-4" />
              <span>Chemical Catalog</span>
            </Link>
            <Link href="/ojota-chemical-market" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-emerald-700 transition">
              <Warehouse className="w-4 h-4" />
              <span>Ojota Depot Hub</span>
            </Link>
            <button className="flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-emerald-700 transition">
              <Truck className="w-4 h-4" />
              <span>Track Order</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-emerald-700 transition">
              <FileText className="w-4 h-4" />
              <span>Bulk RFQ</span>
            </button>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-bold transition shadow-lg shadow-emerald-600/20 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="bg-white text-emerald-700 w-5 h-5 rounded-full text-xs flex items-center justify-center font-black">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-emerald-700"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-600 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Visible only when menu is closed on small screens) */}
      <div className="lg:hidden p-4 bg-white border-b border-slate-100">
        <form onSubmit={handleSearch} className="w-full relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search chemicals..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-l-xl py-3 pl-4 pr-4 focus:outline-none focus:border-emerald-500"
          />
          <button 
            type="submit"
            className="bg-emerald-600 text-white px-4 py-3 rounded-r-xl"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
    </header>
  );
};
`;

const heroContent = `
'use client';
import React from 'react';
import Link from 'next/link';
import { 
  MapPin, CheckCircle2, CreditCard, Truck, ShieldCheck, 
  Building2, ArrowRight, FileCheck2, Headset, Award, FlaskConical
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeroSectionProps {
  onSearchPill?: (term: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchPill }) => {
  const { setIsRfqModalOpen } = useCart();

  return (
    <section className="relative w-full bg-white flex flex-col">
      {/* Background Image & Overlay Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop")' }}
        />
        {/* Gradient overlay to make text readable on the left and show image on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 lg:via-white/90 lg:to-white/20" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-12 pt-16 lg:pt-24 pb-20 lg:pb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side (Text Content) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start pr-0 lg:pr-8">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-8 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Direct Depot Sales: Ojota Chemical Market • Over 2,400+ Factories Supplied
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-[4rem] xl:text-[4.5rem] font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              Buy Industrial & <br className="hidden md:block"/> Laboratory <span className="text-emerald-600">Chemicals</span> <br className="hidden md:block"/> in Lagos & Ojota
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium mb-6">
              Nigeria's verified wholesale depot for 100% pure industrial chemicals, water treatment reagents, detergent raw materials, cosmetics ingredients, and laboratory AR grade reagents.
            </p>

            {/* Checkmark Line */}
            <div className="flex items-start gap-3 mb-10 max-w-2xl bg-white/60 p-3 rounded-xl backdrop-blur-sm border border-slate-100">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-slate-800 font-semibold leading-snug">
                Pay safely online or pay onsite at our Ojota Chemical Market warehouse upon physical inspection.
              </p>
            </div>

            {/* 4 Feature Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10">
              {[
                { icon: CreditCard, title: 'Dual Payment', sub: 'Pay Online or Onsite' },
                { icon: Truck, title: 'Fast Lagos Dispatch', sub: 'Mainland, Island & Freight' },
                { icon: ShieldCheck, title: 'Certified Purity', sub: 'COA & MSDS Included' },
                { icon: Building2, title: 'Wholesale Depot', sub: 'Direct Port-Import Prices' },
              ].map((f, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-center">
                  <f.icon className="w-6 h-6 text-emerald-600 mb-2" />
                  <h3 className="font-bold text-slate-900 text-[13px] leading-tight mb-1">{f.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-tight">{f.sub}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-4">
              <button 
                onClick={() => {
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-base transition shadow-xl shadow-emerald-600/30"
              >
                <FlaskConical className="w-5 h-5" />
                <span>Browse Chemical Catalog</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <Link
                href="/ojota-chemical-market"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-4 rounded-xl text-base border-2 border-slate-200 hover:border-emerald-300 transition shadow-sm"
              >
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>Ojota Depot Pickup Guide</span>
              </Link>
            </div>

            {/* RFQ Link */}
            <div className="flex items-center gap-2 text-sm">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-600 font-medium">Need 50+ Bags or Metric Tons?</span>
              <button onClick={() => setIsRfqModalOpen(true)} className="text-emerald-700 font-bold hover:underline">
                Request Bulk RFQ ?
              </button>
            </div>

          </div>

          {/* Right Side (Depot Floating Card) */}
          <div className="lg:col-span-5 xl:col-span-5 relative mt-8 lg:mt-0">
            {/* The Floating Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden transform transition hover:-translate-y-1 duration-500 max-w-md mx-auto lg:ml-auto lg:mr-0">
              
              {/* Card Header */}
              <div className="bg-emerald-800 px-8 py-6 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-emerald-300 uppercase mb-1">
                    <MapPin className="w-3 h-3" />
                    Official Lagos Distribution Hub
                  </span>
                  <h2 className="text-2xl font-black text-white">Ojota Chemical Depot</h2>
                </div>
                <div className="relative z-10 flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Depot Open
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Physical Warehouse Address</h3>
                    <p className="text-slate-600 text-[13px] leading-relaxed mt-1">
                      Block 4, Suite 12-18, Ojota Chemical Market Complex, Off Ikorodu Road, Kosofe LGA, Lagos State.
                    </p>
                    <p className="text-emerald-700 text-[11px] font-bold mt-1.5">
                      Landmark: Behind Ojota Pedestrian Bridge & Motor Park
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Pay Onsite or Online</h3>
                    <p className="text-slate-600 text-[13px] leading-relaxed mt-1">
                      Choose online checkout or generate a warehouse gate-pass to inspect chemicals first and pay at our Ojota cashier POS.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <FlaskConical className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Quality Assurance & Lab Testing</h3>
                    <p className="text-slate-600 text-[13px] leading-relaxed mt-1">
                      Batch-tested purity with Certificate of Analysis (COA) & MSDS sheets included with every single delivery.
                    </p>
                  </div>
                </div>

              </div>

              {/* Card Footer Checkmarks */}
              <div className="bg-slate-50 px-8 py-5 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px] font-bold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> NAFDAC Reg. Compliant
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Heavy Truck Loading Bay
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Factory Delivery Trucks
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Nationwide Inter-State Freight
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="relative z-20 w-full bg-emerald-900 text-white py-8 border-t border-emerald-800">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-800 border border-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm lg:text-base">Trusted by 2,400+</h4>
              <p className="text-emerald-200 text-xs mt-0.5">Factories, Labs & Businesses</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-800 border border-emerald-700 flex items-center justify-center shrink-0">
              <FlaskConical className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm lg:text-base">Wide Chemical Range</h4>
              <p className="text-emerald-200 text-xs mt-0.5">Industrial • Laboratory • Water</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-800 border border-emerald-700 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm lg:text-base">Same-Day Dispatch</h4>
              <p className="text-emerald-200 text-xs mt-0.5">Lagos Mainland & Island</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-800 border border-emerald-700 flex items-center justify-center shrink-0">
              <Headset className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm lg:text-base">Real Support</h4>
              <p className="text-emerald-200 text-xs mt-0.5">Expert Assistance & Bulk Pricing</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
`;

fs.writeFileSync(path.join(ROOT, 'src/components/Navbar.tsx'), navbarContent);
fs.writeFileSync(path.join(ROOT, 'src/components/HeroSection.tsx'), heroContent);
console.log('Successfully generated new Navbar and HeroSection matching the inspiration design.');
