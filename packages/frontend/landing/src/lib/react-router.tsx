'use client';

import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ComponentProps, useCallback, useEffect, useState } from 'react';

type To = string;

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to: To;
};

export function Link({ to, ...props }: LinkProps) {
  return <NextLink href={to} {...props} />;
}

export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (to: To, options?: { replace?: boolean }) => {
      if (options?.replace) {
        router.replace(to);
        return;
      }
      router.push(to);
    },
    [router],
  );
}

export function useLocation() {
  const pathname = usePathname() ?? '/';
  const search = typeof window === 'undefined' ? '' : window.location.search;
  const hash = typeof window === 'undefined' ? '' : window.location.hash;

  return {
    pathname,
    search,
    hash,
  };
}

type SetSearchParams = (
  next: URLSearchParams | ((current: URLSearchParams) => URLSearchParams),
) => void;

export function useSearchParams(): [URLSearchParams, SetSearchParams] {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const [params, setParams] = useState<URLSearchParams>(() => {
    if (typeof window === 'undefined') {
      return new URLSearchParams();
    }
    return new URLSearchParams(window.location.search);
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    setParams(new URLSearchParams(window.location.search));
  }, [pathname]);

  const setSearchParams: SetSearchParams = useCallback(
    (next) => {
      const base =
        typeof window === 'undefined'
          ? new URLSearchParams(params.toString())
          : new URLSearchParams(window.location.search);
      const resolved = typeof next === 'function' ? next(base) : next;
      const query = resolved.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
      setParams(new URLSearchParams(query));
    },
    [router, pathname, params],
  );

  return [params, setSearchParams];
}
