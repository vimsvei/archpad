'use client'

import {ThemeProvider} from "@/components/providers/theme-provider";
import { ReduxProvider } from "@/store/redux-provider";

export default function ApplicationProvider({ children }: { children: React.ReactNode } ) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </ThemeProvider>
  );
}
