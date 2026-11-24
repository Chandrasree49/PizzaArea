"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Pizza, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: redirectUrl || "/",
    });

    setIsSubmitting(false);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password",
        confirmButtonColor: "#16A34A",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Welcome Back!",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push(redirectUrl || "/");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "github", 
      callbackURL: redirectUrl || "/",
    });
  };

  
  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#F7FBF8] via-emerald-50/40 to-[#F7FBF8]">
      <div className="max-w-md w-full bg-white rounded-3xl border border-emerald-100 shadow-xl p-8 sm:p-10">
        
       
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#15803D] to-[#22C55E] flex items-center justify-center text-white mx-auto shadow-md mb-3">
            <Pizza className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Sign In to PizzaArea
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Access your customer orders, pizzeria menus, or admin portal
          </p>
        </div>

        
        <div className="mb-6 p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl">
          <p className="text-[11px] font-bold text-emerald-900 mb-1.5 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Recruiter Quick-Login Credentials:
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickFill("admin@pizzaarea.com", "Admin123!")}
              className="px-2 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg text-[10px] font-bold text-gray-800 transition-colors"
            >
              👑 Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("luigi@pizzaarea.com", "Vendor123!")}
              className="px-2 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg text-[10px] font-bold text-gray-800 transition-colors"
            >
              🍕 Premium Vendor
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("mario@pizzaarea.com", "Vendor123!")}
              className="px-2 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg text-[10px] font-bold text-gray-800 transition-colors"
            >
              🍕 Free Vendor
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill("john@example.com", "Customer123!")}
              className="px-2 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg text-[10px] font-bold text-gray-800 transition-colors"
            >
              👤 Customer
            </button>
          </div>
        </div>

        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-black rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>


        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-bold text-gray-400 uppercase">
            Or continue with
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-2xs flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer Link */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="font-bold text-[#16A34A] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}