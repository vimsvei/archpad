'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@ory/elements-react/client';

export default function Root() {
  const router = useRouter();
  const { session, isLoading, error } = useSession();
  
  console.log(error)

  useEffect(() => {
    if (isLoading) return;

    if (session) {
      router.replace('/dashboard');
    } else {
      router.replace('/sign-in');
    }
  }, [session, isLoading, router]);

  return <div className="p-6 text-sm opacity-70">Проверяем сессию…</div>;
}
