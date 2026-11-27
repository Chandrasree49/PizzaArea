"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Pizza, Lock, Mail, User, Store, Image as ImageIcon, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";

export type Role = "vendor" | "customer";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryRole = searchParams.get("role");
  const initialRole: Role = queryRole === "vendor" ? "vendor" : "customer";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(initialRole);
  const [businessName, setBusinessName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLengthValid = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordStrong = isLengthValid && hasUppercase && hasLowercase;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordStrong) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter.",
        confirmButtonColor: "#16A34A",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        businessName: role === "vendor" ? businessName : "",
        callbackURL: role === "vendor" ? "/dashboard/vendor" : "/dashboard/customer",
      } as any);

      setIsSubmitting(false);

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: error.message || "Failed to create account. Email may already be in use.",
          confirmButtonColor: "#16A34A",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Welcome to PizzaHub!",
        text: "Account registered successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      if (role === "vendor") {
        router.push("/dashboard/vendor");
      } else {
        router.push("/dashboard/customer");
      }
      router.refresh();
    } catch (err: any) {
      setIsSubmitting(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#16A34A",
      });
    }
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#F7FBF8] via-emerald-50/40 to-[#F7FBF8]">
      <div className="max-w-md w-full bg-white rounded-3xl border border-emerald-100 shadow-xl p-8 sm:p-10">
        
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#15803D] to-[#22C55E] flex items-center justify-center text-white mx-auto shadow-md mb-3">
            <Pizza className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Create an Account
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Join PizzaHub as a customer or partner pizzeria
          </p>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 mb-6">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
              role === "customer"
                ? "bg-white text-[#16A34A] shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer</span>
          </button>
          
          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`py-2 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
              role === "vendor"
                ? "bg-[#16A34A] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Vendor</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Luigi Rossi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
            />
          </div>

          {role === "vendor" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-emerald-600" />
                Pizzeria / Business Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Luigi's Wood-Fired Pizza"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="Min 6 chars, uppercase & lowercase"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#16A34A]"
            />

            <div className="mt-2 space-y-1 text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <div className="flex items-center gap-1.5">
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${isLengthValid ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600"}`}>
                  {isLengthValid ? "✓" : "•"}
                </span>
                <span className={isLengthValid ? "text-emerald-700 font-bold" : ""}>
                  At least 6 characters
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${hasUppercase ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600"}`}>
                  {hasUppercase ? "✓" : "•"}
                </span>
                <span className={hasUppercase ? "text-emerald-700 font-bold" : ""}>
                  At least one uppercase letter (A-Z)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${hasLowercase ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600"}`}>
                  {hasLowercase ? "✓" : "•"}
                </span>
                <span className={hasLowercase ? "text-emerald-700 font-bold" : ""}>
                  At least one lowercase letter (a-z)
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              Profile Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
              className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-[#16A34A] hover:file:bg-emerald-200"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isPasswordStrong}
            className="w-full py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-black rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {isSubmitting
                ? "Creating Account..."
                : `Register as ${role === "vendor" ? "Vendor" : "Customer"}`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-bold text-gray-400 uppercase">
            Or sign up with
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
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
          <span>Sign Up with Google</span>
        </button>

        <p className="text-center text-xs text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="font-bold text-[#16A34A] hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[90vh] flex items-center justify-center text-xs text-gray-400">Loading form...</div>}>
      <RegisterContent />
    </Suspense>
  );
}