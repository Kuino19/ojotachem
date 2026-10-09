'use client';
import React, { useState } from 'react';
import { CHEMICALS_DATA } from '../data/chemicals';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FeaturedChemicals } from './FeaturedChemicals';
import { OjotaDepotSection } from './OjotaDepotSection';
import { SeoContentSection } from './SeoContentSection';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { ChemicalDetailModal } from './ChemicalDetailModal';
import { CheckoutModal } from './CheckoutModal';
import { OrderSuccessModal } from './OrderSuccessModal';
import { TrackOrderModal } from './TrackOrderModal';
import { RfqModal } from './RfqModal';

export const HomeClient: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <HeroSection />

      <main className="flex-1">
        <FeaturedChemicals chemicals={CHEMICALS_DATA} />
        <OjotaDepotSection />
        <SeoContentSection />
      </main>

      <Footer />

      <CartDrawer />
      <ChemicalDetailModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <TrackOrderModal />
      <RfqModal />
          </div>
  );
};
