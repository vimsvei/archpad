import Image from "next/image"
import Link from "next/link"
import { LocaleToggle } from "@/components/toggles/locale-toggle"
import { ModeToggle } from "@/components/toggles/mode-toggle"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative min-h-svh">
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/images/logo-long.png"
            alt="Archpad"
            width={140}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex gap-2">
          <LocaleToggle />
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  )
}
