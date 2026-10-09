'use client';
import React from 'react';
import Link from 'next/link';
import { FlaskConical } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setIsTrackModalOpen, setIsRfqModalOpen } = useCart();
  
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 shrink-0 mb-8 inline-flex">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 tracking-tight block leading-none">OJOTACHEM</span>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1 block">Nigeria</span>
              </div>
            </Link>
            <p className="text-slate-500 text-lg leading-relaxed max-w-sm">
              The premier certified distributor of pure industrial chemicals, water purification reagents, and laboratory AR reagents in West Africa.
            </p>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-8">Categories</h4>
            <ul className="space-y-4 text-slate-500">
              <li><Link href="/catalog" className="hover:text-slate-900 transition">Industrial & Manufacturing</Link></li>
              <li><Link href="/catalog" className="hover:text-slate-900 transition">Water Treatment</Link></li>
              <li><Link href="/catalog" className="hover:text-slate-900 transition">Soap & Detergent</Link></li>
              <li><Link href="/catalog" className="hover:text-slate-900 transition">Laboratory Reagents</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-8">Support</h4>
            <ul className="space-y-4 text-slate-500">
              <li><button onClick={() => setIsTrackModalOpen(true)} className="hover:text-slate-900 transition">Track Order</button></li>
              <li><button onClick={() => setIsRfqModalOpen(true)} className="hover:text-slate-900 transition">Bulk Wholesale RFQ</button></li>
              <li><Link href="/ojota-chemical-market" className="hover:text-slate-900 transition">Depot Guide</Link></li>
              <li><a href="mailto:orders@ojotachem.com.ng" className="hover:text-slate-900 transition">Contact Us</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-100 text-sm text-slate-400">
          <p>&copy; 2026 OjotaChem Nigeria Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span>Pay Online</span>
            <span>Pay Onsite</span>
            <span>Same-Day Dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
