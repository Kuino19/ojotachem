'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Chemical } from '../types';
import { ChemicalCard } from './ChemicalCard';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ChemicalGridProps {
  chemicals: Chemical[];
  initialSearch?: string;
}

const ITEMS_PER_PAGE = 24;
const ALPHABET = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

export const ChemicalGrid: React.FC<ChemicalGridProps> = ({ chemicals, initialSearch = '' }) => {
  const { setIsRfqModalOpen } = useCart();
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract top 8 categories by occurrence
  const topCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    chemicals.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, 8);
  }, [chemicals]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedLetter]);

  const filteredChemicals = useMemo(() => {
    return chemicals
      .filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.casNumber.toLowerCase().includes(search.toLowerCase()) ||
          c.chemicalFormula.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
        const matchesLetter = selectedLetter === 'All' || c.name.toUpperCase().startsWith(selectedLetter);
        
        return matchesSearch && matchesCategory && matchesLetter;
      })
      // Sort alphabetically for standard dictionary feel
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [chemicals, search, selectedCategory, selectedLetter]);

  const paginatedChemicals = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredChemicals.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredChemicals, currentPage]);

  const totalPages = Math.ceil(filteredChemicals.length / ITEMS_PER_PAGE);

  return (
    <section id="catalog-section" className="py-24 lg:py-40 bg-white text-slate-900 scroll-mt-24 border-b border-slate-100">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
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

        {/* Filters Container */}
        <div className="flex flex-col gap-8 mb-16">
          
          {/* A-Z Index Scrub */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">A-Z Directory</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLetter('All')}
                className={`w-9 h-9 flex items-center justify-center text-sm font-bold rounded-full transition ${
                  selectedLetter === 'All'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-200'
                }`}
              >
                #
              </button>
              {ALPHABET.map((letter) => {
                // Check if any chemical starts with this letter to dim it if empty
                const hasProducts = chemicals.some(c => c.name.toUpperCase().startsWith(letter));
                
                return (
                  <button
                    key={letter}
                    onClick={() => hasProducts && setSelectedLetter(letter)}
                    disabled={!hasProducts}
                    className={`w-9 h-9 flex items-center justify-center text-sm font-bold rounded-full transition ${
                      !hasProducts 
                        ? 'opacity-30 cursor-not-allowed'
                        : selectedLetter === letter
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dynamic Minimal Category Filters */}
          <div>
             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">Categories</h3>
            <div className="flex flex-wrap items-center gap-4">
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
              {topCategories.map((cat) => (
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
          </div>

        </div>

        {/* Chemicals Grid */}
        {paginatedChemicals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
              {paginatedChemicals.map((chemical) => (
                <ChemicalCard key={chemical.id} chemical={chemical} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-20">
                <button 
                  onClick={() => {
                    setCurrentPage(p => Math.max(1, p - 1));
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="px-6 py-3 rounded-full bg-slate-50 text-slate-900 font-semibold disabled:opacity-40 hover:bg-slate-100 transition"
                >
                  Previous
                </button>
                
                <span className="text-slate-500 font-medium px-4">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button 
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 rounded-full bg-slate-50 text-slate-900 font-semibold disabled:opacity-40 hover:bg-slate-100 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
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
