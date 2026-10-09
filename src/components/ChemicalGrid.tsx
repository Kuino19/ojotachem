'use client';

import React, { useState, useMemo } from 'react';
import { Chemical } from '../types';
import { ChemicalCard } from './ChemicalCard';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ChemicalGridProps {
  chemicals: Chemical[];
  initialSearch?: string;
}

const CATEGORIES = [
  'Industrial Chemicals',
  'Water Treatment',
  'Detergent & Cosmetics',
  'Laboratory & Fine Chemicals',
  'Food Additives',
];

export const ChemicalGrid: React.FC<ChemicalGridProps> = ({ chemicals, initialSearch = '' }) => {
  const { setIsRfqModalOpen } = useCart();
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredChemicals = useMemo(() => {
    return chemicals
      .filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.casNumber.toLowerCase().includes(search.toLowerCase()) ||
          c.chemicalFormula.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
  }, [chemicals, search, selectedCategory]);

  return (
    <section id="catalog-section" className="py-24 lg:py-40 bg-white text-slate-900 scroll-mt-24 border-b border-slate-100">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">
              Ojota Warehouse Inventory
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Premium Chemical Catalog.
            </h2>
          </div>
          
          <div className="w-full lg:w-[400px]">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-slate-50 text-slate-900 text-base rounded-full pl-14 pr-6 py-4 outline-none transition-all focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Minimal Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`text-sm font-semibold px-6 py-2.5 rounded-full transition ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm font-semibold px-6 py-2.5 rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Chemicals Grid */}
        {filteredChemicals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            {filteredChemicals.map((chemical) => (
              <ChemicalCard key={chemical.id} chemical={chemical} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center max-w-lg mx-auto">
            <h3 className="text-3xl font-black text-slate-900 mb-4">No Matches Found</h3>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              We stock over 500+ specialty chemicals not listed online. Request a quote directly.
            </p>
            <button
              onClick={() => setIsRfqModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold py-4 px-8 rounded-full transition"
            >
              Request Custom RFQ
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
