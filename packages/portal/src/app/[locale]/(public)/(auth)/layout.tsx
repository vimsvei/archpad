import { LocaleToggle } from "@/components/toggles/locale-toggle"
import { ModeToggle } from "@/components/toggles/mode-toggle"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative min-h-svh">
      <header className="absolute top-0 right-0 z-10 flex gap-2 p-4">
        <LocaleToggle />
        <ModeToggle />
      </header>
      {children}
    </div>
  )
}
