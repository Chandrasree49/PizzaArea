'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Sparkles, ArrowRight, Pizza, ShieldCheck } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { token, refreshUser } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (sessionId && token && !token.startsWith('mock_')) {
        try {
          await fetch(`${API_BASE}/payments/verify-session?session_id=${sessionId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (refreshUser) {
            await refreshUser();
          }
        } catch (e) {
          console.error('Session verify failed:', e);
        }
      }
      setIsVerifying(false);
    };

    verifyPayment();
  }, [sessionId, token, refreshUser]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#F7FBF8]">
      <div className="max-w-md w-full bg-white rounded-3xl border border-emerald-100 shadow-xl p-8 sm:p-10 text-center space-y-6">
        
      
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-12 h-12 text-[#16A34A]" />
        </div>

       
        <div className="space-y-2">
          <span className="px-3.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Premium Activated
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Thank You for Subscribing!
          </h1>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your payment was processed and verified successfully. Your restaurant account has been upgraded to <strong className="text-emerald-700 font-bold">PizzaArea Premium</strong>.
          </p>
        </div>

       
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 text-left text-xs space-y-2.5 text-gray-700">
          <p className="font-bold text-gray-900 flex items-center gap-2">
            <Pizza className="w-4 h-4 text-[#16A34A]" /> What you now have:
          </p>
          <ul className="space-y-1.5 text-gray-600 pl-5 list-disc text-xs">
            <li>Publish unlimited active menu items</li>
            <li>Promotional featured placement on homepage</li>
            <li>Verified &quot;PRO&quot; Vendor badge on all pizzas</li>
            <li>Priority customer order notifications</li>
          </ul>
        </div>

       
        <div>
          <Link
            href="/dashboard/vendor"
            className="w-full py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Go to Vendor Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Secured by Stripe Payment System</span>
        </div>

      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center text-sm font-bold text-gray-500">
          Loading confirmation...
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}