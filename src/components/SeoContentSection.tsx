'use client';
import React from 'react';

export const SeoContentSection: React.FC = () => {
  return (
    <section className="py-32 lg:py-48 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        <div className="mb-20 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 block">
            Quality Standard
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight mb-8">
            Why leading Nigerian industries trust our chemicals.
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            As a registered distributor operating out of the Ojota Chemical Market, we ensure every batch meets stringent analytical standards before it reaches your factory or laboratory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Uncompromising Purity</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Whether you are sourcing Caustic Soda for soap manufacturing or AR grade reagents for laboratory analysis, our products are backed by certified Certificates of Analysis (COA) and MSDS documentation.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Direct Wholesale Pricing</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              By operating directly from the largest chemical hub in West Africa, we eliminate middlemen. You receive port-import prices whether you are buying a single 25kg bag or a 30-ton trailer load.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Seamless Logistics</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our dispatch fleet handles both Mainland and Island deliveries daily. For interstate orders, we coordinate directly with heavy-duty freighters from the Ojota motor parks for safe, NAFDAC-compliant transit.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Dual Payment Security</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Order online with secure corporate card processing, or generate a warehouse gate-pass to physically inspect your chemicals at our Ojota depot before paying via POS.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
