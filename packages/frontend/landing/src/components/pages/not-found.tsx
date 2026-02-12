'use client';

import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import { getTextBlockBySlug, getMetadata } from '@/lib/text-blocks';

export function NotFound() {
  usePageMeta();
  const content = getTextBlockBySlug('not-found-page');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[#7CB342] text-8xl font-bold mb-4">
              {getMetadata(content, 'code')}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {getMetadata(content, 'title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {getMetadata(content, 'description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full font-semibold hover:shadow-xl transition-all"
              >
                <Home size={20} />
                {getMetadata(content, 'homeButton')}
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full font-semibold transition-all"
              >
                <ArrowLeft size={20} />
                {getMetadata(content, 'backButton')}
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
