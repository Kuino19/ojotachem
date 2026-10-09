'use client';
import React from 'react';
import { CHEMICALS_DATA } from '../data/chemicals';
import { Navbar } from './Navbar';
import { ChemicalGrid } from './ChemicalGrid';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { ChemicalDetailModal } from './ChemicalDetailModal';
import { CheckoutModal } from './CheckoutModal';
import { OrderSuccessModal } from './OrderSuccessModal';
import { TrackOrderModal } from './TrackOrderModal';
import { RfqModal } from './RfqModal';

export const CatalogClient: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        <ChemicalGrid chemicals={CHEMICALS_DATA} />
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
