const fs = require('fs');
const path = require('path');

const ROOT = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market';

const chemicalCardContent = `
'use client';

import React from 'react';
import { Chemical } from '../types';
import { useCart } from '../context/CartContext';
import { Plus, Check, ArrowRight } from 'lucide-react';

interface ChemicalCardProps {
  chemical: Chemical;
}

export const ChemicalCard: React.FC<ChemicalCardProps> = ({ chemical }) => {
  const { addToCart, setSelectedChemical, items } = useCart();
  const cartItem = items.find((item) => item.chemical.id === chemical.id);
  const isInCart = Boolean(cartItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-[2rem] p-8 border border-slate-100 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl flex flex-col justify-between h-full relative">
      
      <div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
            {chemical.grade}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            CAS: {chemical.casNumber}
          </span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-slate-700 transition">
          {chemical.name}
        </h3>
        
        <p className="text-sm font-semibold text-slate-400 mb-6">
          Formula: <span className="text-slate-500">{chemical.chemicalFormula}</span>
        </p>

        <p className="text-base text-slate-600 line-clamp-2 leading-relaxed mb-8">
          {chemical.description}
        </p>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-4 text-sm mb-8 pt-6 border-t border-slate-50">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-1">Purity</span>
            <span className="font-semibold text-slate-900">{chemical.purity}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mb-1">Packaging</span>
            <span className="font-semibold text-slate-900 truncate block">{chemical.packaging}</span>
          </div>
        </div>

        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block font-bold mb-1">
              Wholesale Price
            </span>
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {formatPrice(chemical.priceNgn)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedChemical(chemical)}
            className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-900 text-sm font-semibold py-4 rounded-full transition flex items-center justify-center gap-2"
          >
            Details
          </button>

          <button
            onClick={() => addToCart(chemical, 1)}
            className={`flex-1 text-sm font-semibold py-4 rounded-full transition flex items-center justify-center gap-2 ${
              isInCart
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 active:scale-95'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                Added ({cartItem?.quantity})
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
`;

const chemicalGridContent = `
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

const GRADES = [
  'Industrial Grade',
  'Analytical Reagent (AR)',
  'Food Grade (USP/FCC)',
  'Technical Grade',
  'Cosmetic Grade',
];

export const ChemicalGrid: React.FC<ChemicalGridProps> = ({ chemicals, initialSearch = '' }) => {
  const { setIsRfqModalOpen } = useCart();
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  const filteredChemicals = useMemo(() => {
    return chemicals
      .filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.casNumber.toLowerCase().includes(search.toLowerCase()) ||
          c.chemicalFormula.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
        const matchesGrade = selectedGrade === 'All' || c.grade === selectedGrade;
        return matchesSearch && matchesCategory && matchesGrade;
      });
  }, [chemicals, search, selectedCategory, selectedGrade]);

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
            className={\`text-sm font-semibold px-6 py-2.5 rounded-full transition \${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }\`}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={\`text-sm font-semibold px-6 py-2.5 rounded-full transition \${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }\`}
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
`;

const ojotaDepotContent = `
'use client';
import React from 'react';
import { MapPin } from 'lucide-react';

export const OjotaDepotSection: React.FC = () => {
  return (
    <section className="py-32 lg:py-48 bg-slate-900 text-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 block">
            Visit Our Facility
          </span>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-8">
            The heart of Nigeria's chemical distribution.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-lg mb-12">
            Located in the renowned Ojota Chemical Market, our depot serves as the primary distribution hub for thousands of businesses across Lagos and West Africa. We maintain strict temperature controls, safety protocols, and rigorous quality assurance.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Block 4, Suite 12-18, Ojota Chemical Market Complex</p>
              <p className="text-sm text-slate-400 mt-1">Off Ikorodu Road, Kosofe LGA, Lagos</p>
            </div>
          </div>
        </div>
        
        <div className="w-full aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=2000&auto=format&fit=crop")' }}
          />
        </div>
      </div>
    </section>
  );
};
`;

const footerContent = `
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
          <p>Ac 2026 OjotaChem Nigeria Ltd. All Rights Reserved.</p>
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
`;

fs.writeFileSync(path.join(ROOT, 'src/components/ChemicalCard.tsx'), chemicalCardContent);
fs.writeFileSync(path.join(ROOT, 'src/components/ChemicalGrid.tsx'), chemicalGridContent);
fs.writeFileSync(path.join(ROOT, 'src/components/OjotaDepotSection.tsx'), ojotaDepotContent);
fs.writeFileSync(path.join(ROOT, 'src/components/Footer.tsx'), footerContent);
console.log('Successfully upgraded all other sections to premium design');
