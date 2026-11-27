"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  Pizza,
  LogOut,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  Leaf,
} from "lucide-react";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout } = useAuth();
  const userRole = user?.role || "customer";

  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getDashboardLink = () => {
    if (userRole === "admin") return "/dashboard/admin";
    if (userRole === "vendor") return "/dashboard/vendor";
    return "/dashboard/customer";
  };

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been signed out safely.",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Menu", href: "/menu" },
    ...(user ? [{ name: "Dashboard", href: getDashboardLink() }] : []),
  ];
     

  return (
    <header className="sticky top-0 z-50 bg-[#F7FBF8]/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#15803D] to-[#22C55E] flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-200">
              <Pizza className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-[#16A34A] transition-colors">
                Pizza<span className="text-[#16A34A]">Area</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 -mt-1 flex items-center gap-1">
                <Leaf className="w-2.5 h-2.5 text-emerald-500" /> Artisan &
                Fresh Delivery
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-150 relative py-1 ${
                    isActive
                      ? "text-[#16A34A] font-bold"
                      : "text-gray-700 hover:text-[#16A34A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side (Auth / Profile) */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#16A34A] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-xl shadow-md shadow-emerald-600/25 transition-all hover:shadow-lg active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative">
                {/* User Avatar Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 p-1.5 rounded-full hover:bg-emerald-50 border border-emerald-200/70 transition-all focus:outline-hidden cursor-pointer"
                >
                  <img
                    src={
                      user.image ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
                    }
                    alt={user.name || "User"}
                    className="w-9 h-9 rounded-full object-cover border border-emerald-300"
                  />
                  <div className="text-left hidden lg:block pr-2">
                    <p className="text-xs font-bold text-gray-900 leading-tight">
                      {user.name}
                    </p>
                    <span className="text-[10px] font-semibold uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-sm">
                      {userRole}
                    </span>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 z-50">
                     
<div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
  <img
    src={
      user.image ||
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
    }
    alt={user.name || "User"}
    className="w-10 h-10 rounded-full object-cover border border-emerald-200 shrink-0"
  />
  <div className="overflow-hidden">
    <p className="text-sm font-bold text-gray-900 truncate">
      {user.name || "User"}
    </p>
    <p className="text-xs text-gray-500 truncate">{user.email}</p>
    <span className="inline-block mt-0.5 text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-sm">
      {userRole}
    </span>
  </div>
</div>

                      {/* Navigation Actions */}
                      <div className="py-1.5">
                        <Link
                          href={getDashboardLink()}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#16A34A]" />
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          href="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-[#16A34A]" />
                          <span>Profile Settings</span>
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 pt-1.5">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-red-600" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-[#16A34A] hover:bg-emerald-50"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:bg-emerald-50 hover:text-[#16A34A]"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="px-3 py-1">
                <p className="text-xs text-gray-500">Signed in as</p>
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user.email}
                </p>
              </div>

              <Link
                href={getDashboardLink()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-emerald-50 hover:text-[#16A34A]"
              >
                <LayoutDashboard className="w-4 h-4 text-[#16A34A]" />
                Dashboard
              </Link>

              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-emerald-50 hover:text-[#16A34A]"
              >
                <Settings className="w-4 h-4 text-[#16A34A]" />
                Profile Settings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-bold text-white bg-[#16A34A] rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
