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
            <Link 
              href="/catalog"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full transition active:scale-95 shadow-xl shadow-slate-900/10"
            >
              View Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ojota-chemical-market"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-4 rounded-full border border-slate-200 transition"
            >
              <MapPin className="w-4 h-4 text-slate-400" />
              Ojota Location
            </Link>
          </div>
        </div>

        {/* Right: Beautiful Clean Image */}
        <div className="relative w-full h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hover:scale-105 transition-transform duration-1000"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop")' }}
          />
          <div className="absolute inset-0 bg-slate-900/10" />
          
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
