import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/toggles/mode-toggle';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" prefetch={false} className="text-xl font-bold">
            ArchPad
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              prefetch={false}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              На главную
            </Link>
            <a
              href="https://portal.archpad.pro"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Открыть приложение
            </a>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="mb-2 text-8xl font-bold text-muted-foreground">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Страница не найдена</h2>
        <p className="mb-8 max-w-md text-muted-foreground">
          Запрашиваемая страница не существует или ещё не создана. Вернитесь на
          главную или откройте приложение.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/" prefetch={false}>На главную</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="https://portal.archpad.pro">Открыть приложение</a>
          </Button>
        </div>
      </div>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ArchPad
        </div>
      </footer>
    </main>
  );
}
