const fs = require('fs');

// Mock API Route
const apiPath = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\app\\api\\checkout\\route.ts';
fs.writeFileSync(apiPath, `import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { userEmail, totalAmount } = body;

    // Simulated Order Creation (Database)
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Simulated Paystack Integration
    const checkoutUrl = '/order-success?reference=' + orderId;

    // Simulated Email Notification (Resend)
    console.log('[EMAIL SENT] Receipt sent to ' + userEmail + ' for Order ' + orderId);

    return NextResponse.json({ url: checkoutUrl, orderId: orderId });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
`);

// Mock Admin Dashboard
const adminPath = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\app\\admin\\page.tsx';
fs.writeFileSync(adminPath, `import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Navbar } from '../../components/Navbar';

export default async function AdminDashboard() {
  const { userId } = await auth();
  if (!userId) redirect('/');

  const orders = [
    { id: 'ORD-A9X3M2', customerName: 'Dangote Procurement', userEmail: 'procure@dangote.com', status: 'PAID', totalAmount: 450000, createdAt: new Date().toISOString() },
    { id: 'ORD-B2X99P', customerName: 'John Doe', userEmail: 'john@example.com', status: 'PENDING', totalAmount: 12500, createdAt: new Date().toISOString() }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage orders and inventory from the Ojota Depot.</p>
          </div>
          <div className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-slate-900/20">
            Total Orders: {orders.length}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm uppercase tracking-wider text-slate-500">
                  <th className="p-4 font-bold">Order ID</th>
                  <th className="p-4 font-bold">Customer</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Amount</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-mono text-xs text-slate-600">{order.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{order.customerName}</div>
                      <div className="text-xs text-slate-500">{order.userEmail}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-md">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      ?{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="p-4 text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-emerald-600 font-bold text-sm hover:text-emerald-700">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
`);
console.log('Mocked API and Admin');
