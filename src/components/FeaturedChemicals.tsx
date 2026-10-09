'use client';
import React from 'react';
import Link from 'next/link';
import { Chemical } from '../types';
import { ChemicalCard } from './ChemicalCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedChemicalsProps {
  chemicals: Chemical[];
}

export const FeaturedChemicals: React.FC<FeaturedChemicalsProps> = ({ chemicals }) => {
  // Only take top 6 featured chemicals for the homepage
  const featured = chemicals.slice(0, 6);

  return (
    <section className="py-32 lg:py-48 bg-white border-t border-slate-100">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">
              Direct from Depot
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Featured Products.
            </h2>
          </div>
          
          <Link
            href="/catalog"
            className="hidden lg:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full transition active:scale-95 shadow-xl shadow-slate-900/10"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {featured.map((chemical) => (
            <ChemicalCard key={chemical.id} chemical={chemical} />
          ))}
        </div>

        <div className="mt-16 flex justify-center lg:hidden">
          <Link
            href="/catalog"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full transition active:scale-95 shadow-xl shadow-slate-900/10"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
