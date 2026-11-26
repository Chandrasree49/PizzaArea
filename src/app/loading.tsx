'use client';

import React from 'react';
import { Pizza } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#F7FBF8]">
      <div className="relative w-16 h-16 mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-[#16A34A] animate-spin" />
        <Pizza className="w-8 h-8 text-[#16A34A] absolute inset-0 m-auto animate-pulse" />
      </div>
      <p className="text-sm font-bold text-gray-700 animate-pulse">
        Baking your PizzaArea experience...
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Fetching fresh pizzas and orders
      </p>
    </div>
  );
}
