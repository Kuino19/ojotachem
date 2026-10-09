const fs = require('fs');

const adminPath = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\app\\admin\\page.tsx';
fs.writeFileSync(adminPath, `import React, { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { prisma } from '../../lib/prisma';

async function AdminContent() {
  const { userId } = await auth();
  if (!userId) redirect('/');

  // Fetch real orders from database
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true } // Since we haven't synced Products to DB yet, we just include items
  });

  return (
    <>
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
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">No orders found yet.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-mono text-xs text-slate-600">{order.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{order.customerName}</div>
                      <div className="text-xs text-slate-500">{order.userEmail}</div>
                    </td>
                    <td className="p-4">
                      <span className={\`text-xs font-bold px-2 py-1 rounded-md \${order.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}\`}>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-screen-xl mx-auto px-6 py-12">
        <Suspense fallback={<div className="text-slate-500 font-bold py-12 text-center">Loading Admin Data...</div>}>
          <AdminContent />
        </Suspense>
      </main>
    </div>
  );
}
`);
console.log('Restored Admin with Prisma');
