'use client';

import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Benefits } from '@/components/benefits';
import { UseCases } from '@/components/use-cases';
import { HowItWorks } from '@/components/how-it-works';
import { Integrations } from '@/components/integrations';
import { EarlyAccess } from '@/components/early-access';
import { FAQ } from '@/components/faq';
import { CTA } from '@/components/cta';
import { Footer } from '@/components/footer';
import { usePageMeta } from '@/hooks/usePageMeta';

export function Home() {
  usePageMeta();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Benefits />
        <UseCases />
        <HowItWorks />
        <Integrations />
        <EarlyAccess />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
