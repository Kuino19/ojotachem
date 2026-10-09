import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, FlaskConical, Menu, X, User } from 'lucide-react';
import { SignInButton, Show, UserButton, OrganizationSwitcher } from '@clerk/nextjs';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { totalItemsCount: totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full z-50 sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all">
      <div className="max-w-screen-2xl mx-auto w-full px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2 group">
            <FlaskConical className="w-6 h-6 text-slate-900 transition-transform group-hover:-rotate-12" />
            <span className="text-lg font-black text-slate-900 tracking-tight">OJOTACHEM</span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="hidden lg:flex items-center justify-center gap-8 flex-1">
          <Link href="/catalog" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition">
            Catalog
          </Link>
          <Link href="/ojota-chemical-market" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition">
            Depot Locator
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-6">
          <div className="flex items-center gap-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition">Sign in</button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-4">
                <OrganizationSwitcher 
                  hidePersonal={false}
                  appearance={{
                    elements: {
                      organizationSwitcherTrigger: "bg-white border border-slate-200 py-1.5 px-3 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                    }
                  }}
                />
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-full border border-slate-200 shadow-sm"
                    }
                  }}
                />
              </div>
            </Show>
          </div>

          <div className="w-px h-5 bg-slate-200"></div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-slate-600 hover:text-slate-900 transition flex items-center group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2.5 bg-slate-900 text-white w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-6 pb-6 bg-white space-y-6 border-b border-slate-100">
          <div className="flex flex-col gap-6 pt-4">
            <Link href="/catalog" className="text-lg font-semibold text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Catalog</Link>
            <Link href="/ojota-chemical-market" className="text-lg font-semibold text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Depot Locator</Link>
          </div>
          <div className="pt-6 border-t border-slate-100">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-lg font-semibold text-slate-900 w-full text-left">Sign in</button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div className="flex flex-col gap-4">
                <OrganizationSwitcher hidePersonal={false} />
                <div className="flex items-center gap-3">
                  <UserButton />
                  <span className="text-sm font-semibold text-slate-600">Account</span>
                </div>
              </div>
            </Show>
          </div>
        </div>
      )}
    </header>
  );
};
