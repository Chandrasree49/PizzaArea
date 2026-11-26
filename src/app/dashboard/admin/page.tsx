'use client';

import React from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import DashboardLayout from '../../../components/DashboardLayout';
import { usePizza } from '../../../context/PizzaContext';
import { Users, Pizza, CreditCard, Clock, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardOverview() {
  const { usersList, items, transactions } = usePizza();

  const totalUsers = usersList.length;
  const totalVendors = usersList.filter((u) => u.role === 'vendor').length;
  const totalCustomers = usersList.filter((u) => u.role === 'customer').length;
  const totalItems = items.length;
  const pendingItems = items.filter((i) => i.status === 'pending').length;
  const totalTx = transactions.length;

  const totalRevenue = transactions
    .filter((t) => t.status === 'succeeded')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-emerald-100/80 via-white to-teal-50 p-6 sm:p-8 rounded-3xl border border-emerald-200/70 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <ShieldCheck className="w-3.5 h-3.5" /> PizzaArea Administrator
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                Platform Operations Overview
              </h1>
              <p className="text-xs text-gray-600 mt-1">
                Oversee platform user accounts, review pending pizza submissions, and monitor subscription billing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/admin/items"
                className="px-4 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4" />
                <span>Review Pending Items ({pendingItems})</span>
              </Link>
            </div>
          </div>

          {/* Core Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Total Users */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500">Registered Accounts</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{totalUsers}</h3>
                <p className="text-[11px] text-gray-400 mt-1">
                  {totalVendors} Vendors • {totalCustomers} Customers
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#16A34A] flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500">Total Menu Catalog</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{totalItems}</h3>
                <p className="text-[11px] text-amber-600 font-bold mt-1">
                  {pendingItems} Pending Approval
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Pizza className="w-7 h-7" />
              </div>
            </div>

            {/* Platform Revenue */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500">Stripe Subscription Volume</p>
                <h3 className="text-3xl font-black text-emerald-600 mt-1">
                  ${totalRevenue.toFixed(2)}
                </h3>
                <p className="text-[11px] text-gray-400 mt-1">
                  {totalTx} Paid Transactions
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-7 h-7" />
              </div>
            </div>

          </div>

          {/* Quick Management Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/dashboard/admin/users"
              className="group p-6 bg-white rounded-3xl border border-emerald-100 shadow-xs hover:shadow-md transition-all block"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-[#16A34A] transition-colors">
                Manage Registered Users
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Search, filter by role, and suspend or unblock accounts across the platform.
              </p>
            </Link>

            <Link
              href="/dashboard/admin/items"
              className="group p-6 bg-white rounded-3xl border border-emerald-100 shadow-xs hover:shadow-md transition-all block"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Pizza className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-[#16A34A] transition-colors">
                Manage Menu Items
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Approve, reject, or delete submitted pizzas before they appear publicly.
              </p>
            </Link>

            <Link
              href="/dashboard/admin/transactions"
              className="group p-6 bg-white rounded-3xl border border-emerald-100 shadow-xs hover:shadow-md transition-all block"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-gray-900 group-hover:text-[#16A34A] transition-colors">
                Stripe Transactions
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                View immutable payment records, Stripe session IDs, and vendor subscriptions.
              </p>
            </Link>
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
