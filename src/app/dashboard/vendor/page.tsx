'use client';

import React from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';
import { usePizza } from '../../../context/PizzaContext';
import { useAuth } from '../../../context/AuthContext';
import { Pizza, ShoppingBag, Clock, CheckCircle2, Sparkles, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function VendorDashboardOverview() {
  const { user, isPremium } = useAuth();
  const { items, orders } = usePizza();

  // Vendor's items
  const vendorItems = items.filter((i) => i.vendorId === user?.id);
  const totalItems = vendorItems.length;
  const activeItems = vendorItems.filter((i) => i.status === 'approved').length;

  // Vendor's orders
  const vendorOrders = orders.filter((o) => o.vendorId === user?.id);
  const pendingOrders = vendorOrders.filter((o) => o.status === 'pending').length;
  const acceptedOrders = vendorOrders.filter((o) => o.status === 'accepted').length;

  return (
    <ProtectedRoute allowedRoles={['vendor']}>
      <DashboardLayout>
        <div className="space-y-8">
          
          {/* Welcome & Plan Header */}
          <div className="bg-gradient-to-r from-emerald-100/90 via-white to-emerald-50 p-6 sm:p-8 rounded-3xl border border-emerald-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Restaurant Vendor Portal
                </span>
                {isPremium ? (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" /> Premium Partner
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                    Free Tier (3 Items Max)
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                {user?.businessName || user?.name}
              </h1>
              <p className="text-xs text-gray-600 mt-1">
                Manage your pizzeria menu, incoming customer orders, and subscription features.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/vendor/add-item"
                className="px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Menu Item</span>
              </Link>
              {!isPremium && (
                <Link
                  href="/dashboard/vendor/subscription"
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Upgrade to Pro</span>
                </Link>
              )}
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold">Total Menu Items</span>
                <Pizza className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">{totalItems}</h3>
              <p className="text-[11px] text-gray-400 mt-1">
                {isPremium ? 'Unlimited capacity' : 'Max 3 on Free tier'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold">Active & Live</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-emerald-700">{activeItems}</h3>
              <p className="text-[11px] text-gray-400 mt-1">Approved by admin</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold">Pending Orders</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-2xl font-black text-amber-600">{pendingOrders}</h3>
              <p className="text-[11px] text-gray-400 mt-1">Needs your acceptance</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold">Accepted Orders</span>
                <ShoppingBag className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-2xl font-black text-blue-600">{acceptedOrders}</h3>
              <p className="text-[11px] text-gray-400 mt-1">Currently in preparation</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 mb-2">
                <span className="text-xs font-bold">Plan Tier</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900 uppercase">
                {isPremium ? 'Premium' : 'Free'}
              </h3>
              <p className="text-[11px] text-gray-400 mt-1">
                {isPremium ? 'Featured on home' : 'Basic placement'}
              </p>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs p-6">
              <h3 className="text-base font-black text-gray-900 mb-2">Menu Item Inventory</h3>
              <p className="text-xs text-gray-600 mb-4">
                Update prices, descriptions, toggle availability, or submit new pizza creations.
              </p>
              <Link
                href="/dashboard/vendor/items"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#16A34A] hover:underline"
              >
                <span>Manage My Menu Items ({totalItems})</span>
                <span>→</span>
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs p-6">
              <h3 className="text-base font-black text-gray-900 mb-2">Customer Order Queue</h3>
              <p className="text-xs text-gray-600 mb-4">
                Accept incoming customer orders or decline when out of stock.
              </p>
              <Link
                href="/dashboard/vendor/orders"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#16A34A] hover:underline"
              >
                <span>Review Customer Orders ({pendingOrders} Pending)</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
