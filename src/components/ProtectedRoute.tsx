
'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Pizza, ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace(`/signin?redirect=${encodeURIComponent(pathname)}`);
      } else if (user.isBlocked) {
        router.replace('/signin');
      } else if (allowedRoles && allowedRoles.length > 0) {
        const userRole = user.role || 'customer';
        if (!allowedRoles.includes(userRole)) {
          if (userRole === 'admin') router.replace('/dashboard/admin');
          else if (userRole === 'vendor') router.replace('/dashboard/vendor');
          else router.replace('/dashboard/customer');
        }
      }
    }
  }, [user, isLoading, allowedRoles, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F7FBF8] p-6">
        <div className="relative w-16 h-16 mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-[#16A34A] animate-spin" />
          <Pizza className="w-8 h-8 text-[#16A34A] absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-sm font-bold text-gray-700 animate-pulse">
          Loading your session...
        </p>
      </div>
    );
  }

  if (!user || user.isBlocked) {
    return null;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}