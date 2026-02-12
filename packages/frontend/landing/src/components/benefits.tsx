'use client';

import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/image-with-fallback';
import { benefits } from '@/content';
import { getTextBlockBySlug, getMetadata } from '@/lib/text-blocks';

const benefitsImage = '/images/benefits.svg';

export function Benefits() {
  const sortedBenefits = [...benefits].sort((a, b) => a.order - b.order);
  const content = getTextBlockBySlug('benefits');

  return (
    <section
      id="benefits"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-8">
              <ImageWithFallback
                src={benefitsImage}
                alt={getMetadata(content, 'imageAlt')}
                className="w-full h-auto"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-[#C5E1A5] rounded-full blur-3xl opacity-50" />
            <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-[#9CCC65] rounded-full blur-3xl opacity-50" />
          </motion.div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-[#F1F8E9] text-[#7CB342] rounded-full text-sm mb-4">
                {getMetadata(content, 'badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {getMetadata(content, 'headline')}{' '}
                <span className="text-[#7CB342]">
                  {getMetadata(content, 'headlineAccent')}
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {getMetadata(content, 'description')}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {sortedBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-[#9CCC65] hover:shadow-lg transition-all"
                >
                  <div className="text-3xl font-bold text-[#7CB342] mb-2">
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-gray-600">{benefit.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F1F8E9] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#7CB342]">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {getMetadata(content, 'feature1Title')}
                  </div>
                  <div className="text-gray-600">
                    {getMetadata(content, 'feature1Description')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F1F8E9] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#7CB342]">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {getMetadata(content, 'feature2Title')}
                  </div>
                  <div className="text-gray-600">
                    {getMetadata(content, 'feature2Description')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F1F8E9] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#7CB342]">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    {getMetadata(content, 'feature3Title')}
                  </div>
                  <div className="text-gray-600">
                    {getMetadata(content, 'feature3Description')}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
