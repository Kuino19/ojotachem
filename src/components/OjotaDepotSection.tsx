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
