'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/auth'; // Ensure this path is correct
import { Loader2 } from 'lucide-react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Helper to check if hydration is complete
    // In a real app we might use a custom hook for store hydration or persist.onFinish
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only check auth once hydrated
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace('/login');
    } else if (user && user.role !== UserRole.ADMIN && user.role !== UserRole.MASTER) {
      router.replace('/');
    }
  }, [isHydrated, isAuthenticated, user, router]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Double check role before rendering children to avoid flash of content
  if (user && user.role !== UserRole.ADMIN && user.role !== UserRole.MASTER) {
     return null; 
  }

  return <>{children}</>;
}
