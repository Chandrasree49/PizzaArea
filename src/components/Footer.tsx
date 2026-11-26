'use client';

import React from 'react';
import Link from 'next/link';
import { Pizza, Phone, Mail, MapPin, Heart, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#F7FBF8] to-[#ECFDF5] border-t border-emerald-100 pt-16 pb-8 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
      
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#15803D] to-[#22C55E] flex items-center justify-center text-white shadow-md">
                <Pizza className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tight">
                Pizza<span className="text-[#16A34A]">Area</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your premier eco-conscious destination for stone-baked artisanal pizzas, farm-fresh organic toppings, and speedy 30-minute eco-friendly delivery.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
        
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-9 h-9 rounded-xl bg-white border border-emerald-200/70 flex items-center justify-center text-gray-700 hover:text-black hover:border-black transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white border border-emerald-200/70 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-500 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.456 5 15.548 5H18V0h-3.957C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white border border-emerald-200/70 flex items-center justify-center text-gray-700 hover:text-pink-600 hover:border-pink-500 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

         
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
              Explore PizzaArea
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#16A34A] transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#16A34A] transition-colors">
                  Browse Pizza Menu
                </Link>
              </li>
              <li>
                <Link href="/register?role=vendor" className="hover:text-[#16A34A] transition-colors">
                  Become a Partner Pizzeria
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#16A34A] transition-colors">
                  Customer Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
              Top Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/menu?category=Classic+Pizzas" className="hover:text-[#16A34A] transition-colors">
                  Classic Pizzas
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Vegetarian+Pizzas" className="hover:text-[#16A34A] transition-colors">
                  Vegetarian & Farm-Fresh
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Meat+Lovers" className="hover:text-[#16A34A] transition-colors">
                  Meat Lovers Supreme
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Specialty+/+Gourmet+Pizzas" className="hover:text-[#16A34A] transition-colors">
                  Specialty & Gourmet Truffle
                </Link>
              </li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
              Contact & Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>350 5th Ave, New York, NY 10118</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>+1 (800) 555-PIZZA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>support@pizzaarea.com</span>
              </li>
            </ul>
          </div>

        </div>

        
        <div className="pt-8 border-t border-emerald-200/70 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} PizzaArea Inc. All rights reserved. Fresh artisan pizzas delivered sustainably.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:underline">Privacy Policy</Link>
            <Link href="/" className="hover:underline">Terms of Service</Link>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              Made with Fresh Basil & <Heart className="w-3.5 h-3.5 text-emerald-600 fill-current" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
