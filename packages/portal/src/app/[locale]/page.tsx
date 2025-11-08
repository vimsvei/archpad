'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Root() {
  const router = useRouter();
  const { status } = useSession(); // not required — просто узнаём состояние
  const sp = useSearchParams();
  const next = sp.get('next') || '/dashboard';
  
  useEffect(() => {
    if (status === 'authenticated') router.replace('/dashboard');
    if (status === 'unauthenticated') router.replace('/sign-in');
  }, [status, router, next]);
  
  return <div className="p-6 text-sm opacity-70">Проверяем сессию…</div>;
}
