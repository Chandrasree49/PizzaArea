
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import { PizzaProvider } from "../context/PizzaContext";

export const metadata: Metadata = {
  title: "PizzaHub — Pizza Ordering & Delivery Platform",
  description: "Hot & Fresh artisanal pizza delivered straight to your door in 30 minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FFFDF9] text-gray-900">
        <AuthProvider>
          <PizzaProvider>
            <Suspense fallback={<div className="h-20 bg-white border-b border-gray-100" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </PizzaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}