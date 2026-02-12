'use client';

import { motion } from 'motion/react';
import { getTextBlockBySlug, getMetadata } from '@/lib/text-blocks';
import { getIcon } from '@/lib/icons';

export function Integrations() {
  const content = getTextBlockBySlug('integrations');
  const integrations = content?.integrations || [];

  return (
    <section
      id="integrations"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#F1F8E9]/30"
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

        {/* Integrations Grid */}
        <div className="max-w-5xl mx-auto mb-12">
          {/* First row - 3 items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
            {integrations.slice(0, 3).map((integration: any, index: number) => {
              const Icon = getIcon(integration.icon);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#7CB342] hover:shadow-xl transition-all h-full flex flex-col items-center justify-center text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-[#F1F8E9] group-hover:bg-[#7CB342] flex items-center justify-center mb-4 transition-all">
                      <Icon
                        className="text-[#7CB342] group-hover:text-white transition-colors"
                        size={32}
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {integration.name}
                    </h3>

                    {/* Category */}
                    <p className="text-sm text-gray-500">
                      {integration.category}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Second row - 3 items same width */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {integrations.slice(3).map((integration: any, index: number) => {
              const Icon = getIcon(integration.icon);

              return (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#7CB342] hover:shadow-xl transition-all h-full flex flex-col items-center justify-center text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-[#F1F8E9] group-hover:bg-[#7CB342] flex items-center justify-center mb-4 transition-all">
                      <Icon
                        className="text-[#7CB342] group-hover:text-white transition-colors"
                        size={32}
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {integration.name}
                    </h3>

                    {/* Category */}
                    <p className="text-sm text-gray-500">
                      {integration.category}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* More Coming Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: integrations.length * 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-[#7CB342] to-[#689F38] rounded-2xl p-6 hover:shadow-xl transition-all h-full flex flex-col items-center justify-center text-center">
                {/* Plus Icon */}
                <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <span className="text-4xl text-white font-light">+</span>
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-white mb-1">
                  {getMetadata(content, 'moreComingTitle')}
                </h3>
                <p className="text-sm text-white/80">
                  {getMetadata(content, 'moreComingSubtitle')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            {getMetadata(content, 'bottomText')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
