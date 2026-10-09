'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, FlaskConical, Menu, X, User } from 'lucide-react';
import { SignInButton, SignUpButton, Show, UserButton, OrganizationSwitcher } from '@clerk/nextjs';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onSearch?: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { totalItemsCount: totalItems, setIsCartOpen, setIsAccountOpen } = useCart();
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
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <Link href="/catalog" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">
            Catalog
          </Link>
          
          <Link href="/ojota-chemical-market" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">
            Ojota Depot
          </Link>
          
          
          <div className="flex items-center gap-3 ml-2">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-full transition">Sign Up</button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-4">
                <OrganizationSwitcher 
                  hidePersonal={false}
                  appearance={{
                    elements: {
                      organizationSwitcherTrigger: "bg-white border border-slate-200 py-1.5 px-3 rounded-full text-slate-700 hover:bg-slate-50 transition"
                    }
                  }}
                />
                <UserButton />
              </div>
            </Show>
          </div>


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
          
          <div className="flex items-center">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-slate-900"><User className="w-6 h-6" /></button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-4">
                <OrganizationSwitcher 
                  hidePersonal={false}
                  appearance={{
                    elements: {
                      organizationSwitcherTrigger: "bg-white border border-slate-200 py-1.5 px-3 rounded-full text-slate-700 hover:bg-slate-50 transition"
                    }
                  }}
                />
                <UserButton />
              </div>
            </Show>
          </div>

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
            <Link href="/catalog" className="text-lg font-semibold text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Full Catalog</Link>
            <Link href="/ojota-chemical-market" className="text-lg font-semibold text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Ojota Depot</Link>
          </div>
        </div>
      )}
    </header>
  );
};
