const fs = require('fs');
const path = require('path');
const ROOT = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market';

const content = `
'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, User } from 'lucide-react';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen } = useCart();
  const [isLogin, setIsLogin] = useState(true);

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => setIsAccountOpen(false)}
      />
      <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-8 overflow-hidden transform transition-all">
        
        <button 
          onClick={() => setIsAccountOpen(false)}
          className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-6">
          <User className="w-6 h-6 text-white" />
        </div>

        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          {isLogin ? 'Welcome Back.' : 'Create Account.'}
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          {isLogin 
            ? 'Sign in to access your wholesale orders and pricing.'
            : 'Join OjotaChem for direct depot pricing and bulk RFQs.'}
        </p>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAccountOpen(false); }}>
          {!isLogin && (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Company Name</label>
              <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-400 focus:bg-white transition" placeholder="e.g. Dangote Industries" />
            </div>
          )}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
            <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-400 focus:bg-white transition" placeholder="purchasing@company.com" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
            <input type="password" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-slate-400 focus:bg-white transition" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl mt-4 transition shadow-lg shadow-slate-900/10">
            {isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};
`;

fs.writeFileSync(path.join(ROOT, 'src/components/AccountModal.tsx'), content, 'utf8');
console.log('AccountModal fixed');
