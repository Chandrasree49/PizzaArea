'use client';

import React from 'react';
import Link from 'next/link';
import { Pizza, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Pizza 404 Illustration */}
        <div className="relative w-28 h-28 mx-auto">
          <div className="w-28 h-28 rounded-full bg-emerald-100 flex items-center justify-center text-[#16A34A] shadow-inner">
            <Pizza className="w-14 h-14 animate-spin [animation-duration:8s]" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-[#16A34A] text-white rounded-full text-xs font-black shadow-md">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Slice Not Found!
          </h1>
          <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
            Looks like someone ate the last slice! The page or menu item you are looking for has moved, expired, or doesn&apos;t exist.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/menu"
            className="px-5 py-2.5 bg-white hover:bg-emerald-50 text-gray-800 text-xs font-bold rounded-xl border border-emerald-200 transition-colors flex items-center gap-2"
          >
            <Pizza className="w-4 h-4 text-emerald-600" />
            <span>Browse Pizza Menu</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
