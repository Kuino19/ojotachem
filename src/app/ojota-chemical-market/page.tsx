import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { CartDrawer } from '../../components/CartDrawer';
import { ChemicalDetailModal } from '../../components/ChemicalDetailModal';
import { CheckoutModal } from '../../components/CheckoutModal';
import { OrderSuccessModal } from '../../components/OrderSuccessModal';
import { TrackOrderModal } from '../../components/TrackOrderModal';
import { RfqModal } from '../../components/RfqModal';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Truck, 
  ArrowRight,
  CreditCard
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ojota Chemical Market Lagos | Direct Warehouse Dealers & Wholesale Depot',
  description:
    'Complete guide to Ojota Chemical Market, Lagos. Buy verified industrial, lab, and detergent chemicals at direct importer prices. Pay online or onsite at our Gate 2 customer depot with same-day Lagos truck delivery.',
  alternates: {
    canonical: 'https://ojotachem.com.ng/ojota-chemical-market',
  },
};

export default function OjotaChemicalMarketPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-white py-16 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-4">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Lagos Chemical Trading Epicenter
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight max-w-4xl">
              Ojota Chemical Market, Lagos: <span className="text-emerald-700">Direct Warehouse Supply & Pricing</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              Located directly off Ikorodu Road in Kosofe LGA, the Ojota Chemical Market is Nigeria’s principal hub for raw chemical commodities. 
              <strong> OjotaChem</strong> operates our central depot at Block 4, Suite 12-18, offering guaranteed authentic chemicals, transparent wholesale prices, and full flexibility to <strong>pay onsite or pay online</strong>.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20"
              >
                <span>View Ojota Inventory & Prices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+2348032948831"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold px-5 py-3.5 rounded-xl text-sm border border-slate-300 transition shadow-2xs"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Depot Desk: +234 803 294 8831</span>
              </a>
            </div>
          </div>
        </div>

        {/* Deep SEO Article Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          
          {/* Key Facts Summary */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Market Hours</h3>
              <p className="text-xs text-slate-600">
                Monday to Friday: 8:00 AM – 6:00 PM<br />
                Saturday: 8:30 AM – 4:30 PM (WAT)
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Payment Options</h3>
              <p className="text-xs text-slate-600">
                Onsite POS, Cashier Desk, Instant Transfer upon chemical inspection, or 256-bit online card checkout.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Logistics & Haulage</h3>
              <p className="text-xs text-slate-600">
                Direct vehicle loading bays for pickup trucks, vans, flatbeds, and interstate waybill forwarding.
              </p>
            </div>
          </div>

          {/* Section: How to Navigate Ojota Chemical Market */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950">
              How to Navigate the Ojota Chemical Market in Lagos
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ojota Chemical Market is situated right adjacent to the major Ojota interchange connecting Ikorodu Road, Lagos-Ibadan Expressway, and Ketu. When arriving from Lagos Island or Ikeja, navigate towards the Ojota Bus Terminal.
            </p>
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3 shadow-xs">
              <h3 className="text-sm font-black text-emerald-800 uppercase tracking-wider">
                OjotaChem Depot Location Coordinates
              </h3>
              <p className="text-xs text-slate-700">
                <strong>Warehouse Address:</strong> Block 4, Suite 12-18, Ojota Chemical Market Complex, Off Ikorodu Road, Kosofe LGA, Lagos State, Nigeria.
              </p>
              <p className="text-xs text-slate-700">
                <strong>Landmarks:</strong> 200 meters behind the Ojota Pedestrian Bridge, adjacent to the interstate loading parks.
              </p>
              <p className="text-xs text-slate-700">
                <strong>GPS Coordinates:</strong> Latitude 6.5862° N, Longitude 3.3768° E
              </p>
            </div>
          </section>

          {/* Section: Why Pay Onsite or Order Online */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950">
              Why We Provide Dual Payment (Onsite & Online)
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2 shadow-xs">
                <h4 className="font-black text-slate-900 text-sm text-emerald-800">
                  Option 1: Pay Onsite at Ojota Counter
                </h4>
                <p>
                  We understand that many corporate procurement officers, manufacturers, and private buyers prefer to personally inspect drums, examine NAFDAC registration stamps, and test chemical concentrations before parting with funds.
                </p>
                <p>
                  When you select &quot;Pay Onsite&quot; on our website, we reserve your chemicals in our Gate 2 holding bay and generate an official Gate-Pass. You can come to our depot, inspect the products, and pay right at our cashier POS terminal with cash or instant bank transfer.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-2 shadow-xs">
                <h4 className="font-black text-slate-900 text-sm text-teal-800">
                  Option 2: Pay Online on Website
                </h4>
                <p>
                  Need urgent delivery to your factory in Ikeja, Apapa, or Lekki without battling Lagos traffic to Ojota?
                </p>
                <p>
                  You can pay instantly online via Paystack using any Nigerian debit card, dynamic virtual bank account, or USSD code. Your order is immediately queued for our dedicated chemical dispatch truck, complete with an official Certificate of Analysis (COA) and receipt.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Popular Chemicals Traded in Ojota */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-950">
              Major Chemicals Traded Daily at Ojota Chemical Market
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-900 block">Caustic Soda Flakes 99%</span>
                <span className="text-slate-500 block mt-1">Sodium Hydroxide (25kg bags) used in soap making, drain cleaners, and industrial cleaning.</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-900 block">HTH Chlorine Granules 70%</span>
                <span className="text-slate-500 block mt-1">Calcium Hypochlorite (45kg drums) for borehole water purification and swimming pools.</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-900 block">LABSA 96% Sulfonic Acid</span>
                <span className="text-slate-500 block mt-1">Primary active foaming surfactant for commercial liquid soaps and washing powders.</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-900 block">Pure Vegetable Glycerin USP</span>
                <span className="text-slate-500 block mt-1">99.7% pharmaceutical grade humectant for cosmetics, body lotions, and hair foods.</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-900 block">Sulphuric & Hydrochloric Acid</span>
                <span className="text-slate-500 block mt-1">Mineral acids for battery charging, metal pickling, and borehole descaling.</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-900 block">Citric Acid Monohydrate</span>
                <span className="text-slate-500 block mt-1">Food grade acidulant and preservative for beverages, juices, and bakeries.</span>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-8 rounded-3xl border border-emerald-200 text-center space-y-4 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Ready to Order Chemicals with Ojota Depot Dispatch?
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Skip the middleman and counterfeit risks. Order certified chemicals with guaranteed Certificate of Analysis (COA) directly from OjotaChem.
            </p>
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                href="/catalog"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20"
              >
                Browse All Chemicals Now
              </Link>
              <a
                href="https://wa.me/2348032948831"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-5 py-3 rounded-xl text-sm border border-slate-300 transition shadow-2xs"
              >
                Chat with Ojota Depot on WhatsApp
              </a>
            </div>
          </div>

        </div>
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
}
