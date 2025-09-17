'use client'

import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "@/components/providers/theme-provider";

export default function ApplicationProvider({ children }: { children: React.ReactNode } ) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
