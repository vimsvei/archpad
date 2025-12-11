'use client'

import {ThemeProvider} from "@/components/providers/theme-provider";
import { OryProvider } from '@ory/nextjs';
import { SessionProvider } from '@ory/elements-react';

export default function ApplicationProvider({ children }: { children: React.ReactNode } ) {
  return (
    <OryProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </OryProvider>
  );
}
