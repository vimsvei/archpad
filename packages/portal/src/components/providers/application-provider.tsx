'use client'

import {ThemeProvider} from "@/components/providers/theme-provider";
import {ApiProvider} from "@/components/providers/api-provider";
import { ReduxProvider } from "@/store/redux-provider";

export default function ApplicationProvider({ children }: { children: React.ReactNode } ) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReduxProvider>
        <ApiProvider>
          {children}
        </ApiProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
}
