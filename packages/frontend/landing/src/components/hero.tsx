'use client';

import { motion } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import {
  getTextBlockBySlug,
  getMetadata,
  getMetadataValue,
} from '@/lib/text-blocks';

const heroImage = '/images/hero.svg';

export function Hero() {
  const heroContent = getTextBlockBySlug('hero');
  const trustPrimaryText = getMetadata(heroContent, 'trustPrimaryText');
  const trustSecondaryText = getMetadata(heroContent, 'trustSecondaryText');
  const projectsLabel = getMetadata(heroContent, 'floatingCardProjectsLabel');
  const projectsValue = getMetadata(heroContent, 'floatingCardProjectsValue');
  const savingsLabel = getMetadata(heroContent, 'floatingCardSavingsLabel');
  const savingsValue = getMetadata(heroContent, 'floatingCardSavingsValue');
  const imageAlt = getMetadataValue(
    heroContent,
    'imageAlt',
    'ArchPad Dashboard',
  );

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F1F8E9] to-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-[#F1F8E9] text-[#7CB342] rounded-full text-sm mb-6"
            >
              {getMetadata(heroContent, 'badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {
                getMetadata(heroContent, 'headline').split(
                  getMetadata(heroContent, 'highlightWord'),
                )[0]
              }
              <span className="text-[#7CB342]">
                {getMetadata(heroContent, 'highlightWord')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              {getMetadata(heroContent, 'description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/register"
                className="group px-8 py-4 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {getMetadata(heroContent, 'ctaPrimary')}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                to="/contact?subject=demo"
                className="px-8 py-4 bg-white text-gray-700 rounded-full border-2 border-gray-200 hover:border-[#7CB342] hover:text-[#7CB342] transition-all flex items-center justify-center gap-2"
              >
                <Play size={20} />
                {getMetadata(heroContent, 'ctaSecondary')}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 flex items-center gap-8 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9CCC65] to-[#7CB342] border-2 border-white"
                    />
                  ))}
                </div>
                <span>{trustPrimaryText}</span>
              </div>
              <div>{trustSecondaryText}</div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <img src={heroImage} alt={imageAlt} className="w-full h-auto" />

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-xs text-gray-500 mb-1">
                  {projectsLabel}
                </div>
                <div className="text-2xl font-bold text-[#7CB342]">
                  {projectsValue}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-xs text-gray-500 mb-1">{savingsLabel}</div>
                <div className="text-2xl font-bold text-[#689F38]">
                  {savingsValue}
                </div>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-[#C5E1A5] to-[#9CCC65] rounded-full blur-3xl opacity-30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
