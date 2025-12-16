'use client'

import {ThemeProvider} from "@/components/providers/theme-provider";
import {ApiProvider} from "@/components/providers/api-provider";

export default function ApplicationProvider({ children }: { children: React.ReactNode } ) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ApiProvider>
        {children}
      </ApiProvider>
    </ThemeProvider>
  );
}
