'use client';

import React, { useState } from 'react';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import DashboardLayout from '../../../../components/DashboardLayout';
import { usePizza } from '../../../../context/PizzaContext';
import { useAuth } from '../../../../context/AuthContext';
import { Sparkles, Check, ShieldCheck, Zap } from 'lucide-react';
import Swal from 'sweetalert2';

export default function VendorSubscriptionPage() {
  const { isPremium } = useAuth();
  const { upgradeToPremium } = usePizza();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    const res = await upgradeToPremium();
    setIsProcessing(false);

    if (res.url) {
      // Redirecting to Stripe checkout
      window.location.href = res.url;
    } else if (res.success) {
      Swal.fire({
        icon: 'success',
        title: 'Premium Activated!',
        text: 'You now have unlimited menu items and featured home placement!',
        confirmButtonColor: '#16A34A',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Checkout Failed',
        text: res.message,
        confirmButtonColor: '#16A34A',
      });
    }
  };

  return (
    <ProtectedRoute allowedRoles={['vendor']}>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
              Vendor Subscription Plans
            </span>
            <h1 className="text-3xl font-black text-gray-900 mt-3">
              Scale Your Pizzeria with PizzaArea
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Choose the right tier to showcase your culinary creations and boost customer orders.
            </p>
          </div>

          {/* Current Status Banner */}
          <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center font-black">
                🍕
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Your Current Plan</p>
                <h4 className="text-sm font-black text-gray-900">
                  {isPremium ? 'Premium Partner Membership' : 'Free Starter Tier'}
                </h4>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                isPremium
                  ? 'bg-amber-100 text-amber-800 flex items-center gap-1'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {isPremium && <Sparkles className="w-3 h-3 text-amber-600" />}
              {isPremium ? 'ACTIVE PRO' : 'ACTIVE FREE'}
            </span>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Free Plan */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase">
                    Starter
                  </span>
                  <span className="text-2xl font-black text-gray-900">$0</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Free Plan</h3>
                <p className="text-xs text-gray-500 mb-6">
                  Perfect for testing local delivery and small boutique ovens.
                </p>

                <ul className="space-y-3 text-xs text-gray-600 mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Max <strong>3 active menu items</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Basic vendor dashboard & analytics</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Customer order acceptance workflow</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-gray-400">
                    <span className="w-4 h-4 text-center">✕</span>
                    <span className="line-through">Featured homepage placement</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-gray-400">
                    <span className="w-4 h-4 text-center">✕</span>
                    <span className="line-through">Exclusive &quot;PRO&quot; restaurant badge</span>
                  </li>
                </ul>
              </div>

              <button
                disabled={!isPremium}
                className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-xl text-xs cursor-default"
              >
                {!isPremium ? 'Current Plan' : 'Downgrade to Free'}
              </button>
            </div>

            {/* Premium Plan (Stripe) */}
            <div className="bg-gradient-to-b from-[#F7FBF8] to-emerald-50/70 rounded-3xl border-2 border-emerald-500 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-700 text-white text-[10px] font-black uppercase tracking-wider py-1 px-4 rounded-bl-xl shadow-xs">
                Recommended
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-700" />
                    Premium Tier
                  </span>
                  <div>
                    <span className="text-3xl font-black text-gray-900">$19.99</span>
                    <span className="text-xs text-gray-500 font-medium">/month</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-2">Premium Partner</h3>
                <p className="text-xs text-gray-600 mb-6">
                  For growing restaurants ready to dominate the local pizza market.
                </p>

                <ul className="space-y-3 text-xs text-gray-700 mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                    <span className="font-bold text-gray-900">Unlimited active menu items</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                    <span className="font-bold text-gray-900">Featured placement on homepage</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                    <span>Exclusive <strong>&quot;PRO&quot; Vendor Badge</strong> on every card</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                    <span>Priority order handling & support</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                    <span>Includes all Free tier features</span>
                  </li>
                </ul>
              </div>

              {isPremium ? (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-center text-xs font-bold text-emerald-800">
                  ✓ You are currently subscribed to Premium!
                </div>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-700/25 transition-all hover:scale-102 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Zap className="w-4 h-4" />
                  <span>{isProcessing ? 'Processing Stripe...' : 'Upgrade to Premium with Stripe ($19.99)'}</span>
                </button>
              )}
            </div>

          </div>

          {/* Secure Stripe notice */}
          <div className="p-4 bg-white rounded-2xl border border-gray-100 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Payments are encrypted and processed securely by Stripe Checkout with automatic webhook verification.</span>
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
