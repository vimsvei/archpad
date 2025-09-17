import ApplicationProvider from "@/components/providers/application-provider";

import './globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ApplicationProvider>{children}</ApplicationProvider>
      </body>
    </html>
  )
}
