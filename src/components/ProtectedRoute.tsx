// pizzahub-client/src/components/ProtectedRoute.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Pizza } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        router.replace('/signin');
      } else if (allowedRoles && allowedRoles.length > 0) {
        const userRole = (session.user as any)?.role || 'customer';
        if (!allowedRoles.includes(userRole)) {
          if (userRole === 'admin') router.replace('/dashboard/admin');
          else if (userRole === 'vendor') router.replace('/dashboard/vendor');
          else router.replace('/dashboard/customer');
        }
      }
    }
  }, [session, isPending, allowedRoles, router]);

  if (isPending) {
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

  if (!session?.user) {
    return null;
  }

  return <>{children}</>;
}