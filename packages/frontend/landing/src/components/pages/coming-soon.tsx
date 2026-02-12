'use client';

import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, Clock, Bell, Mail } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import { getTextBlockBySlug, getMetadata } from '@/lib/text-blocks';

export function ComingSoon() {
  usePageMeta();
  const content = getTextBlockBySlug('coming-soon');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7CB342] mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            {getMetadata(content, 'backLink')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-[#7CB342] to-[#689F38] rounded-3xl flex items-center justify-center shadow-2xl">
                <Clock className="text-white" size={48} />
              </div>
            </div>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-[#7CB342] to-[#689F38] text-white shadow-lg mb-6">
              {getMetadata(content, 'badge')}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {getMetadata(content, 'title')}
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              {getMetadata(content, 'descriptionLine1')}{' '}
              {getMetadata(content, 'descriptionLine2')}
            </p>

            {/* Features in Development */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#F1F8E9] rounded-2xl p-6 text-left"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4">
                  <Bell className="text-[#7CB342]" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {getMetadata(content, 'card1Title')}
                </h3>
                <p className="text-gray-600">
                  {getMetadata(content, 'card1Description')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#F1F8E9] rounded-2xl p-6 text-left"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4">
                  <Mail className="text-[#7CB342]" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {getMetadata(content, 'card2Title')}
                </h3>
                <p className="text-gray-600">
                  {getMetadata(content, 'card2Description')}
                </p>
              </motion.div>
            </div>

            {/* Subscription Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-xl max-w-xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {getMetadata(content, 'subscriptionTitle')}
              </h2>
              <p className="text-gray-600 mb-6">
                {getMetadata(content, 'subscriptionDescription')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={getMetadata(content, 'emailPlaceholder')}
                  className="flex-1 px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#7CB342] transition-colors"
                />
                <button className="px-8 py-4 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-xl hover:shadow-xl transition-all whitespace-nowrap">
                  {getMetadata(content, 'subscribeButton')}
                </button>
              </div>
            </motion.div>

            {/* Back to Home CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12"
            >
              <p className="text-gray-600 mb-4">
                {getMetadata(content, 'bottomText')}
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#7CB342] text-[#7CB342] hover:bg-[#7CB342] hover:text-white rounded-xl transition-all"
              >
                {getMetadata(content, 'bottomButton')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
