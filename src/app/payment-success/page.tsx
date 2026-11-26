'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Sparkles, ArrowRight, Pizza, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { token, refreshUser } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Show clean success alert using SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      text: 'Your restaurant has been upgraded to PizzaHub Premium.',
      timer: 2500,
      showConfirmButton: false,
    });

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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#F7FBF8]">
      <div className="max-w-md w-full bg-white rounded-3xl border border-emerald-100 shadow-xl p-8 sm:p-10 text-center space-y-6">
        
        {/* Animated Green Checkmark Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-12 h-12 text-[#16A34A] animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase flex items-center gap-1 justify-center w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Premium Activated
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Thank You for Subscribing!
          </h1>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your payment was processed and verified successfully. Your restaurant account has been upgraded to <strong>PizzaHub Premium</strong>.
          </p>
        </div>

        {/* Benefits summary card */}
        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 text-left text-xs space-y-2 text-gray-700">
          <p className="font-bold text-gray-900 flex items-center gap-1.5">
            <Pizza className="w-4 h-4 text-[#16A34A]" /> What you now have:
          </p>
          <ul className="space-y-1 text-gray-600 pl-5 list-disc text-[11px]">
            <li>Publish unlimited active menu items</li>
            <li>Promotional placement on the homepage</li>
            <li>Verified &quot;PRO&quot; Vendor badge on your pizzas</li>
            <li>Priority customer order notifications</li>
          </ul>
        </div>

        {/* Action Button */}
        <div>
          <Link
            href="/dashboard/vendor"
            className="w-full py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Go to Vendor Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Secured by Stripe Payment System</span>
        </div>

      </div>
    </div>
  );
}

// Suspense boundary added to prevent Next.js build errors with useSearchParams
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center text-sm font-bold text-gray-500">
        Loading confirmation...
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}