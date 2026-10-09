'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  FileText, 
  Send, 
  CheckCircle2, 
  MessageCircle
} from 'lucide-react';

export const RfqModal: React.FC = () => {
  const { isRfqModalOpen, setIsRfqModalOpen } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    chemicalsNeeded: '',
    quantity: '',
    deliveryLocation: 'Lagos Mainland',
    paymentPreference: 'onsite_depot',
    notes: '',
  });

  if (!isRfqModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello OjotaChem Wholesale Department,\n\nI would like to request an official wholesale chemical quote:\n*Company:* ${formData.companyName || 'Not specified'}\n*Contact Person:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Chemicals Needed:* ${formData.chemicalsNeeded}\n*Estimated Volume:* ${formData.quantity}\n*Delivery Location:* ${formData.deliveryLocation}\n*Payment Preference:* ${formData.paymentPreference === 'onsite_depot' ? 'Pay Onsite at Ojota' : 'Corporate Bank Wire / Online'}\n\nPlease prepare proforma quotation and delivery schedule.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-8 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="text-lg font-black text-slate-950">Request Bulk Chemical Wholesale Quote</h3>
              <p className="text-xs text-slate-500 font-medium">
                Direct factory & bonded terminal pricing for metric tons, truckloads & regular contracts
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsRfqModalOpen(false);
              setSubmitted(false);
            }}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200 transition"
            aria-label="Close RFQ modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-800">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900">Wholesale RFQ Submitted!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-950">{formData.fullName}</strong>. Our senior chemical pricing desk at Ojota Chemical Market will prepare your official Proforma Invoice within 2 business hours.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/2348032948831?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send RFQ Directly on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setIsRfqModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-3 px-4 rounded-xl border border-slate-300 transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Kelechi Nwosu"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    Company / Factory Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Golden Crest Bottling Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-white text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    Phone Number (Calls / WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0803 294 8831"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. procurement@goldencrest.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">
                  Chemicals Required & Grades *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caustic Soda Flakes 99%, HTH Chlorine 70%, SLES 70%"
                  value={formData.chemicalsNeeded}
                  onChange={(e) => setFormData({ ...formData, chemicalsNeeded: e.target.value })}
                  className="w-full bg-white text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    Estimated Quantity / Volume *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 100 Bags (25kg), 10 Metric Tons, 20 Drums"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-white text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    Delivery / Offload Location *
                  </label>
                  <select
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    className="w-full bg-white text-slate-800 rounded-xl px-3 py-2.5 border border-slate-300 focus:outline-none focus:border-emerald-600 font-medium"
                  >
                    <option value="Ojota Depot Pickup">Self-Pickup at Ojota Chemical Market Depot</option>
                    <option value="Lagos Mainland">Lagos Mainland (Ikeja, Oshodi, Ilupeju, Apapa)</option>
                    <option value="Lagos Island">Lagos Island (Lekki, VI, Ikoyi, Epe)</option>
                    <option value="Ogun State">Ogun Industrial (Agbara, Sagamu, Ota)</option>
                    <option value="Nationwide Freight">Nationwide Inter-State Delivery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">
                  Payment Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setFormData({ ...formData, paymentPreference: 'onsite_depot' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      formData.paymentPreference === 'onsite_depot'
                        ? 'bg-emerald-50 border-emerald-600 text-slate-950 ring-1 ring-emerald-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-900">Pay Onsite at Ojota Depot</p>
                    <p className="text-[11px] text-slate-500">Inspect chemicals at counter, then pay POS/Cash</p>
                  </div>
                  <div
                    onClick={() => setFormData({ ...formData, paymentPreference: 'corporate_transfer' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      formData.paymentPreference === 'corporate_transfer'
                        ? 'bg-emerald-50 border-emerald-600 text-slate-950 ring-1 ring-emerald-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-bold text-xs text-slate-900">Corporate Wire / Online</p>
                    <p className="text-[11px] text-slate-500">Proforma invoice wire or instant website payment</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-2xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/20 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Wholesale Quotation Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
