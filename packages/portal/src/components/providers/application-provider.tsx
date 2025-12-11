'use client'

import {ThemeProvider} from "@/components/providers/theme-provider";

export default function ApplicationProvider({ children }: { children: React.ReactNode } ) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
