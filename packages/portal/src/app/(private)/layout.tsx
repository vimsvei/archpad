'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  useSession({
    required: true,
    onUnauthenticated() {
      // можно сохранить «куда вернуть»:
      const next = typeof window !== 'undefined' ? window.location.pathname : '/dashboard';
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    },
  });
  
  // Пока сессия определяется, next-auth вернёт status="loading".
  // Можно показать скелет:
  const { status } = useSession();
  if (status === 'loading') return <div className="p-6">Загрузка…</div>;
  
  return <>{children}</>;
}
