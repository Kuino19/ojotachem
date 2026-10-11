'use client';
import React from 'react';
import Link from 'next/link';
import { FlaskConical } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setIsTrackModalOpen, setIsRfqModalOpen } = useCart();
  
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-24 pb-12">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 shrink-0 mb-6 inline-flex group">
              <img 
                src="/images/logo-horizontal-light.png" 
                alt="HOPEARMS Food Grade Chemicals" 
                className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </Link>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              The premier certified distributor of pure industrial chemicals, water purification reagents, and laboratory AR reagents in West Africa.
            </p>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-8">Categories</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="/catalog" className="hover:text-white transition">Industrial & Manufacturing</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Water Treatment</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Soap & Detergent</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition">Laboratory Reagents</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-8">Support</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => setIsTrackModalOpen(true)} className="hover:text-white transition">Track Order</button></li>
              <li><button onClick={() => setIsRfqModalOpen(true)} className="hover:text-white transition">Bulk Wholesale RFQ</button></li>
              <li><Link href="/ojota-chemical-market" className="hover:text-white transition">Depot Guide</Link></li>
              <li><a href="mailto:Alfredarmstrong96@gmail.com" className="hover:text-white transition">Email: Alfredarmstrong96@gmail.com</a></li>
              <li>
                <span className="text-xs text-slate-500 block mb-1">Direct Lines:</span>
                <div className="flex flex-col gap-1 text-sm font-semibold">
                  <a href="tel:+2349169437276" className="text-emerald-400 hover:text-emerald-300 transition">+234 916 943 7276</a>
                  <a href="tel:+2349010715400" className="text-emerald-400 hover:text-emerald-300 transition">+234 901 071 5400</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 text-sm text-slate-400 gap-4">
          <p>&copy; 2026 HopeArms Food Grade Chemicals Nigeria Ltd. All Rights Reserved.</p>
          
          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
            <span>Powered by</span>
            <a 
              href="https://www.goanitech.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition"
            >
              goanitech
            </a>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span>Pay Online</span>
            <span>Pay Onsite</span>
            <span>Same-Day Dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
