'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from '@ory/elements-react/client';

export default function Root() {
  const router = useRouter();
  const { session, isLoading } = useSession();
  const sp = useSearchParams();
  const next = sp.get('next') || '/dashboard';
  
  useEffect(() => {
    if (isLoading) return;
    
    if (session) {
      router.replace('/dashboard');
    } else {
      router.replace('/(auth)/sign-in');
    }
  }, [session, isLoading, router]);
  
  return <div className="p-6 text-sm opacity-70">Проверяем сессию…</div>;
}
