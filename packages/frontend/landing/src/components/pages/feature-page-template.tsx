'use client';

import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ImageWithFallback } from '@/components/figma/image-with-fallback';
import { usePageMeta } from '@/hooks/usePageMeta';
import {
  getFeaturePageBySlug,
  getFeaturePageMetadata,
  getFeaturePageMetadataValue,
} from '@/lib/feature-pages';
import { getIcon } from '@/lib/icons';

type FeatureCard = {
  icon: string;
  title: string;
  description: string;
  comingSoon?: boolean;
};

type FeaturePageTemplateProps = {
  slug: string;
};

export function FeaturePageTemplate({ slug }: FeaturePageTemplateProps) {
  usePageMeta();
  const content = getFeaturePageBySlug(slug);

  const HeroIcon = getIcon(getFeaturePageMetadata(content, 'heroIcon'));
  const overviewParagraphs = getFeaturePageMetadataValue<string[]>(
    content,
    'overviewParagraphs',
    [],
  );
  const keyFeatures = getFeaturePageMetadataValue<FeatureCard[]>(
    content,
    'keyFeatures',
    [],
  );
  const benefits = getFeaturePageMetadataValue<string[]>(
    content,
    'benefits',
    [],
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#7CB342] to-[#689F38] text-white">
          <div className="container mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              {getFeaturePageMetadata(content, 'backLink')}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <HeroIcon size={24} />
                <span className="font-semibold">
                  {getFeaturePageMetadata(content, 'heroBadge')}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {getFeaturePageMetadata(content, 'heroTitle')}
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-3xl">
                {getFeaturePageMetadata(content, 'heroDescription')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <ImageWithFallback
                  src={getFeaturePageMetadata(content, 'imageSrc')}
                  alt={getFeaturePageMetadata(content, 'imageAlt')}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {getFeaturePageMetadata(content, 'overviewTitle')}
                </h2>
                {overviewParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg text-gray-600 mb-6">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>

            {/* Key Features */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                {getFeaturePageMetadata(content, 'keyFeaturesTitle')}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {keyFeatures.map((feature, index) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#7CB342] hover:shadow-lg transition-all relative"
                    >
                      {feature.comingSoon && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#7CB342] to-[#689F38] text-white shadow-sm">
                            {getFeaturePageMetadata(content, 'comingSoonBadge')}
                          </span>
                        </div>
                      )}

                      <div className="w-12 h-12 bg-[#F1F8E9] rounded-xl flex items-center justify-center mb-4">
                        <Icon className="text-[#7CB342]" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-[#F1F8E9] rounded-3xl p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {getFeaturePageMetadata(content, 'benefitsTitle')}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-[#7CB342] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-lg">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#7CB342] to-[#689F38]">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {getFeaturePageMetadata(content, 'ctaTitle')}
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {getFeaturePageMetadata(content, 'ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-[#7CB342] rounded-full font-semibold hover:shadow-2xl transition-all">
                  {getFeaturePageMetadata(content, 'ctaPrimary')}
                </button>
                <Link
                  to="/"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all"
                >
                  {getFeaturePageMetadata(content, 'ctaSecondary')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
