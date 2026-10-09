'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  CheckCircle2, 
  Printer, 
  MessageCircle, 
  X, 
  MapPin, 
  Download
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastOrder, isOrderSuccessOpen, setIsOrderSuccessOpen } = useCart();

  if (!isOrderSuccessOpen || !lastOrder) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello OjotaChem Depot Dispatch Team,\n\nI just placed an order on your website:\n*Order ID:* ${lastOrder.orderId}\n*Customer:* ${lastOrder.customerName}\n*Phone:* ${lastOrder.customerPhone}\n*Payment Method:* ${lastOrder.paymentMethod === 'online_paystack' ? 'Paid Online' : 'Pay Onsite at Ojota Depot'}\n*Delivery/Pickup:* ${lastOrder.deliveryType}\n*Total Amount:* ${formatPrice(lastOrder.totalAmount)}\n*Gate-Pass Code:* ${lastOrder.pickupPassCode}\n\nPlease prepare my chemical manifest and Certificate of Analysis (COA). Thank you!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white print:static">
      <div 
        className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-8 text-slate-900 print:border-none print:shadow-none print:max-w-none print:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Notification Banner */}
        <div className="bg-emerald-700 text-white p-6 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 text-white">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-black">
                {lastOrder.paymentMethod === 'online_paystack'
                  ? 'Payment Verified & Order Confirmed!'
                  : 'Ojota Depot Gate-Pass & Order Reserved!'}
              </h2>
              <p className="text-xs font-semibold text-emerald-100">
                Order ID: {lastOrder.orderId} • Pass Code: {lastOrder.pickupPassCode}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="text-white hover:bg-emerald-800 p-2 rounded-full transition"
            aria-label="Close success modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Proforma Gate-Pass & Invoice Document */}
        <div className="p-8 space-y-6 print:p-4">
          
          {/* Header & Logo */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-slate-950">
                  OJOTA<span className="text-emerald-700">CHEM</span> NIGERIA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                Wholesale Industrial & Specialty Chemicals Depot
              </p>
              <p className="text-[11px] text-slate-500">
                Block 4, Ojota Chemical Market Complex, Off Ikorodu Road, Lagos
              </p>
              <p className="text-[11px] text-slate-500">
                Phone: +234 803 294 8831 | orders@ojotachem.com.ng
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block">
                Official Proforma Gate-Pass
              </span>
              <p className="text-lg font-black text-slate-950 mt-0.5">
                {lastOrder.orderId}
              </p>
              <p className="text-[11px] text-slate-500">
                Date: {lastOrder.orderDate}
              </p>
            </div>
          </div>

          {/* Barcode & Pickup Pass Simulation */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">
                Warehouse Dispatch Pass Code
              </span>
              <span className="text-2xl font-mono font-black text-emerald-700 tracking-widest block">
                {lastOrder.pickupPassCode}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Show this barcode / code at Ojota Gate 2 Loading Bay
              </span>
            </div>

            {/* Simulated barcode graphic */}
            <div className="text-center font-mono">
              <div className="h-10 flex items-center gap-0.5 bg-white p-1 rounded border border-slate-200">
                {[4, 2, 6, 2, 8, 4, 2, 5, 3, 7, 2, 4, 3, 6, 2, 5].map((h, i) => (
                  <div key={i} className="bg-slate-900 w-1" style={{ height: `${h * 4}px` }} />
                ))}
              </div>
              <span className="text-[9px] text-slate-500 block mt-0.5 font-bold">
                VERIFIED SECURITY CODE
              </span>
            </div>
          </div>

          {/* Customer & Payment Meta Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Customer & Destination:
              </span>
              <p className="font-black text-slate-900">{lastOrder.customerName}</p>
              {lastOrder.companyName && (
                <p className="text-slate-700">{lastOrder.companyName}</p>
              )}
              <p className="text-slate-600">{lastOrder.customerPhone}</p>
              <p className="text-slate-600">{lastOrder.customerEmail}</p>
              <p className="mt-1 text-emerald-800 font-bold">
                Destination: {lastOrder.deliveryAddress || 'Ojota Chemical Depot Pickup'}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Payment & Fulfillment Details:
              </span>
              <p className="font-bold text-slate-900">
                Method:{' '}
                {lastOrder.paymentMethod === 'online_paystack'
                  ? 'Paid Online (Paystack)'
                  : 'Pay Onsite at Ojota Counter / POD'}
              </p>
              <div className="mt-1">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                    lastOrder.paymentStatus === 'Paid (Online)'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}
                >
                  Status: {lastOrder.paymentStatus}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {lastOrder.paymentMethod !== 'online_paystack'
                  ? 'Counter POS / Cashier Desk at Gate 2'
                  : 'Digital Transaction Confirmed'}
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Chemical Description</th>
                  <th className="py-2.5 px-2">Grade / CAS</th>
                  <th className="py-2.5 px-2 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {lastOrder.items.map((item, idx) => (
                  <tr key={idx} className="text-slate-800">
                    <td className="py-2.5 px-3">
                      <span className="font-bold block text-slate-900">{item.chemical.name}</span>
                      <span className="text-[10px] text-slate-500">
                        {item.chemical.packaging}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-mono text-[11px] text-slate-600">
                      {item.chemical.casNumber}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right font-black text-slate-950">
                      {formatPrice(item.chemical.priceNgn * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-1.5 text-xs text-right">
            <div className="flex justify-between text-slate-600">
              <span>Chemicals Subtotal:</span>
              <span className="font-bold text-slate-900">
                {formatPrice(lastOrder.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Logistics / Delivery:</span>
              <span className="font-bold text-slate-900">
                {lastOrder.deliveryFee === 0 ? 'FREE (Ojota Pickup)' : formatPrice(lastOrder.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200">
              <span>Total Amount:</span>
              <span className="text-emerald-700 font-black">
                {formatPrice(lastOrder.totalAmount)}
              </span>
            </div>
          </div>

          {/* Ojota Pickup Instructions */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs space-y-1">
            <h5 className="font-black text-emerald-900 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Ojota Chemical Market Warehouse Directions:
            </h5>
            <p className="text-slate-700">
              Drive into Ojota Chemical Market complex off Ikorodu Road (behind the Ojota Bus Terminal). Approach Gate 2 Loading Bay with your Gate-Pass Code <strong className="text-slate-950">{lastOrder.pickupPassCode}</strong>.
            </p>
            <p className="text-[11px] text-slate-600">
              Depot Warehouse Manager: <strong className="text-emerald-800">+234 803 294 8831</strong>
            </p>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-300 transition flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-4 h-4 text-emerald-600" />
              <span>Print Gate-Pass / Invoice</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/2348032948831?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Notify Ojota Dispatch on WhatsApp</span>
            </a>

            <button
              onClick={() => setIsOrderSuccessOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline px-2"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
