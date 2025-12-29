'use client'

import {ThemeProvider} from "@/components/providers/theme-provider";
import { ReduxProvider } from "@/store/redux-provider";
import { DirectoriesPreloader } from "@/components/providers/directories-preloader";

export default function ApplicationProvider({ children }: { children: React.ReactNode } ) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReduxProvider>
        <DirectoriesPreloader />
        {children}
      </ReduxProvider>
    </ThemeProvider>
  );
}
