const fs = require('fs');
const portalPath = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\app\\portal\\page.tsx';

fs.writeFileSync(portalPath, `import React, { Suspense } from 'react';
import { auth } from '@clerk/nextjs/server';
import { UserProfile, OrganizationProfile } from '@clerk/nextjs';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const metadata = {
  title: 'My Account | OjotaChem',
};

async function PortalContent() {
  await auth.protect();
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
      {/* User Profile Component (Primary) */}
      <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col items-center">
        <div className="w-full mb-6">
          <h2 className="text-2xl font-black text-slate-900 mb-1">Personal Account</h2>
          <p className="text-slate-500 text-sm">Update your email, password, and manage your connected devices.</p>
        </div>
        <div className="w-full flex justify-center">
          <UserProfile routing="hash" />
        </div>
      </div>

      {/* Organization Profile Component (Optional B2B) */}
      <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col items-center">
        <div className="w-full mb-6">
          <div className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider mb-2">
            Wholesale / Business
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">Company Profile</h2>
          <p className="text-slate-500 text-sm">Buying for a business? Create an organization to invite your procurement team and manage roles.</p>
        </div>
        <div className="w-full flex justify-center">
          <OrganizationProfile routing="hash" />
        </div>
      </div>
    </div>
  );
}

export default function PortalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          
          <div className="mb-12">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">
              Your Profile
            </span>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Account Dashboard
            </h1>
            <p className="text-slate-500 mt-4 max-w-2xl text-lg">
              Manage your personal details and security settings. If you represent a company, you can optionally set up a business account to collaborate with your team.
            </p>
          </div>

          <Suspense fallback={<div className="py-12 text-center text-slate-500 font-bold">Authenticating...</div>}>
            <PortalContent />
          </Suspense>

        </div>
      </main>

      <Footer />
    </div>
  );
}
`);
console.log('Portal rewitten');
