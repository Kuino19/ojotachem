const fs = require('fs');
const path = require('path');

const ROOT = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market';

const navbarContent = `
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, FlaskConical, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onSearch?: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { totalItemsCount: totalItems, setIsCartOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <header className="w-full flex flex-col z-50 sticky top-0 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-all">
      <div className="max-w-screen-2xl mx-auto w-full px-6 lg:px-12 py-4 lg:py-6 flex items-center justify-between gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 tracking-tight block leading-none">OJOTACHEM</span>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1 block">Nigeria</span>
          </div>
        </Link>

        {/* Minimal Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="w-full relative flex items-center">
            <Search className="absolute left-5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chemicals (e.g., Caustic Soda, H2SO4)..."
              className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 text-slate-900 text-sm rounded-full py-3.5 pl-12 pr-6 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
            />
          </form>
        </div>

        {/* Clean Nav Links */}
        <div className="hidden lg:flex items-center gap-8 shrink-0">
          <Link href="#catalog" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">
            Catalog
          </Link>
          <Link href="/ojota-chemical-market" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">
            Ojota Depot
          </Link>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-semibold transition active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="bg-white text-slate-900 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ml-1">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-5">
          <button onClick={() => setIsCartOpen(true)} className="relative text-slate-900">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-slate-900 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900">
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Search & Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-6 pb-6 bg-white space-y-5">
          <form onSubmit={handleSearch} className="w-full relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chemicals..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-full py-3.5 pl-12 pr-4 focus:outline-none"
            />
          </form>
          <div className="flex flex-col gap-5 pt-2">
            <Link href="#catalog" className="text-lg font-semibold text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Catalog</Link>
            <Link href="/ojota-chemical-market" className="text-lg font-semibold text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Ojota Depot</Link>
          </div>
        </div>
      )}
    </header>
  );
};
`;

const heroContent = `
'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onSearchPill?: (term: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchPill }) => {
  return (
    <section className="relative w-full bg-slate-50 pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left: Minimalist Text Content */}
        <div className="flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 text-slate-700 text-xs font-bold tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-slate-900" />
            Lagos Wholesale Depot
          </div>

          <h1 className="text-5xl lg:text-7xl xl:text-[5rem] font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
            Industrial &<br />Laboratory<br />Chemicals.
          </h1>

          <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg mb-12 font-medium">
            Direct wholesale pricing for pure industrial chemicals, water treatment reagents, and laboratory grade compounds in Lagos.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full transition active:scale-95 shadow-xl shadow-slate-900/10"
            >
              View Catalog
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/ojota-chemical-market"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-4 rounded-full border border-slate-200 transition"
            >
              <MapPin className="w-4 h-4 text-slate-400" />
              Ojota Location
            </Link>
          </div>
        </div>

        {/* Right: Beautiful Clean Image without the bloated text card */}
        <div className="relative w-full h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hover:scale-105 transition-transform duration-1000"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop")' }}
          />
          <div className="absolute inset-0 bg-slate-900/10" />
          
          {/* Subtle floating badge instead of massive card */}
          <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl max-w-[260px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Ojota Depot</h3>
                <p className="text-slate-500 text-[11px] font-semibold tracking-wide uppercase mt-1">Stock Available</p>
              </div>
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
console.log('Successfully simplified and decluttered Navbar and HeroSection.');
