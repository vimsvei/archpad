'use client';

import { motion } from 'motion/react';
import {
  Users,
  Rocket,
  MessageSquare,
  TrendingUp,
  Headphones,
  Zap,
  DollarSign,
} from 'lucide-react';
import {
  getTextBlockBySlug,
  getMetadata,
  getMetadataValue,
} from '@/lib/text-blocks';

export function EarlyAccess() {
  const content = getTextBlockBySlug('early-access');
  const individualBenefits = getMetadataValue<string[]>(
    content,
    'individualBenefits',
    [],
  );
  const designPartnerBenefits = getMetadataValue<string[]>(
    content,
    'designPartnerBenefits',
    [],
  );
  const individualIcons = [Rocket, TrendingUp, MessageSquare];
  const designPartnerIcons = [TrendingUp, Headphones, Users, DollarSign];

  return (
    <section
      id="early-access"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#E8F5E1] to-[#F1F8E9]"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#7CB342] text-white rounded-full text-sm mb-4 font-medium">
            {getMetadata(content, 'badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {getMetadata(content, 'headline')}{' '}
            <span className="text-[#7CB342]">
              {getMetadata(content, 'headlineAccent')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getMetadata(content, 'description')}
          </p>
        </motion.div>

        {/* Two Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Individual Access Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 flex flex-col"
          >
            {/* Empty space to align with badge */}
            <div className="h-[30px] mb-6" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#F1F8E9] flex items-center justify-center">
                <Users className="text-[#7CB342]" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {getMetadata(content, 'individualTitle')}
              </h3>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {getMetadata(content, 'individualDescription')}
            </p>

            {/* Benefits */}
            <ul className="space-y-4 mb-auto">
              {individualBenefits.map((item, index) => {
                const Icon = individualIcons[index] ?? Rocket;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#F1F8E9] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="text-[#7CB342]" size={12} />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                );
              })}
            </ul>

            {/* Price */}
            <div className="mt-8 mb-6 p-4 bg-[#F1F8E9] rounded-xl">
              <div className="text-sm text-gray-600 mb-1">
                {getMetadata(content, 'individualPriceLabel')}
              </div>
              <div className="text-2xl font-bold text-[#7CB342]">
                {getMetadata(content, 'individualPriceValue')}
              </div>
            </div>

            {/* CTA */}
            <button className="w-full py-4 border-2 border-[#7CB342] text-[#7CB342] rounded-full font-medium hover:bg-[#7CB342] hover:text-white transition-all">
              {getMetadata(content, 'individualCta')}
            </button>
          </motion.div>

          {/* Design Partner Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#7CB342] to-[#689F38] rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden flex flex-col"
          >
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm mb-6 font-medium self-start">
              {getMetadata(content, 'designPartnerBadge')}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {getMetadata(content, 'designPartnerTitle')}
              </h3>
            </div>

            <p className="text-white/90 mb-6 leading-relaxed">
              {getMetadata(content, 'designPartnerDescription')}
            </p>

            {/* Benefits */}
            <ul className="space-y-4 mb-auto">
              {designPartnerBenefits.map((item, index) => {
                const Icon = designPartnerIcons[index] ?? TrendingUp;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="text-white" size={12} />
                    </div>
                    <span className="text-white">{item}</span>
                  </li>
                );
              })}
            </ul>

            {/* Price */}
            <div className="mt-8 mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
              <div className="text-sm text-white/80 mb-1">
                {getMetadata(content, 'designPartnerPriceLabel')}
              </div>
              <div className="text-2xl font-bold text-white">
                {getMetadata(content, 'designPartnerPriceValue')}
              </div>
            </div>

            {/* CTA */}
            <button className="w-full py-4 bg-white text-[#7CB342] rounded-full font-medium hover:bg-gray-50 transition-all shadow-lg">
              {getMetadata(content, 'designPartnerCta')}
            </button>

            {/* Decorative elements */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-gray-500 mt-8 max-w-3xl mx-auto"
        >
          {getMetadata(content, 'footerNote')}
        </motion.p>
      </div>
    </section>
  );
}
