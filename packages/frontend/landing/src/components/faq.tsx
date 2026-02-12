'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { getAllFAQ } from '@/lib/faq';
import { getTextBlockBySlug, getMetadata } from '@/lib/text-blocks';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = getAllFAQ();
  const content = getTextBlockBySlug('faq');

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-4xl">
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
          <p className="text-lg text-gray-600">
            {getMetadata(content, 'description')}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-white border-2 border-gray-100 hover:border-[#7CB342]/30 rounded-2xl p-6 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7CB342] transition-colors pr-4">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-[#F1F8E9] flex items-center justify-center transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="text-[#7CB342]" size={16} />
                  </div>
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            {getMetadata(content, 'ctaText')}
          </p>
          <Link to="/contact">
            <button className="px-8 py-4 border-2 border-[#7CB342] text-[#7CB342] rounded-full font-medium hover:bg-[#7CB342] hover:text-white transition-all">
              {getMetadata(content, 'ctaButton')}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
