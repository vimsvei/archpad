import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { MDXContent } from '@/components/mdx-content';
import { LocaleToggle } from '@/components/toggles/locale-toggle';
import { ModeToggle } from '@/components/toggles/mode-toggle';
import { TolgeeLandingProvider } from '@/components/providers/tolgee-provider';
import { SUPPORTED_LOCALES } from '@/tolgee/shared';

// Section order from landing config
const LANDING_SECTION_ORDER = [
  'hero',
  'what-is-archpad',
  'problems-solution',
  'capabilities',
  'how-it-works',
  'integrations',
  'personas',
  'use-cases',
  'trust',
  'faq',
  'cta',
];

async function getLandingConfig() {
  try {
    const configPath = path.join(process.cwd(), 'content/site/landing.yml');
    const raw = fs.readFileSync(configPath, 'utf-8');
    const config = yaml.parse(raw);
    return config?.sections ?? [];
  } catch {
    return [];
  }
}

export default async function LandingPage() {
  const cookieStore = await cookies();
  const locale =
    cookieStore.get('archpad_locale')?.value ?? 'en';
  const resolvedLocale = SUPPORTED_LOCALES.includes(locale) ? locale : 'en';

  let landingSections: Array<{ id: string; body: string; [key: string]: unknown }> = [];
  let capabilities: { items: Array<{ id: string; icon: string; titleKey: string; bodyKey: string }> } = { items: [] };
  let personas: { items: Array<{ id: string; titleKey: string; bodyKey: string }> } = { items: [] };
  let faq: { items: Array<{ qKey: string; aKey: string }> } = { items: [] };
  let useCases: Array<{ slug: string; titleKey: string; descriptionKey: string }> = [];

  try {
    const velite = await import('@/.velite');
    landingSections = (velite.landingSections ?? []) as typeof landingSections;
    const caps = velite.capabilities as unknown[];
    if (Array.isArray(caps) && caps[0]) {
      capabilities = caps[0] as typeof capabilities;
    }
    const pers = velite.personas as unknown[];
    if (Array.isArray(pers) && pers[0]) {
      personas = pers[0] as typeof personas;
    }
    const faqData = velite.faq as unknown[];
    if (Array.isArray(faqData) && faqData[0]) {
      faq = faqData[0] as typeof faq;
    }
    const useCasesData = (velite.useCases ?? []) as Array<{ slug: string; titleKey?: string; descriptionKey?: string }>;
    useCases = useCasesData.map((u) => ({
      slug: u.slug,
      titleKey: u.titleKey ?? '',
      descriptionKey: u.descriptionKey ?? '',
    }));
  } catch {
    // Velite not built yet
  }

  const configSections = await getLandingConfig();
  const orderedIds = configSections
    .filter((s: { enabled?: boolean }) => s.enabled !== false)
    .map((s: { id: string }) => s.id);

  const sectionsToRender =
    orderedIds.length > 0
      ? orderedIds
          .map((id: string) => {
            const section = landingSections.find((s) => s.id === id);
            if (!section?.body) return null;
            return section;
          })
          .filter(Boolean)
      : landingSections.sort((a, b) => {
          const ai = LANDING_SECTION_ORDER.indexOf(a.id);
          const bi = LANDING_SECTION_ORDER.indexOf(b.id);
          return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        });

  return (
    <TolgeeLandingProvider language={resolvedLocale}>
      <main className="min-h-screen">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <a href="/" className="text-xl font-bold">
              ArchPad
            </a>
            <nav className="flex items-center gap-2">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Главная
              </a>
              <a href="/app" className="text-sm text-muted-foreground hover:text-foreground">
                Открыть приложение
              </a>
              <LocaleToggle />
              <ModeToggle />
            </nav>
          </div>
        </header>

        {sectionsToRender.length === 0 ? (
          <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="mb-4 text-4xl font-bold">ArchPad</h1>
            <p className="text-muted-foreground">
              Platform for architecture artifacts. Run{' '}
              <code className="rounded bg-muted px-2 py-1">pnpm dev</code> in
              packages/landing to build content.
            </p>
          </div>
        ) : (
          sectionsToRender.map((section: { id: string; body: string; [key: string]: unknown }) => {
            const { body: _body, ...rest } = section;
            const frontmatter: Record<string, unknown> = { ...rest };
            if (section.id === 'capabilities') frontmatter.capabilities = capabilities;
            if (section.id === 'personas') frontmatter.personas = personas;
            if (section.id === 'faq') frontmatter.faq = faq;
            if (section.id === 'use-cases') frontmatter.useCases = useCases;

            return (
              <MDXContent
                key={section.id}
                code={section.body}
                frontmatter={frontmatter}
              />
            );
          })
        )}

        <footer className="border-t py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ArchPad
          </div>
        </footer>
      </main>
    </TolgeeLandingProvider>
  );
}
