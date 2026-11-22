"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pizza, Menu, X, Leaf } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Menu", href: "/menu" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-3 rounded-xl">
              <Pizza size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Pizza<span className="text-green-600">Hub</span>
              </h1>

              <p className="text-xs text-green-600 flex items-center gap-1">
                <Leaf size={12} />
                Fresh Delivery
              </p>
            </div>
          </Link>

          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium ${
                  pathname === link.href
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-green-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}