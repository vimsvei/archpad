'use client';

import { motion } from 'motion/react';
import { getTextBlockBySlug, getMetadata } from '@/lib/text-blocks';
import { getIcon } from '@/lib/icons';

export function HowItWorks() {
  const content = getTextBlockBySlug('how-it-works');
  const steps = content?.steps || [];

  const handleScrollToEarlyAccess = () => {
    const element = document.querySelector('#early-access');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#F1F8E9] text-[#7CB342] rounded-full text-sm mb-4">
            {getMetadata(content, 'badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {getMetadata(content, 'headline')}{' '}
            <span className="text-[#7CB342]">
              {getMetadata(content, 'headlineAccent')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getMetadata(content, 'description')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {steps.map((step: any, index: number) => {
            const Icon = getIcon(step.icon);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start bg-gradient-to-br from-white to-[#F1F8E9]/30 rounded-2xl p-8 border-2 border-gray-100 hover:border-[#7CB342]/30 transition-all group">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="text-6xl font-bold text-[#7CB342]/20 group-hover:text-[#7CB342]/40 transition-colors">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7CB342] to-[#689F38] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="text-white" size={32} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-[88px] top-full w-0.5 h-8 bg-gradient-to-b from-[#7CB342]/30 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            className="px-8 py-4 bg-[#7CB342] hover:bg-[#689F38] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            onClick={handleScrollToEarlyAccess}
          >
            {getMetadata(content, 'ctaButton')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
