'use client';

import React from 'react';
import Link from 'next/link';
import { MenuItem } from '../types';
import { MapPin, Store, Sparkles, ArrowRight } from 'lucide-react';

interface PizzaCardProps {
  item: MenuItem;
}

export default function PizzaCard({ item }: PizzaCardProps) {
  const primaryImage =
    item.images && item.images.length > 0
      ? item.images[0]
      : 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-white rounded-3xl border border-emerald-100 shadow-xs hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1">
      {/* Image Container with Badge */}
      <div className="relative h-52 w-full overflow-hidden bg-emerald-50/50">
        <img
          src={primaryImage}
          alt={item.itemName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-gray-800 shadow-xs border border-emerald-100">
            {item.category}
          </span>
          {item.isFeatured && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-xs font-bold shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3 bg-emerald-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl font-black text-sm shadow-md border border-emerald-500/30">
          ${item.price.toFixed(2)}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Vendor and Location */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2 gap-2">
            <span className="flex items-center gap-1 font-medium text-emerald-800 truncate">
              <Store className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span className="truncate">{item.vendorName || 'Artisan Pizzeria'}</span>
            </span>
            <span className="flex items-center gap-1 text-gray-400 shrink-0">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              <span className="truncate">{item.location}</span>
            </span>
          </div>

          {/* Pizza Title */}
          <h3 className="text-lg font-black text-gray-900 group-hover:text-[#16A34A] transition-colors line-clamp-1 mb-2">
            {item.itemName}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        {/* View Details Button */}
        <div className="pt-2 border-t border-gray-100">
          <Link
            href={`/menu/${item._id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-50 hover:bg-[#16A34A] text-emerald-800 hover:text-white rounded-xl text-sm font-bold transition-all duration-200 group-hover:shadow-md"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
