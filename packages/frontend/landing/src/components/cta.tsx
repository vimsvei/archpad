'use client';

import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle } from 'lucide-react';
import {
  getTextBlockBySlug,
  getMetadata,
  getMetadataValue,
} from '@/lib/text-blocks';

export function CTA() {
  const ctaContent = getTextBlockBySlug('cta-benefits');
  const trustBadges = getMetadataValue<Array<{ icon: string; text: string }>>(
    ctaContent,
    'trustBadges',
    [],
  );

  const benefits = [
    getMetadata(ctaContent, 'benefit1'),
    getMetadata(ctaContent, 'benefit2'),
    getMetadata(ctaContent, 'benefit3'),
    getMetadata(ctaContent, 'benefit4'),
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#7CB342] via-[#689F38] to-[#558B2F] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm mb-6">
              {getMetadata(ctaContent, 'badge')}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {getMetadata(ctaContent, 'headline')}
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {getMetadata(ctaContent, 'description')}
            </p>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <CheckCircle
                    className="flex-shrink-0 text-[#C5E1A5]"
                    size={20}
                  />
                  <span className="text-left">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/contact?subject=demo"
                className="group px-8 py-4 bg-white text-[#7CB342] rounded-full hover:bg-gray-50 hover:shadow-xl transition-all flex items-center justify-center gap-2 font-medium"
              >
                {getMetadata(ctaContent, 'ctaPrimary')}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              {/*<Link to="/pricing">*/}
              {/*  <button className="group px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium">*/}
              {/*    {getMetadata(ctaContent, 'ctaSecondary')}*/}
              {/*    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />*/}
              {/*  </button>*/}
              {/*</Link>*/}
            </motion.div>

            <p className="text-sm text-white/70 mt-6">
              {getMetadata(ctaContent, 'footerText')}{' '}
              <Link
                to="/design-partner-program"
                className="text-white underline hover:text-white/90"
              >
                {getMetadata(ctaContent, 'footerLink')}
              </Link>
            </p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm"
            >
              {trustBadges.map((badge) => (
                <div key={badge.text} className="flex items-center gap-2">
                  <span>{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
