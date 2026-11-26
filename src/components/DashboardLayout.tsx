'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Pizza,
  PlusCircle,
  ShoppingBag,
  CreditCard,
  Users,
  Settings,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isAdmin, isVendor, isPremium } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Define sidebar navigation items according to user role
  const getNavItems = () => {
    if (isAdmin) {
      return [
        { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
        { name: 'Manage Menu Items', href: '/dashboard/admin/items', icon: Pizza },
        { name: 'Transactions', href: '/dashboard/admin/transactions', icon: CreditCard },
        { name: 'Profile Settings', href: '/profile', icon: Settings },
      ];
    }

    if (isVendor) {
      return [
        { name: 'Overview', href: '/dashboard/vendor', icon: LayoutDashboard },
        { name: 'My Menu Items', href: '/dashboard/vendor/items', icon: Pizza },
        { name: 'Add Menu Item', href: '/dashboard/vendor/add-item', icon: PlusCircle },
        { name: 'Customer Orders', href: '/dashboard/vendor/orders', icon: ShoppingBag },
        { name: 'Subscription', href: '/dashboard/vendor/subscription', icon: CreditCard },
        { name: 'Profile Settings', href: '/profile', icon: Settings },
      ];
    }

    // Customer
    return [
      { name: 'Overview', href: '/dashboard/customer', icon: LayoutDashboard },
      { name: 'My Orders', href: '/dashboard/customer/orders', icon: ShoppingBag },
      { name: 'Profile Settings', href: '/profile', icon: Settings },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-[#F7FBF8] flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-emerald-100 p-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 text-sm">Dashboard Menu</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl text-gray-700 hover:bg-emerald-50"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-emerald-100 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto md:min-h-screen flex flex-col ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* User Card inside Sidebar */}
        <div className="p-6 border-b border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white">
          <div className="flex items-center gap-3">
            <img
              src={user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'}
              alt={user?.name || 'User'}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-300 shadow-xs"
            />
            <div className="overflow-hidden">
              <h4 className="font-black text-gray-900 text-sm truncate">{user?.name}</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {user?.role}
                </span>
                {isPremium && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> PRO
                  </span>
                )}
              </div>
            </div>
          </div>
          {user?.businessName && (
            <p className="text-xs text-gray-500 font-medium mt-2 truncate">
              {user.businessName}
            </p>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#16A34A] text-white shadow-md shadow-emerald-600/20'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-[#16A34A]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Subscription Promo widget for Free Vendors */}
        {isVendor && !isPremium && (
          <div className="p-4 m-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Upgrade to Premium</span>
            </div>
            <p className="text-[11px] text-gray-600 mb-3">
              Publish unlimited pizzas and get featured on top of homepage!
            </p>
            <Link
              href="/dashboard/vendor/subscription"
              onClick={() => setSidebarOpen(false)}
              className="block text-center py-1.5 px-3 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              Get Premium $19.99
            </Link>
          </div>
        )}

        {/* Back to Home Link */}
        <div className="p-4 border-t border-emerald-100">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#16A34A] transition-colors"
          >
            <Pizza className="w-4 h-4" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
